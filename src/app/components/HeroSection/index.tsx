"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import AIAssistantPanel from "./AIAssistantPanel";
import "./hero.css";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [conversationActive, setConversationActive] = useState(false);

  useGSAP(
    () => {
      registerGsapPlugins();
      const el = sectionRef.current;
      if (!el) return;
      gsap.from(el.querySelectorAll("[data-hero-item]"), {
        opacity: 0,
        y: 28,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.15,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className={`hero${conversationActive ? " hero--active" : ""}`}
      aria-label="Algovia AI engineering partner"
    >
      <div className="hero__bg" aria-hidden />
      <div className="hero__grid" aria-hidden />

      {/* Intro — absolutely positioned in upper-center, fades when active */}
      <div className="hero__intro">
        <p className="hero__eyebrow" data-hero-item>
          AI‑Powered Engineering Partner
        </p>
        <h1 className="hero__headline" data-hero-item>
          Build AI systems
          <br />
          <span className="hero__headline-accent">that ship.</span>
        </h1>
        <p className="hero__lead" data-hero-item>
          Ask Algovia AI anything about your product — strategy, architecture, or go-to-market.
        </p>
      </div>

      {/* Shell — flex-end anchors the panel to the bottom */}
      <div className="hero__shell">
        <AIAssistantPanel onFirstMessage={() => setConversationActive(true)} />
      </div>
    </section>
  );
}
