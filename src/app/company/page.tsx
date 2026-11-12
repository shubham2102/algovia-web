import type { Metadata } from "next";
import PageHero from "@/components/marketing/PageHero";
import PageSection from "@/components/marketing/PageSection";
import Container from "@/components/ui/Container";
import CTASection from "@/app/components/CTASection";
import ValueGap from "@/app/components/ValueGap";
import { createPageMetadata } from "@/lib/metadata";
import { WHY_ALGOVIA, SITE } from "@/lib/constants";
import LeadForm from "@/components/forms/LeadForm";
import { HeroCTAPrimary } from "@/components/ui/AILink";
import { UserRound, Globe2, Building2, Cog, Handshake } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Company",
  description:
    "About Algovia AI — an AI Transformation and Execution firm helping organizations move from strategy to execution, adoption, and measurable value.",
  path: "/company",
});

function VisionIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M24 44c0-3-6-6-6-14a14 14 0 1 1 28 0c0 8-6 11-6 14" />
      <path d="M24 49h16M26 54h12" />
      <circle cx="32" cy="29" r="5" />
      <path d="M32 24v-3M27.5 26.5l-2-2M36.5 26.5l2-2M27 31.5l-2.5 1M37 31.5l2.5 1" />
      <path d="M32 6v4M12 14l3 3M52 14l-3 3M5 30h4M55 30h4" />
    </svg>
  );
}

function MissionIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M40 12c8 0 12 4 12 12-4 10-12 18-20 22l-14-14c4-8 12-16 22-20Z" />
      <circle cx="38" cy="26" r="4" />
      <path d="M20 32l-8 2-4 8 10-2M32 44l-2 8-8 4 2-10" />
      <path d="M12 56l-4 4M18 54l-4 4M8 50l-4 4" />
    </svg>
  );
}

export default function CompanyPage() {
  return (
    <>
      <PageHero
        tone="dark"
        eyebrow="Company"
        title={
          <>
            From AI Ambition to <span className="page-hero__accent">Measurable Value</span>
          </>
        }
        lead="Smarter Execution. Greater Impact."
      />

      {/* ── 1.1.1 Profile ──────────────────────────────────────────────── */}
      <section id="about" className="who" aria-labelledby="who-title">
        <Container>
          <p className="who__label">Who we are</p>
          <h2 id="who-title" className="who__title">An AI Transformation Execution Firm</h2>

          <div className="who__grid">
            <ol className="who__steps">
              <li className="who__step">
                <h3 className="who__step-label">What we do</h3>
                <p>
                  ALGOVIA helps organizations turn AI ambition into execution, by developing and embedding AI solutions into operating models, workflows and governance.
                </p>
              </li>
              <li className="who__step">
                <h3 className="who__step-label">Our ecosystem</h3>
                <p>
                  Our ecosystem of leading AI and technology partners gives us access to{" "}
                  <strong className="who__accent">700+ AI, data and software professionals</strong>, plus{" "}
                  <strong className="who__accent">proprietary AI solutions</strong> proven globally, so clients implement AI faster and more cost-efficiently.
                </p>
              </li>
              <li className="who__step">
                <h3 className="who__step-label">Our difference</h3>
                <p>
                  We are not a traditional consultancy or a technology vendor.{" "}
                  <strong className="who__strong">
                    We are the partner that connects both and enables you to realize tangible ROI linked to your business targets.
                  </strong>
                </p>
              </li>
            </ol>

            <ul className="who__facts">
              {[
                { icon: <UserRound aria-hidden />, label: "Founded by", value: "Business transformation executives and AI builders" },
                { icon: <Globe2 aria-hidden />, label: "Markets", value: "UAE · KSA · Europe · Australia" },
                { icon: <Building2 aria-hidden />, label: "Primary clients", value: "Boards and executives across governments and enterprises" },
                { icon: <Cog aria-hidden />, label: "Engagement model", value: "Advisory, implementation and value realization" },
                { icon: <Handshake aria-hidden />, label: "Partnership", value: "International network of AI and industry experts" },
              ].map(({ icon, label, value }) => (
                <li key={label} className="who__fact">
                  <span className="who__fact-icon">{icon}</span>
                  <div>
                    <p className="who__fact-label">{label}</p>
                    <p className="who__fact-value">{value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ── 1.1.2 Vision & Mission ─────────────────────────────────────── */}
      <section id="vision-mission" className="vm-band" aria-label="Vision and Mission">
        <Container>
          <div className="vm-band__grid">
            <div className="vm-band__item">
              <span className="vm-band__icon"><VisionIcon /></span>
              <h2 className="vm-band__title">Vision</h2>
              <p className="vm-band__text">
                To lead globally in intelligent AI execution, enabling people and industries to operate with greater impact, agility, and autonomy.
              </p>
            </div>
            <div className="vm-band__item">
              <span className="vm-band__icon"><MissionIcon /></span>
              <h2 className="vm-band__title">Mission</h2>
              <p className="vm-band__text">
                We create competitive advantage through AI-driven execution that combines deep research, industry expertise, and organizational knowledge to deliver innovation, agility, and measurable impact at scale.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 1.1.3 Our Value Proposition ────────────────────────────────── */}
      <PageSection id="value-proposition" label="Our Value Proposition" title="Why Algovia">
        <div className="why-grid">
          {WHY_ALGOVIA.map((pillar, i) => (
            <article key={pillar.title} className={`why-card why-card--${i + 1}`}>
              <span className="why-card__num" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="why-card__title">{pillar.title}</h3>
              <p className="why-card__text">{pillar.body}</p>
            </article>
          ))}
        </div>
      </PageSection>

      {/* ── 1.1.4 The AI Value Gap ─────────────────────────────────────── */}
      <ValueGap />

      {/* ── Contact ────────────────────────────────────────────────────── */}
      <PageSection id="contact" title="Contact" elevated>
        <div className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--algovia-muted)]">
          <p>
            For general enquiries, partnerships, or media requests, use the form below or reach out to our offices directly.
          </p>
        </div>

        <div className="page-card-grid page-card-grid--2">
          {[
            {
              office: "UAE: Dubai Office",
              details: ["Office 1006/4, The Offices at Ibn Battuta Gate, Building 1006", "Jabal Ali First, Dubai, UAE"],
            },
            {
              office: "KSA: Jeddah Office",
              details: ["Bin Sulaiman Center, Floor 1, Office 101", "7452 Prince Sultan St, Al Khalidiya District", "Jeddah 23423, KSA"],
            },
          ].map(({ office, details }) => (
            <div key={office} className="page-card">
              <h3 className="page-card__title">{office}</h3>
              {details.map((d) => (
                <p key={d} className="page-card__text">{d}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-8 max-w-2xl grid gap-4 sm:grid-cols-2">
          <div className="page-card">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--algovia-green-ink)]">Email</p>
            <p className="mt-1 text-sm text-[var(--foreground)]">
              <a href="mailto:connect@algovia.ai" className="hover:underline">connect@algovia.ai</a>
            </p>
          </div>
          <div className="page-card">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--algovia-green-ink)]">LinkedIn</p>
            <p className="mt-1 text-sm text-[var(--foreground)]">
              <a href="https://www.linkedin.com/company/algoviaai/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                linkedin.com/company/algoviaai
              </a>
            </p>
          </div>
        </div>

        <div className="mt-10 max-w-xl">
          <h3 className="text-base font-semibold text-[var(--foreground)]">Send us a message</h3>
          <p className="mt-2 text-sm text-[var(--algovia-muted)]">
            To talk through an engagement, use{" "}
            <a href={SITE.workshopUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--algovia-green-ink)] underline">
              Request a Meeting
            </a>{" "}
            instead — this form is for general enquiries.
          </p>
          <LeadForm
            formType="contact"
            submitLabel="Send Message"
            fields={[
              { name: "name", label: "Name", type: "text", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "company", label: "Company", type: "text", required: false },
              { name: "message", label: "Message", type: "textarea", required: true, full: true },
            ]}
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <HeroCTAPrimary />
        </div>
      </PageSection>

      <CTASection
        eyebrow="Let's connect"
        heading="Every engagement starts with"
        headingAccent="a conversation."
        lead="Whether you're ready to start or just exploring — Algovia AI can help you think it through, and our team is ready to turn that into a plan."
      />
    </>
  );
}
