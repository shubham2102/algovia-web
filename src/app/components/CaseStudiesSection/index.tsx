"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import SectionViewport from "@/components/ui/SectionViewport";
import SectionLabel from "@/components/ui/SectionLabel";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { CASE_STUDIES } from "@/lib/constants";
import "./casestudies.css";

export default function CaseStudiesSection() {
  const introRef = useRef<HTMLDivElement>(null);
  const gridRef  = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const intro = introRef.current;
      const grid  = gridRef.current;
      if (!intro || !grid) return;

      // ── Header: label + heading fade up ──────────────────────────────────
      gsap.from(Array.from(intro.children), {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: intro,
          start: "top 88%",
          once: true,
        },
      });

      // ── Cards: staggered entrance from below ──────────────────────────────
      const cards = grid.querySelectorAll<HTMLElement>(".cs-card");
      if (!cards.length) return;

      gsap.from(cards, {
        opacity: 0,
        y: 56,
        scale: 0.97,
        duration: 0.65,
        stagger: { amount: 0.45, from: "start" },
        ease: "power2.out",
        clearProps: "scale",
        scrollTrigger: {
          trigger: grid,
          start: "top 84%",
          once: true,
        },
      });
    },
    { scope: introRef },
  );

  return (
    <SectionViewport
      className="cs section-band--elevated"
      containerClassName="flex flex-col gap-[var(--section-stack-gap)]"
    >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div ref={introRef} className="cs__intro">
          <SectionLabel>Real impact. Real outcomes.</SectionLabel>
          <h2 className="cs__heading">See how we build what matters.</h2>
        </div>

        {/* ── Card grid ──────────────────────────────────────────────────── */}
        <div ref={gridRef} className="cs__grid">
          {CASE_STUDIES.map((study) => (
            <article key={study.id} className="cs-card">
              {/* Image */}
              <div className="cs-card__img-wrap">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="cs-card__img"
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                />
                <div className="cs-card__img-fade" aria-hidden />
                <span className="cs-card__badge">{study.category}</span>
              </div>

              {/* Body */}
              <div className="cs-card__body">
                <h3 className="cs-card__title">{study.title}</h3>
                <p className="cs-card__desc">{study.description}</p>
                <Link href="/resources#case-studies" className="cs-card__cta">
                  View case study
                  <ArrowUpRight className="cs-card__cta-icon h-3.5 w-3.5" strokeWidth={2.5} />
                </Link>
              </div>
            </article>
          ))}
        </div>
    </SectionViewport>
  );
}
