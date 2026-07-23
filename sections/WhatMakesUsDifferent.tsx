"use client";

import { useRef } from "react";
import { Check, Minus } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { BorderGlow } from "@/components/ui/BorderGlow";
import { gsap, useGSAP } from "@/lib/gsap";
import type { ServicesComparison } from "@/types/cms";

type WhatMakesUsDifferentProps = {
  content: ServicesComparison;
};

export function WhatMakesUsDifferent({ content }: WhatMakesUsDifferentProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".service-comparison-item", {
        autoAlpha: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".service-comparison",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <Section id="why-us" ref={sectionRef}>
      <Container>
        <BorderGlow
          className="service-comparison mx-auto max-w-[880px]"
          backgroundColor="#FFFFFF"
          borderRadius={28}
          colors={["#ff7a1a", "#46d3f3", "#0a355b"]}
        >
          <div className="p-6 shadow-lg sm:p-10 lg:p-14">
            <div className="flex flex-col items-center gap-3 border-b border-border pb-8 text-center sm:pb-10">
              <span className="inline-flex items-center rounded-full bg-accent-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-accent-700">
                {content.title}
              </span>
              <h2 className="text-3xl font-bold leading-[1.1] text-primary-900 sm:text-4xl lg:text-[44px]">
                {content.heading}
              </h2>
              <p className="text-base text-text-muted sm:text-[17px]">
                {content.subheading}
              </p>
            </div>

            <div className="relative grid grid-cols-1 gap-x-14 gap-y-10 pt-8 sm:pt-10 md:grid-cols-2">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-4 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent md:block"
              />
              <div>
                <span className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-text-muted">
                  {content.othersLabel}
                </span>
                <ul className="mt-6 flex flex-col gap-5">
                  {content.othersPoints.map((point) => (
                    <li
                      key={point}
                      className="service-comparison-item flex items-center gap-3"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface text-text-muted">
                        <Minus className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="text-sm text-text-muted sm:text-[15px]">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-primary-600 to-accent-600 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-white">
                  {content.oursLabel}
                </span>
                <ul className="mt-6 flex flex-col gap-5">
                  {content.oursPoints.map((point) => (
                    <li
                      key={point}
                      className="service-comparison-item flex items-center gap-3"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                        <Check className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-bold text-primary-900 sm:text-[15px]">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 flex justify-center sm:mt-12">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-5 py-2.5 text-sm text-text-muted">
                {content.footerText}{" "}
                <a
                  href="#contact"
                  className="font-semibold text-primary-900 underline decoration-1 underline-offset-2 transition-colors duration-150 hover:text-accent-700"
                >
                  {content.footerLinkText}
                </a>
              </div>
            </div>
          </div>
        </BorderGlow>
      </Container>
    </Section>
  );
}
