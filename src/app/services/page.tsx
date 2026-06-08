import type { Metadata } from "next";
import PageHero from "@/components/marketing/PageHero";
import PageSection from "@/components/marketing/PageSection";
import MarketingCTA from "@/components/marketing/MarketingCTA";
import { DELIVERY_PILLARS, SERVICES } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description:
    "AI strategy, product engineering, cloud DevOps, data platforms, and digital transformation services.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="From idea to impact. We've got you."
        lead="End-to-end AI-native engineering — from discovery and architecture through production delivery and enterprise integration."
      />
      <PageSection
        label="What we build"
        title="Core service offerings"
        description="Algovia helps enterprises and ambitious startups design, build, and scale AI-native products and platforms."
        elevated
      >
        <div className="page-card-grid">
          {SERVICES.map((service) => (
            <article key={service.title} className="page-card">
              <h3 className="page-card__title">{service.title}</h3>
              <p className="page-card__text">{service.description}</p>
            </article>
          ))}
        </div>
      </PageSection>
      <PageSection
        title="How we deliver"
        description="Our delivery model combines AI engineering, platform operations, and enterprise integration."
      >
        <div className="page-card-grid page-card-grid--3">
          {DELIVERY_PILLARS.map((pillar) => (
            <article key={pillar.title} className="page-card">
              <p className="page-card__stat">{pillar.stat}</p>
              <p className="text-xs uppercase tracking-wide text-[var(--algovia-muted)]">
                {pillar.statLabel}
              </p>
              <h3 className="page-card__title mt-3">{pillar.title}</h3>
              <p className="page-card__text">{pillar.description}</p>
            </article>
          ))}
        </div>
      </PageSection>
      <MarketingCTA />
    </>
  );
}
