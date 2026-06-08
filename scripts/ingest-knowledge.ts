#!/usr/bin/env npx tsx
/**
 * Knowledge ingestion script for Algovia RAG pipeline.
 *
 * MVP: exports chunked corpus to JSON for keyword retrieval.
 * Phase 2: embed chunks with OpenAI and store in pgvector.
 *
 * Usage:
 *   npm run ingest:knowledge
 *   npm run ingest:knowledge -- --embed   # requires OPENAI_API_KEY + DATABASE_URL
 */

import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { KNOWLEDGE_CHUNKS } from "../src/lib/ai/knowledge-corpus";

const outPath = join(process.cwd(), "data", "knowledge-index.json");

async function main() {
  const embed = process.argv.includes("--embed");

  if (embed) {
    const apiKey = process.env.OPENAI_API_KEY;
    const dbUrl = process.env.DATABASE_URL;

    if (!apiKey || !dbUrl) {
      console.error(
        "Embedding mode requires OPENAI_API_KEY and DATABASE_URL. Exporting JSON only.",
      );
    } else {
      console.log(
        "pgvector ingestion is configured for Phase 2. Use DATABASE_URL with Supabase/Neon.",
      );
    }
  }

  mkdirSync(dirname(outPath), { recursive: true });

  writeFileSync(
    outPath,
    JSON.stringify(
      {
        version: 1,
        model: process.env.EMBEDDING_MODEL ?? "text-embedding-3-small",
        chunkCount: KNOWLEDGE_CHUNKS.length,
        chunks: KNOWLEDGE_CHUNKS,
        generatedAt: new Date().toISOString(),
      },
      null,
      2,
    ),
  );

  console.log(`Exported ${KNOWLEDGE_CHUNKS.length} chunks → ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
