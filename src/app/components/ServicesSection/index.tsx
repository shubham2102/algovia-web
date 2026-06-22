"use client";

import Link from "next/link";
import { ArrowRight, Cloud, Code2, Database, Sparkles, Workflow } from "lucide-react";
import SectionViewport from "@/components/ui/SectionViewport";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/animations/Reveal";
import { SERVICES } from "@/lib/constants";

const colorMap: Record<string, string> = {
  purple: "bg-[var(--algovia-green-muted)] text-[var(--algovia-green)]",
  orange: "bg-orange-500/20 text-orange-400",
  green: "bg-emerald-500/20 text-emerald-400",
  blue: "bg-blue-500/20 text-blue-400",
  indigo: "bg-indigo-500/20 text-indigo-400",
};

const iconMap: Record<string, React.ElementType> = {
  code: Code2,
  sparkles: Sparkles,
  cloud: Cloud,
  database: Database,
  transform: Workflow,
};

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
              href="/platform"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--algovia-green)] hover:text-[var(--algovia-green-light)]"
            >
              See how we work
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="section-scroll max-h-[min(58dvh,520px)] space-y-3 overflow-y-auto pr-2 lg:max-h-[min(62dvh,560px)]">
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Code2;
            return (
              <Reveal key={service.title} delay={i * 0.04}>
                <article
                  data-reveal-item
                  className="card-surface flex gap-4 rounded-2xl p-4 transition-all sm:p-5"
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${colorMap[service.color]}`}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[var(--foreground)]">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--algovia-muted)]">
                      {service.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </SectionViewport>
  );
}
