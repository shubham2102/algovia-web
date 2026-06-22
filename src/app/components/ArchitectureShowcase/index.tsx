"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Brain,
  Building2,
  Database,
  Smartphone,
  Users,
  Zap,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import SectionLabel from "@/components/ui/SectionLabel";
import { gsap, ScrollTrigger, registerGsapPlugins } from "@/lib/gsap";
import "./arch.css";

// ─── Coordinate system ────────────────────────────────────────────────────────
// SVG viewBox: "0 0 500 490"
// Node (cx, cy) = center in that space.
// HTML node cards are absolutely positioned via (cx/500*100%, cy/490*100%).
// Lines use SVG <path> drawn center-to-center; node cards sit on top and
// visually cover the endpoints, so no gap-trimming is needed.

const VW = 500;
const VH = 490;

interface ArchNode {
  id: string;
  label: string;
  sub: string;
  cx: number;
  cy: number;
  highlight?: boolean;
  Icon: React.ElementType;
}

const NODES: ArchNode[] = [
  { id: "orchestration", label: "AI Orchestration Layer", sub: "(Agents)",                   cx: 250, cy: 232, highlight: true, Icon: Bot        },
  { id: "knowledge",     label: "Knowledge Layer",         sub: "(RAG / Vector DB)",           cx: 250, cy: 62,               Icon: Database   },
  { id: "llm",           label: "LLM Layer",               sub: "(OpenAI / Claude / Llama)",   cx: 250, cy: 406,              Icon: Brain      },
  { id: "user",          label: "User / Client",            sub: "",                            cx: 66,  cy: 88,               Icon: Users      },
  { id: "apps",          label: "Web / Mobile",             sub: "Applications",                cx: 66,  cy: 378,              Icon: Smartphone },
  { id: "apis",          label: "APIs & Services",          sub: "",                            cx: 434, cy: 88,               Icon: Zap        },
  { id: "enterprise",    label: "Enterprise Systems",       sub: "(ERP, CRM, etc.)",            cx: 434, cy: 378,              Icon: Building2  },
];

// Paths from each outer node center → orchestration center.
// Cubic bezier curves for a clean organic flow.
const PATHS = [
  // knowledge → orchestration (vertical, straight)
  "M 250 62  L 250 232",
  // orchestration → llm (vertical, straight)
  "M 250 232 L 250 406",
  // user → orchestration
  "M 66 88   C 120 88  200 175 250 232",
  // apps → orchestration
  "M 66 378  C 120 378 200 290 250 232",
  // apis → orchestration
  "M 434 88  C 380 88  300 175 250 232",
  // enterprise → orchestration
  "M 434 378 C 380 378 300 290 250 232",
] as const;

// Outer node order for staggered entrance (matches PATHS index order)
const OUTER_IDS = ["knowledge", "llm", "user", "apps", "apis", "enterprise"];

export default function ArchitectureShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef    = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const section = sectionRef.current;
      const copy    = copyRef.current;
      const diagram = diagramRef.current;
      if (!section || !copy || !diagram) return;

      // ── SVG path draw setup ───────────────────────────────────────────────
      const pathEls = diagram.querySelectorAll<SVGGeometryElement>("[data-arch-path]");
      pathEls.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
      });

      // ── Initial hidden state ─────────────────────────────────────────────
      // autoAlpha only — never touch transform so CSS translate(-50%,-50%)
      // on .arch__node stays intact and nodes stay at their correct positions.
      const centerNode = diagram.querySelector<HTMLElement>('[data-node-id="orchestration"]');
      const outerNodes = OUTER_IDS.map((id) =>
        diagram.querySelector<HTMLElement>(`[data-node-id="${id}"]`),
      ).filter(Boolean) as HTMLElement[];
      const copyItems = copy.querySelectorAll<HTMLElement>("[data-copy-item]");

      gsap.set([centerNode, ...outerNodes], { autoAlpha: 0 });
      gsap.set(copyItems, { opacity: 0, y: 20 });

      // ── Animation timeline ────────────────────────────────────────────────
      const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });

      // copy fades + slides up
      tl.to(copyItems, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, 0);

      // center node fades in
      tl.to(centerNode, { autoAlpha: 1, duration: 0.5 }, 0.4);

      // paths draw outward one by one
      pathEls.forEach((p, i) => {
        tl.to(p, {
          strokeDashoffset: 0,
          opacity: 0.6,
          duration: 0.65,
          ease: "power2.inOut",
        }, 0.55 + i * 0.12);
      });

      // outer nodes fade in staggered, paired with their path
      outerNodes.forEach((node, i) => {
        tl.to(node, { autoAlpha: 1, duration: 0.45 }, 0.75 + i * 0.12);
      });

      // ── Trigger: play once when section scrolls into view ────────────────
      ScrollTrigger.create({
        trigger: section,
        start: "top 72%",
        once: true,
        onEnter: () => tl.play(),
      });

      // ── Glow pulse (runs immediately, independent of scroll) ─────────────
      const glowEl = diagram.querySelector<HTMLElement>("[data-arch-glow]");
      if (glowEl) {
        gsap.to(glowEl, {
          scale: 1.15,
          opacity: 0.7,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="platform"
      className="arch"
      aria-label="Algovia AI platform architecture"
    >
      {/* Background layers */}
      <div className="arch__bg" aria-hidden />
      <div className="arch__ambient" aria-hidden />

      <div className="arch__inner">
        {/* ── Copy ──────────────────────────────────────────────────────── */}
        <div ref={copyRef} className="arch__copy">
          <SectionLabel data-copy-item>The Algovia Platform</SectionLabel>

          <h2 data-copy-item className="arch__heading">
            AI-native systems.
            <br />
            Built to scale.
          </h2>

          <p data-copy-item className="arch__lead">
            From user experience to enterprise backends — orchestrated agents,
            RAG knowledge layers, and governed LLM integrations, all in one
            coherent platform.
          </p>

          <Link href="/platform" data-copy-item className="arch__cta">
            Explore our platform
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* ── Diagram ───────────────────────────────────────────────────── */}
        <div ref={diagramRef} className="arch__diagram">
          {/* SVG — connection paths */}
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            className="arch__svg"
            fill="none"
            aria-hidden
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Gradient stroke for each path */}
              <linearGradient id="arch-grad-v" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="rgba(99,102,241,0.65)" />
                <stop offset="100%" stopColor="rgba(99,102,241,0.25)" />
              </linearGradient>
              <linearGradient id="arch-grad-d1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"   stopColor="rgba(99,102,241,0.5)" />
                <stop offset="100%" stopColor="rgba(99,102,241,0.2)" />
              </linearGradient>
              <linearGradient id="arch-grad-d2" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="rgba(99,102,241,0.5)" />
                <stop offset="100%" stopColor="rgba(99,102,241,0.2)" />
              </linearGradient>
            </defs>

            {/* knowledge → orchestration (vert up) */}
            <path
              data-arch-path
              d={PATHS[0]}
              stroke="url(#arch-grad-v)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* orchestration → llm (vert down) */}
            <path
              data-arch-path
              d={PATHS[1]}
              stroke="url(#arch-grad-v)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* user → orchestration */}
            <path
              data-arch-path
              d={PATHS[2]}
              stroke="url(#arch-grad-d1)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* apps → orchestration */}
            <path
              data-arch-path
              d={PATHS[3]}
              stroke="url(#arch-grad-d1)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* apis → orchestration */}
            <path
              data-arch-path
              d={PATHS[4]}
              stroke="url(#arch-grad-d2)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* enterprise → orchestration */}
            <path
              data-arch-path
              d={PATHS[5]}
              stroke="url(#arch-grad-d2)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Connection dots at path ends */}
            {[
              { cx: 250, cy: 62  },
              { cx: 250, cy: 406 },
              { cx: 66,  cy: 88  },
              { cx: 66,  cy: 378 },
              { cx: 434, cy: 88  },
              { cx: 434, cy: 378 },
            ].map(({ cx, cy }, i) => (
              <circle
                key={i}
                cx={cx} cy={cy} r="3"
                fill="rgba(99,102,241,0.55)"
              />
            ))}
          </svg>

          {/* HTML node cards — positioned in the same 500×490 coordinate space */}
          {NODES.map(({ id, label, sub, cx, cy, highlight = false, Icon }) => (
            <div
              key={id}
              data-arch-node
              data-node-id={id}
              className={`arch__node${highlight ? " arch__node--center" : ""}`}
              style={{
                left: `${(cx / VW) * 100}%`,
                top:  `${(cy / VH) * 100}%`,
              }}
            >
              {highlight && <span data-arch-glow className="arch__node-glow" />}

              <span className={`arch__node-icon${highlight ? " arch__node--center-icon" : ""}`}>
                <Icon
                  className={highlight ? "h-4 w-4" : "h-3.5 w-3.5"}
                  strokeWidth={2}
                />
              </span>

              <span className="arch__node-label">{label}</span>
              {sub && <span className="arch__node-sub">{sub}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
