"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp, RefreshCw, Sparkles } from "lucide-react";
import { AI_PROMPTS } from "@/lib/constants";
import "./hero.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  className?: string;
  onFirstMessage?: () => void;
}

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

    if (line.trim() === "") { nodes.push(<div key={i} className="agent-md__gap" />); i++; continue; }
    if (line.trim() === "---" || line.trim() === "—") { nodes.push(<hr key={i} className="agent-md__hr" />); i++; continue; }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) { items.push(lines[i]!.replace(/^\d+\.\s+/, "")); i++; }
      nodes.push(<ol key={`ol${i}`} className="agent-md__ol">{items.map((it, j) => <li key={j}>{parseLine(it)}</li>)}</ol>);
      continue;
    }

    if (/^[-*]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i])) { items.push(lines[i]!.replace(/^[-*]\s+/, "")); i++; }
      nodes.push(<ul key={`ul${i}`} className="agent-md__ul">{items.map((it, j) => <li key={j}>{parseLine(it)}</li>)}</ul>);
      continue;
    }

    // Markdown table: collect consecutive pipe-starting lines
    if (/^\|/.test(line.trim())) {
      const tableLines: string[] = [];
      while (i < lines.length && /^\|/.test(lines[i]!.trim())) { tableLines.push(lines[i]!); i++; }
      const parseRow = (row: string) => row.split("|").slice(1, -1).map((c) => c.trim());
      const isSeparator = (row: string) => /^[\|\s\-:]+$/.test(row);
      if (tableLines.length >= 2 && isSeparator(tableLines[1] ?? "")) {
        const headers = parseRow(tableLines[0]!);
        const rows = tableLines.slice(2).map(parseRow);
        nodes.push(
          <div key={`tbl${i}`} className="agent-md__table-wrap">
            <table className="agent-md__table">
              <thead>
                <tr>{headers.map((h, j) => <th key={j}>{parseLine(h)}</th>)}</tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{parseLine(cell)}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    nodes.push(<p key={i} className="agent-md__p">{parseLine(line)}</p>);
    i++;
  }

  return nodes;
}

// ── Agent turn ───────────────────────────────────────────────────────────────
function AgentTurn({
  children,
  dataMsg,
  streaming,
}: {
  children: React.ReactNode;
  dataMsg?: string;
  streaming?: boolean;
}) {
  return (
    <div
      className={`agent-turn${streaming ? " agent-turn--streaming" : ""}`}
      {...(dataMsg ? { "data-msg": dataMsg } : {})}
    >
      <div className="agent-turn__header">
        <span className="agent-turn__icon">
          <Sparkles className="h-3 w-3" strokeWidth={2.5} />
        </span>
        <span className="agent-turn__label">Algovia AI</span>
      </div>
      <div className="agent-turn__body">{children}</div>
    </div>
  );
}

// ── Component ────────────────────────────────────────────────────────────────
export default function AIAssistantPanel({ className = "", onFirstMessage }: Props) {
  const [messages, setMessages]         = useState<Message[]>([]);
  const [input, setInput]               = useState("");
  const [loading, setLoading]           = useState(false);
  const [streaming, setStreaming]       = useState(false);
  const [loadingLabel, setLoadingLabel] = useState("Thinking");
  const convoRef                        = useRef<HTMLDivElement>(null);
  const hasMessages                     = messages.length > 0;

  // ── Cycle loading labels for agentic feel ─────────────────────────────────
  useEffect(() => {
    if (!loading) return;
    const labels = ["Thinking", "Analyzing", "Researching", "Drafting response"];
    let idx = 0;
    const iv = setInterval(() => { idx = (idx + 1) % labels.length; setLoadingLabel(labels[idx]!); }, 1800);
    return () => clearInterval(iv);
  }, [loading]);

  // ── Auto-scroll to latest message ─────────────────────────────────────────
  useEffect(() => {
    const convo = convoRef.current;
    if (!convo) return;
    const raf = requestAnimationFrame(() => {
      convo.scrollTo({ top: convo.scrollHeight, behavior: "smooth" });
    });
    return () => cancelAnimationFrame(raf);
  }, [messages, loading]);

  // ── Send ───────────────────────────────────────────────────────────────────
  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading || streaming) return;

      const isFirst = messages.length === 0;
      setInput("");

      // Build the updated message list synchronously so we can pass it to the API
      const updated: Message[] = [...messages, { role: "user", content: trimmed }];
      setMessages(updated);
      if (isFirst) onFirstMessage?.();

      setLoading(true);
      setLoadingLabel("Thinking");

      try {
        const res = await fetch("/api/chat", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ messages: updated }),
        });

        if (!res.ok || !res.body) {
          setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }]);
          return;
        }

        // Thinking phase ends → streaming phase begins
        setLoading(false);
        setStreaming(true);
        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        const reader  = res.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const copy = [...prev];
            const last = copy[copy.length - 1];
            if (last?.role === "assistant") {
              copy[copy.length - 1] = { ...last, content: last.content + chunk };
            }
            return copy;
          });
        }
      } catch {
        setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }]);
      } finally {
        setLoading(false);
        setStreaming(false);
      }
    },
    [loading, streaming, messages, onFirstMessage],
  );

  return (
    <div id="ai-panel" className={`hero-ai ${className}`.trim()} role="region" aria-label="Algovia AI assistant">

      {/* ── Conversation area ─────────────────────────────────────────── */}
      <div className="hero-ai__convo-wrap">
        <div ref={convoRef} className="hero-ai__convo" data-lenis-prevent>
          {hasMessages && (
            <div className="hero-ai__thread">
              {messages.map((msg, i) => {
                const isLastAssistant = msg.role === "assistant" && i === messages.length - 1;
                return msg.role === "user" ? (
                  <div key={i} data-msg="user" className="user-turn">
                    <div className="user-turn__header">
                      <span className="user-turn__avatar">YOU</span>
                      <span className="user-turn__name">You</span>
                    </div>
                    <p className="user-turn__text">{msg.content}</p>
                  </div>
                ) : (
                  <AgentTurn key={i} dataMsg="ai" streaming={isLastAssistant && streaming}>
                    <div className="agent-md">{renderMarkdown(msg.content)}</div>
                  </AgentTurn>
                );
              })}

              {loading && (
                <AgentTurn dataMsg="ai">
                  <div className="agent-turn__thinking">
                    <span className="agent-turn__thinking-dot" />
                    <span className="agent-turn__thinking-dot" />
                    <span className="agent-turn__thinking-dot" />
                    <span className="agent-turn__thinking-text">{loadingLabel}…</span>
                  </div>
                </AgentTurn>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Input area ─────────────────────────────────────────────────── */}
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

        <form
          className="hero-ai__input-row"
          onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Algovia AI anything about your project…"
            className="hero-ai__input"
            disabled={loading || streaming}
            autoComplete="off"
          />
          {hasMessages && (
            <button
              type="button"
              onClick={() => { setMessages([]); setInput(""); setStreaming(false); setLoading(false); }}
              className="hero-ai__reset"
              aria-label="New conversation"
              disabled={loading || streaming}
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            type="submit"
            disabled={loading || streaming || !input.trim()}
            className="hero-ai__send"
            aria-label="Send"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </form>

        <p className="hero-ai__disclaimer">Algovia AI can make mistakes. Verify important details.</p>
      </div>
    </div>
  );
}
