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
    content: "Algovia is an AI-native engineering and consulting company. We help enterprises and ambitious startups design, build, and scale AI-native products and platforms from strategy to production.",
    keywords: ["algovia", "company", "about", "who", "what"],
  },
  {
    id: "services",
    category: "services",
    title: "Algovia Services",
    content: "Algovia delivers: AI Strategy & Consulting, AI Agents & Automation (LangGraph, CrewAI), Product Engineering, Cloud & DevOps (AWS, Kubernetes), Data Engineering, and Digital Transformation / Legacy Modernization.",
    keywords: ["services", "strategy", "consulting", "agents", "cloud", "devops", "data", "engineering"],
  },
  {
    id: "engagement",
    category: "lead",
    title: "Engagement & CTAs",
    content: "Engagement options: Talk to Algovia AI, Schedule Solution Workshop, Upload Requirements, Generate Architecture, Request Consultation. Discovery workshops are free and produce a written engagement outline.",
    keywords: ["contact", "workshop", "consultation", "hire", "engage", "lead", "quote", "get started", "pricing"],
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
