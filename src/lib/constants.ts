export const SITE = {
  name: "Algovia AI",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://algovia.ai",
  workshopUrl: process.env.NEXT_PUBLIC_WORKSHOP_URL ?? "https://calendly.com/algovia/workshop",
} as const;

export const NAV_ITEMS = [
  { label: "Company",           href: "/company",           hasDropdown: true  },
  { label: "Products & Services", href: "/service-offerings", hasDropdown: true  },
  { label: "Success Stories",   href: "/success-stories",   hasDropdown: true  },
  { label: "Research & Learn",  href: "/research",          hasDropdown: true  },
  { label: "Our Team",          href: "/our-team",          hasDropdown: false },
] as const;

export const NAV_DROPDOWNS: Record<string, readonly { label: string; href: string }[]> = {
  "/company": [
    { label: "About Us",              href: "/company#about"              },
    { label: "Vision & Mission",      href: "/company#vision-mission"     },
    { label: "Our Value Proposition", href: "/company#value-proposition"  },
    { label: "The AI Value Gap",      href: "/company#value-gap"          },
    { label: "Contact",               href: "/company#contact"            },
  ],
  "/service-offerings": [
    { label: "Proprietary AI Solutions",       href: "/service-offerings#proprietary"          },
    { label: "Our Service Portfolio",          href: "/service-offerings#service-portfolio"    },
    { label: "Our Engagement Models",          href: "/service-offerings#engage"               },
  ],
  "/success-stories": [
    { label: "Government & Public Sector",    href: "/success-stories#government"    },
    { label: "Financial Services",            href: "/success-stories#financial"     },
    { label: "Energy",                        href: "/success-stories#energy"        },
    { label: "Technology, Media & Telecom",   href: "/success-stories#tmt"           },
    { label: "Real Estate",                   href: "/success-stories#realestate"    },
    { label: "Healthcare",                    href: "/success-stories#healthcare"    },
    { label: "Education",                     href: "/success-stories#education"     },
    { label: "Transport & Aviation",          href: "/success-stories#transport"     },
    { label: "Retail & Manufacturing",        href: "/success-stories#retail"        },
  ],
  "/research": [
    { label: "Thought Leadership", href: "/research#thought-leadership" },
    { label: "Algovia Academy",    href: "/research#academy"            },
  ],
};

export const HERO_BADGES = [
  { label: "AI Transformation & Execution", icon: "brain"  },
  { label: "AI Strategy & Roadmaps",        icon: "bot"    },
  { label: "Governance, Risk & Compliance", icon: "chart"  },
  { label: "AI & Digital Solutions",        icon: "cloud"  },
] as const;

export const AI_PROMPTS = [
  {
    id: "ai-strategy",
    label: "We need an AI strategy",
    text: "We need an AI strategy. Where should we start?",
    engagementId: "01",
  },
  {
    id: "stalled-pilots",
    label: "Our pilots have stalled",
    text: "Our AI pilots have stalled and never scaled. How can Algovia help?",
    engagementId: "04",
  },
  {
    id: "governance-at-scale",
    label: "We need to scale AI with the right governance",
    text: "We need to scale AI with the right governance.",
    engagementId: "06",
  },
] as const;

export const TRUST_LOGOS = [
  "ADNOC",
  "Mubadala",
  "Majid Al Futtaim",
  "TAQA",
  "Aramco",
] as const;

// ── Value Proposition pillars (Company page) ─────────────────────────────────
export const WHY_ALGOVIA = [
  {
    title: "Senior Business Transformation Expertise",
    body: "Our team has led enterprise-scale transformation programs across governments and large corporations as accountable execution owners, not just advisers.",
  },
  {
    title: "End-to-End AI Transformation Partner",
    body: "As your single partner across the AI journey, we prioritize the right use cases, build tailored AI solutions and optimize adoption and ROI.",
  },
  {
    title: "Proven AI Design & Execution Capability",
    body: "With 700+ cross-disciplinary AI professionals, we bring deep technical expertise that is rarely available in a single partner.",
  },
  {
    title: "Digital Transformation & Change Management",
    body: "Deploying AI without managing change guarantees failure. Our proven approach embeds governance, business ownership, and process redesign into every engagement.",
  },
] as const;

// ── AI Value Gap — failure modes ─────────────────────────────────────────────
export const AI_VALUE_GAP = [
  {
    id: "01",
    title: "Ambition without prioritization",
    problem: "Use cases that are material, feasible and worth scaling are hard to pick.",
    solution: "We prioritize use cases tied to business targets, so investment goes where it counts.",
  },
  {
    id: "02",
    title: "Technology without foundations",
    problem: "Tools land on siloed data and systems that are not ready for them.",
    solution: "We assess data and infrastructure readiness before any build begins.",
  },
  {
    id: "03",
    title: "Pilots without adoption",
    problem: "AI stalls at proof of concept, never embedded in workflows or roles.",
    solution: "We embed change management & ownership to drive adoption.",
  },
  {
    id: "04",
    title: "Advice without accountability",
    problem: "Consultants stop at advice, vendors at deployment. No one owns outcomes.",
    solution: "We stay accountable with you for delivery, results & effective governance.",
  },
  {
    id: "05",
    title: "Impact without measurement",
    problem: "Benefits are promised but rarely tracked against KPIs.",
    solution: "We anchor every project in KPIs, so impact is realized and sustained.",
  },
] as const;

// ── AI & Digital Solutions ────────────────────────────────────────────────────
export const AI_DIGITAL_SERVICES = [
  {
    id: "ai-strategy",
    title: "AI Strategy",
    whyNow: "National & Corporate AI mandates demand fast clarity on how AI can create value.",
    delivers: ["AI Strategic Initiatives & Roadmap", "AI Solution Scoping"],
    impact: "Investment concentrated on use cases that move the P&L.",
  },
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence",
    whyNow: "Boards are expecting AI adoption to move from chatbots to systems that act with proper governance.",
    delivers: ["Agentic AI", "Generative AI", "Machine Learning", "AI Consulting", "Agentic AI Security & Governance"],
    impact: "Faster decisions and business automation, governed the way boards expect.",
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    whyNow: "Rising business needs for AI solutions that can see, inspect and act on the physical world.",
    delivers: ["Object Detection", "Image & Video Analysis", "Quality Inspection", "Industrial Automation"],
    impact: "Fewer defects, less downtime, and cost optimization to relieve margin pressures.",
  },
  {
    id: "software-development",
    title: "Software Development",
    whyNow: "Business efficiency mandates demand faster, cheaper delivery without sacrificing quality.",
    delivers: ["Enterprise Platforms", "Cloud-Native Applications", "Back & Front-End Development", "Mobile Applications"],
    impact: "Modern platforms that operate faster and cost less to run.",
  },
  {
    id: "data-engineering",
    title: "Data Engineering & Analytics",
    whyNow: "Leaders need real-time visibility into performance and risks, not static reports.",
    delivers: ["Data Platforms", "Business Intelligence", "Predictive Analytics", "Data Science", "Automated Doc & CAD Analysis"],
    impact: "One source of truth that enables quick & effective decisions in an evolving market.",
  },
  {
    id: "iot-embedded",
    title: "IoT & Embedded Systems",
    whyNow: "Scaling business operations require hardware & systems that are purpose-built & effectively adopted.",
    delivers: ["Custom Hardware & Firmware", "Internet of Things", "On-board / Edge Processing", "Connectivity & Sensors"],
    impact: "Infrastructure that scales with the business instead of constraining it.",
  },
] as const;

// ── Intelligent Business Solutions ───────────────────────────────────────────
export const INTELLIGENT_BUSINESS_SERVICES = [
  {
    id: "strategy-operating-model",
    title: "Strategy & Operating Model",
    whyNow: "As competitors restructure around AI, businesses need to rethink their strategy & operating model to compete.",
    delivers: ["Business & Digital Strategy", "SMO & PMO", "Operating Model Development & Transformation"],
    impact: "Strategy and operating model built to compete in a disrupted market.",
  },
  {
    id: "grc",
    title: "Governance, Risk & Compliance",
    whyNow: "As evolving markets reshape how business gets done, governance, risk & compliance (GRC) must keep pace.",
    delivers: ["Corporate Governance", "Risk Management", "Compliance Management", "Policies & Procedures"],
    impact: "GRC framework that is a competitive advantage, not a compliance checkbox.",
  },
  {
    id: "cost-optimization",
    title: "Cost Optimization",
    whyNow: "Boards demand budget rationalization and margin protection that doesn't come at the expense of quality.",
    delivers: ["AI-Enabled Cost Optimization Assessment & Solutions"],
    impact: "Savings delivered without cutting into what clients experience.",
  },
  {
    id: "business-transformation",
    title: "Business Transformation",
    whyNow: "Business efficiency mandates require transformation designed around evolving strategies.",
    delivers: ["Business Process Transformation", "Customer Experience Transformation"],
    impact: "Leaner processes and better customer experience that act as market differentiators.",
  },
  {
    id: "capital-markets",
    title: "Capital Markets Solutions",
    whyNow: "A growing IPO pipeline across the region is raising expectations from Board & Management.",
    delivers: ["IPO Readiness Assessment", "IPO GRC Framework Implementation"],
    impact: "Quick business alignment to listing requirements that meets tight deadlines.",
  },
  {
    id: "internal-audit",
    title: "Internal Audit",
    whyNow: "Board & Shareholders expect transparency that only progressive audit solutions can deliver.",
    delivers: ["AI-Enabled Internal Audit Services", "Digitized Internal Audit Services"],
    impact: "Financial & process control gaps identified & mitigated in real-time, not year-end.",
  },
] as const;

// ── Engagement models ─────────────────────────────────────────────────────────
export const ENGAGEMENTS = [
  {
    id: "01",
    title: "AI Value Discovery Sprint",
    format: "2–3 Weeks",
    description: "AI workshop, including an executive diagnostic & 2–3 prioritized use cases",
    outcome: "A business case that leadership can act on, not just an informative slide deck.",
  },
  {
    id: "02",
    title: "AI Training Sprint",
    format: "1–2 Weeks",
    description: "Role-based AI training tailored to your sector and teams",
    outcome: "Teams that can use AI, not just talk about it.",
  },
  {
    id: "03",
    title: "AI Transformation Roadmap",
    format: "Strategic Engagement",
    description: "Maturity diagnostic, resulting in use-case prioritization, AI roadmap & change plan",
    outcome: "An AI roadmap tied to budget, timeline and named owners.",
  },
  {
    id: "04",
    title: "AI Proof of Value & Solution Build",
    format: "Build Engagement",
    description: "AI solution design, agile build & testing, and business integration",
    outcome: "An AI solution live in your operating environment that scales with your business.",
  },
  {
    id: "05",
    title: "Business Transformation & Change Management",
    format: "Advisory Engagement",
    description: "Operating model and business process diagnostic and transformation to enable effective change management and target realization.",
    outcome: "Enhanced operating model and lean business processes that deliver tangible business value.",
  },
  {
    id: "06",
    title: "AI Governance, Risk and Compliance Management",
    format: "Advisory Engagement",
    description: "AI risk, governance and compliance framework and controls mapping to maintain accountability and ethical standards.",
    outcome: "Governance that regulators and boards can rely on.",
  },
  {
    id: "07",
    title: "AI Adoption & Value Realization Office",
    format: "Managed Service",
    description: "AI adoption monitoring, KPI dashboards and continuous optimization",
    outcome: "Value that is measured, sustained & scaled long after AI solution go-live.",
  },
] as const;

// ── Industries (Success Stories sectors) ────────────────────────────────────
export const INDUSTRIES = [
  {
    id: "government",
    title: "Government & Public Sector",
    description: "AI transformation and execution for public sector institutions, delivering governance-ready solutions at scale.",
    metric: "UAE · KSA",
    metricLabel: "primary markets served",
  },
  {
    id: "financial",
    title: "Financial Services",
    description: "AI-powered solutions for banking, fintech, and capital markets — from compliance automation to intelligent customer platforms.",
    metric: "IPO",
    metricLabel: "readiness & GRC frameworks",
  },
  {
    id: "energy",
    title: "Energy (Oil & Gas, Mining, Power & Utility)",
    description: "AI transformation and execution for oil & gas, mining, power, and utility operators — case studies in development.",
    metric: "UAE · KSA",
    metricLabel: "primary markets served",
  },
  {
    id: "tmt",
    title: "Technology, Media & Telecommunications",
    description: "From legal AI platforms to data reliability engineering and automated fibre validation — AI that reduces cost and boosts quality.",
    metric: "80%",
    metricLabel: "reduction in intake time",
  },
  {
    id: "realestate",
    title: "Real Estate",
    description: "Multi-agent AI marketplaces and construction progress monitoring that give teams real-time intelligence across sites and portfolios.",
    metric: "Real-time",
    metricLabel: "construction visibility",
  },
  {
    id: "healthcare",
    title: "Healthcare",
    description: "Medical AI from point-of-care diagnostics to patient engagement platforms — MDR-aware and clinician-validated.",
    metric: "Class IIb",
    metricLabel: "MDR certification support",
  },
  {
    id: "education",
    title: "Education",
    description: "AI-powered learning platforms and Algovia Academy training programmes building the next generation of AI-enabled organizations.",
    metric: "700+",
    metricLabel: "training professionals",
  },
  {
    id: "transport",
    title: "Transport & Aviation",
    description: "Intelligent logistics and supply-chain AI that optimizes routes, reduces costs, and improves operational visibility.",
    metric: "Real-time",
    metricLabel: "route optimization",
  },
  {
    id: "retail",
    title: "Retail & Manufacturing",
    description: "Computer vision defect detection, agentic AI governance, and precision manufacturing AI delivering measurable quality gains.",
    metric: "90%",
    metricLabel: "defect detection accuracy",
  },
] as const;

// ── Case Studies (homepage preview) ─────────────────────────────────────────
export const CASE_STUDIES = [
  {
    id: "talktwelve",
    category: "Technology & Legal AI",
    title: "TalkTwelve: Production Legal AI Platform",
    description:
      "Cut intake time from 60+ minutes to ~12 minutes with a conversational AI agent that prepares solicitor-ready briefs.",
    image: "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?w=800&q=80",
  },
  {
    id: "eazli",
    category: "Real Estate",
    title: "Eazli: Scalable Multi-Agent Marketplace",
    description:
      "Multi-agent AI concierge for KSA property, lifestyle & services — enabling new verticals without rebuilding the core platform.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  },
  {
    id: "prohan",
    category: "Manufacturing",
    title: "Prohan: Computer Vision Defect Detection",
    description:
      "90% defect detection rate in wood furniture manufacturing, eliminating €40K monthly loss from undetected production flaws.",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80",
  },
  {
    id: "kinage",
    category: "Financial Services",
    title: "Kinage: AI Personal-Finance MVP",
    description:
      "Accelerated market launch with a functional MVP — secure inbox parsing, bill classification, and anomaly detection.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
  },
] as const;

export const FOOTER_LINKS = {
  products: [
    { label: "Proprietary AI Solutions",         href: "/service-offerings#proprietary"           },
    { label: "Our Service Portfolio",            href: "/service-offerings#service-portfolio"     },
    { label: "Our Engagement Models",            href: "/service-offerings#engage"                },
  ],
  company: [
    { label: "About Us",          href: "/company#about"   },
    { label: "Contact",           href: "/company#contact" },
  ],
  resources: [
    { label: "Success Stories",    href: "/success-stories"          },
    { label: "Thought Leadership", href: "/research#thought-leadership" },
    { label: "Algovia Academy",    href: "/research#academy"           },
    { label: "Our Team",           href: "/our-team"                   },
  ],
  legal: [
    { label: "Privacy Policy",    href: "/company#privacy" },
    { label: "Terms of Service",  href: "/company#terms"   },
    { label: "Cookie Policy",     href: "/company#cookies" },
  ],
} as const;

// ── Aliases used by homepage sections that predate the category split ───────
export const SERVICES = AI_DIGITAL_SERVICES;
