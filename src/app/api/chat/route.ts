import { NextRequest } from "next/server";
import { streamChatResponse } from "@/lib/ai/chat";
import { checkRateLimit } from "@/lib/ai/rate-limit";
import { detectIntent } from "@/lib/ai/intent";
import {
  getOrCreateConversation,
  appendMessage,
  updateConversationMeta,
  extractRecommendedEngagement,
  type ChatMessage,
} from "@/lib/conversations";
import { touchSession, markContactPrompted } from "@/lib/sessions";

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (!checkRateLimit(ip)) {
      return new Response("Rate limit exceeded. Please try again in a minute.", { status: 429 });
    }

    const body = await request.json();
    const messages: ChatMessage[] = body.messages ?? [];
    const requestedConversationId: string | null = body.conversationId ?? null;
    const sessionId: string | null = body.sessionId ?? null;

    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser?.content?.trim()) {
      return new Response("No message provided", { status: 400 });
    }

    const sessionStatus = sessionId
      ? await touchSession(sessionId).catch((err) => {
          console.error("Failed to touch session:", err);
          return { contactId: null, alreadyPrompted: false };
        })
      : { contactId: null, alreadyPrompted: false };

    const conversationId = await getOrCreateConversation(requestedConversationId, sessionId).catch((err) => {
      console.error("Failed to get/create conversation:", err);
      return null;
    });

    if (conversationId) {
      await appendMessage(conversationId, "user", lastUser.content).catch((err) =>
        console.error("Failed to persist user message:", err),
      );
    }

    // Decided synchronously from the user's own message — this is the only
    // signal available before the response headers must be sent, so it's what
    // gates whether the chat widget is allowed to show the contact-share
    // prompt after this turn. Once shown, it's marked immediately (not after
    // streaming) so a dropped connection still counts as "asked".
    const intent = detectIntent(lastUser.content);
    const shouldSuggestFollowup =
      Boolean(sessionId) && !sessionStatus.alreadyPrompted && !sessionStatus.contactId && intent === "lead";

    if (shouldSuggestFollowup && sessionId) {
      await markContactPrompted(sessionId).catch((err) =>
        console.error("Failed to mark session as prompted:", err),
      );
    }

    const stream = await streamChatResponse(messages);
    const persistedStream = withPersistence(stream, async (assistantText) => {
      if (!conversationId) return;
      await appendMessage(conversationId, "assistant", assistantText).catch((err) =>
        console.error("Failed to persist assistant message:", err),
      );
      await updateConversationMeta(conversationId, {
        intent,
        engagement: extractRecommendedEngagement(assistantText),
      }).catch((err) => console.error("Failed to update conversation meta:", err));
    });

    const headers: Record<string, string> = {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-store",
      "X-Accel-Buffering": "no",
      "X-May-Suggest-Followup": shouldSuggestFollowup ? "1" : "0",
      "X-Contact-Known": sessionStatus.contactId ? "1" : "0",
      "X-Intent": intent,
    };
    if (conversationId) headers["X-Conversation-Id"] = conversationId;

    return new Response(persistedStream, { headers });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Failed to process request", { status: 500 });
  }
}

/** Tees a text stream: forwards every chunk to the client while accumulating
 *  the full text, then fires `onComplete` once the stream ends. */
function withPersistence(
  stream: ReadableStream<Uint8Array>,
  onComplete: (fullText: string) => Promise<void>,
): ReadableStream<Uint8Array> {
  const decoder = new TextDecoder();
  let full = "";

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = stream.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          full += decoder.decode(value, { stream: true });
          controller.enqueue(value);
        }
      } catch (err) {
        controller.error(err);
        return;
      }
      controller.close();
      await onComplete(full).catch((err) => console.error("Chat persistence error:", err));
    },
  });
}
