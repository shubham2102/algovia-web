import postgres from "postgres";

const connectionString = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;

// Lazily created — importing this module must not throw when no database is
// configured yet (e.g. local dev before the Vercel Postgres/Neon storage is
// connected). Callers should check `sql` for null and degrade gracefully.
// `ssl` is intentionally left unset — Vercel Postgres/Neon/Supabase connection
// strings already carry `?sslmode=require`, and postgres.js honors that.
export const sql = connectionString
  ? postgres(connectionString, { max: 5 })
  : null;

let schemaReady: Promise<void> | null = null;

/**
 * Normalized schema (see /docs or ask for the ER diagram):
 *   contacts      — one row per person, deduplicated by email
 *   sessions      — one row per browser (client-persisted id); tracks whether
 *                   the chat widget has already asked this visitor to share
 *                   contact details, so it never asks twice
 *   conversations — one row per chat thread (belongs to a session)
 *   messages      — one row per chat message (belongs to a conversation)
 *   leads         — careers / network / general contact-form submissions
 *   bookings      — Schedule-a-Meeting submissions
 *
 * Idempotent — safe to call on every cold start. `CREATE TABLE IF NOT EXISTS`
 * is cheap and this is memoized per warm instance.
 */
export function ensureSchema(): Promise<void> {
  if (!sql) return Promise.resolve();
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS contacts (
          id UUID PRIMARY KEY,
          email TEXT NOT NULL UNIQUE,
          name TEXT,
          company TEXT,
          phone TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS sessions (
          id UUID PRIMARY KEY,
          contact_id UUID REFERENCES contacts(id),
          contact_prompted_at TIMESTAMPTZ,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS conversations (
          id UUID PRIMARY KEY,
          session_id UUID REFERENCES sessions(id),
          contact_id UUID REFERENCES contacts(id),
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          last_intent TEXT,
          recommended_engagement TEXT
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS conversations_session_id_idx ON conversations(session_id)`;
      await sql`CREATE INDEX IF NOT EXISTS conversations_contact_id_idx ON conversations(contact_id)`;

      await sql`
        CREATE TABLE IF NOT EXISTS messages (
          id UUID PRIMARY KEY,
          conversation_id UUID NOT NULL REFERENCES conversations(id),
          role TEXT NOT NULL CHECK (role IN ('user','assistant')),
          content TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS messages_conversation_id_idx ON messages(conversation_id)`;

      await sql`
        CREATE TABLE IF NOT EXISTS leads (
          id UUID PRIMARY KEY,
          contact_id UUID REFERENCES contacts(id),
          conversation_id UUID REFERENCES conversations(id),
          kind TEXT NOT NULL CHECK (kind IN ('careers','network','contact')),
          details JSONB NOT NULL DEFAULT '{}',
          cv_url TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS leads_contact_id_idx ON leads(contact_id)`;

      await sql`
        CREATE TABLE IF NOT EXISTS bookings (
          id UUID PRIMARY KEY,
          contact_id UUID REFERENCES contacts(id),
          conversation_id UUID REFERENCES conversations(id),
          company_name TEXT,
          job_title TEXT,
          country TEXT,
          area_of_interest TEXT,
          meeting_format TEXT,
          message TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS bookings_contact_id_idx ON bookings(contact_id)`;
    })();
  }
  return schemaReady;
}
