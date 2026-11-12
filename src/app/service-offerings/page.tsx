import type { Metadata } from "next";
import PageHero from "@/components/marketing/PageHero";
import PageSection from "@/components/marketing/PageSection";
import CTASection from "@/app/components/CTASection";
import ServicePortfolio from "@/app/components/ServicePortfolio";
import ProprietarySolutions from "@/app/components/ProprietarySolutions";
import { ENGAGEMENTS, SITE } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Products & Services",
  description:
    "Algovia AI products and services — proprietary AI solutions, the AI & Digital and Intelligent Business service portfolio, and seven engagement models designed around your business outcomes.",
  path: "/service-offerings",
});

export default async function ServiceOfferingsPage({
  searchParams,
}: {
  searchParams: Promise<{ engagement?: string }>;
}) {
  const { engagement } = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Products & Services"
        title="Proprietary AI Solutions. End-to-End Services. Real Value."
        lead="ALGOVIA combines ready-built proprietary AI solutions with a full suite of services that take AI from idea to impact. You gain the speed of proven AI and the precision of services tailored to your business, delivering measurable results."
      />

      <ProprietarySolutions />

      <ServicePortfolio />

      <PageSection
        id="engage"
        label="Let's Engage"
        title="Our Engagement Models: Choose the path that fits your AI journey"
        elevated
      >
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ENGAGEMENTS.map((eng) => (
            <article
              key={eng.id}
              className={`page-card engage-card flex flex-col${eng.id === engagement ? " engage-card--highlight" : ""}`}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="page-card__title flex-1">{eng.title}</h3>
                <span className="engage-card__num">{eng.id}</span>
              </div>
              <p className="engage-card__format">{eng.format}</p>
              <p className="page-card__text flex-1">{eng.description}</p>
              <p className="engage-card__outcome">{eng.outcome}</p>
            </article>
          ))}
        </div>

        <div className="engage-request">
          <p>Every engagement starts with a conversation about the outcome you are aiming to achieve.</p>
          <a href={SITE.workshopUrl} target="_blank" rel="noopener noreferrer" className="hero__cta-primary">
            Request a Meeting
          </a>
        </div>
      </PageSection>

      <CTASection
        eyebrow="Let's scope your engagement"
        heading="Every engagement starts with"
        headingAccent="your outcome."
        lead="Talk to Algovia AI to explore which engagement model fits your situation — or request a meeting with our team directly."
      />
    </>
  );
}
