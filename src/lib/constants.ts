export const SITE = {
  name: "Algovia AI",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://algovia.ai",
  workshopUrl: process.env.NEXT_PUBLIC_WORKSHOP_URL ?? "#contact",
  uploadUrl: process.env.NEXT_PUBLIC_UPLOAD_URL ?? "#contact",
} as const;

export const NAV_ITEMS = [
  { label: "Platform", href: "/platform", hasDropdown: false },
  { label: "Solutions", href: "/solutions", hasDropdown: true },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Industries", href: "/industries", hasDropdown: true },
  { label: "Resources", href: "/resources", hasDropdown: true },
  { label: "Company", href: "/company", hasDropdown: true },
] as const;

export const HERO_BADGES = [
  { label: "AI Strategy & Consulting", icon: "brain" },
  { label: "AI Agents & Automation", icon: "bot" },
  { label: "Cloud & DevOps", icon: "cloud" },
  { label: "Data & Analytics", icon: "chart" },
] as const;

export const AI_PROMPTS = [
  {
    id: "marketplace",
    label: "AI marketplace design",
    text: "Design an AI-powered marketplace architecture",
  },
  {
    id: "legacy",
    label: "Modernize legacy systems",
    text: "How can Algovia modernize legacy systems?",
  },
  {
    id: "fintech-team",
    label: "Fintech MVP team plan",
    text: "Estimate team structure for a fintech MVP",
  },
  {
    id: "microservices",
    label: "Microservices roadmap",
    text: "Create a microservices roadmap",
  },
  {
    id: "langgraph",
    label: "AI agents with LangGraph",
    text: "How to build AI agents using LangGraph?",
  },
  {
    id: "saudi-cloud",
    label: "Saudi fintech cloud",
    text: "Suggest cloud architecture for Saudi fintech",
  },
] as const;

export const TRUST_LOGOS = [
  "stc",
  "HUNGERSTATION",
  "SDAIA",
  "jahez",
  "alinma bank",
] as const;

export const SERVICES = [
  {
    title: "Product Engineering",
    description:
      "End-to-end product development from discovery to deployment with AI-native architecture.",
    color: "green",
    icon: "code",
  },
  {
    title: "AI & Machine Learning",
    description:
      "Custom ML models, LLM integrations, RAG pipelines, and intelligent automation systems.",
    color: "orange",
    icon: "sparkles",
  },
  {
    title: "Cloud & DevOps",
    description:
      "Scalable cloud infrastructure, CI/CD pipelines, and enterprise-grade DevOps practices.",
    color: "green",
    icon: "cloud",
  },
  {
    title: "Data Engineering",
    description:
      "Modern data platforms, real-time analytics, and enterprise data lake architectures.",
    color: "blue",
    icon: "database",
  },
  {
    title: "Digital Transformation",
    description:
      "Legacy modernization, API-first architectures, and enterprise system integration.",
    color: "indigo",
    icon: "transform",
  },
] as const;

export const ARCHITECTURE_NODES = [
  { id: "user", label: "User / Client", position: "left-top" },
  { id: "apps", label: "Web / Mobile Applications", position: "left-bottom" },
  {
    id: "orchestration",
    label: "AI Orchestration Layer (Agents)",
    position: "center",
    highlight: true,
  },
  { id: "knowledge", label: "Knowledge Layer (RAG / Vector DB)", position: "top" },
  {
    id: "llm",
    label: "LLM Layer (OpenAI / Claude / Llama)",
    position: "bottom",
  },
  { id: "apis", label: "APIs & Services", position: "right-top" },
  {
    id: "enterprise",
    label: "Enterprise Systems (ERP, CRM, etc.)",
    position: "right-bottom",
  },
] as const;

export const DELIVERY_PILLARS = [
  {
    title: "AI Engineering",
    description:
      "Agentic systems, copilots, and vertical AI built with LangGraph, RAG, and enterprise guardrails.",
    stat: "70%",
    statLabel: "smarter workflows",
  },
  {
    title: "Platform Delivery",
    description:
      "Cloud-native platforms on AWS with microservices, APIs, and observable production operations.",
    stat: "300M+",
    statLabel: "transactions processed annually",
  },
  {
    title: "Enterprise Integration",
    description:
      "Connect ERP, CRM, and legacy estates with secure APIs, event streams, and governed data flows.",
    stat: "65%",
    statLabel: "reduction in manual decision-making",
  },
] as const;

export const INDUSTRIES = [
  {
    id: "retail",
    title: "Retail / CPG",
    description:
      "Predict demand, optimize inventory, and personalize customer experiences with vertical AI.",
    metric: "75+",
    metricLabel: "retail locations worldwide",
  },
  {
    id: "fintech",
    title: "Financial Services",
    description:
      "Automate compliance workflows, real-time risk monitoring, and intelligent case management.",
    metric: "70%",
    metricLabel: "smarter workflows",
  },
  {
    id: "industrial",
    title: "Industrial",
    description:
      "Predictive maintenance, smart manufacturing, and AI-guided front-line operations.",
    metric: "50%",
    metricLabel: "reduction in downtime",
  },
  {
    id: "realestate",
    title: "Real Estate",
    description:
      "Intelligent property search, automated operations, and personalized buyer journeys.",
    metric: "60%",
    metricLabel: "workflow automation",
  },
  {
    id: "media",
    title: "Media",
    description:
      "Revenue optimization, faster distribution, and AI-driven content licensing.",
    metric: "35%",
    metricLabel: "increased media revenue",
  },
] as const;

export const CASE_STUDIES = [
  {
    id: "banking",
    category: "Fintech",
    title: "AI-Powered Banking Platform",
    description:
      "Modernized core banking workflows with agentic automation and real-time risk intelligence.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
  },
  {
    id: "ecommerce",
    category: "E-commerce",
    title: "Intelligent Marketplace",
    description:
      "Built a scalable AI marketplace with recommendation engines and dynamic pricing.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
  },
  {
    id: "logistics",
    category: "Logistics",
    title: "Supply Chain Optimization",
    description:
      "Deployed predictive routing and warehouse automation for a regional logistics leader.",
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80",
  },
  {
    id: "enterprise",
    category: "Enterprise",
    title: "Legacy Modernization",
    description:
      "Migrated monolithic ERP systems to cloud-native microservices with zero downtime.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  },
] as const;

export const FOOTER_LINKS = {
  products: [
    { label: "Vertical AI", href: "/solutions#vertical-ai" },
    { label: "Generative AI", href: "/solutions#generative-ai" },
    { label: "Business AI", href: "/solutions#business-ai" },
    { label: "Platform", href: "/platform" },
  ],
  company: [
    { label: "About Us", href: "/company#about" },
    { label: "Careers", href: "/company#careers" },
    { label: "Press", href: "/company#press" },
    { label: "Contact", href: "/company#contact" },
  ],
  resources: [
    { label: "Case Studies", href: "/resources#case-studies" },
    { label: "Blog", href: "/resources#blog" },
    { label: "Documentation", href: "/resources#docs" },
    { label: "Help Center", href: "/resources#help" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/company#privacy" },
    { label: "Terms of Service", href: "/company#terms" },
    { label: "Cookie Policy", href: "/company#cookies" },
    { label: "Security", href: "/company#security" },
  ],
} as const;

export const SOLUTIONS = [
  {
    id: "vertical-ai",
    title: "Vertical AI, Built with Depth",
    description:
      "Domain-specific applications designed to solve real business challenges with measurable value and continuous optimization.",
    stat: "75+",
    statLabel: "partners globally",
  },
  {
    id: "generative-ai",
    title: "Autonomous Agents. Human Oversight.",
    description:
      "Purpose-built AI agents and copilots that handle complex tasks while keeping humans in the loop with enterprise-grade security.",
    stat: "65%",
    statLabel: "reduction in manual decision-making",
  },
  {
    id: "business-ai",
    title: "Business AI That Works for You",
    description:
      "Predictive, generative, and agentic AI tailored to your workflow — engineered for real-world impact across operations.",
    stat: "70%",
    statLabel: "improvement in operational efficiency",
  },
] as const;

export const PLATFORM_FEATURES = [
  {
    title: "AI Orchestration",
    description:
      "LangGraph and agentic workflows with human-in-the-loop checkpoints, tracing, and enterprise guardrails.",
  },
  {
    title: "Knowledge Layer",
    description:
      "RAG pipelines with vector search, document ingestion, and governed retrieval for accurate AI responses.",
  },
  {
    title: "Cloud-Native Delivery",
    description:
      "AWS-hosted microservices, observability, CI/CD, and scalable infrastructure for production AI systems.",
  },
  {
    title: "Enterprise Integration",
    description:
      "Secure APIs and event streams connecting ERP, CRM, and legacy systems to your AI platform.",
  },
] as const;
