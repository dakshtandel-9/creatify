"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap";

type LenisControls = {
  stop: () => void;
  start: () => void;
  /** Scrolls to a target (element or offset). Falls back to a native jump when Lenis is off. */
  scrollTo: (target: string | HTMLElement | number, offset?: number) => void;
};

const LenisContext = createContext<LenisControls | null>(null);

/** Lets descendants pause/resume the global Lenis smooth scroll, e.g. while a modal is open. */
export function useLenisControls() {
  return useContext(LenisContext);
}

/** Wires up Lenis smooth scrolling for the whole app; respects reduced motion. */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    ScrollTrigger.addEventListener("refresh", () => lenis.resize());
    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const controls: LenisControls = {
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
    scrollTo: (target, offset = 0) => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, { offset, duration: 1 });
        return;
      }
      // Reduced motion (or pre-init): jump straight there.
      const element =
        typeof target === "string" ? document.querySelector(target) : target;
      if (typeof target === "number") {
        window.scrollTo({ top: target + offset });
      } else if (element instanceof HTMLElement) {
        window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY + offset });
      }
    },
  };

  return <LenisContext.Provider value={controls}>{children}</LenisContext.Provider>;
}
