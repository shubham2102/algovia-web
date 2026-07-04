import { NextRequest } from "next/server";
import { streamChatResponse } from "@/lib/ai/chat";
import { checkRateLimit } from "@/lib/ai/rate-limit";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

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

    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser?.content?.trim()) {
      return new Response("No message provided", { status: 400 });
    }

    const stream = await streamChatResponse(messages);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-store",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Failed to process request", { status: 500 });
  }
}
