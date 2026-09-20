import { randomUUID } from "node:crypto";
import { sql, ensureSchema } from "./db";

export interface ContactInput {
  name?: string;
  email: string;
  company?: string;
  phone?: string;
}

/** Insert-or-update a contact by email, returning its id. */
export async function upsertContact(input: ContactInput): Promise<string | null> {
  if (!sql) return null;
  await ensureSchema();

  const id = randomUUID();
  const rows = await sql`
    INSERT INTO contacts (id, email, name, company, phone)
    VALUES (${id}, ${input.email}, ${input.name ?? null}, ${input.company ?? null}, ${input.phone ?? null})
    ON CONFLICT (email) DO UPDATE SET
      name = COALESCE(EXCLUDED.name, contacts.name),
      company = COALESCE(EXCLUDED.company, contacts.company),
      phone = COALESCE(EXCLUDED.phone, contacts.phone),
      updated_at = now()
    RETURNING id
  `;
  return rows[0]?.id ?? null;
}
