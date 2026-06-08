"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionViewport from "@/components/ui/SectionViewport";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/animations/Reveal";
import { CASE_STUDIES } from "@/lib/constants";

export default function CaseStudiesSection() {
  return (
    <SectionViewport className="section-band--elevated">
      <Reveal>
        <div data-reveal-item className="section-intro max-w-3xl">
          <SectionLabel>Case Studies</SectionLabel>
          <p className="text-xs font-semibold tracking-[0.15em] text-[var(--algovia-muted)] uppercase">
            Real impact. Real outcomes.
          </p>
          <h2 className="text-[var(--foreground)]">See how we build what matters</h2>
        </div>
      </Reveal>

      <div className="section-grid section-grid--4">
        {CASE_STUDIES.map((study, i) => (
          <Reveal key={study.id} delay={i * 0.05}>
            <article
              data-reveal-item
              className="card-surface group flex h-full flex-col overflow-hidden rounded-2xl transition-all"
            >
              <div className="relative aspect-[5/3] shrink-0 overflow-hidden bg-[var(--surface-elevated)] sm:aspect-[4/3]">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-card)] via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-md bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                  {study.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-base font-semibold text-[var(--foreground)]">
                  {study.title}
                </h3>
                <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-[var(--algovia-muted)]">
                  {study.description}
                </p>
                <Link
                  href="#"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[var(--algovia-green)] hover:text-[var(--algovia-green-light)]"
                >
                  View case study
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionViewport>
  );
}
