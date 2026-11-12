"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

// Elements that fade/slide in as they enter the viewport. Pages stay server
// components; this single client component animates whatever matches on each
// route change.
const TARGETS = [
  ".page-hero__inner > *",
  ".page-section__label",
  ".page-section__title",
  ".page-section__desc",
  ".about-lead",
  ".pull-quote",
  ".about-sub",
  ".fact-card",
  ".who__step",
  ".who__fact",
  ".page-card",
  ".vm-band__item",
  ".why-card",
  ".gap-band__title",
  ".gap-band__lead",
  ".gap-step",
  ".portfolio__col",
  ".proprietary__title",
  ".proprietary__intro",
  ".suite-card",
  ".people-band__title",
  ".person-card",
  ".ecosystem-copy",
  ".partner-block",
  ".stories-filter",
  ".story-detail__block",
  ".story-partner",
  ".cs-card",
  ".stories-intro__title",
  "#industries h2",
  "#industries .sectors__chips",
  "#industries .sectors__panel",
].join(",");

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(TARGETS));
    if (nodes.length === 0) return;

    // Only hide what is still below the fold; anything already visible on load
    // gets a short staggered entrance instead of a hide-then-show flash.
    const fold = window.innerHeight * 0.92;
    const initial: HTMLElement[] = [];
    const pending: HTMLElement[] = [];
    for (const node of nodes) {
      (node.getBoundingClientRect().top < fold ? initial : pending).push(node);
    }

    const reveal = (targets: HTMLElement[]) => {
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.07,
        overwrite: "auto",
        clearProps: "opacity,transform",
      });
    };

    gsap.set([...initial, ...pending], { opacity: 0, y: 28 });
    if (initial.length) reveal(initial);

    // Reveal everything that has reached the fold — including elements the user
    // jumped past (anchor links), which an IntersectionObserver would never
    // report and would leave hidden above the viewport.
    let remaining = pending.slice();
    let timer: ReturnType<typeof setTimeout> | undefined;
    const check = () => {
      timer = undefined;
      const line = window.innerHeight * 0.92;
      const entering: HTMLElement[] = [];
      remaining = remaining.filter((el) => {
        if (el.getBoundingClientRect().top < line) {
          entering.push(el);
          return false;
        }
        return true;
      });
      if (entering.length) reveal(entering);
    };
    const schedule = () => {
      if (timer === undefined) timer = setTimeout(check, 40);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (timer !== undefined) clearTimeout(timer);
      // Never leave content hidden if the route changes mid-animation.
      gsap.killTweensOf(nodes);
      gsap.set(nodes, { clearProps: "opacity,transform" });
    };
  }, [pathname]);

  return null;
}
