import type { Metadata } from "next";
import PageHero from "@/components/marketing/PageHero";
import PageSection from "@/components/marketing/PageSection";
import MarketingCTA from "@/components/marketing/MarketingCTA";
import { INDUSTRIES } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Industries",
  description:
    "Vertical AI for retail, financial services, industrial, real estate, and media industries.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Industry-specific AI at scale"
        lead="Predictive, generative, and agentic systems engineered for measurable impact across regulated and high-volume sectors."
      />
      <PageSection
        label="Vertical expertise"
        title="Where we deliver impact"
        elevated
      >
        <div className="page-card-grid">
          {INDUSTRIES.map((industry) => (
            <article key={industry.id} className="page-card">
              <p className="page-card__stat">{industry.metric}</p>
              <p className="text-xs uppercase tracking-wide text-[var(--algovia-muted)]">
                {industry.metricLabel}
              </p>
              <h3 className="page-card__title mt-3">{industry.title}</h3>
              <p className="page-card__text">{industry.description}</p>
            </article>
          ))}
        </div>
      </PageSection>
      <MarketingCTA />
    </>
  );
}
