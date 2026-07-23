"use client";

import { useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { CLIENT_LOGOS } from "@/constants/logos";
import { gsap, useGSAP } from "@/lib/gsap";

export function LogoCloud() {
  const marqueeItems = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".logo-cloud-inner", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="border-t border-border bg-surface py-14 sm:py-16"
      aria-label="Powered by industry-leading platforms"
    >
      <div className="logo-cloud-inner">
        <Container wide>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.1em] text-text-subtle mb-10">
            Powered by Industry-Leading Platforms
          </p>
        </Container>

        <span className="sr-only">
          Integrates with {CLIENT_LOGOS.map((logo) => logo.name).join(", ")}.
        </span>

        <div className="relative overflow-hidden" aria-hidden="true">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-surface to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-surface to-transparent z-10" />

          <div className="flex w-max animate-marquee gap-16 motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-16 motion-reduce:gap-y-4">
            {marqueeItems.map((logo, i) => (
              <span
                key={`${logo.name}-${i}`}
                className="shrink-0 select-none grayscale contrast-125 opacity-70 transition-all duration-300 hover:grayscale-0 hover:contrast-100 hover:opacity-100"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={320}
                  height={80}
                  className="h-14 w-auto object-contain sm:h-16"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
