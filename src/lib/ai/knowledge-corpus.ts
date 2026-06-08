export interface KnowledgeChunk {
  id: string;
  category: string;
  title: string;
  content: string;
  keywords: string[];
}

export const KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
  {
    id: "overview",
    category: "company",
    title: "Algovia Overview",
    content:
      "Algovia is an AI-native engineering and consulting company. We help enterprises and ambitious startups design, build, and scale AI-native products and platforms from strategy to production.",
    keywords: ["algovia", "company", "about", "who", "what"],
  },
  {
    id: "services-strategy",
    category: "services",
    title: "AI Strategy & Consulting",
    content:
      "Algovia provides AI strategy and consulting: roadmaps, use-case discovery, ROI modeling, and executive workshops. We help identify high-impact AI opportunities aligned to business outcomes.",
    keywords: ["strategy", "consulting", "roadmap", "workshop", "discovery"],
  },
  {
    id: "services-agents",
    category: "services",
    title: "AI Agents & Automation",
    content:
      "Algovia builds AI agents and copilots using LangGraph, CrewAI, and enterprise guardrails. Agentic systems handle complex workflows with human-in-the-loop checkpoints, tracing, and audit trails.",
    keywords: ["agent", "langgraph", "automation", "copilot", "agentic"],
  },
  {
    id: "services-engineering",
    category: "services",
    title: "Product Engineering",
    content:
      "End-to-end product engineering: full-stack development, mobile apps, API-first platforms, and AI-native architecture. Typical MVP timeline is 10-14 weeks for regulated fintech with KYC/payments.",
    keywords: ["product", "engineering", "mvp", "development", "full-stack"],
  },
  {
    id: "services-cloud",
    category: "services",
    title: "Cloud & DevOps",
    content:
      "Cloud and DevOps on AWS: Kubernetes, serverless, CI/CD, observability, and SRE practices. Algovia recommends multi-AZ VPC, WAF, KMS encryption, and IAM least privilege for enterprise workloads.",
    keywords: ["cloud", "devops", "aws", "kubernetes", "ci/cd", "infrastructure"],
  },
  {
    id: "services-data",
    category: "services",
    title: "Data & Analytics",
    content:
      "Data engineering: data lakes, real-time pipelines, BI, vector databases (pgvector, Milvus), and RAG pipelines for enterprise knowledge retrieval.",
    keywords: ["data", "analytics", "rag", "vector", "pipeline", "lake"],
  },
  {
    id: "services-legacy",
    category: "services",
    title: "Legacy Modernization",
    content:
      "Legacy modernization using strangler-fig migration, API-first extraction, and incremental AI adoption. Algovia avoids big-bang rewrites and delivers incremental value with bounded contexts.",
    keywords: ["legacy", "modernize", "modernization", "migrate", "erp", "monolith"],
  },
  {
    id: "architecture-marketplace",
    category: "architecture",
    title: "AI Marketplace Architecture",
    content:
      "AI marketplace architecture: Experience layer (Next.js, BFF, OIDC) → Commerce core (catalog, orders, payments) → AI layer (recommendations, vector search, pricing agent, fraud) → Data (Kafka, lakehouse, pgvector) → Ops (AWS EKS, observability, CI/CD). MVP phase: 8-12 weeks.",
    keywords: ["marketplace", "architecture", "ecommerce", "commerce"],
  },
  {
    id: "architecture-microservices",
    category: "architecture",
    title: "Microservices Roadmap",
    content:
      "Microservices roadmap: Phase 1 (0-6 weeks) domain mapping, API contracts, CI/CD. Phase 2 (6-14 weeks) extract 2-3 high-value services, event backbone. Phase 3 (14+ weeks) observability, SRE, platform team enablement.",
    keywords: ["microservices", "roadmap", "phase", "services", "api"],
  },
  {
    id: "architecture-saudi",
    category: "architecture",
    title: "Saudi Fintech Cloud",
    content:
      "Saudi fintech cloud: AWS Bahrain (me-south-1) or in-Kingdom options per data residency. Multi-AZ VPC, WAF, CloudFront, PCI-aligned payment isolation, KMS, SAMA-aligned logging. Arabic/English UX required.",
    keywords: ["saudi", "fintech", "bahrain", "sama", "compliance", "me-south"],
  },
  {
    id: "team-fintech",
    category: "delivery",
    title: "Fintech MVP Team Structure",
    content:
      "Fintech MVP team: Product/BA (1), Tech lead (1), Full-stack engineers (2-3), AI/ML engineer (1), DevOps (0.5-1), QA/Security (1). Timeline: 10-14 weeks for regulated MVP with KYC and payments integration.",
    keywords: ["team", "fintech", "mvp", "structure", "size", "estimate"],
  },
  {
    id: "industries-retail",
    category: "industries",
    title: "Retail / CPG",
    content:
      "Retail AI: demand prediction, inventory optimization, personalized customer experiences. Algovia has 75+ retail locations worldwide in client deployments.",
    keywords: ["retail", "cpg", "inventory", "demand"],
  },
  {
    id: "industries-fintech",
    category: "industries",
    title: "Financial Services",
    content:
      "Financial services AI: compliance automation, real-time risk monitoring, intelligent case management. 70% smarter workflows achieved in client engagements.",
    keywords: ["fintech", "financial", "banking", "compliance", "risk"],
  },
  {
    id: "engagement",
    category: "lead",
    title: "Engagement & CTAs",
    content:
      "Engagement options: Talk to Algovia AI, Schedule Solution Workshop, Upload Requirements, Generate Architecture, Request Consultation. Contact our experts for scoped engagements and discovery workshops.",
    keywords: ["contact", "workshop", "consultation", "hire", "engage", "lead", "quote"],
  },
];
