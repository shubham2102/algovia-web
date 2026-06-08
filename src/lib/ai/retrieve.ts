import {
  KNOWLEDGE_CHUNKS,
  type KnowledgeChunk,
} from "./knowledge-corpus";
import type { Intent } from "./intent";

function scoreChunk(chunk: KnowledgeChunk, query: string): number {
  const q = query.toLowerCase();
  let score = 0;

  for (const kw of chunk.keywords) {
    if (q.includes(kw.toLowerCase())) score += 3;
  }

  const words = q.split(/\s+/).filter((w) => w.length > 3);
  for (const word of words) {
    if (chunk.content.toLowerCase().includes(word)) score += 1;
    if (chunk.title.toLowerCase().includes(word)) score += 2;
  }

  return score;
}

export function retrieveChunks(
  query: string,
  intent: Intent,
  topK = 4,
): KnowledgeChunk[] {
  const intentCategoryMap: Partial<Record<Intent, string[]>> = {
    architecture: ["architecture", "services"],
    services: ["services", "company"],
    lead: ["lead", "company"],
    industries: ["industries", "services"],
    general: ["company", "services"],
  };

  const preferred = intentCategoryMap[intent] ?? [];

  const scored = KNOWLEDGE_CHUNKS.map((chunk) => {
    let score = scoreChunk(chunk, query);
    if (preferred.includes(chunk.category)) score += 2;
    return { chunk, score };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return KNOWLEDGE_CHUNKS.slice(0, topK);
  }

  return scored.slice(0, topK).map((s) => s.chunk);
}

export function formatRetrievedContext(chunks: KnowledgeChunk[]): string {
  return chunks
    .map((c) => `[${c.title}]\n${c.content}`)
    .join("\n\n---\n\n");
}
