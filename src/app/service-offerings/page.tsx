import type { Metadata } from "next";
import PageHero from "@/components/marketing/PageHero";
import PageSection from "@/components/marketing/PageSection";
import CTASection from "@/app/components/CTASection";
import ServicePortfolioTabs from "@/app/components/ServicePortfolioTabs";
import LeadForm from "@/components/forms/LeadForm";
import {
  AI_VALUE_GAP,
  AI_DIGITAL_SERVICES,
  INTELLIGENT_BUSINESS_SERVICES,
  ENGAGEMENTS,
} from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Service Offerings",
  description:
    "Algovia AI service portfolio — AI & Digital Solutions, Intelligent Business Solutions, and seven engagement models designed around your business outcomes.",
  path: "/service-offerings",
});

const SERVICE_CATEGORIES = [
  { id: "ai-digital", label: "AI & Digital Solutions", title: "The build capabilities behind Algovia's execution", services: AI_DIGITAL_SERVICES },
  { id: "intelligent-business", label: "Intelligent Business Solutions", title: "The governance and transformation capabilities Algovia embeds alongside every AI build", services: INTELLIGENT_BUSINESS_SERVICES },
] as const;

export default async function ServiceOfferingsPage({
  searchParams,
}: {
  searchParams: Promise<{ engagement?: string }>;
}) {
  const { engagement } = await searchParams;
  const preselectedEngagement = ENGAGEMENTS.find((e) => e.id === engagement)?.title;

  return (
    <>
      <PageHero
        eyebrow="Service Offerings"
        title="From strategy to execution, adoption, and value"
        lead="Most firms stop at strategy or software. Algovia combines business transformation expertise, deep operational understanding, and proven AI execution to embed intelligent AI into the decisions, workflows, and operating models that drive real performance."
      />

      {/* ── Our Value Proposition ──────────────────────────────────────── */}
      <PageSection
        id="value-proposition"
        label="Our Value Proposition"
        title="Why Algovia"
        elevated
      >
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Senior Business Transformation Expertise",
              body: "Our team has led enterprise-scale transformation programs across governments and large corporations as accountable execution owners, not just advisers.",
            },
            {
              title: "Deep Cross-Sector Operational Understanding",
              body: "Having operated inside the functions & industry sectors we transform, we design solutions tailored to how your business actually works. No generic frameworks.",
            },
            {
              title: "Proven AI Design & Execution Capability",
              body: "With 700+ cross-disciplinary AI professionals, we bring deep technical expertise that is rarely available in a single partner.",
            },
            {
              title: "Digital Transformation & Change Management",
              body: "Deploying AI without managing change guarantees failure. Our proven approach embeds governance, business ownership, and process redesign into every engagement.",
            },
          ].map((pillar) => (
            <article key={pillar.title} className="page-card">
              <h3 className="page-card__title">{pillar.title}</h3>
              <p className="page-card__text">{pillar.body}</p>
            </article>
          ))}
        </div>

        {/* AI Value Gap */}
        <h3 className="mt-12 text-lg font-semibold text-[var(--foreground)]">
          The AI Value Gap: the problem we solve
        </h3>

        {/* Desktop/tablet: table. Narrow columns truncate awkwardly below ~700px,
            so mobile gets a stacked-card layout instead (see below). */}
        <div className="mt-4 hidden overflow-x-auto sm:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--algovia-border)]">
                <th className="pb-3 pr-6 text-left font-semibold text-[var(--foreground)] w-1/4">Failure Mode</th>
                <th className="pb-3 pr-6 text-left font-semibold text-[var(--foreground)] w-[37.5%]">The Problem</th>
                <th className="pb-3 text-left font-semibold text-[var(--foreground)] w-[37.5%]">How Algovia Solves It</th>
              </tr>
            </thead>
            <tbody>
              {AI_VALUE_GAP.map((item) => (
                <tr key={item.id} className="border-b border-[var(--algovia-border)]">
                  <td className="py-4 pr-6 align-top">
                    <span className="text-[10px] font-bold text-[var(--algovia-green)] uppercase tracking-wider">{item.id}</span>
                    <p className="mt-1 font-medium text-[var(--foreground)]">{item.title}</p>
                  </td>
                  <td className="py-4 pr-6 align-top text-[var(--algovia-muted)] leading-relaxed">{item.problem}</td>
                  <td className="py-4 align-top text-[var(--algovia-muted)] leading-relaxed">{item.solution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: stacked cards */}
        <div className="mt-4 space-y-4 sm:hidden">
          {AI_VALUE_GAP.map((item) => (
            <article key={item.id} className="page-card">
              <span className="text-[10px] font-bold text-[var(--algovia-green)] uppercase tracking-wider">{item.id}</span>
              <h4 className="mt-1 font-medium text-[var(--foreground)]">{item.title}</h4>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-wide text-[var(--algovia-muted)]">The Problem</p>
              <p className="page-card__text">{item.problem}</p>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-wide text-[var(--algovia-muted)]">How Algovia Solves It</p>
              <p className="page-card__text">{item.solution}</p>
            </article>
          ))}
        </div>
      </PageSection>

      {/* ── Our Service Portfolio ──────────────────────────────────────── */}
      <PageSection
        id="ai-digital"
        label="Our Service Portfolio"
        title="Twelve capabilities across two categories"
      >
        <ServicePortfolioTabs categories={SERVICE_CATEGORIES} />
      </PageSection>

      {/* ── Let's Engage ──────────────────────────────────────────────── */}
      <PageSection
        id="engage"
        label="Let's Engage"
        title="Seven engagement models, each scoped around a business outcome"
        elevated
      >
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ENGAGEMENTS.map((eng) => (
            <article key={eng.id} className="page-card flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <h3 className="page-card__title flex-1">{eng.title}</h3>
                <span className="shrink-0 rounded-full bg-[var(--algovia-green)] px-2 py-0.5 text-[10px] font-bold text-white">
                  {eng.id}
                </span>
              </div>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--algovia-muted)]">
                {eng.format}
              </p>
              <p className="page-card__text flex-1">{eng.description}</p>
              <p className="mt-3 text-xs font-medium text-[var(--algovia-green)] italic">{eng.outcome}</p>
            </article>
          ))}
        </div>
      </PageSection>

      {/* ── Schedule a Meeting ─────────────────────────────────────────── */}
      <PageSection id="schedule" title="Schedule a Meeting">
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--algovia-muted)]">
          Every engagement starts with a conversation about the outcome you are aiming to achieve, not a generic sales call. So let&apos;s connect!
        </p>
        <div className="mt-6 max-w-2xl">
          <LeadForm
            formType="schedule"
            submitLabel="Request a Meeting"
            defaults={preselectedEngagement ? { areaOfInterest: preselectedEngagement } : undefined}
            fields={[
              { name: "fullName", label: "Full name", type: "text", required: true },
              { name: "workEmail", label: "Work email", type: "email", required: true },
              { name: "companyName", label: "Company name", type: "text", required: true },
              { name: "jobTitle", label: "Job title / role", type: "text", required: true },
              {
                name: "country",
                label: "Country / market",
                type: "select",
                required: true,
                options: ["UAE", "KSA", "Europe", "Australia", "Other"],
              },
              {
                name: "areaOfInterest",
                label: "Area of interest",
                type: "select",
                required: true,
                options: [...ENGAGEMENTS.map((e) => e.title), "Not sure yet"],
              },
              {
                name: "meetingFormat",
                label: "Preferred meeting format",
                type: "select",
                required: true,
                options: ["Video call", "In-person"],
              },
              { name: "message", label: "Message", type: "textarea", required: false, full: true },
            ]}
          />
        </div>
      </PageSection>

      <CTASection
        eyebrow="Let's scope your engagement"
        heading="Every engagement starts with"
        headingAccent="your outcome."
        lead="Talk to Algovia AI to explore which engagement model fits your situation — or schedule a meeting with our team directly."
      />
    </>
  );
}
