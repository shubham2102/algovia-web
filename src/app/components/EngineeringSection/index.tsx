"use client";

import SectionViewport from "@/components/ui/SectionViewport";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/animations/Reveal";
import { DELIVERY_PILLARS } from "@/lib/constants";

export default function EngineeringSection() {
  return (
    <SectionViewport id="solutions" className="section-band--elevated">
      <div className="section-intro mx-auto max-w-2xl text-center">
        <SectionLabel>AI + Engineering + Delivery</SectionLabel>
        <h2 className="text-[var(--foreground)]">Engineered for results</h2>
        <p>
          Move beyond experimentation. Algovia&apos;s AI delivers measurable
          performance gains across every industry.
        </p>
      </div>

      <div className="section-grid section-grid--3">
        {DELIVERY_PILLARS.map((pillar, i) => (
          <Reveal key={pillar.title} delay={i * 0.08}>
            <article
              data-reveal-item
              className="card-surface flex h-full flex-col rounded-2xl p-6 lg:p-8"
            >
              <p className="text-2xl font-bold gradient-text sm:text-3xl">
                {pillar.stat}
              </p>
              <p className="mt-2 text-xs font-medium tracking-wide text-[var(--algovia-muted)] uppercase">
                {pillar.statLabel}
              </p>
              <h3 className="mt-5 text-lg font-semibold text-[var(--foreground)]">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--algovia-muted)]">
                {pillar.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionViewport>
  );
}
