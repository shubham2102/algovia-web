import { detectIntent } from "./intent";
import { retrieveChunks, formatRetrievedContext } from "./retrieve";
import { buildSystemPrompt } from "./prompts";
import { getFallbackResponse } from "@/lib/knowledge";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function generateChatResponse(
  messages: ChatMessage[],
): Promise<{ message: string; intent: string; source: string }> {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) {
    return { message: "Please send a message.", intent: "general", source: "error" };
  }

  const intent = detectIntent(lastUser.content);
  const chunks = retrieveChunks(lastUser.content, intent);
  const context = formatRetrievedContext(chunks);
  const systemPrompt = buildSystemPrompt(context, intent);

  const apiKey = process.env.OPENAI_API_KEY;
  if (apiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
          ],
          max_tokens: 1024,
          temperature: 0.5,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const message =
          data.choices?.[0]?.message?.content ??
          getFallbackResponse(lastUser.content);
        return { message, intent, source: "openai-rag" };
      }
    } catch {
      /* fall through */
    }
  }

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
          max_tokens: 1024,
          system: systemPrompt,
          messages: messages.map((m) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content,
          })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const text =
          data.content?.[0]?.text ?? getFallbackResponse(lastUser.content);
        return { message: text, intent, source: "anthropic-rag" };
      }
    } catch {
      /* fall through */
    }
  }

  const ragEnhanced = `${getFallbackResponse(lastUser.content)}

---
*Based on Algovia knowledge: ${chunks.map((c) => c.title).join(", ")}*`;

  if (intent === "lead") {
    return {
      message: `${ragEnhanced}\n\n**Next step:** Schedule a Solution Workshop or upload your requirements to scope an engagement with our team.`,
      intent,
      source: "fallback-rag",
    };
  }

  return { message: ragEnhanced, intent, source: "fallback-rag" };
}
