"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { ArrowRight, BarChart3, Bot, Brain, Cloud } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { registerGsapPlugins } from "@/lib/gsap";
import { HERO_BADGES } from "@/lib/constants";
import { HeroCTAPrimary } from "@/components/ui/AILink";
import "./hero.css";

const iconMap = {
  brain: Brain,
  bot: Bot,
  cloud: Cloud,
  chart: BarChart3,
};

export default function HeroContent() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const el = ref.current;
      if (!el) return;

      gsap.from(el.querySelectorAll("[data-hero-item]"), {
        opacity: 0,
        y: 32,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.1,
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="flex flex-col justify-center">
      <p className="hero__eyebrow" data-hero-item>
        AI-Powered Engineering Partner
      </p>

      <h1 className="hero__headline mt-5" data-hero-item>
        <span className="hero__headline-line">Build what&apos;s next.</span>
        <span className="hero__headline-line">With AI. At scale.</span>
        <span className="hero__headline-line">
          With <span className="hero__headline-accent">Algovia.</span>
        </span>
      </h1>

      <p className="hero__lead mt-6" data-hero-item>
        We help enterprises and ambitious startups design, build, and scale
        AI-native products and platforms — from strategy to production.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-5" data-hero-item>
        <HeroCTAPrimary />
        <Link href="/solutions" className="hero__cta-secondary">
          Explore solutions
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <ul className="hero__capabilities" data-hero-item>
        {HERO_BADGES.map((badge) => {
          const Icon = iconMap[badge.icon as keyof typeof iconMap];
          return (
            <li key={badge.label}>
              <div className="hero__capability">
                <span className="hero__capability-icon">
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </span>
                <span>{badge.label}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
