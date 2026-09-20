import { existsSync, readFileSync } from "fs";
import { join } from "path";

export interface KnowledgeChunk {
  id: string;
  category: string;
  title: string;
  content: string;
  keywords: string[];
}

// Hardcoded fallback — used only if knowledge-index.json hasn't been generated yet.
// Run `npm run ingest:knowledge` to rebuild from /knowledge/*.md
const FALLBACK_CHUNKS: KnowledgeChunk[] = [
  {
    id: "overview",
    category: "company",
    title: "Algovia Overview",
    content: "Algovia AI is a leading AI Transformation and Execution firm that helps organizations move from strategy to execution, adoption, and measurable value, working primarily with Boards and Executive teams across governments and enterprises in the UAE, KSA, Europe, and Australia.",
    keywords: ["algovia", "company", "about", "who", "what"],
  },
  {
    id: "services",
    category: "services",
    title: "Algovia Services",
    content: "Algovia's Service Portfolio spans AI & Digital Solutions (AI Strategy, Artificial Intelligence, Computer Vision, Software Development, Data Engineering & Analytics, IoT & Embedded Systems) and Intelligent Business Solutions (Strategy & Operating Model, Governance/Risk/Compliance, Cost Optimization, Business Transformation, Capital Markets Solutions, Internal Audit & ICFR).",
    keywords: ["services", "strategy", "consulting", "governance", "data", "engineering"],
  },
  {
    id: "engagement",
    category: "lead",
    title: "Engagement & CTAs",
    content: "Engagement options: Talk to Algovia AI, or Schedule a Meeting to discuss one of Algovia's seven engagement models (AI Value Discovery Sprint, AI Training Sprint, AI Transformation Roadmap, AI Proof of Value & Solution Build, Business Transformation & Change Management, AI Governance/Risk/Compliance Management, AI Adoption & Value Realization Office).",
    keywords: ["contact", "workshop", "consultation", "hire", "engage", "lead", "quote", "get started", "schedule"],
  },
];

function loadChunks(): KnowledgeChunk[] {
  try {
    const indexPath = join(process.cwd(), "data", "knowledge-index.json");
    if (existsSync(indexPath)) {
      const parsed = JSON.parse(readFileSync(indexPath, "utf-8")) as {
        chunks?: KnowledgeChunk[];
      };
      if (Array.isArray(parsed.chunks) && parsed.chunks.length > 0) {
        return parsed.chunks;
      }
    }
  } catch {
    // Fall through to hardcoded fallback
  }
  return FALLBACK_CHUNKS;
}

export const KNOWLEDGE_CHUNKS: KnowledgeChunk[] = loadChunks();
