import { detectIntent } from "./intent";
import { retrieveChunks, formatRetrievedContext } from "./retrieve";
import { retrieveChunksVector } from "./vector-retrieve";
import { buildSystemPrompt } from "./prompts";
import { getFallbackResponse } from "@/lib/knowledge";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Simulate streaming for fallback responses
function fallbackStream(text: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const tokens = text.split(/(\s+)/);
  return new ReadableStream({
    async start(controller) {
      for (const token of tokens) {
        controller.enqueue(encoder.encode(token));
        await new Promise((r) => setTimeout(r, 18));
      }
      controller.close();
    },
  });
}

// Parse OpenAI SSE stream → raw text delta stream
function openaiStream(upstream: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const reader = upstream.getReader();
  const decoder = new TextDecoder();
  let buf = "";

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          const lines = buf.split("\n");
          buf = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (data === "[DONE]") { controller.close(); return; }
            try {
              const json = JSON.parse(data);
              const delta = json.choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch { /* skip malformed chunk */ }
          }
        }
      } catch (e) {
        controller.error(e);
      } finally {
        controller.close();
      }
    },
  });
}

// Parse Anthropic SSE stream → raw text delta stream
function anthropicStream(upstream: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const reader = upstream.getReader();
  const decoder = new TextDecoder();
  let buf = "";

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          const lines = buf.split("\n");
          buf = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            try {
              const json = JSON.parse(line.slice(6));
              if (json.type === "content_block_delta" && json.delta?.type === "text_delta") {
                controller.enqueue(encoder.encode(json.delta.text));
              }
            } catch { /* skip */ }
          }
        }
      } catch (e) {
        controller.error(e);
      } finally {
        controller.close();
      }
    },
  });
}

export async function streamChatResponse(
  messages: ChatMessage[],
): Promise<ReadableStream<Uint8Array>> {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) return fallbackStream("Please send a message.");

  const intent = detectIntent(lastUser.content);
  const chunks =
    (await retrieveChunksVector(lastUser.content)) ??
    retrieveChunks(lastUser.content, intent);
  const context = formatRetrievedContext(chunks);
  const systemPrompt = buildSystemPrompt(context, intent);

  // ── Try OpenAI ──────────────────────────────────────────────────────────────
  const openaiKey = process.env.OPENAI_API_KEY;
  if (openaiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${openaiKey}` },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
          ],
          max_tokens: 400,
          temperature: 0.5,
          stream: true,
        }),
      });
      if (res.ok && res.body) return openaiStream(res.body);
    } catch { /* fall through */ }
  }

  // ── Try Anthropic ───────────────────────────────────────────────────────────
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (anthropicKey) {
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": anthropicKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: process.env.ANTHROPIC_MODEL ?? "claude-3-5-haiku-20241022",
          max_tokens: 400,
          system: systemPrompt,
          stream: true,
          messages: messages.map((m) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content,
          })),
        }),
      });
      if (res.ok && res.body) return anthropicStream(res.body);
    } catch { /* fall through */ }
  }

  // ── Fallback ────────────────────────────────────────────────────────────────
  // Use the top retrieved chunk directly — it already contains the right knowledge.
  // getFallbackResponse is only a last resort when the chunk list is empty.
  const topChunk = chunks[0];
  const fallbackText = topChunk
    ? topChunk.content
    : getFallbackResponse(lastUser.content);
  const suffix =
    intent === "lead"
      ? "\n\n**Next step:** Schedule a Solution Workshop or upload your requirements."
      : "";
  return fallbackStream(`${fallbackText}${suffix}`);
}
