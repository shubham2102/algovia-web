export const ALGOVIA_KNOWLEDGE = `
Algovia AI is a leading AI Transformation and Execution firm that helps organizations move from strategy to execution, adoption, and measurable value. We combine senior business transformation expertise with AI build capability to deliver solutions embedded into operating models, workflows, governance, and performance management.

We are not a traditional consultancy. We are not a software vendor. We are the partner that connects both, and stays accountable until AI becomes business as usual.

Algovia AI works primarily with Boards and Executive teams across governments and enterprises in the UAE, the Kingdom of Saudi Arabia, Europe, and Australia, backed by an international network of AI and industry experts, and delivered through an advisory, implementation, and value-realization engagement model.

Founded by: Business transformation executives & AI builders
Markets: UAE · KSA · Europe · Australia
Primary clients: Boards & Executives across governments and enterprises
Engagement model: Advisory, implementation & value realization
Partnership network: International network of AI & industry experts (700+ professionals)

Vision: To lead globally in intelligent AI execution, enabling people and industries to operate with greater impact, agility, and autonomy.

Mission: We create competitive advantage through AI-driven execution that combines deep research, industry expertise, and the activation of organizational knowledge to deliver innovation, agility, and measurable impact at scale.

Value Proposition:
Most firms stop at strategy or software. Algovia combines business transformation expertise, deep operational understanding, and proven AI execution to embed intelligent AI into the decisions, workflows, and operating models that drive real performance.

The AI Value Gap — 5 common failure modes Algovia solves:
1. Ambition without Prioritization: Algovia structures and prioritizes use-cases, tying them directly to business targets.
2. Technology without Foundations: Algovia diagnoses data & infrastructure readiness before any AI build begins.
3. Pilots without Adoption: Algovia embeds change management, business ownership & process redesign into solutions.
4. Advice without Accountability: Algovia bridges the gap, remaining accountable for delivery, adoption, and measurable outcomes.
5. Impact without Measurement: Algovia anchors engagements in client targets and KPIs to ensure impact is realized and sustained.

AI & Digital Solutions:
- AI Strategy: AI Strategic Initiatives & Roadmap, AI Solution Scoping
- Artificial Intelligence: Agentic AI, Generative AI, Machine Learning, AI Consulting, Agentic AI Security & Governance
- Computer Vision: Object Detection, Image & Video Analysis, Quality Inspection, Industrial Automation
- Software Development: Enterprise Platforms, Cloud-Native Applications, Back & Front-End Development, Mobile Applications
- Data Engineering & Analytics: Data Platforms, Business Intelligence, Predictive Analytics, Data Science, Automated Doc & CAD Analysis
- IoT & Embedded Systems: Custom Hardware & Firmware, Internet of Things, On-board / Edge Processing, Connectivity & Sensors

Intelligent Business Solutions:
- Strategy & Operating Model: Business & Digital Strategy, SMO & PMO, Operating Model Development & Transformation
- Governance, Risk & Compliance (GRC): Corporate Governance, Risk Management, Compliance Management, Policies & Procedures
- Cost Optimization: AI-Enabled Cost Optimization Assessment & Solutions
- Business Transformation: Business Process Transformation, Customer Experience Transformation
- Capital Markets Solutions: IPO Readiness Assessment, IPO GRC Framework Implementation
- Internal Audit & ICFR: AI-Enabled Internal Audit Services, Digitized ICFR Services

Seven Engagement Models (Let's Engage):
01. AI Value Discovery Sprint (2–3 Weeks): Executive diagnostic & 2–3 prioritized use cases → A business case leadership can act on.
02. AI Training Sprint (1–2 Weeks): Role-based AI training → Teams that can use AI, not just talk about it.
03. AI Transformation Roadmap (Strategic Engagement): Maturity diagnostic, use-case prioritization, AI roadmap & change plan → An AI roadmap tied to budget, timeline and named owners.
04. AI Proof of Value & Solution Build (Build Engagement): AI solution design, agile build & testing, business integration → An AI solution live in your operating environment.
05. Business Transformation & Change Management (Advisory Engagement): Operating model and business process diagnostic and transformation → Enhanced operating model and lean business processes.
06. AI Governance, Risk and Compliance Management (Advisory Engagement): AI risk, governance and compliance framework, controls mapping → Governance that regulators and boards can rely on.
07. AI Adoption & Value Realization Office (Managed Service): AI adoption monitoring, KPI dashboards, continuous optimization → Value measured, sustained & scaled long after go-live.

Industries served: Government & Public Sector, Financial Services, Energy (Oil & Gas, Mining, Power & Utility), Technology, Media & Telecommunications, Real Estate, Healthcare, Education, Transport & Aviation, Retail & Manufacturing.

Selected Success Stories:
- TalkTwelve (Technology/Legal): Cut legal intake time from 60+ minutes to ~12 minutes with a conversational AI agent.
- Eazli (Real Estate): Multi-agent AI marketplace for KSA property — enabled new services without rebuilding the core.
- STIHL (Manufacturing): Enterprise-wide Agentic AI governance strategy across SAP, Databricks, and Azure.
- Prohan (Manufacturing): Computer vision detects 90% of wood furniture defects, eliminating €40K monthly loss.
- Kinage (Financial Services): AI personal-finance MVP with bill parsing, classification, and anomaly detection.
- Mayo Clinic (Healthcare): Silver Medal (46th/896 teams) on Kaggle for stroke etiology classification.
- Komatsu (Retail & Manufacturing): Drone-based forest mapping with 3D surface reconstruction and tree characterization.

Schedule a Meeting: Every engagement starts with a conversation about the outcome you are aiming to achieve, not a generic sales call.
`.trim();

export function getFallbackResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("where to start") || q.includes("don't know") || q.includes("beginning")) {
    return `**Getting started with AI at Algovia**

The right starting point is our **AI Value Discovery Sprint** (2–3 weeks):
- An executive diagnostic workshop to identify where AI creates the most value
- 2–3 prioritized use cases with a business case leadership can act on
- No slide decks — just a prioritized plan tied to your targets

We work with Boards and Executive teams in the UAE, KSA, Europe, and Australia. Would you like to schedule a conversation?`;
  }

  if (q.includes("pilot") || q.includes("scale") || q.includes("proof of concept")) {
    return `**AI pilots that never scaled — a common challenge**

This is one of the five failure modes Algovia is built to solve: **Pilots without Adoption**.

AI initiatives stall at proof of concept when they aren't embedded into workflows, roles, or governance. Algovia addresses this with:
- **AI Transformation Roadmap** — maturity diagnostic + change plan
- **AI Proof of Value & Solution Build** — agile build with business integration
- **Business Transformation & Change Management** — operating model and process redesign for effective adoption
- **AI Adoption & Value Realization Office** — ongoing monitoring and optimization

Would you like to explore which engagement model fits your situation?`;
  }

  if (q.includes("governance") || q.includes("risk") || q.includes("grc") || q.includes("compliance")) {
    return `**AI Governance, Risk and Compliance Management**

Algovia offers a dedicated **AI Governance, Risk and Compliance Management** engagement:
- AI risk, governance and compliance framework and controls mapping
- Maintains accountability and ethical standards boards and regulators expect

We also offer **Governance, Risk & Compliance (GRC)** as a standalone service: Corporate Governance, Risk Management, Compliance Management, and Policies & Procedures.

This is a core strength — our co-founders include former Partners from global consulting firms who have led GRC programs for ADNOC, Mubadala, TAQA, and Saudia.`;
  }

  if (q.includes("service") || q.includes("portfolio") || q.includes("offer")) {
    return `**Algovia's Service Portfolio**

**AI & Digital Solutions** — the build side:
- AI Strategy, Artificial Intelligence (Agentic AI, GenAI, ML), Computer Vision, Software Development, Data Engineering & Analytics, IoT & Embedded Systems

**Intelligent Business Solutions** — governance & transformation:
- Strategy & Operating Model, GRC, Cost Optimization, Business Transformation, Capital Markets Solutions, Internal Audit & ICFR

All engagements follow one of seven models: from a 2-week Discovery Sprint to a full Managed Adoption & Value Realization Office.

Which area is most relevant to you?`;
  }

  if (q.includes("engage") || q.includes("start") || q.includes("meeting") || q.includes("schedule")) {
    return `**How to engage with Algovia**

Every engagement starts with a conversation about the **outcome** you're aiming for — not a generic sales call.

Seven engagement models are available:
1. **AI Value Discovery Sprint** (2–3 weeks) — prioritized business case
2. **AI Training Sprint** (1–2 weeks) — team AI capability
3. **AI Transformation Roadmap** — strategic AI plan
4. **AI Proof of Value & Solution Build** — live AI solution
5. **Business Transformation & Change Management** — operating model and process redesign
6. **AI Governance, Risk and Compliance Management** — governance framework
7. **AI Adoption & Value Realization Office** — sustained outcomes

Use the **Schedule a Meeting** form to connect with our team → [Let's Engage](/service-offerings#schedule)`;
  }

  if (q.includes("team") || q.includes("founder") || q.includes("who")) {
    return `**Algovia's Leadership Team**

Algovia was founded by four co-founders with deep cross-sector expertise:
- **Houssam Abiad** — Board Director & Co-Founder, 20+ years across public, private and startup sectors, former Deputy Lord Mayor
- **Mohamad Kinawi** — Board Director & Co-Founder, electronic engineer, AI strategist, and investment banker (London, Frankfurt, Shanghai)
- **Lara El Khayat** — CEO & Co-Founder, 24 years of advisory experience in GRC and Business Transformation, former Partner at global consulting firms
- **Carmen Hamze** — Business Partner & Co-Founder, 14+ years advising public-sector and energy organizations (ADNOC, Aramco, DEWA), former Partner at Roland Berger and Monitor Deloitte

Extended leadership includes:
- **Marek Tatara, PhD** — Chief Scientific Officer / Head of AI, 40+ AI projects, Assistant Professor at Gdańsk University of Technology
- **Łukasz Fedorowicz** — Head of AI Design, 20+ years in UX and Interaction Design`;
  }

  return `Algovia AI is an **AI Transformation and Execution firm** — combining senior business transformation expertise with AI build capability.

We help Boards and Executive teams in the **UAE, KSA, Europe, and Australia** move from AI strategy to execution, adoption, and measurable value.

Try asking about:
- How to get started with AI at your organization
- Our service portfolio (AI & Digital Solutions / Intelligent Business Solutions)
- Specific industries or success stories
- Our engagement models (Discovery Sprint, Transformation Roadmap, etc.)

Or [schedule a meeting](/service-offerings#schedule) to speak directly with our team.`;
}
