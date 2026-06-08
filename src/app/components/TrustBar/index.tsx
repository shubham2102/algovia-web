"use client";

import SectionViewport from "@/components/ui/SectionViewport";
import Reveal from "@/components/animations/Reveal";
import { TRUST_LOGOS } from "@/lib/constants";

export default function TrustBar() {
  const doubled = [...TRUST_LOGOS, ...TRUST_LOGOS];

  return (
    <SectionViewport
      bleed
      size="compact"
      className="border-y border-[var(--algovia-border)] bg-[var(--surface)]"
    >
      <Reveal className="w-full">
        <p
          data-reveal-item
          className="text-center text-xs font-semibold tracking-[0.18em] text-[var(--algovia-muted)] uppercase"
        >
          Trusted by forward-thinking companies
        </p>
      </Reveal>

      <div className="relative w-full overflow-hidden py-2">
        <div className="animate-marquee flex w-max gap-12 px-8 sm:gap-20">
          {doubled.map((logo, i) => (
            <span
              key={`${logo}-${i}`}
              className="shrink-0 text-2xl font-bold tracking-tight text-white/20 sm:text-3xl lg:text-4xl"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </SectionViewport>
  );
}
