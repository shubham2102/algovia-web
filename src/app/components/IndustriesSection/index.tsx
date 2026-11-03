"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import { INDUSTRIES } from "@/lib/constants";

export default function IndustriesSection() {
  const [activeId, setActiveId] = useState<string>(INDUSTRIES[0].id);
  const active = INDUSTRIES.find((i) => i.id === activeId) ?? INDUSTRIES[0];

  return (
    <section id="industries" className="section-band border-t border-[var(--algovia-border)] py-[var(--section-padding-compact)]">
      <Container>
        <SectionLabel>Your sector. Our expertise.</SectionLabel>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl lg:text-4xl">
          AI built for your industry
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--algovia-muted)]">
          Practical AI, shaped around your challenges and built to deliver value. Pick a sector to see how we help.
        </p>

        <div className="sectors__chips" role="tablist" aria-label="Industries">
          {INDUSTRIES.map((industry) => (
            <button
              key={industry.id}
              type="button"
              role="tab"
              id={`sector-tab-${industry.id}`}
              aria-selected={industry.id === activeId}
              aria-controls="sector-panel"
              className="sectors__chip"
              onClick={() => setActiveId(industry.id)}
            >
              {industry.title.replace(/ \(.*\)$/, "")}
            </button>
          ))}
        </div>

        <div id="sector-panel" role="tabpanel" aria-labelledby={`sector-tab-${active.id}`} className="sectors__panel">
          <div>
            <h3>{active.title}</h3>
            <p>{active.description}</p>
          </div>
          <Link href={`/success-stories#${active.id}`} className="sectors__link">
            See success stories
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
