"use client";

import { useCallback, useRef, useState } from "react";
import {
  ArrowUpRight,
  Bot,
  Globe,
  Layers,
  Maximize2,
  Paperclip,
  RefreshCw,
  Route,
  Send,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import { AI_PROMPTS } from "@/lib/constants";
import "./hero.css";

const promptIcons: Record<string, React.ElementType> = {
  layers: Layers,
  refresh: RefreshCw,
  users: Users,
  route: Route,
  workflow: Workflow,
  globe: Globe,
};

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIAssistantPanelProps {
  className?: string;
}

export default function AIAssistantPanel({ className = "" }: AIAssistantPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPrompts, setShowPrompts] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      setShowPrompts(false);
      setInput("");
      setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
      setLoading(true);

      try {
        const history = [
          ...messages,
          { role: "user" as const, content: trimmed },
        ];
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
        });
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message ?? data.error },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Something went wrong. Please try again in a moment.",
          },
        ]);
      } finally {
        setLoading(false);
        requestAnimationFrame(() => {
          chatRef.current?.scrollTo({
            top: chatRef.current.scrollHeight,
            behavior: "smooth",
          });
        });
      }
    },
    [loading, messages],
  );

  const resetChat = () => {
    setMessages([]);
    setShowPrompts(true);
    setInput("");
  };

  return (
    <div
      id="ai-panel"
      className={`hero-ai ${className}`.trim()}
      role="region"
      aria-label="Algovia AI assistant"
    >
      <div className="hero-ai__surface">
        <header className="hero-ai__header">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--gradient-brand)] shadow-lg shadow-[rgba(99,102,241,0.25)]">
              <Bot className="h-5 w-5 text-white" strokeWidth={2} />
            </span>
            <div>
              <p className="text-sm font-semibold text-[var(--foreground)]">Algovia AI</p>
              <p className="hero-ai__status">
                <span className="hero-ai__status-dot" />
                Online
              </p>
            </div>
          </div>
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={resetChat}
              className="rounded-lg p-2 text-[var(--algovia-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
              aria-label="Reset conversation"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="rounded-lg p-2 text-[var(--algovia-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
              aria-label="Expand panel"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div ref={chatRef} className="hero-ai__body">
          {messages.length === 0 && (
            <p className="hero-ai__greeting">
              Hi, I&apos;m <strong>Algovia AI</strong>. How can I help you today?
            </p>
          )}

          {showPrompts && messages.length === 0 && (
            <div className="hero-ai__prompts">
              {AI_PROMPTS.map((prompt) => {
                const Icon = promptIcons[prompt.icon] ?? Sparkles;
                return (
                  <button
                    key={prompt.id}
                    type="button"
                    onClick={() => sendMessage(prompt.text)}
                    className="hero-ai__prompt"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--algovia-green-muted)] text-[var(--algovia-green)]">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="hero-ai__prompt-text">{prompt.text}</span>
                    <ArrowUpRight className="hero-ai__prompt-arrow h-3.5 w-3.5" />
                  </button>
                );
              })}
            </div>
          )}

          {(messages.length > 0 || loading) && (
            <div className="hero-ai__messages">
              {messages.map((msg, i) => (
                <div
                  key={`${msg.role}-${i}`}
                  className={
                    msg.role === "user" ? "flex justify-end" : "flex justify-start"
                  }
                >
                  <div
                    className={
                      msg.role === "user"
                        ? "hero-ai__message-user"
                        : "hero-ai__message-assistant"
                    }
                  >
                    <div className="chat-message whitespace-pre-wrap">
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-1.5 px-1">
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--algovia-green)]"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <footer className="hero-ai__footer">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="hero-ai__input-wrap"
            aria-label="Chat with Algovia AI"
          >
            <button
              type="button"
              className="rounded-md p-1.5 text-[var(--algovia-muted)] hover:text-[var(--foreground)]"
              aria-label="Attach file"
              tabIndex={-1}
            >
              <Paperclip className="h-4 w-4" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Algovia's services..."
              className="hero-ai__input"
              aria-label="Message input"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="hero-ai__send"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <p className="hero-ai__disclaimer">
            Algovia AI can make mistakes. Consider checking important information.
          </p>
        </footer>
      </div>
    </div>
  );
}
