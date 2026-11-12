import { detectIntent } from "./intent";
import { retrieveChunks, formatRetrievedContext } from "./retrieve";
import { retrieveChunksVector } from "./vector-retrieve";
import { buildSystemPrompt } from "./prompts";
import { getFallbackResponse } from "@/lib/knowledge";
import { SITE } from "@/lib/constants";

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

export interface ChatStream {
  stream: ReadableStream<Uint8Array>;
  /** Titles of the knowledge-base entries the answer was grounded on. */
  sources: string[];
}

export async function streamChatResponse(
  messages: ChatMessage[],
  engagementHint?: string,
): Promise<ChatStream> {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) return { stream: fallbackStream("Please send a message."), sources: [] };

  const intent = detectIntent(lastUser.content);
  if (intent === "greeting") {
    return {
      sources: [],
      stream: fallbackStream(
        "Hi, I'm Algovia AI. Ask me about our products and services, our proprietary AI solutions, or our success stories — what would you like to explore?",
      ),
    };
  }
  const chunks =
    (await retrieveChunksVector(lastUser.content)) ??
    retrieveChunks(lastUser.content, intent);
  const sources = [...new Set(chunks.slice(0, 2).map((c) => c.title))];
  const context = formatRetrievedContext(chunks);
  const systemPrompt = buildSystemPrompt(context, intent, engagementHint);

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
      if (res.ok && res.body) return { stream: openaiStream(res.body), sources };
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
      if (res.ok && res.body) return { stream: anthropicStream(res.body), sources };
    } catch { /* fall through */ }
  }

  // ── Fallback ────────────────────────────────────────────────────────────────
  // Offline answers stay short: buying-intent questions get a concise service
  // summary + meeting link rather than the top retrieved chunk (often a long
  // company overview). Otherwise use the top chunk, then the canned answers.
  if (intent === "lead") {
    return {
      sources,
      stream: fallbackStream(
      `Algovia helps you move AI from strategy to measurable value through **AI & Digital Solutions** (AI strategy, agentic AI, computer vision, data, software, IoT) and **Intelligent Business Solutions** (operating model, governance & risk, cost optimization, transformation).\n\n[Request a Meeting](${SITE.workshopUrl}) to scope the right engagement with our team.`,
      ),
    };
  }
  const topChunk = chunks[0];
  const fallbackText = topChunk ? topChunk.content : getFallbackResponse(lastUser.content);
  return { stream: fallbackStream(fallbackText), sources };
}
