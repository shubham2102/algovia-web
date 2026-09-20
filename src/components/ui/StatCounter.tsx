"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { registerGsapPlugins } from "@/lib/gsap";

interface StatCounterProps {
  value: string;
  className?: string;
}

export default function StatCounter({ value, className = "stat-counter" }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const numericMatch = value.match(/[\d,]+/);
  const target = numericMatch ? Number(numericMatch[0].replace(/,/g, "")) : null;
  const prefix = numericMatch ? value.slice(0, numericMatch.index) : "";
  const suffix = numericMatch ? value.slice((numericMatch.index ?? 0) + numericMatch[0].length) : "";

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || target === null) return;
      registerGsapPlugins();

      const counter = { value: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: "top 92%",
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            value: target,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = `${prefix}${Math.round(counter.value).toLocaleString()}${suffix}`;
            },
          });
        },
      });
    },
    { scope: ref, dependencies: [target, prefix, suffix] },
  );

  return (
    <span ref={ref} className={className}>
      {target === null ? value : `${prefix}0${suffix}`}
    </span>
  );
}
