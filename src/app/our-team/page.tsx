import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/marketing/PageHero";
import PageSection from "@/components/marketing/PageSection";
import CTASection from "@/app/components/CTASection";
import DacLogo from "@/components/ui/DacLogo";
import { createPageMetadata } from "@/lib/metadata";
import { FOUNDERS, LEADERSHIP } from "@/lib/team";
import StatCounter from "@/components/ui/StatCounter";
import Container from "@/components/ui/Container";

export const metadata: Metadata = createPageMetadata({
  title: "Our Team",
  description:
    "Meet the Algovia AI leadership team — co-founders, executives, and an ecosystem of 700+ cross-disciplinary AI professionals and partners.",
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
            <article key={person.name} className="page-card founder-card">
              <Image
                src={person.photo}
                alt={`Portrait of ${person.name}`}
                width={240}
                height={240}
                className="founder-card__photo"
              />
              <div className="founder-card__body">
                <h3 className="page-card__title">{person.name}</h3>
                <p className="founder-card__role">{person.role}</p>
                <p className="page-card__text mt-3">{person.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </PageSection>

      {/* ── Strategic delivery partners ──────────────────────────────── */}
      <section id="delivery-partners-band" className="page-section">
        <Container>
          <div id="delivery-partners" className="partner-block partner-block--first">
            <DacLogo className="partner-block__logo" />
            <div>
              <h3 className="partner-block__title">Our Strategic Delivery Partners</h3>
              <p className="partner-block__text">
                At Algovia.AI, we combine our expertise in AI, technology, and business transformation with a carefully curated global network of specialist partners to deliver innovative, scalable, and impactful solutions.
              </p>
              <p className="partner-block__text">
                As part of this ecosystem, our strategic partnership with DAC Digital strengthens our access to international expertise, advanced technology capabilities, and delivery capacity, enabling us to better serve clients across the Middle East, North Africa, and Australia.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── The People Behind Intelligent Execution ───────────────────── */}
      <section id="leadership" className="people-band">
        <Container>
          <h2 className="people-band__title">The People Behind Intelligent Execution</h2>
          <div className="people-band__grid">
            {LEADERSHIP.map((person) => (
              <article key={person.name} className="person-card">
                <span className="person-card__photo-wrap">
                  <Image
                    src={person.photo}
                    alt={`Portrait of ${person.name}`}
                    width={176}
                    height={176}
                    className="person-card__photo"
                  />
                </span>
                <h3 className="person-card__name">{person.name}</h3>
                <p className="person-card__role">{person.role}</p>
                <p className="person-card__bio">{person.bio}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Ecosystem of professionals & partners ─────────────────────── */}
      <PageSection id="network" title="Our Ecosystem of Cross-Disciplinary Professionals & Partners" elevated>
        <StatCounter value="700+" />
        <div className="ecosystem-copy">
          <p>
            Beyond our core team, Algovia AI works with an international network of AI and industry experts specialized in Artificial Intelligence, Software Engineering, Data Analytics, Business Intelligence, and Digital and Business Transformation.
          </p>
          <p>
            Our ecosystem also includes Subject Matter Resources that span various industries, including Government &amp; Public Sector, Financial Services, Energy, Technology, Media, Telecommunication, Real Estate, Healthcare, Education, Transport, Retail &amp; Manufacturing, and various business advisory domains.
          </p>
        </div>

        <div className="mt-8">
          <Link href="/#join-network" className="hero__cta-primary">
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
