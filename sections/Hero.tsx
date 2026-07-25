"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { DotGrid } from "@/components/ui/DotGrid";
import { gsap, useGSAP } from "@/lib/gsap";
import type { HeroContent } from "@/types/cms";

type HeroProps = {
  content: HeroContent;
};

export function Hero({ content }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 0.7 },
        });

        tl.from(".hero-heading", { autoAlpha: 0, y: 40 })
          .from(".hero-stats", { autoAlpha: 0, y: 20 }, "-=0.4")
          .from(".hero-subheading", { autoAlpha: 0, y: 28 }, "-=0.4")
          .from(".hero-actions", { autoAlpha: 0, y: 24 }, "-=0.4")
          .from(".hero-certified", { autoAlpha: 0, y: 12 }, "-=0.4");
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background pt-[110px] pb-10 sm:pt-[56px] sm:pb-14"
    >
      {/* Ambient background — restrained, not a wall of gradient */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 75%)",
          }}
        >
          <DotGrid
            dotSize={5}
            gap={24}
            baseColor="rgba(255, 122, 26, 0.2)"
            activeColor="rgba(255, 122, 26, 0.2)"
            proximity={110}
            shockRadius={220}
            shockStrength={4}
            resistance={750}
            returnDuration={1.5}
          />
        </div>
      </div>

      <Container wide className="relative z-10 px-2 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl flex flex-col items-center text-center">
          <h1 className="hero-heading w-full sm:w-auto text-[50px] sm:text-[80px] lg:text-[90px] font-extrabold leading-[1.15] tracking-tight text-text">
            <span className="sm:hidden">
              We Drive
              <br />
              Growth. You
              <br />
              Get <span className="text-accent-500">{content.headingHighlight}</span>
            </span>
            <span className="hidden sm:inline">
              {(() => {
                const breakIndex = content.heading.indexOf(". ") + 1;
                const firstLine = content.heading.slice(0, breakIndex);
                const secondLine = content.heading.slice(breakIndex + 1);
                return (
                  <>
                    {firstLine}
                    <br />
                    {secondLine}{" "}
                  </>
                );
              })()}
              <span className="text-accent-500">{content.headingHighlight}</span>
            </span>
          </h1>

          {content.stats && (
            <p className="hero-stats mt-4 text-sm sm:text-base font-medium text-text-muted">
              {content.stats}
            </p>
          )}

          <p className="hero-subheading mt-6 w-[95%] max-w-none text-base sm:w-[440px] sm:text-lg lg:w-[560px] leading-relaxed text-text-muted">
            {content.subheading}
          </p>

          <div className="hero-actions mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              href="#contact"
              size="lg"
              icon={ArrowRight}
              className="bg-accent-500 hover:bg-accent-600 shadow-none hover:shadow-none hover:translate-y-0"
            >
              {content.primaryButton}
            </Button>
          </div>
        </div>

        <div className="hero-certified mt-16 lg:mt-20 flex w-full flex-col items-center gap-6">
          <p className="whitespace-nowrap text-[13px] font-medium text-text text-center sm:whitespace-normal sm:text-base">
            Our Performance Marketing Services are Certified by
          </p>
          <Image
            src="/images/Certified/stripgoogle.png"
            alt="Meta Business Partner, Shopify Partners, Google Partner"
            width={2246}
            height={211}
            className="h-auto w-full sm:h-[88px] sm:w-auto"
          />
        </div>
      </Container>
    </section>
  );
}
