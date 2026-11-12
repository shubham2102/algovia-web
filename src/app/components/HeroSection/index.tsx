"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import HeroBeams from "@/components/ui/HeroBeams";
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
      <HeroBeams />

      {/* Intro — absolutely positioned in upper-center, fades when active */}
      <div className="hero__intro">
        <h1 className="hero__headline" data-hero-item>
          <span className="hero__headline-accent">AI Transformation.</span>
          <span className="hero__headline-line">Executed, Adopted, Measured.</span>
        </h1>
        <p className="hero__lead" data-hero-item>
          Exploring AI for your business? <strong>Ask ALGOVIA AI</strong>
        </p>
      </div>

      {/* Shell — flex-end anchors the panel to the bottom */}
      <div className="hero__shell">
        <AIAssistantPanel onFirstMessage={() => setConversationActive(true)} onReset={() => setConversationActive(false)} />
      </div>
    </section>
  );
}
