"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type UseCounterOptions = {
  end: number;
  duration?: number;
  decimals?: number;
};

/** Animates a number from 0 to `end` once the element scrolls into view. */
export function useCounter({ end, duration = 2200, decimals = 0 }: UseCounterOptions) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Number((eased * end).toFixed(decimals)));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, end, duration, decimals]);

  return { ref, value };
}
