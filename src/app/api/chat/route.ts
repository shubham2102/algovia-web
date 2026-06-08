import { NextRequest, NextResponse } from "next/server";
import { generateChatResponse } from "@/lib/ai/chat";
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
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again in a minute." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const messages: ChatMessage[] = body.messages ?? [];

    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser?.content?.trim()) {
      return NextResponse.json(
        { error: "No message provided" },
        { status: 400 },
      );
    }

    const result = await generateChatResponse(messages);

    return NextResponse.json({
      message: result.message,
      intent: result.intent,
      source: result.source,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
