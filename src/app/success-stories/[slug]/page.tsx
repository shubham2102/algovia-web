import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import CTASection from "@/app/components/CTASection";
import DacLogo from "@/components/ui/DacLogo";
import { ALL_CASE_STUDIES, getCaseStudy, splitClientTitle } from "@/lib/case-studies";
import { createPageMetadata } from "@/lib/metadata";
import "@/components/marketing/marketing.css";

export function generateStaticParams() {
  return ALL_CASE_STUDIES.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const found = getCaseStudy(slug);
  if (!found) return {};
  const { name, headline } = splitClientTitle(found.study.client);
  return createPageMetadata({
    title: `${name}${headline ? `: ${headline}` : ""}`,
    description: found.study.challenge,
    path: `/success-stories/${slug}`,
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = getCaseStudy(slug);
  if (!found) notFound();

  const { study, sector } = found;
  const { name, headline } = splitClientTitle(study.client);
  const siblings = sector.studies.filter((s) => s.id !== study.id).slice(0, 3);

  return (
    <>
      <section className="page-hero page-hero--compact">
        <div className="page-hero__bg" aria-hidden />
        <Container>
          <div className="page-hero__inner">
            <Link href={`/success-stories#${sector.id}`} className="story-back">
              <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
              All success stories
            </Link>
            <p className="page-hero__eyebrow">{sector.title}</p>
            <h1 className="page-hero__title">{name}</h1>
            {headline && <p className="page-hero__lead">{headline}</p>}
            <div className="story-partner">
              <span>Delivered by</span>
              <DacLogo className="story-partner__logo" />
            </div>
          </div>
        </Container>
      </section>

      <section className="page-section">
        <Container>
          <div className="story-detail">
            <div className="story-detail__block">
              <p className="story-detail__label">Challenge</p>
              <p className="story-detail__text">{study.challenge}</p>
            </div>
            <div className="story-detail__block">
              <p className="story-detail__label">Solution</p>
              <p className="story-detail__text">{study.solution}</p>
            </div>
            <div className="story-detail__block">
              <p className="story-detail__label">Results</p>
              <ul className="story-detail__results">
                {study.results.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <div className="story-detail__block">
              <p className="story-detail__label">Technology</p>
              <p className="story-detail__text story-detail__text--tech">{study.tech}</p>
            </div>
          </div>
        </Container>
      </section>

      {siblings.length > 0 && (
        <section className="page-section page-section--elevated">
          <Container>
            <h2 className="page-section__title">More in {sector.shortTitle}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {siblings.map((s) => {
                const { name: siblingName, headline: siblingHeadline } = splitClientTitle(s.client);
                return (
                  <Link key={s.id} href={`/success-stories/${s.id}`} className="page-card block">
                    <h3 className="page-card__title">{siblingName}</h3>
                    {siblingHeadline && <p className="story-card__headline">{siblingHeadline}</p>}
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      <CTASection
        eyebrow="Your sector. Our expertise."
        heading="AI built for"
        headingAccent="your industry."
        lead="Practical AI, shaped around your challenges and built to deliver value."
      />
    </>
  );
}
