import { randomUUID } from "node:crypto";
import { sql, ensureSchema } from "./db";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/** Returns a valid conversation id, creating a new row (tied to the session) if `id` is missing/unknown. */
export async function getOrCreateConversation(
  id: string | null | undefined,
  sessionId: string | null,
): Promise<string | null> {
  if (!sql) return null;
  await ensureSchema();

  if (id) {
    const rows = await sql`SELECT id FROM conversations WHERE id = ${id}`;
    if (rows.length > 0) return id;
  }

  const newId = randomUUID();
  await sql`INSERT INTO conversations (id, session_id) VALUES (${newId}, ${sessionId})`;
  return newId;
}

export async function appendMessage(
  conversationId: string,
  role: ChatMessage["role"],
  content: string,
): Promise<void> {
  if (!sql) return;
  const id = randomUUID();
  await sql`
    INSERT INTO messages (id, conversation_id, role, content)
    VALUES (${id}, ${conversationId}, ${role}, ${content})
  `;
  await sql`UPDATE conversations SET updated_at = now() WHERE id = ${conversationId}`;
}

export async function updateConversationMeta(
  id: string,
  opts: { intent?: string; engagement?: string },
): Promise<void> {
  if (!sql) return;
  await sql`
    UPDATE conversations
    SET last_intent = COALESCE(${opts.intent ?? null}, last_intent),
        recommended_engagement = COALESCE(${opts.engagement ?? null}, recommended_engagement)
    WHERE id = ${id}
  `;
}

export async function linkConversationContact(conversationId: string, contactId: string): Promise<void> {
  if (!sql) return;
  await sql`UPDATE conversations SET contact_id = ${contactId} WHERE id = ${conversationId}`;
}

/** Pulls a `?engagement=<id>` (or `#schedule?engagement=<id>`) reference out of assistant text, if present. */
export function extractRecommendedEngagement(text: string): string | undefined {
  const match = text.match(/engagement=(\d{2})/);
  return match?.[1];
}
