"use client";

import Link from "next/link";
import { ArrowRight, Code2 } from "lucide-react";
import SectionViewport from "@/components/ui/SectionViewport";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/animations/Reveal";
import { SERVICES } from "@/lib/constants";

export default function ServicesSection() {
  return (
    <SectionViewport
      id="services"
      className="section-band border-t border-[var(--algovia-border)]"
    >
      <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-12 xl:grid-cols-[minmax(0,400px)_1fr] xl:gap-16">
        <Reveal>
          <div data-reveal-item className="flex flex-col justify-center">
            <SectionLabel>What Algovia AI Can Help You Do</SectionLabel>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl lg:text-4xl">
              From idea to impact. We&apos;ve got you.
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-[var(--algovia-muted)]">
              Specialized AI that fits your workflow — predictive, generative,
              and agentic systems engineered for measurable enterprise impact.
            </p>
            <Link
              href="/service-offerings"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--algovia-green)] hover:text-[var(--algovia-green-light)]"
            >
              View all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="section-scroll max-h-[min(58dvh,520px)] space-y-3 overflow-y-auto pr-2 lg:max-h-[min(62dvh,560px)]">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.04}>
              <article
                data-reveal-item
                className="card-surface flex gap-4 rounded-2xl p-4 transition-all sm:p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--algovia-green-muted)] text-[var(--algovia-green)] sm:h-12 sm:w-12">
                  <Code2 className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-semibold text-[var(--foreground)]">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--algovia-muted)]">
                    {service.whyNow}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionViewport>
  );
}
