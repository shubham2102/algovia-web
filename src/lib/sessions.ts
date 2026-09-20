import { sql, ensureSchema } from "./db";

export interface SessionStatus {
  contactId: string | null;
  alreadyPrompted: boolean;
}

/** Upserts the session row (client-persisted id) and reports its follow-up state. */
export async function touchSession(sessionId: string): Promise<SessionStatus> {
  if (!sql) return { contactId: null, alreadyPrompted: false };
  await ensureSchema();

  const rows = await sql`
    INSERT INTO sessions (id)
    VALUES (${sessionId})
    ON CONFLICT (id) DO UPDATE SET last_seen_at = now()
    RETURNING contact_id, contact_prompted_at
  `;
  const row = rows[0];
  return {
    contactId: row?.contact_id ?? null,
    alreadyPrompted: Boolean(row?.contact_prompted_at),
  };
}

/** Marks that the chat widget has offered the contact-share prompt this session — never ask again. */
export async function markContactPrompted(sessionId: string): Promise<void> {
  if (!sql) return;
  await sql`
    UPDATE sessions SET contact_prompted_at = now()
    WHERE id = ${sessionId} AND contact_prompted_at IS NULL
  `;
}

/** Links a shared contact to the session (also counts as "prompted"). */
export async function linkSessionContact(sessionId: string, contactId: string): Promise<void> {
  if (!sql) return;
  await sql`
    UPDATE sessions
    SET contact_id = ${contactId}, contact_prompted_at = COALESCE(contact_prompted_at, now())
    WHERE id = ${sessionId}
  `;
}
