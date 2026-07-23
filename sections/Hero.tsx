"use client";

import { useRef } from "react";
import Image from "next/image";
import { Zap, ArrowRight, PlayCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
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

        tl.from(".hero-badge", { autoAlpha: 0, y: 24 })
          .from(".hero-heading", { autoAlpha: 0, y: 40 }, "-=0.45")
          .from(".hero-subheading", { autoAlpha: 0, y: 28 }, "-=0.4")
          .from(".hero-actions", { autoAlpha: 0, y: 24 }, "-=0.4")
          .from(
            ".hero-dashboard",
            { autoAlpha: 0, y: 20, scale: 0.95, duration: 0.8 },
            "-=0.3"
          )
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
      className="relative overflow-hidden bg-background pt-[96px] pb-20 sm:pt-[112px] sm:pb-28 lg:pt-[128px] lg:pb-32"
    >
      {/* Ambient mesh background — restrained, not a wall of gradient */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-secondary-100/60 blur-3xl" />
        <div className="absolute top-1/3 -left-40 h-[420px] w-[420px] rounded-full bg-primary-50 blur-3xl" />
        <div
          className="absolute inset-0"
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent 70%)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent 70%)",
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

      <Container wide className="relative z-10 px-6 sm:px-10 lg:px-16">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl flex flex-col items-center text-center"
        >
          <motion.div variants={fadeUp}>
            <Badge icon={Zap} variant="accent" className="uppercase tracking-wide text-xs">
              {content.badge}
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl sm:text-5xl lg:text-[3.75rem] font-bold leading-[1.08] tracking-tight text-text"
          >
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
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg leading-relaxed text-text-muted"
          >
            {content.subheading}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Button
              href="#contact"
              size="lg"
              icon={ArrowRight}
              className="bg-accent-500 hover:bg-accent-600 shadow-none hover:shadow-none hover:translate-y-0"
            >
              {content.primaryButton}
            </Button>
            <Button href="#services" variant="secondary" size="lg" icon={PlayCircle} iconPosition="left">
              {content.secondaryButton}
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="relative mx-auto mt-16 lg:mt-20 w-full max-w-[880px]"
        >
          <Image
            src="/images/heroImage1.png"
            alt={content.dashboard.title}
            width={1600}
            height={983}
            priority
            className="h-auto w-full rounded-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="mt-16 lg:mt-20 flex flex-col items-center gap-6"
        >
          <p className="text-base font-medium text-text text-center">
            Our Performance Marketing Services are Certified by
          </p>
          <Image
            src="/images/Certified/stripgoogle.png"
            alt="Meta Business Partner, Shopify Partners, Google Partner"
            width={2246}
            height={211}
            className="h-10 w-auto sm:h-12"
          />
        </motion.div>
      </Container>
    </section>
  );
}
