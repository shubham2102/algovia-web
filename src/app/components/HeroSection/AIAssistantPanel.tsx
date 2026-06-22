"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp, RefreshCw, Sparkles } from "lucide-react";
import { AI_PROMPTS } from "@/lib/constants";
import "./hero.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const DEMO_USER  = "How does Algovia build production AI systems?";
const DEMO_AGENT = "We architect end-to-end — LangGraph orchestration, RAG knowledge layers, and cloud-native delivery. You get a running production system, not a prototype.";

// ── Lightweight inline markdown renderer ────────────────────────────────────
function parseLine(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+?\*\*|\*[^*]+?\*)/g);
  if (parts.length === 1) return text;
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**")) return <strong key={i}>{p.slice(2, -2)}</strong>;
        if (p.startsWith("*")  && p.endsWith("*"))  return <em      key={i}>{p.slice(1, -1)}</em>;
        return p;
      })}
    </>
  );
}

function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split("\n");
  const nodes: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      nodes.push(<div key={i} className="hero-ai__md-gap" />);
      i++;
      continue;
    }

    if (line.trim() === "---" || line.trim() === "—") {
      nodes.push(<hr key={i} className="hero-ai__md-hr" />);
      i++;
      continue;
    }

    // Ordered list — consume consecutive numbered lines
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ""));
        i++;
      }
      nodes.push(
        <ol key={`ol${i}`} className="hero-ai__md-ol">
          {items.map((it, j) => <li key={j}>{parseLine(it)}</li>)}
        </ol>
      );
      continue;
    }

    // Unordered list
    if (/^[-*]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ""));
        i++;
      }
      nodes.push(
        <ul key={`ul${i}`} className="hero-ai__md-ul">
          {items.map((it, j) => <li key={j}>{parseLine(it)}</li>)}
        </ul>
      );
      continue;
    }

    nodes.push(<p key={i} className="hero-ai__md-p">{parseLine(line)}</p>);
    i++;
  }

  return nodes;
}

// ── Agent card — defined outside so React doesn't remount it every render ────
function AgentCard({ children, dataMsg }: { children: React.ReactNode; dataMsg?: string }) {
  return (
    <div className="hero-ai__agent-card" {...(dataMsg ? { "data-msg": dataMsg } : {})}>
      <div className="hero-ai__agent-card-header">
        <span className="hero-ai__avatar">
          <Sparkles className="h-3 w-3 text-white" strokeWidth={2.5} />
        </span>
        <span className="hero-ai__agent-name">Algovia AI</span>
      </div>
      {children}
    </div>
  );
}

// ── Component ────────────────────────────────────────────────────────────────
export default function AIAssistantPanel({ className = "" }: { className?: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const convoRef                = useRef<HTMLDivElement>(null);
  const hasMessages             = messages.length > 0;

  // ── Scroll-based per-message blur ──────────────────────────────────────────
  useEffect(() => {
    const convo = convoRef.current;
    if (!convo) return;

    const applyBlur = () => {
      const items    = convo.querySelectorAll<HTMLElement>("[data-msg]");
      const fadeZone = convo.clientHeight * 0.32;

      items.forEach((el) => {
        const elRelTop = el.offsetTop - convo.scrollTop;

        if (elRelTop < fadeZone && elRelTop > -el.offsetHeight) {
          const t        = Math.max(0, Math.min(1, elRelTop / fadeZone));
          el.style.opacity    = String(0.06 + t * 0.94);
          el.style.filter     = `blur(${(1 - t) * 2.5}px)`;
          el.style.transition = "opacity 80ms linear, filter 80ms linear";
        } else if (elRelTop >= fadeZone) {
          el.style.opacity = "1";
          el.style.filter  = "none";
        }
      });
    };

    convo.addEventListener("scroll", applyBlur, { passive: true });
    // Re-run after each new message renders
    const raf = requestAnimationFrame(() => {
      convo.scrollTo({ top: convo.scrollHeight, behavior: "smooth" });
      applyBlur();
    });

    return () => {
      convo.removeEventListener("scroll", applyBlur);
      cancelAnimationFrame(raf);
    };
  }, [messages, loading]);

  // ── Send ───────────────────────────────────────────────────────────────────
  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;
      setInput("");
      setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
      setLoading(true);
      try {
        const res  = await fetch("/api/chat", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ messages: [...messages, { role: "user", content: trimmed }] }),
        });
        const data = await res.json();
        setMessages((prev) => [...prev, { role: "assistant", content: data.message ?? data.error }]);
      } catch {
        setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }]);
      } finally {
        setLoading(false);
      }
    },
    [loading, messages],
  );

  return (
    <div id="ai-panel" className={`hero-ai ${className}`.trim()} role="region" aria-label="Algovia AI assistant">

      {/* ── Conversation scroll area ─────────────────────────────────────── */}
      <div ref={convoRef} className="hero-ai__convo">

        {/* Demo state */}
        {!hasMessages && (
          <>
            <div className="hero-ai__demo-user">{DEMO_USER}</div>
            <div className="hero-ai__demo-agent-wrap">
              <AgentCard>
                <p className="hero-ai__agent-card-body">{DEMO_AGENT}</p>
              </AgentCard>
            </div>
          </>
        )}

        {/* Real messages */}
        {hasMessages && (
          <div className="hero-ai__messages">
            {messages.map((msg, i) =>
              msg.role === "user" ? (
                <div key={i} data-msg="user" className="hero-ai__user-bubble">
                  {msg.content}
                </div>
              ) : (
                <AgentCard key={i} dataMsg="ai">
                  <div className="hero-ai__agent-card-body hero-ai__md">
                    {renderMarkdown(msg.content)}
                  </div>
                </AgentCard>
              )
            )}

            {loading && (
              <AgentCard dataMsg="ai">
                <div className="flex gap-1.5 py-0.5">
                  {[0, 130, 260].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--algovia-purple)]"
                      style={{ animationDelay: `${d}ms` }} />
                  ))}
                </div>
              </AgentCard>
            )}
          </div>
        )}
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────────────── */}
      <div className="hero-ai__bottom">
        {!hasMessages && (
          <div className="hero-ai__chips" role="list">
            {AI_PROMPTS.map((p) => (
              <button key={p.id} type="button" role="listitem" className="hero-ai__chip"
                onClick={() => sendMessage(p.text)}>
                {p.label}
              </button>
            ))}
          </div>
        )}

        <form className="hero-ai__input-row" onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Algovia AI…" className="hero-ai__input"
            disabled={loading} autoComplete="off" />
          {hasMessages && (
            <button type="button" onClick={() => { setMessages([]); setInput(""); }}
              className="hero-ai__reset" aria-label="New conversation">
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          )}
          <button type="submit" disabled={loading || !input.trim()}
            className="hero-ai__send" aria-label="Send">
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </form>

        <p className="hero-ai__disclaimer">Algovia AI can make mistakes. Verify important details.</p>
      </div>
    </div>
  );
}
