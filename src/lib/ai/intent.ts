export type Intent =
  | "architecture"
  | "services"
  | "lead"
  | "industries"
  | "general";

export function detectIntent(query: string): Intent {
  const q = query.toLowerCase();

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
    general: "General Inquiry",
  };
  return labels[intent];
}
