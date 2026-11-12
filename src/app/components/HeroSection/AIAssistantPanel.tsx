"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUp, ArrowUpRight, Check, Copy, Plus, RefreshCw, RotateCcw, Sparkles, Square } from "lucide-react";
import { AI_PROMPTS, ENGAGEMENTS } from "@/lib/constants";
import LeadForm from "@/components/forms/LeadForm";
import {
  getOrCreateSessionId,
  getStoredContact,
  storeContact,
  isFollowupResolved,
  markFollowupResolved,
  loadChat,
  saveChat,
  type StoredContact,
} from "@/lib/chatSession";
import "./hero.css";

interface Message {
  role: "user" | "assistant";
  content: string;
  /** Starting-point prompt that produced this user turn, so a retry keeps its hint. */
  engagementId?: string;
  /** Assistant turn that failed to load; rendered with a retry action. */
  error?: boolean;
  /** The visitor stopped this turn; shown as a neutral note rather than a failure. */
  stopped?: boolean;
  /** Knowledge-base entries the answer was grounded on (from the API's X-Sources header). */
  sources?: string[];
}

// Follow-up questions offered under the latest answer; ones already asked are skipped.
const FOLLOW_UPS = [
  { label: "Show me relevant success stories", text: "Can you show me relevant success stories?" },
  { label: "How do your engagements work?", text: "How do your engagement models work?" },
  { label: "How do we get started?", text: "How do we get started with Algovia?" },
  { label: "Which industries do you serve?", text: "Which industries do you serve?" },
] as const;

interface Props {
  className?: string;
  onFirstMessage?: () => void;
  /** The thread was cleared (or the only open flow was cancelled) — return to the landing state. */
  onReset?: () => void;
}

// ── Lightweight inline markdown renderer ────────────────────────────────────
function parseLine(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+?\*\*|\*[^*]+?\*|\[[^\]]+?\]\([^)]+?\))/g);
  if (parts.length === 1) return text;
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**")) return <strong key={i}>{p.slice(2, -2)}</strong>;
        if (p.startsWith("*")  && p.endsWith("*"))  return <em      key={i}>{p.slice(1, -1)}</em>;
        const linkMatch = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          const [, label, href] = linkMatch;
          if (/^https?:\/\//.test(href!)) {
            return (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="agent-md__link">
                {label}
              </a>
            );
          }
          return (
            <Link key={i} href={href!} className="agent-md__link">
              {label}
            </Link>
          );
        }
        return p;
      })}
    </>
  );
}

function ActionLink({ kicker, label, href }: { kicker?: string; label: string; href: string }) {
  const external = /^https?:\/\//.test(href);
  const content = (
    <>
      {label}
      {external ? <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden /> : <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />}
    </>
  );
  return (
    <div className="agent-cta">
      {kicker && <span className="agent-cta__kicker">{kicker}</span>}
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="agent-cta__btn">{content}</a>
      ) : (
        <Link href={href} className="agent-cta__btn">{content}</Link>
      )}
    </div>
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

    // A line that is only a link (or "Recommended path: [link]") becomes an action button.
    const cta = line.trim().match(/^(?:\*\*(Recommended path):\*\*\s*)?\[([^\]]+)\]\(([^)]+)\)\.?$/);
    if (cta) {
      const [, kicker, label, href] = cta;
      nodes.push(<ActionLink key={i} kicker={kicker} label={label!} href={href!} />);
      i++;
      continue;
    }

    nodes.push(<p key={i} className="agent-md__p">{parseLine(line)}</p>);
    i++;
  }

  return nodes;
}

type JoinState = "hidden" | "choose" | "careers" | "network" | "done";

const JOIN_FIELDS = [
  { name: "fullName", label: "Full name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "expertise", label: "Area of expertise", type: "text", required: true, full: true },
  { name: "linkedin", label: "LinkedIn profile URL", type: "text", required: false },
  { name: "phone", label: "Phone number", type: "tel", required: false },
  { name: "cv", label: "CV / resume", type: "file", required: false, accept: ".pdf,.doc,.docx", full: true },
] as const;

// ── Agent trace: what the assistant is doing / did ───────────────────────────
function AgentTrace({ status, sources }: { status: "working" | "drafting" | "done"; sources?: string[] }) {
  const [understood, setUnderstood] = useState(false);

  useEffect(() => {
    if (status !== "working") return;
    const t = setTimeout(() => setUnderstood(true), 900);
    return () => clearTimeout(t);
  }, [status]);

  if (status === "done") {
    if (!sources?.length) return null;
    return (
      <div className="agent-trace agent-trace--done">
        <span className="agent-trace__summary">
          <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
          Searched Algovia&apos;s knowledge base
        </span>
        {sources.map((title) => (
          <span key={title} className="agent-trace__source">{title}</span>
        ))}
      </div>
    );
  }

  const steps = [
    { label: "Understanding your question", state: status === "drafting" || understood ? "done" : "active" },
    { label: "Searching Algovia's knowledge base", state: status === "drafting" ? "done" : understood ? "active" : "pending" },
    { label: "Drafting a response", state: status === "drafting" ? "active" : "pending" },
  ] as const;

  return (
    <ol className="agent-trace" aria-live="polite" aria-label="Assistant progress">
      {steps.map((step) => (
        <li key={step.label} className={`agent-trace__step agent-trace__step--${step.state}`}>
          <span className="agent-trace__mark" aria-hidden>
            {step.state === "done" && <Check className="h-3 w-3" strokeWidth={3} />}
          </span>
          {step.label}
        </li>
      ))}
    </ol>
  );
}

// ── Agent turn ───────────────────────────────────────────────────────────────
function AgentTurn({
  children,
  dataMsg,
  streaming,
  copyText,
  error,
  stopped,
  onRetry,
  onRegenerate,
  trace,
}: {
  children?: React.ReactNode;
  dataMsg?: string;
  streaming?: boolean;
  copyText?: string;
  error?: boolean;
  stopped?: boolean;
  onRetry?: () => void;
  onRegenerate?: () => void;
  trace?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!copyText) return;
    try {
      await navigator.clipboard.writeText(copyText.replace(/\*\*/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable (insecure context / denied) — nothing to do */
    }
  };

  const showActions = Boolean(copyText) && !streaming && !error;

  return (
    <div
      className={`agent-turn${streaming ? " agent-turn--streaming" : ""}${error ? " agent-turn--error" : ""}${stopped ? " agent-turn--stopped" : ""}`}
      {...(dataMsg ? { "data-msg": dataMsg } : {})}
    >
      <div className="agent-turn__head">
        <span className="agent-turn__icon" aria-hidden>
          <Sparkles className="h-3 w-3" strokeWidth={2.5} />
        </span>
        <span className="agent-turn__label">Algovia AI</span>
      </div>
      <div className="agent-turn__main">
        {trace}
        {children && <div className="agent-turn__body">{children}</div>}
        {error && onRetry && (
          <button type="button" className="agent-turn__action agent-turn__action--retry" onClick={onRetry}>
            <RotateCcw className="h-3.5 w-3.5" strokeWidth={2.5} />
            Try again
          </button>
        )}
        {showActions && (
          <div className="agent-turn__actions">
            <button type="button" className="agent-turn__action" onClick={handleCopy} aria-label={copied ? "Copied" : "Copy response"}>
              {copied ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
            {onRegenerate && (
              <button type="button" className="agent-turn__action" onClick={onRegenerate} aria-label="Regenerate response">
                <RefreshCw className="h-3.5 w-3.5" />
                Regenerate
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Component ────────────────────────────────────────────────────────────────
export default function AIAssistantPanel({ className = "", onFirstMessage, onReset }: Props) {
  const [messages, setMessages]         = useState<Message[]>([]);
  const [input, setInput]               = useState("");
  const [loading, setLoading]           = useState(false);
  const [streaming, setStreaming]       = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [followupState, setFollowupState] = useState<"hidden" | "ask" | "form" | "confirmed">("hidden");
  const [storedContact, setStoredContact] = useState<StoredContact | null>(null);
  const [joinState, setJoinState] = useState<JoinState>("hidden");
  const [hydrated, setHydrated]     = useState(false);
  const convoRef                        = useRef<HTMLDivElement>(null);
  const abortRef                        = useRef<AbortController | null>(null);
  const hasMessages                     = messages.length > 0;

  // Session id + any contact already shared in a previous visit persist across
  // reloads (localStorage) so the widget never re-asks someone it already knows.
  // One-time sync from that external store on mount, not a derived-state loop.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSessionId(getOrCreateSessionId());
    const existing = getStoredContact();
    if (existing) {
      setStoredContact(existing);
      setFollowupState("confirmed");
    }

    // Bring back the thread if the visitor left (e.g. followed a link in an
    // answer) and returned. A reply cut off mid-way is replaced by a retry card.
    const saved = loadChat<Message>();
    if (saved) {
      const kept = saved.inFlight && saved.messages[saved.messages.length - 1]?.role === "assistant"
        ? saved.messages.slice(0, -1)
        : saved.messages;
      const interrupted = saved.inFlight || kept[kept.length - 1]?.role === "user";
      setMessages(
        interrupted
          ? [...kept, { role: "assistant", content: "That answer was interrupted when you left the page.", error: true }]
          : kept,
      );
      setConversationId(saved.conversationId);
      if (!existing && (saved.followupState === "ask" || saved.followupState === "form")) {
        setFollowupState(saved.followupState);
      }
      onFirstMessage?.();
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only restore
  }, []);

  // Keep the snapshot current (after the restore above, so it never overwrites it).
  useEffect(() => {
    if (!hydrated) return;
    saveChat<Message>({ messages, conversationId, followupState, inFlight: loading || streaming });
  }, [hydrated, messages, conversationId, followupState, loading, streaming]);

  const startJoin = useCallback(() => {
    onFirstMessage?.();
    setJoinState("choose");
  }, [onFirstMessage]);

  // Deep link from other pages (e.g. Our Team → "Join the Network").
  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#join-network") startJoin();
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [startJoin]);

  const handleDismissFollowup = useCallback(() => {
    setFollowupState("hidden");
    markFollowupResolved();
  }, []);

  const handleShareSuccess = useCallback((values: Record<string, string>) => {
    const contact: StoredContact = { name: values.name, email: values.email, company: values.company, phone: values.phone };
    storeContact(contact);
    setStoredContact(contact);
    markFollowupResolved();
    setFollowupState("confirmed");
  }, []);

  // ── Auto-scroll to latest message ─────────────────────────────────────────
  useEffect(() => {
    const convo = convoRef.current;
    if (!convo) return;
    const raf = requestAnimationFrame(() => {
      convo.scrollTo({ top: convo.scrollHeight, behavior: "smooth" });
    });
    return () => cancelAnimationFrame(raf);
  }, [messages, loading, joinState, followupState]);

  // ── Send ───────────────────────────────────────────────────────────────────
  const sendMessage = useCallback(
    async (text: string, engagementId?: string, base: Message[] = messages) => {
      const trimmed = text.trim();
      if (!trimmed || loading || streaming) return;

      const isFirst = base.length === 0;
      setInput("");
      // Asking something new means moving on from any open form.
      setJoinState("hidden");
      setFollowupState((prev) => (prev === "ask" || prev === "form" ? "hidden" : prev));

      // Build the updated message list synchronously so we can pass it to the API
      const updated: Message[] = [...base, { role: "user", content: trimmed, engagementId }];
      setMessages(updated);
      if (isFirst) onFirstMessage?.();

      setLoading(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method:  "POST",
          signal:  controller.signal,
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ messages: updated.map(({ role, content }) => ({ role, content })), conversationId, sessionId, engagementHint: engagementId }),
        });

        if (!res.ok || !res.body) {
          setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong while generating that answer.", error: true }]);
          return;
        }

        const returnedConversationId = res.headers.get("X-Conversation-Id");
        if (returnedConversationId) setConversationId(returnedConversationId);

        // Only ever surface the follow-up prompt when this turn actually shows
        // buying intent (never after a generic Q&A answer), and never once the
        // visitor has already been asked or is already known — see chatSession.ts.
        if (!isFollowupResolved()) {
          const intent = res.headers.get("X-Intent");
          const contactKnown = res.headers.get("X-Contact-Known") === "1";
          const maySuggest = res.headers.get("X-May-Suggest-Followup") === "1";

          if (intent === "lead") {
            if (contactKnown || storedContact) {
              markFollowupResolved();
              setFollowupState("confirmed");
            } else if (maySuggest) {
              setFollowupState((prev) => {
                if (prev !== "hidden") return prev;
                markFollowupResolved(); // shown once — never ask again, even if ignored
                return "ask";
              });
            }
          }
        }

        let sources: string[] | undefined;
        try {
          const raw = res.headers.get("X-Sources");
          if (raw) sources = JSON.parse(decodeURIComponent(raw)) as string[];
        } catch { /* malformed header — just skip the sources */ }

        // Thinking phase ends → streaming phase begins
        setLoading(false);
        setStreaming(true);
        setMessages((prev) => [...prev, { role: "assistant", content: "", sources }]);

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

        // Starting-point prompts always end with a link to the matching engagement model.
        const engagement = ENGAGEMENTS.find((e) => e.id === engagementId);
        if (engagement) {
          setMessages((prev) => {
            const copy = [...prev];
            const last = copy[copy.length - 1];
            if (last?.role === "assistant" && !last.content.includes("engagement=")) {
              copy[copy.length - 1] = {
                ...last,
                content: `${last.content}\n\n**Recommended path:** [${engagement.title}](/service-offerings?engagement=${engagement.id}#engage)`,
              };
            }
            return copy;
          });
        }
      } catch {
        if (controller.signal.aborted) {
          // Stopped by the visitor: keep whatever streamed so far. If nothing
          // had arrived yet, leave a retryable note instead of a dangling question.
          setMessages((prev) =>
            prev[prev.length - 1]?.role === "user"
              ? [...prev, { role: "assistant", content: "You stopped this response.", error: true, stopped: true }]
              : prev,
          );
        } else {
          setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong while generating that answer.", error: true }]);
        }
      } finally {
        if (abortRef.current === controller) abortRef.current = null;
        setLoading(false);
        setStreaming(false);
      }
    },
    [loading, streaming, messages, onFirstMessage, conversationId, sessionId, storedContact],
  );

  const stopGenerating = useCallback(() => abortRef.current?.abort(), []);

  const resetChat = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setInput("");
    setStreaming(false);
    setLoading(false);
    setConversationId(null);
    setJoinState("hidden");
    setFollowupState((prev) => (prev === "ask" || prev === "form" ? "hidden" : prev));
    onReset?.();
  }, [onReset]);

  // Close the join flow and carry on chatting (or go back to the landing view if nothing was said yet).
  const closeJoin = useCallback(() => {
    setJoinState("hidden");
    if (messages.length === 0) onReset?.();
  }, [messages.length, onReset]);

  useEffect(() => {
    if (joinState === "hidden" && followupState !== "form") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (joinState !== "hidden") closeJoin();
      else setFollowupState("hidden");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [joinState, followupState, closeJoin]);

  // Offer a few follow-ups once the latest answer is complete.
  const lastMessage = messages[messages.length - 1];
  const asked = new Set(messages.filter((m) => m.role === "user").map((m) => m.content));
  const suggestions = FOLLOW_UPS.filter((q) => !asked.has(q.text)).slice(0, 3);
  const showSuggestions =
    lastMessage?.role === "assistant" && !lastMessage.error && !loading && !streaming && joinState === "hidden" && suggestions.length > 0;

  // Drop the last answer (failed, stopped or unsatisfying) and its question, then ask again.
  const retryLast = useCallback(() => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) return;
    sendMessage(lastUser.content, lastUser.engagementId, messages.slice(0, -2));
  }, [messages, sendMessage]);

  return (
    <div id="ai-panel" className={`hero-ai ${className}`.trim()} role="region" aria-label="Algovia AI assistant">

      {/* ── Conversation area ─────────────────────────────────────────── */}
      <div className="hero-ai__convo-wrap">
        <div className="hero-ai__chat-head">
          <button type="button" className="hero-ai__newchat" onClick={resetChat}>
            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
            New chat
          </button>
        </div>
        <div ref={convoRef} className="hero-ai__convo" data-lenis-prevent>
          {(hasMessages || joinState !== "hidden") && (
            <div className="hero-ai__thread">
              {messages.map((msg, i) => {
                const isLastAssistant = msg.role === "assistant" && i === messages.length - 1;
                return msg.role === "user" ? (
                  <div key={i} data-msg="user" className="user-turn">
                    <p className="user-turn__text">{msg.content}</p>
                  </div>
                ) : (
                  <AgentTurn
                    key={i}
                    dataMsg="ai"
                    streaming={isLastAssistant && streaming}
                    copyText={msg.content}
                    error={msg.error}
                    stopped={msg.stopped}
                    onRetry={isLastAssistant ? retryLast : undefined}
                    onRegenerate={isLastAssistant ? retryLast : undefined}
                    trace={
                      msg.error ? undefined : (
                        <AgentTrace status={isLastAssistant && streaming ? "drafting" : "done"} sources={msg.sources} />
                      )
                    }
                  >
                    <div className="agent-md">{renderMarkdown(msg.content)}</div>
                  </AgentTurn>
                );
              })}

              {loading && <AgentTurn dataMsg="ai" trace={<AgentTrace status="working" />} />}

              {joinState !== "hidden" && (
                <AgentTurn dataMsg="ai">
                  <div className="agent-md">
                    {joinState === "choose" && (
                      <>
                        <p className="agent-md__p">Great — which best describes you?</p>
                        <div className="hero-ai__join-choices">
                          <button type="button" className="hero-ai__chip" onClick={() => setJoinState("careers")}>
                            I&apos;d like to join the Algovia team
                          </button>
                          <button type="button" className="hero-ai__chip" onClick={() => setJoinState("network")}>
                            I&apos;m an expert who wants to join the network
                          </button>
                        </div>
                        <div className="hero-ai__form-actions">
                          <button type="button" className="hero-ai__form-link" onClick={closeJoin}>
                            Cancel
                          </button>
                        </div>
                      </>
                    )}
                    {(joinState === "careers" || joinState === "network") && (
                      <>
                        <p className="agent-md__p">
                          {joinState === "careers"
                            ? "Tell us a little about you and our team will be in touch."
                            : "Share your details and expertise — we'll reach out about select AI transformation engagements."}
                        </p>
                        <LeadForm
                          key={joinState}
                          formType={joinState}
                          conversationId={conversationId}
                          sessionId={sessionId}
                          submitLabel={joinState === "careers" ? "Send my application" : "Join the network"}
                          successMessage="✓ Thank you — we've received your details."
                          onSuccess={() => setJoinState("done")}
                          fields={JOIN_FIELDS}
                        />
                        <div className="hero-ai__form-actions">
                          <button type="button" className="hero-ai__form-link" onClick={() => setJoinState("choose")}>
                            ← Back
                          </button>
                          <span className="hero-ai__followup-sep">·</span>
                          <button type="button" className="hero-ai__form-link" onClick={closeJoin}>
                            Cancel and continue chatting
                          </button>
                        </div>
                      </>
                    )}
                    {joinState === "done" && (
                      <>
                        <p className="agent-md__p">✓ Thank you — we&apos;ve received your details and will be in touch.</p>
                        <div className="hero-ai__form-actions">
                          <button type="button" className="hero-ai__form-link" onClick={closeJoin}>
                            Continue chatting
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </AgentTurn>
              )}

              {showSuggestions && (
                <div className="hero-ai__suggestions" role="list" aria-label="Suggested follow-up questions">
                  {suggestions.map((q) => (
                    <button key={q.label} type="button" role="listitem" className="hero-ai__suggestion" onClick={() => sendMessage(q.text)}>
                      {q.label}
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
                    </button>
                  ))}
                </div>
              )}

              {followupState === "ask" && (
                <p className="hero-ai__followup-line">
                  Want our team to follow up on this?{" "}
                  <button type="button" className="hero-ai__followup-link" onClick={() => setFollowupState("form")}>
                    Share your details
                  </button>
                  <span className="hero-ai__followup-sep">·</span>
                  <button type="button" className="hero-ai__followup-link hero-ai__followup-link--muted" onClick={handleDismissFollowup}>
                    Not now
                  </button>
                </p>
              )}

              {followupState === "form" && (
                <div className="hero-ai__followup-form">
                <LeadForm
                  formType="chat"
                  conversationId={conversationId}
                  sessionId={sessionId}
                  submitLabel="Send my details"
                  onSuccess={handleShareSuccess}
                  successMessage="✓ Thanks — our team will follow up shortly."
                  fields={[
                    { name: "name", label: "Name", type: "text", required: true },
                    { name: "email", label: "Work email", type: "email", required: true },
                    { name: "company", label: "Company name", type: "text", required: false },
                    { name: "phone", label: "Phone number", type: "tel", required: false },
                  ]}
                />
                <div className="hero-ai__form-actions">
                  <button type="button" className="hero-ai__form-link" onClick={() => setFollowupState("hidden")}>
                    Not now — continue chatting
                  </button>
                </div>
                </div>
              )}

              {followupState === "confirmed" && (
                <p className="hero-ai__followup-line hero-ai__followup-line--confirmed">
                  ✓ We have your details{storedContact?.email ? ` (${storedContact.email})` : ""} — our team will follow up.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Input area ─────────────────────────────────────────────────── */}
      <div className="hero-ai__bottom">
        {!hasMessages && joinState === "hidden" && (
          <>
            <p className="hero-ai__chips-label">Where are you starting from?</p>
            <div className="hero-ai__chips" role="list">
              {AI_PROMPTS.map((p) => (
                <button key={p.id} type="button" role="listitem" className="hero-ai__chip"
                  onClick={() => sendMessage(p.text, p.engagementId)}>
                  {p.label}
                </button>
              ))}
            </div>
          </>
        )}

        <form
          className="hero-ai__input-row"
          onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={hasMessages ? "Ask a follow-up…" : "Ask Algovia AI anything about your project…"}
            className="hero-ai__input"
            readOnly={loading || streaming}
            autoComplete="off"
          />
          {loading || streaming ? (
            <button type="button" className="hero-ai__send hero-ai__send--stop" aria-label="Stop generating" onClick={stopGenerating}>
              <Square className="h-3.5 w-3.5" fill="currentColor" />
            </button>
          ) : (
            <button type="submit" disabled={!input.trim()} className="hero-ai__send" aria-label="Send">
              <ArrowUp className="h-4 w-4" />
            </button>
          )}
        </form>

        <p className="hero-ai__disclaimer">Algovia AI can make mistakes. Verify important details.</p>
      </div>
    </div>
  );
}
