import type { Metadata } from "next";
import PageHero from "@/components/marketing/PageHero";
import PageSection from "@/components/marketing/PageSection";
import MarketingCTA from "@/components/marketing/MarketingCTA";
import { PLATFORM_FEATURES } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";
import CTASection from "../components/CTASection";

export const metadata: Metadata = createPageMetadata({
  title: "Platform",
  description:
    "AI-native platform with orchestration, RAG knowledge layers, and cloud-native delivery for enterprise scale.",
  path: "/platform",
});

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Platform"
        title="AI-native systems. Built to scale."
        lead="From user experience to enterprise backends — orchestrated agents, RAG knowledge layers, and governed LLM integrations on production-grade cloud infrastructure."
      />
      <PageSection
        label="Architecture"
        title="End-to-end AI platform stack"
        description="Algovia's platform connects experience layers, AI orchestration, and enterprise systems through secure, observable pipelines."
        elevated
      >
        <div className="page-card-grid page-card-grid--3">
          {PLATFORM_FEATURES.map((feature) => (
            <article key={feature.title} className="page-card">
              <h3 className="page-card__title">{feature.title}</h3>
              <p className="page-card__text">{feature.description}</p>
            </article>
          ))}
        </div>
      </PageSection>
      <PageSection
        title="How it works"
        description="Our platform follows a layered architecture designed for enterprise governance and rapid iteration."
      >
        <ol className="mt-8 space-y-4 text-sm leading-relaxed text-[var(--algovia-muted)]">
          <li>
            <strong className="text-[var(--foreground)]">1. Experience layer</strong> — Web, mobile, and API surfaces with OIDC auth and BFF patterns.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">2. AI orchestration</strong> — LangGraph agents with tool bindings, retrieval, and human-in-the-loop checkpoints.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">3. Knowledge layer</strong> — Vector search, document ingestion, and governed RAG for accurate responses.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">4. Enterprise integration</strong> — ERP, CRM, and legacy systems via APIs and event streams.
          </li>
        </ol>
      </PageSection>
      <CTASection
        eyebrow="Built for enterprise scale"
        heading="Ship your AI platform"
        headingAccent="with confidence."
        lead="From architecture review to production deployment — Algovia's platform team handles the complexity so your team can focus on impact."
      />
    </>
  );
}
