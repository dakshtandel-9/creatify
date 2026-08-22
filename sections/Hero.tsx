"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { DotGrid } from "@/components/ui/DotGrid";
import { usePageLoaderReady } from "@/components/layout/PageLoaderProvider";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { HeroContent } from "@/types/cms";

type HeroProps = {
  content: HeroContent;
};

const HIGHLIGHT_GRADIENT =
  "bg-gradient-to-r bg-clip-text text-transparent from-[#2f6ee0] via-[#3f9ae6] to-[#61cdf1]";

export function Hero({ content }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isLoaderReady = usePageLoaderReady();

  // The design breaks the headline as "Grow Your Business / With Smarter /
  // Digital Marketing." — the last plain word shares a line with the first
  // highlighted one, so the two content strings get split at that seam.
  const headingWords = content.heading.split(" ");
  const leadLine = headingWords.slice(0, -1).join(" ");
  const bridgeWord = headingWords[headingWords.length - 1];
  const highlightWords = content.headingHighlight.split(" ");
  const highlightBridge = highlightWords[0];
  const highlightTail = highlightWords.slice(1).join(" ");

  useGSAP(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>(".hero-reveal");
      if (!targets.length) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set(targets, { autoAlpha: 1, y: 0 });
        return;
      }

      // Hold everything back until the page loader has finished its reveal.
      if (!isLoaderReady) {
        gsap.set(targets, { autoAlpha: 0, y: 26 });
        // The loader waits on window `load`; if that is slow or never fires,
        // show the hero anyway rather than leaving a blank screen.
        const fallback = window.setTimeout(() => {
          gsap.to(targets, {
            autoAlpha: 1,
            y: 0,
            stagger: 0.11,
            duration: 0.8,
            ease: "power3.out",
          });
        }, 4000);
        return () => window.clearTimeout(fallback);
      }

      gsap
        .timeline({ defaults: { ease: "power3.out", duration: 0.8 } })
        .to(targets, { autoAlpha: 1, y: 0, stagger: 0.11 })
        .fromTo(
          ".hero-underline-path",
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" },
          "-=0.5"
        )
        .fromTo(
          ".hero-underline-dot",
          { scale: 0, transformOrigin: "center" },
          { scale: 1, duration: 0.3, ease: "back.out(2)" },
          "-=0.12"
        );
    },
    { scope: sectionRef, dependencies: [isLoaderReady] }
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex flex-col items-center justify-center overflow-hidden pt-[120px] pb-12 sm:min-h-screen sm:pt-[150px] sm:pb-16"
    >
      {/* Ambient background — soft blue at top-left, pale blue at right, white core */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 60% at 6% 6%, rgba(191,220,245,0.55) 0%, transparent 62%)," +
              "radial-gradient(ellipse 48% 62% at 97% 58%, rgba(174,214,240,0.5) 0%, transparent 66%)," +
              "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(226,234,250,0.65) 0%, transparent 72%)," +
              "linear-gradient(180deg, #f6f7fd 0%, #ffffff 46%, #f1f8fc 100%)",
          }}
        />

        {/* Dot field hugging the left edge, as in the design */}
        <div
          className="absolute inset-y-0 left-0 w-[42%] sm:w-[28%] lg:w-[20%]"
          style={{
            maskImage:
              "radial-gradient(130% 85% at 0% 50%, black 0%, black 34%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(130% 85% at 0% 50%, black 0%, black 34%, transparent 80%)",
          }}
        >
          <DotGrid
            dotSize={4}
            gap={22}
            baseColor="rgba(79,139,214,0.30)"
            activeColor="rgba(79,139,214,0.30)"
            proximity={110}
            shockRadius={220}
            shockStrength={4}
            resistance={750}
            returnDuration={1.5}
          />
        </div>

        {/* Thin arcs sweeping up the left margin */}
        <svg
          className="absolute bottom-[10%] left-0 hidden w-[200px] text-[#8fb4e4]/30 sm:block lg:w-[260px]"
          viewBox="0 0 260 260"
          fill="none"
        >
          <path
            d="M-40 260C30 214 92 150 118 74 130 38 134 14 132 -12"
            stroke="currentColor"
            strokeWidth="1.25"
          />
          <path
            d="M-40 224C44 182 114 116 144 36 157 0 161 -24 159 -50"
            stroke="currentColor"
            strokeWidth="1.25"
          />
        </svg>

        {/* Softens the seam into the white section below */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
      </div>

      <Container wide className="relative z-10 px-4 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h1 className="hero-reveal flex flex-col items-center text-[30px] font-extrabold leading-[1.1] tracking-[-0.03em] text-primary-900 xs:text-[34px] sm:text-[54px] lg:text-[68px] xl:text-[76px]">
            <span>{leadLine}</span>
            <span className="flex flex-wrap justify-center gap-x-[0.28em]">
              <span>{bridgeWord}</span>
              <span className={HIGHLIGHT_GRADIENT}>{highlightBridge}</span>
            </span>
            {/* The gradient element holds nothing but the text. Safari drops
                a `background-clip: text` fill behind a positioned descendant,
                so the underline is a sibling of the text, never a child. */}
            <span className="relative inline-block">
              <span className={cn("inline-block", HIGHLIGHT_GRADIENT)}>
                {highlightTail}
              </span>
              {/* Hand-drawn underline sweep under the closing word — width is
                  in em so it tracks the last word across breakpoints. */}
              <svg
                className="absolute right-[-0.17em] top-full w-[5.75em] -translate-y-[0.16em]"
                viewBox="0 0 200 14"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="hero-underline" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2f6ee0" />
                    <stop offset="100%" stopColor="#61cdf1" />
                  </linearGradient>
                </defs>
                <path
                  className="hero-underline-path"
                  d="M3 10.2C42 5.6 104 3.4 148 4.4c16 .4 32 1.4 44 3.1"
                  stroke="url(#hero-underline)"
                  strokeWidth="3.6"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray={1}
                />
                <circle
                  className="hero-underline-dot"
                  cx="196.5"
                  cy="11.4"
                  r="2.8"
                  fill="#61cdf1"
                />
              </svg>
            </span>
          </h1>

          {/* Kept on one line at every width — wrapping would strand a
              divider at the end of a line. */}
          {content.stats && (
            <p className="hero-reveal mt-6 flex items-center justify-center gap-x-2 whitespace-nowrap text-[13px] font-bold tracking-tight text-primary-900 xs:gap-x-3 xs:text-[15px] sm:mt-8 sm:gap-x-4 sm:text-xl lg:text-[22px]">
              {content.stats.split("|").map((part, i) => (
                <Fragment key={part}>
                  {i > 0 ? (
                    <span className="text-primary-200" aria-hidden="true">
                      |
                    </span>
                  ) : null}
                  <span>{part.trim()}</span>
                </Fragment>
              ))}
            </p>
          )}

          <p className="hero-reveal mt-4 max-w-[560px] text-base leading-relaxed text-text-muted sm:mt-5 sm:text-[17px]">
            {content.subheading}
          </p>

          <Button
            href="#contact"
            size="lg"
            icon={ArrowUpRight}
            className="hero-reveal mt-9 h-[56px] rounded-2xl bg-primary-900 px-8 text-base shadow-[0_16px_34px_-16px_rgba(8,39,68,0.65)] hover:bg-primary-800 hover:shadow-[0_20px_42px_-16px_rgba(8,39,68,0.7)] sm:mt-10"
          >
            {content.primaryButton}
          </Button>
        </div>

        <div className="hero-reveal mt-14 flex w-full flex-col items-center gap-6 lg:mt-16">
          <p className="text-center text-[13px] font-medium text-text xs:whitespace-nowrap sm:whitespace-normal sm:text-base">
            Our Performance Marketing Services are Certified by
          </p>
          <Image
            src="/images/Certified/stripgoogle.png"
            alt="Meta Business Partner, Shopify Partners, Google Partner"
            width={2246}
            height={211}
            className="h-auto w-[93%] translate-x-[5%] grayscale sm:h-[88px] sm:w-auto sm:translate-x-0 lg:h-[70px]"
          />
        </div>
      </Container>
    </section>
  );
}
