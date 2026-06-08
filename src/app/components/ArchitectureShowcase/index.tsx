"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import SectionViewport from "@/components/ui/SectionViewport";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/animations/Reveal";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { registerGsapPlugins } from "@/lib/gsap";

const nodes = [
  { id: "knowledge", label: "Knowledge Layer (RAG / Vector DB)", row: 0, col: 1 },
  { id: "orchestration", label: "AI Orchestration Layer (Agents)", row: 1, col: 1, highlight: true },
  { id: "llm", label: "LLM Layer (OpenAI / Claude / Llama)", row: 2, col: 1 },
  { id: "user", label: "User / Client", row: 0, col: 0 },
  { id: "apps", label: "Web / Mobile Applications", row: 2, col: 0 },
  { id: "apis", label: "APIs & Services", row: 0, col: 2 },
  { id: "enterprise", label: "Enterprise Systems (ERP, CRM, etc.)", row: 2, col: 2 },
];

export default function ArchitectureShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const diagram = diagramRef.current;
      if (!diagram) return;

      const nodeEls = diagram.querySelectorAll("[data-arch-node]");
      const lines = diagram.querySelectorAll("[data-arch-line]");

      gsap.set(nodeEls, { opacity: 0, scale: 0.85 });
      gsap.set(lines, { strokeDashoffset: 80, opacity: 0 });

      ScrollTrigger.create({
        trigger: diagram,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(lines, {
            strokeDashoffset: 0,
            opacity: 0.5,
            duration: 1.2,
            stagger: 0.08,
            ease: "power2.out",
          });
          gsap.to(nodeEls, {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "back.out(1.4)",
          });
          gsap.to("[data-arch-glow]", {
            scale: 1.05,
            opacity: 0.6,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <SectionViewport
      id="platform"
      className="section-band--dark border-y border-[var(--algovia-border)]"
    >
      <div ref={sectionRef} className="relative w-full">
        <div className="pointer-events-none absolute -inset-x-[50vw] inset-y-0 left-1/2 w-screen -translate-x-1/2 bg-[var(--surface-elevated)]" />
        <div className="pointer-events-none absolute -inset-x-[50vw] inset-y-0 left-1/2 w-screen -translate-x-1/2 opacity-30 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 30 Q15 0 30 30 T60 30\' fill=\'none\' stroke=\'%2302bb73\' stroke-opacity=\'0.15\'/%3E%3C/svg%3E')]" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[min(80vw,500px)] w-[min(80vw,500px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(2,187,115,0.2)] blur-[120px]" />

        <div className="relative section-grid section-grid--2 w-full items-center">
          <Reveal>
            <div data-reveal-item className="section-intro">
              <SectionLabel>Interactive Architecture Showcase</SectionLabel>
              <h2 className="text-[var(--foreground)]">
                AI-native systems. Built to scale.
              </h2>
              <p>
                From user experience to enterprise backends — orchestrated agents,
                RAG knowledge layers, and governed LLM integrations.
              </p>
              <Link
                href="/platform"
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--algovia-green-light)] hover:text-white"
              >
                Explore our platform
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <div
            ref={diagramRef}
            className="relative mx-auto aspect-square w-full max-w-md lg:max-h-[min(480px,52dvh)] lg:max-w-none lg:justify-self-end"
          >
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 400 400"
              fill="none"
              aria-hidden
            >
              <line data-arch-line x1="120" y1="80" x2="200" y2="120" stroke="rgba(2,187,115,0.4)" strokeWidth="1" strokeDasharray="6 6" />
              <line data-arch-line x1="120" y1="320" x2="200" y2="280" stroke="rgba(2,187,115,0.4)" strokeWidth="1" strokeDasharray="6 6" />
              <line data-arch-line x1="280" y1="80" x2="200" y2="120" stroke="rgba(2,187,115,0.4)" strokeWidth="1" strokeDasharray="6 6" />
              <line data-arch-line x1="280" y1="320" x2="200" y2="280" stroke="rgba(2,187,115,0.4)" strokeWidth="1" strokeDasharray="6 6" />
              <line data-arch-line x1="200" y1="120" x2="200" y2="200" stroke="rgba(2,187,115,0.5)" strokeWidth="1" strokeDasharray="6 6" />
              <line data-arch-line x1="200" y1="200" x2="200" y2="280" stroke="rgba(2,187,115,0.5)" strokeWidth="1" strokeDasharray="6 6" />
            </svg>

            <div className="grid h-full grid-cols-3 grid-rows-3 gap-3 p-4 sm:gap-4 sm:p-5">
              {nodes.map((node) => {
                const pos: Record<string, string> = {
                  "0-0": "col-start-1 row-start-1",
                  "0-1": "col-start-2 row-start-1",
                  "0-2": "col-start-3 row-start-1",
                  "1-0": "col-start-1 row-start-2",
                  "1-1": "col-start-2 row-start-2",
                  "1-2": "col-start-3 row-start-2",
                  "2-0": "col-start-1 row-start-3",
                  "2-1": "col-start-2 row-start-3",
                  "2-2": "col-start-3 row-start-3",
                };
                const key = `${node.row}-${node.col}`;
                return (
                  <div
                    key={node.id}
                    data-arch-node
                    className={`flex items-center justify-center ${pos[key]}`}
                  >
                    <div
                      className={`glass-panel-dark relative rounded-xl px-2 py-2 text-center text-[9px] font-medium leading-tight text-slate-200 sm:px-3 sm:py-2.5 sm:text-xs ${
                        node.highlight
                          ? "border-[rgba(2,187,115,0.4)] bg-[rgba(1,42,45,0.4)] shadow-lg shadow-[rgba(2,187,115,0.2)]"
                          : ""
                      }`}
                    >
                      {node.highlight && (
                        <span
                          data-arch-glow
                          className="absolute inset-0 rounded-xl bg-[rgba(2,187,115,0.2)] blur-md"
                        />
                      )}
                      <span className="relative">{node.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SectionViewport>
  );
}
