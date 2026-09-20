import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/marketing/PageHero";
import PageSection from "@/components/marketing/PageSection";
import CTASection from "@/app/components/CTASection";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Research & Learn",
  description:
    "Algovia AI Thought Leadership and Algovia Academy — insights, points of view, and AI training programmes for executives, practitioners, and technical teams.",
  path: "/research",
});

export default function ResearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Research & Learn"
        title="Knowledge built from execution, not theory"
        lead="Algovia shares what we learn from delivering AI transformation at scale — through thought leadership, points of view, and a dedicated training programme for the organizations we work with."
      />

      {/* ── Thought Leadership ─────────────────────────────────────────── */}
      <PageSection
        id="thought-leadership"
        label="Thought Leadership"
        title="Insights from the front line of AI execution"
        elevated
      >
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--algovia-muted)]">
          This section is a content hub for articles, points of view, and short-form insights on AI transformation, governance, and execution. Content is published as Algovia delivers and learns — more to come.
        </p>
        <p className="mt-4 text-sm italic text-[var(--algovia-muted)]">More to come.</p>
      </PageSection>

      {/* ── Algovia Academy ───────────────────────────────────────────── */}
      <PageSection
        id="academy"
        label="Algovia Academy"
        title="Building AI capability across your organization"
      >
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--algovia-muted)]">
          Algovia Academy is the public-facing brand for Algovia&apos;s training capability — directly extending our AI Training signature engagement into a standing, ongoing programme rather than a one-off deliverable.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {[
            {
              title: "Executive & Board AI Literacy",
              desc: "Short, high-level sessions for leadership audiences on what AI can and can't do, governance obligations, and change management.",
            },
            {
              title: "Practitioner Training",
              desc: "Role-based training for teams who will actually use AI day to day — tailored to your sector and specific workflows.",
            },
            {
              title: "Technical Upskilling",
              desc: "Deeper, hands-on tracks for internal technical teams working alongside Algovia on a build engagement.",
            },
          ].map((track) => (
            <article key={track.title} className="page-card">
              <h3 className="page-card__title">{track.title}</h3>
              <p className="page-card__text">{track.desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-[var(--algovia-border)] bg-[var(--surface-elevated)] p-6">
          <p className="text-sm font-semibold text-[var(--foreground)]">
            Academic credibility, commercial delivery
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--algovia-muted)]">
            Algovia&apos;s technical leadership includes active academic researchers — including an Assistant Professor role at a leading technical university. This is a credible, differentiated proof point for Academy content, reflecting the same rigour we apply to commercial AI builds.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/service-offerings?engagement=02#schedule" className="hero__cta-primary">
            Schedule a Training Conversation
          </Link>
          <Link
            href="/service-offerings#engage"
            className="inline-flex items-center rounded-full border border-[var(--algovia-border-strong)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
          >
            Explore Engagement Models
          </Link>
        </div>
      </PageSection>

      <CTASection
        eyebrow="Build AI capability"
        heading="Teams that use AI,"
        headingAccent="not just talk about it."
        lead="From executive literacy sessions to hands-on technical upskilling — Algovia Academy builds the capability your organization needs to get lasting value from AI."
      />
    </>
  );
}
