"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { registerGsapPlugins } from "@/lib/gsap";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  stagger?: number;
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 32,
  stagger = 0.08,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const el = ref.current;
      if (!el) return;

      const items = el.querySelectorAll("[data-reveal-item]");
      const targets = items.length > 0 ? items : [el];

      gsap.set(targets, { opacity: 0, y });

      ScrollTrigger.create({
        trigger: el,
        start: "top 92%",
        once: true,
        onEnter: () => {
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            delay,
            ease: "power3.out",
            stagger: items.length > 0 ? stagger : 0,
          });
        },
      });
    },
    { scope: ref, dependencies: [delay, y, stagger] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
