"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { BorderGlow } from "@/components/ui/BorderGlow";
import { SERVICE_ICON_BY_TITLE, SERVICE_ICON_FALLBACKS } from "@/components/ui/ServiceIcons";
import { cn } from "@/lib/utils";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { ServiceAccent, ServicesContent } from "@/types/cms";

type ServicesProps = {
  content: ServicesContent;
};

const ACCENT_STYLES: Record<ServiceAccent, string> = {
  orange: "bg-accent-50 text-accent-700",
  blue: "bg-primary-50 text-primary-700",
  green: "bg-emerald-50 text-emerald-700",
  purple: "bg-violet-50 text-violet-700",
  cyan: "bg-secondary-50 text-secondary-700",
  pink: "bg-rose-50 text-rose-700",
};

const PLACEHOLDER_GRADIENTS: Record<ServiceAccent, string> = {
  orange: "from-accent-100 via-rose-100 to-primary-100",
  blue: "from-primary-100 via-secondary-100 to-violet-100",
  green: "from-emerald-100 via-secondary-100 to-primary-100",
  purple: "from-violet-100 via-primary-100 to-rose-100",
  cyan: "from-secondary-100 via-primary-100 to-emerald-100",
  pink: "from-rose-100 via-accent-100 to-violet-100",
};

const ACCENT_GLOW: Record<ServiceAccent, [string, string, string]> = {
  orange: ["#4a9fe6", "#b3dbfd", "#0a355b"],
  blue: ["#0a355b", "#46d3f3", "#7eaed3"],
  green: ["#10b981", "#46d3f3", "#0a355b"],
  purple: ["#8b5cf6", "#4a9fe6", "#0a355b"],
  cyan: ["#46d3f3", "#0a355b", "#4a9fe6"],
  pink: ["#f472b6", "#4a9fe6", "#0a355b"],
};

export function Services({ content }: ServicesProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Safari can silently ignore the declarative `autoplay` attribute and
    // fall back to showing its own "tap to play" affordance. Forcing
    // muted+play() imperatively makes autoplay reliable across browsers.
    const videos = sectionRef.current?.querySelectorAll("video") ?? [];
    const tryPlay = (video: HTMLVideoElement) => () => {
      video.play().catch(() => {});
    };

    const cleanups = Array.from(videos).map((video) => {
      video.muted = true;
      video.defaultMuted = true;
      const play = tryPlay(video);
      play();
      video.addEventListener("loadeddata", play);
      document.addEventListener("visibilitychange", play);
      return () => {
        video.removeEventListener("loadeddata", play);
        document.removeEventListener("visibilitychange", play);
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  useGSAP(
    () => {
      gsap.from(".service-checklist-item", {
        autoAlpha: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".service-checklist",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.set(".service-row", { autoAlpha: 0, y: 32 });

      ScrollTrigger.batch(".service-row", {
        start: "top 85%",
        onEnter: (rows) =>
          gsap.to(rows, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.12,
            overwrite: true,
          }),
        onLeaveBack: (rows) =>
          gsap.to(rows, { autoAlpha: 0, y: 32, duration: 0.4, overwrite: true }),
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
    <Section id="services" tone="surface" className="rounded-t-[100px]" ref={sectionRef}>
      <Container>
        <div className="service-checklist mx-auto max-w-[880px] rounded-[28px] bg-[#FEFFFF] shadow-lg">
          <div className="p-6 sm:p-10 lg:p-14">
            <div className="relative flex flex-col items-center border-b border-border pb-8 pt-6 text-center sm:pb-10 sm:pt-8">
              <span className="relative inline-flex items-center bg-gradient-to-r from-[#2f6ee0] via-[#3f9ae6] to-[#61cdf1] bg-clip-text text-3xl font-bold leading-[1.1] text-transparent sm:text-4xl lg:text-[44px]">
                {content.title}
                <span
                  aria-hidden="true"
                  className="absolute -top-9 left-1/2 -translate-x-1/2 -rotate-[8deg] whitespace-nowrap text-[28px] tracking-wide text-accent-500 sm:-top-11 sm:text-[34px] [font-family:var(--font-handwritten)]"
                >
                  New!
                </span>
              </span>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(74,159,230,0.35)_0%,_rgba(74,159,230,0.16)_35%,_transparent_70%)] blur-2xl"
              />
              <ul className="grid grid-cols-1 gap-x-12 gap-y-8 pt-8 sm:pt-10 md:grid-cols-2">
                {content.items.map((item, index) => {
                  const Icon =
                    SERVICE_ICON_BY_TITLE[item.title] ??
                    SERVICE_ICON_FALLBACKS[index % SERVICE_ICON_FALLBACKS.length];
                  return (
                    <li key={item.title} className="service-checklist-item flex items-start gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center">
                        <Icon className="h-full w-full" />
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-black sm:text-lg">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-text-muted sm:text-[15px]">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-10 flex justify-center sm:mt-12">
              <div className="inline-flex max-w-full items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-surface px-3 py-2.5 text-xs text-text-muted sm:px-5 sm:text-sm">
                Want to discuss?{" "}
                <a
                  href="#contact"
                  className="font-semibold text-primary-900 underline decoration-1 underline-offset-2 transition-colors duration-150 hover:text-accent-700"
                >
                  {content.button}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-[880px] flex-col gap-8">
          {content.items.map((item, index) => {
            const imageFirst = index % 2 === 0;
            const eyebrow = item.eyebrow ?? item.title;

            const imageBlock = (
              <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                {item.video ? (
                  <video
                    src={item.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    // eslint-disable-next-line react/no-unknown-property -- legacy iOS Safari still keys off this attribute
                    webkit-playsinline="true"
                    controls={false}
                    preload="auto"
                    disablePictureInPicture
                    disableRemotePlayback
                    aria-hidden="true"
                    className="pointer-events-none h-full w-full object-cover transition-transform duration-[400ms] ease-[var(--ease-out)] group-hover:scale-[1.04]"
                  />
                ) : item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-[400ms] ease-[var(--ease-out)] group-hover:scale-[1.04]"
                  />
                ) : (
                  <div
                    className={cn(
                      "flex h-full w-full items-center justify-center bg-gradient-to-br p-6 text-center",
                      PLACEHOLDER_GRADIENTS[item.accent]
                    )}
                  >
                    <span className="text-sm font-medium text-primary-800/70">
                      Upload image here — {item.imageRatio ?? "4:3"}
                    </span>
                  </div>
                )}
              </div>
            );

            const textBlock = (
              <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
                <span
                  className={cn(
                    "inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em]",
                    ACCENT_STYLES[item.accent]
                  )}
                >
                  {eyebrow}
                </span>
                <h3 className="bg-gradient-to-r from-[#2f6ee0] via-[#3f9ae6] to-[#61cdf1] bg-clip-text text-2xl font-bold text-transparent sm:text-[26px]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted sm:text-[15px]">
                  {item.description}
                </p>
                {item.features.length ? (
                  <div className="mt-1 flex flex-wrap gap-2">
                    {item.features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text-muted"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            );

            return (
              <BorderGlow
                key={item.title}
                className="service-row transition-transform duration-[400ms] ease-[var(--ease-out)] hover:-translate-y-1.5"
                backgroundColor="#FEFFFF"
                borderRadius={28}
                colors={
                  ACCENT_GLOW[item.accent] ?? ["#4a9fe6", "#46d3f3", "#0a355b"]
                }
              >
                <div className="overflow-hidden shadow-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2">
                    {imageFirst ? (
                      <>
                        <div className="order-1 p-3 sm:order-none sm:p-4">{imageBlock}</div>
                        <div className="order-2 sm:order-none sm:contents">{textBlock}</div>
                      </>
                    ) : (
                      <>
                        <div className="order-2 sm:order-none sm:contents">{textBlock}</div>
                        <div className="order-1 p-3 sm:order-none sm:p-4">{imageBlock}</div>
                      </>
                    )}
                  </div>
                </div>
              </BorderGlow>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
