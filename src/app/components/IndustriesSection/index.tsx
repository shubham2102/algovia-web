"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import SectionLabel from "@/components/ui/SectionLabel";
import { gsap, ScrollTrigger, registerGsapPlugins } from "@/lib/gsap";
import { INDUSTRIES } from "@/lib/constants";
import "./industries.css";

// How fast each panel transitions in/out — 1/SPEED fraction of a scroll segment
const SPEED = 6;

export default function IndustriesSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const panelsRef   = useRef<HTMLDivElement>(null);
  const tabsRef     = useRef<HTMLDivElement>(null);
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  // Keep the active tab visible when the list scrolls internally (short
  // viewports where all tabs don't fit — see .ind__tabs). Driven off React
  // state rather than the GSAP scrub callback so it isn't racy with the
  // pin's lifecycle at the very end of the scroll range.
  useEffect(() => {
    tabButtonRefs.current[activeIdx]?.scrollIntoView({ block: "nearest", behavior: "auto" });
  }, [activeIdx]);

  useGSAP(
    () => {
      registerGsapPlugins();
      const section = sectionRef.current;
      const panels  = panelsRef.current?.querySelectorAll<HTMLElement>(".ind-panel");
      const bars    = tabsRef.current?.querySelectorAll<HTMLElement>(".ind-tab__bar");

      if (!section || !panels || !panels.length || !bars || !bars.length) return;

      const n = panels.length;

      // ── Initial state: first panel visible, rest off to the right ──────────
      panels.forEach((panel, i) => {
        gsap.set(panel, { opacity: i === 0 ? 1 : 0, x: i === 0 ? 0 : 32 });
      });
      bars.forEach((bar) => gsap.set(bar, { scaleX: 0 }));

      let trigger: ReturnType<typeof ScrollTrigger.create> | undefined;

      function setup() {
        cleanup();
        if (window.innerWidth < 1024) return;

        // Reset to initial state on re-setup (e.g. resize)
        panels!.forEach((panel, i) => {
          gsap.set(panel, { opacity: i === 0 ? 1 : 0, x: i === 0 ? 0 : 32 });
        });
        bars!.forEach((bar) => gsap.set(bar, { scaleX: 0 }));
        setActiveIdx(0);

        let prevIdx = 0;

        trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${window.innerHeight * n}px`,
          pin: true,
          pinSpacing: true,
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress * n; // 0 → n

            // ── Content panels: crossfade + slide ──────────────────────────
            panels!.forEach((panel, i) => {
              const isLast = i === n - 1;
              // enter: 0→1 in first (1/SPEED) of this panel's segment
              const enter = gsap.utils.clamp(0, 1, (progress - i) * SPEED);
              // exit: 0→1 in first (1/SPEED) of the NEXT segment (= last 1/SPEED of this one)
              const exit  = isLast
                ? 0
                : gsap.utils.clamp(0, 1, (progress - i - 1) * SPEED);

              const opacity = enter * (1 - exit);
              // slides in from +32px, out to -32px
              const x = (1 - enter) * 32 - exit * 32;

              gsap.set(panel, { opacity, x });
            });

            // ── Tab fill bars ───────────────────────────────────────────────
            bars!.forEach((bar, i) => {
              const barFill = gsap.utils.clamp(0, 1, progress - i);
              gsap.set(bar, { scaleX: barFill });
            });

            // ── React state: only update when active tab changes ────────────
            const idx = Math.min(n - 1, Math.floor(progress));
            if (idx !== prevIdx) {
              prevIdx = idx;
              setActiveIdx(idx);
            }
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
      id="industries"
      className="ind section-band"
      style={{ borderTop: "1px solid var(--algovia-border)" }}
      aria-label="Algovia industry use cases"
    >
      <div className="ind__inner">

        {/* ── Left: header + tabs ─────────────────────────────────────────── */}
        <div className="ind__header">
          <SectionLabel>Success Stories</SectionLabel>
          <h2 className="ind__heading">
            AI delivering results across sectors
          </h2>
          <p className="ind__lead">
            From governments and energy operators to healthcare innovators and
            retail manufacturers — Algovia delivers AI that moves from strategy
            to measurable business impact.
          </p>

          <Link
            href="/success-stories"
            className="ind-panel__cta mt-0 mb-2"
          >
            View all success stories
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>

          <div ref={tabsRef} className="ind__tabs" role="tablist">
            {INDUSTRIES.map((ind, i) => (
              <button
                key={ind.id}
                ref={(el) => {
                  tabButtonRefs.current[i] = el;
                }}
                role="tab"
                type="button"
                aria-selected={activeIdx === i}
                className={`ind-tab${activeIdx === i ? " ind-tab--active" : ""}`}
                onClick={() => {
                  setActiveIdx(i);
                  // On desktop, scrolling is the primary driver — click just scrolls
                  if (window.innerWidth >= 1024) {
                    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <span className="ind-tab__bar" aria-hidden />
                <span className="ind-tab__num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="ind-tab__label">{ind.title}</span>
                <ArrowRight className="ind-tab__arrow h-3.5 w-3.5" strokeWidth={2.5} />
              </button>
            ))}
          </div>
        </div>

        {/* ── Right: content panels ───────────────────────────────────────── */}
        <div ref={panelsRef} className="ind__panels" role="tabpanel">
          {INDUSTRIES.map((ind, i) => (
            <div
              key={ind.id}
              className="ind-panel"
              aria-hidden={activeIdx !== i}
            >
              <div className="ind-panel__card">
                <div className="ind-panel__metric">
                  <p className="ind-panel__metric-value">{ind.metric}</p>
                  <p className="ind-panel__metric-label">{ind.metricLabel}</p>
                </div>

                <div className="ind-panel__divider" aria-hidden />

                <h3 className="ind-panel__title">{ind.title}</h3>
                <p className="ind-panel__desc">{ind.description}</p>
                <Link
                  href={`/success-stories#${ind.id}`}
                  className="ind-panel__cta"
                  tabIndex={activeIdx !== i ? -1 : 0}
                >
                  View {ind.title} stories
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
