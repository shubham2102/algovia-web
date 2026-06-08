"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { registerGsapPlugins } from "@/lib/gsap";

type CopyVariant = "rotate" | "slide" | "flicker";
type SplitType = "chars" | "words" | "lines";

interface CopyProps {
  children: React.ReactNode;
  variant?: CopyVariant;
  splitType?: SplitType;
  animateOnScroll?: boolean;
  delay?: number;
  className?: string;
}

export default function Copy({
  children,
  variant = "rotate",
  splitType = "words",
  animateOnScroll = true,
  delay = 0,
  className = "",
}: CopyProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const wrapper = containerRef.current;
      const element = wrapper?.firstElementChild as HTMLElement | null;
      if (!wrapper || !element) return;

      const splits: SplitText[] = [];
      const trigger = wrapper;

      if (variant === "rotate" && splitType !== "lines") {
        const split = SplitText.create(element, {
          type: splitType === "words" ? "words" : "words,chars",
          wordsClass: "copy-word",
          charsClass: "copy-char",
        });
        splits.push(split);

        const targets =
          splitType === "words"
            ? split.words
            : split.words.flatMap((w) =>
                Array.from(w.querySelectorAll<HTMLElement>(".copy-char")),
              );

        gsap.set(element, { perspective: 700 });
        gsap.set(targets, {
          opacity: 0,
          rotationX: -90,
          transformOrigin: "50% 50% -40px",
        });

        const play = () =>
          gsap.to(targets, {
            delay,
            rotationX: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: splitType === "words" ? 0.04 : 0.025,
          });

        if (animateOnScroll) {
          ScrollTrigger.create({
            trigger,
            start: "top 90%",
            once: true,
            onEnter: play,
          });
        } else {
          play();
        }
      }

      if (variant === "slide") {
        gsap.set(element, { y: 32, opacity: 0 });

        const play = () =>
          gsap.to(element, {
            delay,
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
          });

        if (animateOnScroll) {
          ScrollTrigger.create({
            trigger,
            start: "top 92%",
            once: true,
            onEnter: play,
          });
        } else {
          play();
        }
      }

      return () => splits.forEach((s) => s.revert());
    },
    { scope: containerRef, dependencies: [variant, splitType, animateOnScroll, delay] },
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
