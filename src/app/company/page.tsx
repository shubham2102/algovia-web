import type { Metadata } from "next";
import PageHero from "@/components/marketing/PageHero";
import PageSection from "@/components/marketing/PageSection";
import CTASection from "@/app/components/CTASection";
import { createPageMetadata } from "@/lib/metadata";
import { FOUNDERS } from "@/lib/team";
import { INDUSTRIES } from "@/lib/constants";
import LeadForm from "@/components/forms/LeadForm";
import { HeroCTAPrimary } from "@/components/ui/AILink";

export const metadata: Metadata = createPageMetadata({
  title: "Company",
  description:
    "About Algovia AI — an AI Transformation and Execution firm helping organizations move from strategy to execution, adoption, and measurable value.",
  path: "/company",
});

export default function CompanyPage() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        title="The partner that connects strategy and execution"
        lead="We are not a traditional consultancy. We are not a software vendor. We are the partner that connects both, and stays accountable until AI becomes business as usual."
      />

      {/* ── About Us ────────────────────────────────────────────────────── */}
      <PageSection id="about" title="About Algovia AI" elevated>
        <div className="mt-4 max-w-3xl space-y-4 text-sm leading-relaxed text-[var(--algovia-muted)]">
          <p>
            Algovia AI is a leading AI Transformation and Execution firm that helps organizations move from strategy to execution, adoption, and measurable value. We combine senior business transformation expertise with AI build capability to deliver solutions embedded into operating models, workflows, governance, and performance management.
          </p>
          <blockquote className="pull-quote">
            &ldquo;We are not a traditional consultancy. We are not a software vendor. We are the partner that connects both, and stays accountable until AI becomes business as usual.&rdquo;
          </blockquote>
          <p>
            Algovia AI works primarily with Boards and Executive teams across governments and enterprises in the UAE, the Kingdom of Saudi Arabia, Europe, and Australia, backed by an international network of AI and industry experts, and delivered through an advisory, implementation, and value-realization engagement model.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {[
            { label: "Founded by",          value: "Business transformation executives & AI builders" },
            { label: "Markets",             value: "UAE · KSA · Europe · Australia" },
            { label: "Primary clients",     value: "Boards & Executives across governments and enterprises" },
            { label: "Engagement model",    value: "Advisory, implementation & value realization" },
            { label: "Network",             value: "700+ AI & industry professionals" },
          ].map(({ label, value }) => (
            <div key={label} className="page-card">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--algovia-green)]">{label}</p>
              <p className="mt-1 text-xs leading-snug text-[var(--foreground)]">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="text-base font-semibold text-[var(--foreground)]">Vision</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--algovia-muted)]">
            To lead globally in intelligent AI execution, enabling people and industries to operate with greater impact, agility, and autonomy.
          </p>
        </div>
        <div className="mt-6">
          <h3 className="text-base font-semibold text-[var(--foreground)]">Mission</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--algovia-muted)]">
            We create competitive advantage through AI-driven execution that combines deep research, industry expertise, and the activation of organizational knowledge to deliver innovation, agility, and measurable impact at scale.
          </p>
        </div>
      </PageSection>

      {/* ── Our Founders ───────────────────────────────────────────────── */}
      <PageSection id="founders" title="Our Founders">
        <div className="page-card-grid page-card-grid--2">
          {FOUNDERS.map((founder) => (
            <article key={founder.name} className="page-card">
              <h3 className="page-card__title">{founder.name}</h3>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--algovia-green)]">{founder.role}</p>
              <p className="mt-0.5 text-xs text-[var(--algovia-muted)]">{founder.subtitle}</p>
              <p className="page-card__text mt-3">{founder.bio}</p>
            </article>
          ))}
        </div>
      </PageSection>

      {/* ── Press ──────────────────────────────────────────────────────── */}
      <PageSection id="press" label="Press Releases" title="Press" elevated>
        <div className="newsroom-feed">
          <p className="newsroom-feed__note">
            No press releases yet — this newsroom will fill in as milestones occur. More to come.
          </p>
          <div className="newsroom-feed__categories">
            {[
              "Company Milestones & Funding",
              "Strategic Partnerships",
              "Major Client Engagements",
              "Awards & Recognition",
              "Executive Appointments",
            ].map((category) => (
              <span key={category} className="newsroom-feed__tag">
                {category}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 max-w-2xl space-y-3 text-sm leading-relaxed text-[var(--algovia-muted)]">
          <h3 className="text-base font-semibold text-[var(--foreground)]">Engaging with our Community</h3>
          <p>
            Algovia AI&apos;s impact isn&apos;t limited to client engagements. We invest in the wider AI ecosystem across the region by sharing what we learn, supporting the next generation of AI talent, and contributing to the conversations shaping how AI is adopted responsibly.
          </p>
          <p className="text-xs">
            For media enquiries, please use the contact form below or reach out via LinkedIn.
          </p>
        </div>
      </PageSection>

      {/* ── Careers & Network ──────────────────────────────────────────── */}
      <PageSection id="careers" title="Careers & Network">
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          {/* Careers */}
          <div>
            <h3 className="text-base font-semibold text-[var(--foreground)]">Careers</h3>
            <p className="mt-3 text-sm font-semibold text-[var(--algovia-green)]">Build what comes after the pilot.</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--algovia-muted)]">
              We&apos;re a growing team of 700+ cross-disciplinary professionals across Artificial Intelligence, Software Engineering, Data Analytics, Business Intelligence, and Digital and Business Transformation.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--algovia-muted)]">
              If you want to be part of our team and journey, we want to hear from you!
            </p>
            <LeadForm
              formType="careers"
              submitLabel="Apply Now"
              fields={[
                { name: "fullName", label: "Full name", type: "text", required: true },
                { name: "email", label: "Email address", type: "email", required: true },
                { name: "phone", label: "Phone number", type: "tel", required: true },
                { name: "linkedin", label: "LinkedIn profile URL", type: "text", required: false },
                { name: "expertise", label: "Area of expertise / discipline", type: "text", required: true, full: true },
                { name: "cv", label: "CV / resume upload", type: "file", required: true, accept: ".pdf,.doc,.docx", full: true },
                { name: "coverNote", label: "Cover note", type: "textarea", required: false, full: true },
              ]}
            />
          </div>

          {/* Network */}
          <div>
            <h3 className="text-base font-semibold text-[var(--foreground)]">Join Algovia&apos;s Network</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--algovia-muted)]">
              Beyond our core team, Algovia AI works with an international network of AI and industry experts who offer specific deep sector or technical expertise where needed.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--algovia-muted)]">
              If you&apos;re a senior practitioner, former operator, or industry specialist who wants to work on select AI transformation engagements, apply to join Algovia&apos;s expert network.
            </p>
            <LeadForm
              formType="network"
              submitLabel="Join the Network"
              fields={[
                { name: "fullName", label: "Full name", type: "text", required: true },
                { name: "email", label: "Email address", type: "email", required: true },
                { name: "phone", label: "Phone number", type: "tel", required: true },
                { name: "linkedin", label: "LinkedIn profile URL", type: "text", required: true },
                {
                  name: "expertise",
                  label: "Area of expertise",
                  type: "select",
                  required: true,
                  options: INDUSTRIES.map((industry) => industry.title),
                },
                { name: "experience", label: "Years of experience", type: "text", required: true },
                { name: "cv", label: "CV / resume upload", type: "file", required: true, accept: ".pdf,.doc,.docx", full: true },
              ]}
            />
          </div>
        </div>
      </PageSection>

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
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--algovia-green)]">Email</p>
            <p className="mt-1 text-sm text-[var(--foreground)]">
              <a href="mailto:connect@algovia.ai" className="hover:underline">connect@algovia.ai</a>
            </p>
          </div>
          <div className="page-card">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--algovia-green)]">LinkedIn</p>
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
            For sales conversations, use{" "}
            <a href="/service-offerings#schedule" className="text-[var(--algovia-green)] hover:underline">
              Schedule a Meeting
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
