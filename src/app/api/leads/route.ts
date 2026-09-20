import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { mkdir, appendFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";
import { sql, ensureSchema } from "@/lib/db";
import { upsertContact } from "@/lib/contacts";
import { linkSessionContact } from "@/lib/sessions";
import { linkConversationContact } from "@/lib/conversations";

const DATA_DIR = path.join(process.cwd(), "data");
const UPLOADS_DIR = path.join(DATA_DIR, "uploads");
const LEADS_FILE = path.join(DATA_DIR, "leads.jsonl");

const REQUIRED_FIELDS: Record<string, string[]> = {
  careers: ["fullName", "email", "expertise"],
  network: ["fullName", "email", "expertise"],
  contact: ["name", "email", "message"],
  schedule: ["fullName", "workEmail", "companyName"],
  chat: ["name", "email"],
};

// Which submitted fields become columns on `contacts` (name/email/company/phone
// — spelled differently per form) rather than being duplicated into `details`.
const CONTACT_FIELD_MAP: Record<string, { name?: string; email: string; company?: string; phone?: string }> = {
  careers: { name: "fullName", email: "email", phone: "phone" },
  network: { name: "fullName", email: "email", phone: "phone" },
  contact: { name: "name", email: "email", company: "company" },
  schedule: { name: "fullName", email: "workEmail", company: "companyName" },
  chat: { name: "name", email: "email", company: "company", phone: "phone" },
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
// A Blob store can be connected via a static token (BLOB_READ_WRITE_TOKEN) or,
// as of the newer Vercel storage flow, via ambient OIDC credentials — in that
// mode there's no static token, just BLOB_STORE_ID + the platform-injected
// VERCEL_OIDC_TOKEN, and @vercel/blob's `put()` picks both up automatically.
const hasBlobStore = Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-120);
}

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const formType = String(formData.get("formType") ?? "");
  const requiredFields = REQUIRED_FIELDS[formType];

  if (!requiredFields) {
    return NextResponse.json({ error: "Unknown form type." }, { status: 400 });
  }

  for (const field of requiredFields) {
    const value = formData.get(field);
    if (!value || (typeof value === "string" && value.trim() === "")) {
      return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
    }
  }

  const conversationId = String(formData.get("conversationId") ?? "") || null;
  const sessionId = String(formData.get("sessionId") ?? "") || null;
  const record: Record<string, unknown> = {};
  let cvUrl: string | null = null;

  try {
    for (const [key, value] of formData.entries()) {
      if (key === "formType" || key === "conversationId" || key === "sessionId") continue;

      if (value instanceof File) {
        if (value.size === 0) continue;
        if (value.size > MAX_FILE_SIZE) {
          return NextResponse.json({ error: `${key} exceeds the 10MB upload limit.` }, { status: 400 });
        }
        cvUrl = await storeUpload(value);
      } else {
        record[key] = value;
      }
    }

    if (sql) {
      await ensureSchema();

      const fieldMap = CONTACT_FIELD_MAP[formType];
      const contactId = await upsertContact({
        email: String(record[fieldMap.email] ?? ""),
        name: fieldMap.name ? (record[fieldMap.name] as string | undefined) : undefined,
        company: fieldMap.company ? (record[fieldMap.company] as string | undefined) : undefined,
        phone: fieldMap.phone ? (record[fieldMap.phone] as string | undefined) : undefined,
      });

      // Fields already promoted to `contacts` columns don't need duplicating
      // into the JSONB `details` blob.
      const promotedKeys = new Set(Object.values(fieldMap));
      const details: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(record)) {
        if (!promotedKeys.has(key)) details[key] = value;
      }

      if (formType === "schedule") {
        const id = randomUUID();
        await sql`
          INSERT INTO bookings (id, contact_id, conversation_id, company_name, job_title, country, area_of_interest, meeting_format, message)
          VALUES (${id}, ${contactId}, ${conversationId}, ${(record.companyName as string) ?? null}, ${(record.jobTitle as string) ?? null}, ${(record.country as string) ?? null}, ${(record.areaOfInterest as string) ?? null}, ${(record.meetingFormat as string) ?? null}, ${(record.message as string) ?? null})
        `;
      } else if (formType === "chat") {
        // Chat contact-share isn't a distinct lead/booking — it just identifies
        // who's on the other end of an existing conversation.
        if (contactId && sessionId) await linkSessionContact(sessionId, contactId);
        if (contactId && conversationId) await linkConversationContact(conversationId, contactId);
      } else {
        const id = randomUUID();
        await sql`
          INSERT INTO leads (id, contact_id, conversation_id, kind, details, cv_url)
          VALUES (${id}, ${contactId}, ${conversationId}, ${formType}, ${JSON.stringify(details)}::jsonb, ${cvUrl})
        `;
      }

      if (formType !== "chat" && contactId && sessionId) {
        await linkSessionContact(sessionId, contactId);
      }
    } else {
      // No database configured yet — fall back to a local JSONL log so
      // dev/testing keeps working. Wire up Vercel Postgres before deploying.
      await mkdir(DATA_DIR, { recursive: true });
      await appendFile(
        LEADS_FILE,
        JSON.stringify({ formType, submittedAt: new Date().toISOString(), conversationId, sessionId, cvUrl, ...record }) + "\n",
        "utf8",
      );
    }
  } catch (err) {
    console.error("Failed to store lead submission:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

async function storeUpload(file: File): Promise<string> {
  const storedName = `${Date.now()}-${randomUUID()}-${sanitizeFilename(file.name)}`;

  if (hasBlobStore) {
    const blob = await put(`uploads/${storedName}`, file, { access: "public" });
    return blob.url;
  }

  // Local fallback for dev without Vercel Blob configured — note this does
  // NOT persist on Vercel's serverless filesystem in production.
  await mkdir(UPLOADS_DIR, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOADS_DIR, storedName), buffer);
  return `/data/uploads/${storedName}`;
}
