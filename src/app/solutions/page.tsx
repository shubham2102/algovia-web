import type { Metadata } from "next";
import PageHero from "@/components/marketing/PageHero";
import PageSection from "@/components/marketing/PageSection";
import CTASection from "@/app/components/CTASection";
import { SOLUTIONS } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Solutions",
  description:
    "Vertical AI, generative agents, and business AI solutions engineered for measurable enterprise impact.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Specialized AI that fits your workflow"
        lead="Unlock hidden revenue. Accelerate operations. Build smarter with predictive, generative, and agentic AI tailored to your business."
      />
      {SOLUTIONS.map((solution, i) => (
        <PageSection
          key={solution.id}
          id={solution.id}
          label={i === 0 ? "Our Solutions" : undefined}
          title={solution.title}
          description={solution.description}
          elevated={i % 2 === 0}
        >
          <p className="page-card__stat">{solution.stat}</p>
          <p className="text-xs uppercase tracking-wide text-[var(--algovia-muted)]">
            {solution.statLabel}
          </p>
        </PageSection>
      ))}
      <CTASection
        eyebrow="Ready to deploy?"
        heading="Find the right AI solution"
        headingAccent="for your business."
        lead="From vertical AI to autonomous agents — let Algovia scope your first deployment and define a roadmap built around measurable outcomes."
      />
    </>
  );
}
