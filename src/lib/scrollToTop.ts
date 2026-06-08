import type Lenis from "lenis";

export function scrollToTop(lenis?: Lenis | null) {
  lenis?.scrollTo(0, { immediate: true });

  if (typeof window === "undefined") return;

  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}
