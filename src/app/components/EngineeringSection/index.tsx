"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import SectionLabel from "@/components/ui/SectionLabel";
import { gsap, ScrollTrigger, registerGsapPlugins } from "@/lib/gsap";
import { DELIVERY_PILLARS } from "@/lib/constants";
import "./engineering.css";

export default function EngineeringSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef   = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const section = sectionRef.current;
      const cards   = stackRef.current?.querySelectorAll<HTMLElement>(".eng-card");
      if (!section || !cards?.length) return;

      let trigger: ReturnType<typeof ScrollTrigger.create> | undefined;

      function setup() {
        cleanup();
        cards!.forEach((card) => gsap.set(card, { clearProps: "all" }));

        // Pin + animation only on desktop — mobile stacks vertically
        if (window.innerWidth < 1024) return;

        const totalCards = cards!.length;

        trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${window.innerHeight * totalCards}px`,
          pin: true,
          pinSpacing: true,
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress * totalCards;

            cards!.forEach((card, i) => {
              // How far this card has travelled (0 = not started, 1 = fully in)
              const cardProgress = gsap.utils.clamp(0, 1, progress - i);
              // How far the NEXT card has started entering (pushes this one back)
              const nextCardProgress = gsap.utils.clamp(0, 1, progress - (i + 1));

              gsap.set(card, {
                y: gsap.utils.interpolate("200%", "-50%", cardProgress),
                scale: gsap.utils.interpolate(1, 0.85, nextCardProgress),
                "--overlay-opacity": gsap.utils.interpolate(
                  0,
                  1,
                  nextCardProgress * 0.5,
                ),
              });
            });
          },
        });
      }

      function cleanup() {
        trigger?.kill();
        trigger = undefined;
      }

      setup();

      let resizeTimer: ReturnType<typeof setTimeout>;
      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setup, 250);
      };

      window.addEventListener("resize", onResize);

      return () => {
        cleanup();
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", onResize);
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="eng section-band--elevated"
      aria-label="Algovia engineering and delivery"
    >
      <div className="eng__inner">

        {/* ── Left: static copy ─────────────────────────────────────────────── */}
        <div className="eng__header">
          <SectionLabel>AI + Engineering + Delivery</SectionLabel>
          <h2 className="eng__heading">Engineered for results</h2>
          <p className="eng__lead">
            Move beyond experimentation. Algovia&apos;s AI delivers measurable
            performance gains across every industry.
          </p>
        </div>

        {/* ── Right: scroll-stacking cards ──────────────────────────────────── */}
        <div ref={stackRef} className="eng__stack">
          {DELIVERY_PILLARS.map((pillar) => (
            <div key={pillar.title} className="eng-card">
              <p className="eng-card__stat">{pillar.stat}</p>
              <p className="eng-card__stat-label">{pillar.statLabel}</p>
              <div className="eng-card__divider" aria-hidden />
              <h3 className="eng-card__title">{pillar.title}</h3>
              <p className="eng-card__desc">{pillar.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
