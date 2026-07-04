export const ALGOVIA_KNOWLEDGE = `
Algovia is an AI-native engineering and consulting company. We help enterprises and ambitious startups design, build, and scale AI-native products and platforms.

Services:
- AI Strategy & Consulting: roadmaps, use-case discovery, ROI modeling
- AI Agents & Automation: LangGraph/CrewAI agents, copilots, workflow automation
- Product Engineering: full-stack, mobile, API-first platforms
- Cloud & DevOps: AWS, Kubernetes, CI/CD, observability
- Data & Analytics: data lakes, real-time pipelines, BI, vector/RAG systems
- Digital Transformation: legacy modernization, microservices, ERP/CRM integration

Industries: Retail/CPG, Financial Services, Industrial, Real Estate, Media.

Technology stack: Next.js, FastAPI/Node, LangGraph, OpenAI/Anthropic/Gemini, Milvus/pgvector, AWS.

Engagement CTAs: Talk to Algovia AI, Schedule Solution Workshop, Upload Requirements, Generate Architecture, Request Consultation.
`.trim();

export function getFallbackResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("marketplace") || q.includes("architecture")) {
    return `**AI Marketplace Architecture (high level)**

1. **Experience layer** — Next.js web/mobile, BFF APIs, auth (OIDC)
2. **Commerce core** — catalog, orders, payments, seller onboarding
3. **AI layer** — recommendation service, search (vector + keyword), pricing agent, fraud scoring
4. **Data** — event bus (Kafka), lakehouse, feature store, pgvector for RAG
5. **Ops** — AWS (EKS/Lambda), observability, CI/CD

Algovia typically phases this: discovery → MVP (8–12 weeks) → scale. Want a workshop to scope your domain?`;
  }

  if (q.includes("legacy") || q.includes("modernize")) {
    return `**Legacy modernization approach**

- Assess bounded contexts and strangler-fig migration paths
- Expose capabilities via APIs/events without big-bang rewrites
- Introduce AI incrementally: document RAG, ops copilots, decision agents
- Target cloud-native runtimes (containers/serverless) with strong observability

Algovia runs discovery workshops and builds incremental delivery roadmaps aligned to risk tolerance.`;
  }

  if (q.includes("fintech") || q.includes("mvp") || q.includes("team")) {
    return `**Fintech MVP team structure (typical)**

| Role | Count |
|------|-------|
| Product / BA | 1 |
| Tech lead / architect | 1 |
| Full-stack engineers | 2–3 |
| AI/ML engineer | 1 |
| DevOps | 0.5–1 |
| QA / security | 1 |

Timeline: 10–14 weeks for regulated MVP with KYC/payments integration. Algovia can staff a blended squad or augment your team.`;
  }

  if (q.includes("microservices") || q.includes("roadmap")) {
    return `**Microservices roadmap (phased)**

**Phase 1 (0–6 weeks):** Domain mapping, API contracts, CI/CD baseline  
**Phase 2 (6–14 weeks):** Extract 2–3 high-value services, event backbone  
**Phase 3 (14+ weeks):** Observability, SRE practices, platform team enablement  

Pair with API gateway, service mesh (optional), and golden-path templates.`;
  }

  if (q.includes("langgraph") || q.includes("agent")) {
    return `**Building AI agents with LangGraph**

1. Define state graph (nodes: retrieve, plan, act, verify)
2. Tool bindings (APIs, DB, internal docs via RAG)
3. Human-in-the-loop checkpoints for high-risk actions
4. Eval harness + tracing (LangSmith/OpenTelemetry)
5. Deploy on FastAPI/Node with queue for long tasks

Algovia ships production agent patterns with enterprise security and audit trails.`;
  }

  if (q.includes("saudi") || q.includes("cloud")) {
    return `**Saudi fintech cloud architecture**

- Prefer **AWS Bahrain (me-south-1)** or in-Kingdom options per data residency
- Multi-AZ VPC, private subnets for workloads, WAF + CloudFront
- PCI-aligned payment isolation, KMS encryption, IAM least privilege
- Arabic/English UX, SAMA-aligned logging and retention

Algovia has experience with regional compliance and hybrid enterprise integrations.`;
  }

  return `Algovia builds **AI-native products**, **agentic automation**, and **cloud platforms** for enterprises and startups. Ask about architecture, team sizing, cloud design, or a specific industry — or try one of the suggested prompts.`;
}
