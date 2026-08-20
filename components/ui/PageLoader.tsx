"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import "./PageLoader.css";

const MIN_VISIBLE_MS = 900;
const EXIT_DURATION_MS = 500;
const EXIT_HOLD_MS = 150;

type PageLoaderProps = {
  /** Called once, when the loader has finished revealing the page. */
  onReady?: () => void;
};

export function PageLoader({ onReady }: PageLoaderProps = {}) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");
  const startedAt = useRef<number>(Date.now());
  const rafId = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (phase === "done") onReady?.();
  }, [phase, onReady]);

  useEffect(() => {
    // Page served from bfcache (back/forward navigation) — skip the loader entirely.
    const nav = performance.getEntriesByType?.("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (nav?.type === "back_forward" || document.readyState === "complete") {
      setPhase("done");
      return;
    }

    let finished = false;

    const tick = () => {
      const elapsed = Date.now() - startedAt.current;
      // Ease toward 90% while waiting, never claiming completion before the page is ready.
      const target = 90 * (1 - Math.exp(-elapsed / 900));
      setProgress((prev) => Math.max(prev, Math.min(target, 90)));
      if (!finished) rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    const finish = () => {
      if (finished) return;
      finished = true;
      if (rafId.current) cancelAnimationFrame(rafId.current);

      const elapsed = Date.now() - startedAt.current;
      const remaining = Math.max(MIN_VISIBLE_MS - elapsed, 0);

      setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setPhase("exiting");
          setTimeout(() => setPhase("done"), EXIT_DURATION_MS);
        }, EXIT_HOLD_MS);
      }, remaining);
    };

    window.addEventListener("load", finish);

    return () => {
      window.removeEventListener("load", finish);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  useEffect(() => {
    if (phase === "done") {
      document.documentElement.style.removeProperty("overflow");
    } else {
      document.documentElement.style.overflow = "hidden";
    }
    return () => {
      document.documentElement.style.removeProperty("overflow");
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={cn("page-loader", phase === "exiting" && "page-loader--exiting")}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="page-loader__grid" aria-hidden="true" />
      <div className="page-loader__glow" aria-hidden="true">
        <div className="page-loader__orb page-loader__orb--blue" />
        <div className="page-loader__orb page-loader__orb--orange" />
      </div>

      <div className="page-loader__content">
        <div className="page-loader__logo-wrap">
          <span className="page-loader__logo-glow" aria-hidden="true" />
          <Image
            src="/images/logo-new.png"
            alt="Creadify"
            width={923}
            height={289}
            priority
            className="page-loader__logo"
          />
        </div>

        <p className="page-loader__text">Building your growth engine...</p>

        <div className="page-loader__track">
          <div
            className="page-loader__fill"
            style={{ "--loader-progress": `${progress}%` } as React.CSSProperties}
          />
        </div>
      </div>
    </div>
  );
}

export default PageLoader;
