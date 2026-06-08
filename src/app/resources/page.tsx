import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/marketing/PageHero";
import PageSection from "@/components/marketing/PageSection";
import MarketingCTA from "@/components/marketing/MarketingCTA";
import { CASE_STUDIES } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Resources",
  description:
    "Case studies, documentation, and resources for AI-native engineering and enterprise transformation.",
  path: "/resources",
});

const RESOURCE_LINKS = [
  { id: "blog", title: "Blog", desc: "Insights on AI engineering, cloud, and enterprise delivery." },
  { id: "docs", title: "Documentation", desc: "Technical guides for platform integration and AI deployment." },
  { id: "help", title: "Help Center", desc: "Support resources and frequently asked questions." },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Learn how we build what matters"
        lead="Case studies, technical resources, and insights from Algovia's AI-native engineering practice."
      />
      <PageSection
        id="case-studies"
        label="Case Studies"
        title="Real impact. Real outcomes."
        elevated
      >
        <div className="page-card-grid page-card-grid--3">
          {CASE_STUDIES.map((study) => (
            <article key={study.id} className="page-card overflow-hidden p-0">
              <div className="relative aspect-[16/10] bg-[var(--surface-elevated)]">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover opacity-90"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--algovia-green)]">
                  {study.category}
                </span>
                <h3 className="page-card__title mt-1">{study.title}</h3>
                <p className="page-card__text">{study.description}</p>
                <Link
                  href="#"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[var(--algovia-green)] hover:text-[var(--algovia-green-light)]"
                >
                  View case study
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </PageSection>
      <PageSection title="More resources">
        <div className="page-card-grid">
          {RESOURCE_LINKS.map((link) => (
            <article key={link.id} id={link.id} className="page-card">
              <h3 className="page-card__title">{link.title}</h3>
              <p className="page-card__text">{link.desc}</p>
            </article>
          ))}
        </div>
      </PageSection>
      <MarketingCTA />
    </>
  );
}
