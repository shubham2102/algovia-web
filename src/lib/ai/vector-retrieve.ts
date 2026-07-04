import type { KnowledgeChunk } from "./knowledge-corpus";

interface QdrantMatch {
  id: number;
  score: number;
  payload?: Record<string, string>;
}

async function embedQuery(text: string, apiKey: string): Promise<number[] | null> {
  try {
    const res = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model: "text-embedding-3-small", input: text }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const vec = data.data?.[0]?.embedding;
    return Array.isArray(vec) ? vec : null;
  } catch {
    return null;
  }
}

function qdrantHeaders(apiKey?: string): Record<string, string> {
  const h: Record<string, string> = { "Content-Type": "application/json" };
  if (apiKey) h["api-key"] = apiKey;
  return h;
}

/**
 * Semantic vector search via Qdrant.
 * Returns null if QDRANT_URL or OPENAI_API_KEY are missing — caller falls back to keyword scoring.
 * QDRANT_API_KEY is optional (not required for local / self-hosted Qdrant).
 */
export async function retrieveChunksVector(
  query: string,
  topK = 4,
): Promise<KnowledgeChunk[] | null> {
  const qdrantUrl  = process.env.QDRANT_URL;
  const qdrantKey  = process.env.QDRANT_API_KEY;            // optional
  const collection = process.env.QDRANT_COLLECTION ?? "algovia-knowledge";
  const openaiKey  = process.env.OPENAI_API_KEY;

  if (!qdrantUrl || !openaiKey) return null;

  const queryVector = await embedQuery(query, openaiKey);
  if (!queryVector) return null;

  try {
    const res = await fetch(
      `${qdrantUrl}/collections/${collection}/points/search`,
      {
        method: "POST",
        headers: qdrantHeaders(qdrantKey),
        body: JSON.stringify({ vector: queryVector, limit: topK, with_payload: true }),
      },
    );
    if (!res.ok) return null;

    const data = await res.json();
    const matches: QdrantMatch[] = data.result ?? [];
    if (matches.length === 0) return null;

    return matches
      .filter((m) => m.payload?.content)
      .map((m) => ({
        id:       m.payload!.id       ?? String(m.id),
        category: m.payload!.category ?? "general",
        title:    m.payload!.title    ?? String(m.id),
        content:  m.payload!.content,
        keywords: m.payload!.keywords
          ? m.payload!.keywords.split(",").map((k) => k.trim()).filter(Boolean)
          : [],
      }));
  } catch {
    return null;
  }
}
