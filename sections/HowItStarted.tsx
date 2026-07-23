"use client";

import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { BorderGlow } from "@/components/ui/BorderGlow";
import { cn } from "@/lib/utils";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { ServicesProcess } from "@/types/cms";

type HowItStartedProps = {
  content: ServicesProcess;
};

export function HowItStarted({ content }: HowItStartedProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".service-process-step", {
        autoAlpha: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".service-process",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      const images = sectionRef.current?.querySelectorAll("img") ?? [];
      images.forEach((img) => {
        if (img.complete) return;
        img.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
      });
    },
    { scope: sectionRef }
  );

  return (
    <Section id="how-it-started" tone="surface" ref={sectionRef}>
      <Container>
        <BorderGlow
          className="service-process mx-auto max-w-[880px]"
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
            </div>

            <div className="grid grid-cols-1 gap-10 pt-8 sm:pt-10 lg:grid-cols-2 lg:gap-8">
              <ol className="relative flex flex-col gap-10">
                {content.steps.map((step, index) => {
                  const isLast = index === content.steps.length - 1;
                  return (
                    <li key={step.title} className="service-process-step relative flex gap-5 pl-0">
                      <span className="relative flex flex-col items-center">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-600 text-sm font-bold text-white shadow-[0_0_0_1px_rgba(255,122,26,0.16),0_8px_20px_-4px_rgba(255,122,26,0.35)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {!isLast ? (
                          <span
                            aria-hidden="true"
                            className="mt-2 w-px flex-1 bg-gradient-to-b from-accent-300 to-border"
                          />
                        ) : null}
                      </span>
                      <div className={cn(!isLast && "pb-2")}>
                        <h3 className="text-lg font-bold text-primary-900 sm:text-xl">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-text-muted sm:text-[15px]">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>

              <div className="relative mx-auto aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-2xl">
                <video
                  src="/HIW.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls={false}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </BorderGlow>
      </Container>
    </Section>
  );
}
