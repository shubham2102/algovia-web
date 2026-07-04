#!/usr/bin/env npx tsx
/**
 * Knowledge ingestion script for Algovia RAG pipeline.
 *
 * Reads all *.md files from /knowledge at the project root.
 * Each file must have YAML frontmatter:
 *
 *   ---
 *   id: unique-slug
 *   category: company | services | industries | platform | resources | lead
 *   title: Human-readable title
 *   keywords: comma, separated, terms
 *   ---
 *
 *   Body content here...
 *
 * Stakeholders: edit files in /knowledge on GitHub, push → Vercel rebuilds.
 *
 * Output: data/knowledge-index.json — read by knowledge-corpus.ts at runtime.
 *
 * Usage:
 *   npm run ingest:knowledge
 *   npm run ingest:knowledge -- --embed   # Embed chunks into Qdrant (Voyage AI or OpenAI)
 *
 * Embedding providers (in priority order):
 *   1. Voyage AI  — set VOYAGE_API_KEY (voyage-3-lite, 512 dims, 50M free tokens)
 *   2. OpenAI     — set OPENAI_API_KEY (text-embedding-3-small, 1536 dims)
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";

// tsx doesn't load .env.local automatically — parse it here so env vars are available
(function loadEnvLocal() {
  const envPath = join(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf-8").split(/\r?\n/)) {
    const clean = line.trim();
    if (!clean || clean.startsWith("#")) continue;
    const eq = clean.indexOf("=");
    if (eq === -1) continue;
    const key = clean.slice(0, eq).trim();
    const raw = clean.slice(eq + 1).trim();
    const val = /^["'].*["']$/.test(raw) ? raw.slice(1, -1) : raw;
    if (key && !(key in process.env)) process.env[key] = val;
  }
})();

interface KnowledgeChunk {
  id: string;
  category: string;
  title: string;
  content: string;
  keywords: string[];
}

function parseFrontmatter(raw: string): { frontmatter: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match || !match[1] || !match[2]) return { frontmatter: {}, body: raw.trim() };
  const fm: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const val = line.slice(colonIdx + 1).trim();
    if (key) fm[key] = val;
  }
  return { frontmatter: fm, body: match[2].trim() };
}

function parseChunk(filename: string, raw: string): KnowledgeChunk | null {
  const { frontmatter, body } = parseFrontmatter(raw);
  if (!body) { console.warn(`  ⚠  ${filename}: empty body — skipping`); return null; }
  const keywordsRaw = frontmatter["keywords"] ?? "";
  return {
    id:       frontmatter["id"]       ?? filename.replace(/\.md$/, ""),
    category: frontmatter["category"] ?? "general",
    title:    frontmatter["title"]    ?? filename.replace(/\.md$/, ""),
    content:  body,
    keywords: keywordsRaw.split(",").map((k) => k.trim()).filter(Boolean),
  };
}

async function main() {
  const embed = process.argv.includes("--embed");
  const knowledgeDir = join(process.cwd(), "knowledge");
  const outPath = join(process.cwd(), "data", "knowledge-index.json");

  console.log("📚  Algovia knowledge ingestion");
  console.log(`    Source : ${knowledgeDir}`);
  console.log(`    Output : ${outPath}\n`);

  let files: string[];
  try {
    files = readdirSync(knowledgeDir).filter((f) => f.endsWith(".md"));
  } catch {
    console.error(`❌  Cannot read /knowledge directory. Create it at the project root with *.md files.`);
    process.exit(1);
  }

  if (files.length === 0) {
    console.error("❌  No .md files found in /knowledge.");
    process.exit(1);
  }

  const chunks: KnowledgeChunk[] = [];
  for (const file of files.sort()) {
    const raw = readFileSync(join(knowledgeDir, file), "utf-8");
    const chunk = parseChunk(file, raw);
    if (chunk) {
      chunks.push(chunk);
      console.log(`    ✓  ${file.padEnd(32)} [${chunk.category}] ${chunk.title}`);
    }
  }

  if (embed) {
    const openaiKey  = process.env.OPENAI_API_KEY;
    const qdrantUrl  = process.env.QDRANT_URL;
    const qdrantKey  = process.env.QDRANT_API_KEY;           // optional for self-hosted
    const collection = process.env.QDRANT_COLLECTION ?? "algovia-knowledge";

    if (!openaiKey || !qdrantUrl) {
      console.warn("\n    ⚠  Embedding requires OPENAI_API_KEY + QDRANT_URL — writing JSON only.");
    } else {
      const qdrantHeaders: Record<string, string> = { "Content-Type": "application/json" };
      if (qdrantKey) qdrantHeaders["api-key"] = qdrantKey;

      // ── 1. Ensure the collection exists (dimension 1536 = text-embedding-3-small) ──
      console.log(`\n    Creating Qdrant collection "${collection}" if needed…`);
      const createRes = await fetch(`${qdrantUrl}/collections/${collection}`, {
        method: "PUT",
        headers: qdrantHeaders,
        body: JSON.stringify({ vectors: { size: 1536, distance: "Cosine" } }),
      });
      // 409 / 400 means it already exists — not an error
      if (!createRes.ok && createRes.status !== 400 && createRes.status !== 409) {
        console.error(`    ❌  Qdrant collection creation failed: ${createRes.status} ${await createRes.text()}`);
      } else {
        console.log(`    ✓  Collection ready`);
      }

      // ── 2. Batch embed all chunks in one OpenAI request ──
      console.log("    Embedding chunks with text-embedding-3-small…");
      const embedRes = await fetch("https://api.openai.com/v1/embeddings", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${openaiKey}` },
        body: JSON.stringify({
          model: "text-embedding-3-small",
          input: chunks.map((c) => `${c.title}\n\n${c.content}`),
        }),
      });

      if (!embedRes.ok) {
        console.error(`    ❌  OpenAI embedding failed: ${embedRes.status} ${await embedRes.text()}`);
      } else {
        const embedData = await embedRes.json();

        // ── 3. Upsert points to Qdrant (integer IDs, payload holds the metadata) ──
        const points = chunks.map((chunk, i) => ({
          id: i,                                    // Qdrant requires uint or UUID
          vector: embedData.data[i].embedding as number[],
          payload: {
            id:       chunk.id,
            category: chunk.category,
            title:    chunk.title,
            content:  chunk.content,
            keywords: chunk.keywords.join(","),
          },
        }));

        const upsertRes = await fetch(`${qdrantUrl}/collections/${collection}/points`, {
          method: "PUT",
          headers: qdrantHeaders,
          body: JSON.stringify({ points }),
        });

        if (upsertRes.ok) {
          console.log(`    ✓  Upserted ${points.length} vectors → Qdrant (${collection})`);
        } else {
          console.error(`    ❌  Qdrant upsert failed: ${upsertRes.status} ${await upsertRes.text()}`);
        }
      }
    }
  }

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify({
    version:     2,
    chunkCount:  chunks.length,
    generatedAt: new Date().toISOString(),
    chunks,
  }, null, 2));

  console.log(`\n✅  ${chunks.length} chunks → ${outPath}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
