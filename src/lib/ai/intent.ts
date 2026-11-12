export type Intent =
  | "architecture"
  | "services"
  | "lead"
  | "industries"
  | "greeting"
  | "general";

export function detectIntent(query: string): Intent {
  const q = query.toLowerCase();

  // Pure pleasantries ("hi", "thanks", "how are you") get a short reply, not a
  // retrieved company overview.
  if (
    /^\s*(hi+|hello+|hey+|hiya|howdy|yo|good\s+(morning|afternoon|evening)|greetings|thanks?|thank\s+you|ok(ay)?|cool|great|how\s+are\s+you)(\s+(there|algovia|team|again))?\s*[!.?]*\s*$/.test(q)
  ) {
    return "greeting";
  }

  if (
    /marketplace|architecture|microservice|roadmap|cloud|aws|saudi|fintech.*cloud|langgraph|agent|rag|vector|legacy|modernize|migrate/.test(
      q,
    )
  ) {
    return "architecture";
  }

  if (
    /workshop|consult|contact|hire|engage|quote|proposal|partner|team.*size|mvp.*team/.test(
      q,
    )
  ) {
    return "lead";
  }

  if (
    /retail|financial|fintech|industrial|real.?estate|media|industry|vertical/.test(
      q,
    )
  ) {
    return "industries";
  }

  if (
    /service|devops|engineering|strategy|consulting|product|data|transform|algovia|what.*do|capabilit/.test(
      q,
    )
  ) {
    return "services";
  }

  return "general";
}

export function intentLabel(intent: Intent): string {
  const labels: Record<Intent, string> = {
    architecture: "Technical Architecture",
    services: "Algovia Services",
    lead: "Engagement & Discovery",
    industries: "Industry Solutions",
    greeting: "Greeting",
    general: "General Inquiry",
  };
  return labels[intent];
}
