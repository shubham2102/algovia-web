"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { registerGsapPlugins } from "@/lib/gsap";
import { scrollToAIPanel } from "@/lib/utils";
import HeroContent from "./HeroContent";
import AIAssistantPanel from "./AIAssistantPanel";
import "./hero.css";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.location.hash === "#ai-panel") {
      scrollToAIPanel(true);
    }
  }, []);

  useGSAP(
    () => {
      registerGsapPlugins();
      const panel = sectionRef.current?.querySelector("[data-hero-panel]");
      if (!panel) return;

      gsap.from(panel, {
        opacity: 0,
        x: 40,
        scale: 0.98,
        duration: 1,
        ease: "power3.out",
        delay: 0.25,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="hero"
      aria-label="Algovia AI engineering partner"
    >
      <div className="hero__bg" aria-hidden />
      <div className="hero__grid" aria-hidden />
      <div className="hero__vignette" aria-hidden />

      <div className="hero__shell">
        <div className="hero__layout">
          <div className="hero__content-col">
            <HeroContent />
          </div>
          <div data-hero-panel className="hero__panel-col">
            <AIAssistantPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
