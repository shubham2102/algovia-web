import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/marketing/PageHero";
import PageSection from "@/components/marketing/PageSection";
import CTASection from "@/app/components/CTASection";
import { createPageMetadata } from "@/lib/metadata";
import { FOUNDERS, LEADERSHIP } from "@/lib/team";
import StatCounter from "@/components/ui/StatCounter";

export const metadata: Metadata = createPageMetadata({
  title: "Our Team",
  description:
    "Meet the Algovia AI leadership team — co-founders, executives, and 700+ cross-disciplinary AI professionals.",
  path: "/our-team",
});

export default function OurTeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title="Business transformation executives and AI builders"
        lead="Algovia's leadership team combines deep consulting expertise with hands-on AI build capability — staying accountable for outcomes, not just advice."
      />

      {/* ── Co-Founders ───────────────────────────────────────────────── */}
      <PageSection id="founders" label="Co-Founders" title="Our Founders" elevated>
        <div className="page-card-grid page-card-grid--2">
          {FOUNDERS.map((person) => (
            <article key={person.name} className="page-card">
              <h3 className="page-card__title">{person.name}</h3>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--algovia-green)]">{person.role}</p>
              <p className="mt-0.5 text-xs text-[var(--algovia-muted)]">{person.subtitle}</p>
              <p className="page-card__text mt-3">{person.bio}</p>
            </article>
          ))}
        </div>
      </PageSection>

      {/* ── Extended Leadership ───────────────────────────────────────── */}
      <PageSection id="leadership" label="Leadership Team" title="Extended Leadership">
        <div className="page-card-grid page-card-grid--3">
          {LEADERSHIP.map((person) => (
            <article key={person.name} className="page-card">
              <h3 className="page-card__title">{person.name}</h3>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--algovia-green)]">{person.role}</p>
              <p className="page-card__text mt-3">{person.bio}</p>
            </article>
          ))}
        </div>
      </PageSection>

      {/* ── Subject Matter Resources ──────────────────────────────────── */}
      <PageSection id="network" label="Subject Matter Resources" title="Cross-disciplinary professionals" elevated>
        <StatCounter value="700+" />
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--algovia-muted)]">
          Beyond our core team, Algovia AI works with an international network of AI and industry experts specialized in Artificial Intelligence, Software Engineering, Data Analytics, Business Intelligence, and Digital and Business Transformation.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--algovia-muted)]">
          Subject matter resources span industry sectors: Government & Public Sector, Financial Services, Energy, Technology, Media, Telecommunication, Real Estate, Healthcare, Education, Transport, Retail & Manufacturing and various business advisory domains.
        </p>
        <div className="mt-6">
          <Link
            href="/company#careers"
            className="inline-flex items-center rounded-full bg-[var(--algovia-green)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Join the Network
          </Link>
        </div>
      </PageSection>

      <CTASection
        eyebrow="Work with us"
        heading="Senior expertise,"
        headingAccent="delivered at scale."
        lead="Whether you're looking to engage Algovia as your AI transformation partner, join our team, or contribute to our expert network — we'd like to hear from you."
      />
    </>
  );
}
