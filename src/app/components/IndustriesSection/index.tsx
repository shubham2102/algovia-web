"use client";

import { useState } from "react";
import SectionViewport from "@/components/ui/SectionViewport";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/animations/Reveal";
import { INDUSTRIES } from "@/lib/constants";

export default function IndustriesSection() {
  const [active, setActive] = useState(0);
  const industry = INDUSTRIES[active];

  return (
    <SectionViewport
      id="industries"
      className="section-band border-t border-[var(--algovia-border)]"
    >
      <Reveal>
        <div
          data-reveal-item
          className="section-intro mx-auto max-w-2xl text-center lg:mx-0 lg:text-left"
        >
          <SectionLabel>Industry Use Cases</SectionLabel>
          <h2 className="text-[var(--foreground)]">
            Specialized AI that fits your workflow
          </h2>
          <p>
            Unlock hidden revenue. Accelerate operations. Build smarter with
            vertical AI tailored to your business.
          </p>
        </div>
      </Reveal>

      <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
        {INDUSTRIES.map((ind, i) => (
          <button
            key={ind.id}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all sm:px-5 sm:py-2.5 ${
              active === i
                ? "bg-[var(--gradient-brand)] text-white shadow-lg shadow-[rgba(2,187,115,0.25)]"
                : "card-surface text-[var(--algovia-muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {ind.title}
          </button>
        ))}
      </div>

      <Reveal delay={0.1}>
        <article
          data-reveal-item
          className="card-surface rounded-2xl p-6 sm:p-8 lg:p-10"
        >
          <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <div className="max-w-2xl">
              <h3 className="text-xl font-bold text-[var(--foreground)] sm:text-2xl">
                {industry.title}
              </h3>
              <p className="mt-4 leading-relaxed text-[var(--algovia-muted)]">
                {industry.description}
              </p>
            </div>
            <div className="shrink-0 rounded-xl border border-[rgba(2,187,115,0.2)] bg-[var(--algovia-green-muted)] px-8 py-5">
              <p className="text-2xl font-bold text-[var(--algovia-green)] sm:text-3xl">
                {industry.metric}
              </p>
              <p className="mt-2 text-xs text-[var(--algovia-muted)]">
                {industry.metricLabel}
              </p>
            </div>
          </div>
        </article>
      </Reveal>
    </SectionViewport>
  );
}
