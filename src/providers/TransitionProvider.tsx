"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { TransitionRouter } from "next-transition-router";
import { useLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { dispatchMenuClose } from "@/lib/menuClose";
import { scrollToTop } from "@/lib/scrollToTop";

const ROWS = 2;
const COLS = 5;
const ease = "power4.inOut";

export default function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lenis = useLenis();
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);

  const setTransitionBlocking = (blocking: boolean) => {
    gridRef.current?.classList.toggle("is-blocking", blocking);
  };

  const getBlocks = () => [
    ...Array.from(row1Ref.current?.querySelectorAll(".transition-block") ?? []),
    ...Array.from(row2Ref.current?.querySelectorAll(".transition-block") ?? []),
  ];

  useEffect(() => {
    const blocks = getBlocks();
    gsap.set(blocks, { scaleY: 0, visibility: "hidden" });
  }, []);

  useLayoutEffect(() => {
    if (isTransitioningRef.current) return;

    scrollToTop(lenis);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });
  }, [pathname, lenis]);

  return (
    <TransitionRouter
      auto
      leave={(next) => {
        isTransitioningRef.current = true;
        setTransitionBlocking(true);

        const blocks = getBlocks();
        gsap.set(blocks, { visibility: "visible", scaleY: 0 });
        const tween = gsap.to(blocks, {
          scaleY: 1,
          duration: 1,
          stagger: {
            each: 0.1,
            from: "start",
            grid: [ROWS, COLS],
            axis: "x",
          },
          ease,
          onComplete: next,
        });
        return () => tween.kill();
      }}
      enter={(next) => {
        dispatchMenuClose();
        scrollToTop(lenis);

        const blocks = getBlocks();
        gsap.set(blocks, { visibility: "visible", scaleY: 1 });
        const tween = gsap.to(blocks, {
          scaleY: 0,
          duration: 1,
          stagger: {
            each: 0.1,
            from: "start",
            grid: [ROWS, COLS],
            axis: "x",
          },
          ease,
          onComplete: () => {
            gsap.set(blocks, { visibility: "hidden" });
            setTransitionBlocking(false);
            isTransitioningRef.current = false;
            next();
          },
        });
        return () => tween.kill();
      }}
    >
      <div className="transition-grid" ref={gridRef} aria-hidden>
        <div className="transition-row row-1" ref={row1Ref}>
          {Array.from({ length: COLS }).map((_, index) => (
            <div key={`row-1-${index}`} className="transition-block" />
          ))}
        </div>
        <div className="transition-row row-2" ref={row2Ref}>
          {Array.from({ length: COLS }).map((_, index) => (
            <div key={`row-2-${index}`} className="transition-block" />
          ))}
        </div>
      </div>
      {children}
    </TransitionRouter>
  );
}
