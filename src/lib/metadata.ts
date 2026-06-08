import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | Algovia AI`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url: `${SITE.url}${path}`,
      siteName: SITE.name,
      type: "website",
    },
  };
}

export const MARKETING_ROUTES = [
  { path: "/platform", title: "Platform", description: "AI-native platform with orchestration, RAG knowledge layers, and cloud-native delivery for enterprise scale." },
  { path: "/solutions", title: "Solutions", description: "Vertical AI, generative agents, and business AI solutions engineered for measurable enterprise impact." },
  { path: "/services", title: "Services", description: "AI strategy, product engineering, cloud DevOps, data platforms, and digital transformation services." },
  { path: "/industries", title: "Industries", description: "Vertical AI for retail, financial services, industrial, real estate, and media industries." },
  { path: "/resources", title: "Resources", description: "Case studies, documentation, and resources for AI-native engineering and enterprise transformation." },
  { path: "/company", title: "Company", description: "About Algovia — AI-native engineering and consulting for enterprises and ambitious startups." },
] as const;
