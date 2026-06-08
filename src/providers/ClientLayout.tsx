"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import Menu from "@/components/layout/Menu";
import Footer from "@/components/layout/Footer";
import TransitionProvider from "@/providers/TransitionProvider";
import { gsap, ScrollTrigger, registerGsapPlugins } from "@/lib/gsap";

const MOBILE_BREAKPOINT = 1000;
const LENIS_EASING = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

const LENIS_SHARED = {
  easing: LENIS_EASING,
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  smoothWheel: true,
  infinite: false,
  wheelMultiplier: 1,
  syncTouch: true,
  autoRaf: false,
};

const LENIS_MOBILE = {
  ...LENIS_SHARED,
  duration: 0.8,
  lerp: 0.09,
  touchMultiplier: 1.5,
  smoothTouch: true,
};

const LENIS_DESKTOP = {
  ...LENIS_SHARED,
  duration: 1.2,
  lerp: 0.1,
  touchMultiplier: 2,
  smoothTouch: false,
};

function LenisScrollSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const instance = lenis;

    function update(time: number) {
      instance.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const onScroll = () => ScrollTrigger.update();
    instance.on("scroll", onScroll);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(update);
      instance.off("scroll", onScroll);
    };
  }, [lenis]);

  return null;
}

function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [pathname]);

  return (
    <div className="page">
      <LenisScrollSync />
      <Menu />
      <TransitionProvider>
        <div className="page-wrapper">
          <main id="main-content">{children}</main>
          <Footer />
        </div>
      </TransitionProvider>
    </div>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    registerGsapPlugins();
    const handleResize = () =>
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ReactLenis root options={isMobile ? LENIS_MOBILE : LENIS_DESKTOP}>
      <AppShell>{children}</AppShell>
    </ReactLenis>
  );
}
