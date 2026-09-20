"use client";

// Client-only helpers for the homepage chat widget: a persistent per-browser
// session id (sent to /api/chat and /api/leads so the server can recognize
// returning visitors and never ask for contact details twice), plus a local
// mirror of "have we already resolved the follow-up prompt" and "what contact
// info did they already share" so the UI behaves correctly even before the
// server round-trip confirms it (and even if no database is configured yet).

const SESSION_ID_KEY = "algovia_session_id";
const CONTACT_KEY = "algovia_contact";
const FOLLOWUP_RESOLVED_KEY = "algovia_followup_resolved";

export interface StoredContact {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
}

function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Private browsing / storage disabled — degrade to session-only behavior.
  }
}

export function getOrCreateSessionId(): string {
  const existing = safeGet(SESSION_ID_KEY);
  if (existing) return existing;
  const created = crypto.randomUUID();
  safeSet(SESSION_ID_KEY, created);
  return created;
}

export function getStoredContact(): StoredContact | null {
  const raw = safeGet(CONTACT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredContact;
  } catch {
    return null;
  }
}

export function storeContact(contact: StoredContact): void {
  safeSet(CONTACT_KEY, JSON.stringify(contact));
}

export function isFollowupResolved(): boolean {
  return safeGet(FOLLOWUP_RESOLVED_KEY) === "1";
}

export function markFollowupResolved(): void {
  safeSet(FOLLOWUP_RESOLVED_KEY, "1");
}
