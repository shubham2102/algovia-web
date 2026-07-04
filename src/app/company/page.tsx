import type { Metadata } from "next";
import PageHero from "@/components/marketing/PageHero";
import PageSection from "@/components/marketing/PageSection";
import CTASection from "@/app/components/CTASection";
import { SITE } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Company",
  description:
    "About Algovia — AI-native engineering and consulting for enterprises and ambitious startups.",
  path: "/company",
});

const SECTIONS = [
  {
    id: "about",
    title: "About Algovia",
    body: "Algovia is an AI-native engineering and consulting company. We help enterprises and ambitious startups design, build, and scale AI-native products and platforms — from strategy to production.",
  },
  {
    id: "careers",
    title: "Careers",
    body: "Join a team building the next generation of enterprise AI systems. We're hiring engineers, architects, and AI specialists across cloud, data, and agentic AI.",
  },
  {
    id: "press",
    title: "Press",
    body: "Media inquiries and press releases. Contact us for executive interviews, product announcements, and partnership news.",
  },
  {
    id: "contact",
    title: "Contact",
    body: "Ready to start a conversation? Talk to Algovia AI on our homepage or schedule a solution workshop with our experts.",
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    body: "Algovia respects your privacy. Our privacy policy outlines how we collect, use, and protect your information.",
  },
  {
    id: "terms",
    title: "Terms of Service",
    body: "Terms and conditions governing use of Algovia services and digital properties.",
  },
  {
    id: "cookies",
    title: "Cookie Policy",
    body: "Information about cookies and tracking technologies used on Algovia websites.",
  },
  {
    id: "security",
    title: "Security & Trust",
    body: "Enterprise-grade security practices, compliance frameworks, and data protection standards.",
  },
];

export default function CompanyPage() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        title="Business AI that works for you"
        lead="AI-native engineering, cloud platforms, and enterprise digital transformation — built for measurable outcomes."
      />
      {SECTIONS.map((section, i) => (
        <PageSection
          key={section.id}
          id={section.id}
          title={section.title}
          elevated={i % 2 === 0}
        >
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--algovia-muted)]">
            {section.body}
          </p>
          {section.id === "contact" && (
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/#ai-panel" className="hero__cta-primary">
                Talk to Algovia AI
              </a>
              <a
                href={SITE.workshopUrl}
                className="inline-flex items-center rounded-full border border-[var(--algovia-border-strong)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
              >
                Schedule a Workshop
              </a>
            </div>
          )}
        </PageSection>
      ))}
      <CTASection
        eyebrow="Get in touch"
        heading="Build something"
        headingAccent="remarkable together."
        lead="Whether you're ready to start or just exploring — Algovia AI can help you think it through, and our team is ready to turn that into a plan."
      />
    </>
  );
}
