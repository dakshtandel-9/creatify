"use client";

import { useRef } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Marquee } from "@/components/ui/Marquee";
import { gsap, useGSAP } from "@/lib/gsap";
import type { TestimonialEntry, TestimonialsContent } from "@/types/cms";

type TestimonialsProps = {
  content: TestimonialsContent;
};

function TestimonialCard({ item }: { item: TestimonialEntry }) {
  return (
    <div className="w-[340px] shrink-0 rounded-3xl border border-border bg-[#F9FAFC] p-6 shadow-sm sm:w-[380px] sm:p-7">
      <div className="flex h-full flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={
                  i < item.rating
                    ? "h-4 w-4 fill-accent-500 text-accent-500"
                    : "h-4 w-4 fill-border text-border"
                }
              />
            ))}
          </div>
          <Quote className="h-6 w-6 text-primary-100" aria-hidden="true" />
        </div>

        <p className="text-sm leading-[1.7] text-text-muted sm:text-[15px]">
          &ldquo;{item.quote}&rdquo;
        </p>

        <div className="mt-auto flex items-center gap-3.5 border-t border-border pt-5">
          <span className="relative h-13 w-13 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-sm">
            <Image
              src={item.avatar}
              alt={item.name}
              fill
              sizes="52px"
              className="object-cover"
            />
          </span>
          <div>
            <p className="text-sm font-bold text-primary-900">{item.name}</p>
            <p className="text-xs text-text-subtle">
              {item.role} &middot; <span className="font-medium text-text-muted">{item.company}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials({ content }: TestimonialsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".testimonials-heading", {
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

      gsap.from(".testimonials-marquee", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
        delay: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  if (!content.items.length) return null;

  const firstRow = content.items.filter((_, i) => i % 2 === 0);
  const secondRow = content.items.filter((_, i) => i % 2 === 1);

  return (
    <Section id="testimonials" tone="surface" ref={sectionRef}>
      <Container wide>
        <div className="testimonials-heading mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="-rotate-3 text-sm font-semibold text-accent-600 [font-family:var(--font-display)]">
            Testimonials
          </span>
          <h2 className="text-3xl font-bold leading-[1.1] text-primary-900 sm:text-4xl lg:text-[44px]">
            {content.title}
          </h2>
        </div>
      </Container>

      <div className="testimonials-marquee relative mx-auto mt-12 w-full max-w-[var(--container-max)] overflow-x-hidden sm:mt-16">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-background sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-background sm:w-40" />

        <Marquee className="[--duration:50s]">
          {firstRow.map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </Marquee>
        {secondRow.length ? (
          <Marquee reverse className="mt-6 [--duration:50s]">
            {secondRow.map((item) => (
              <TestimonialCard key={item.name} item={item} />
            ))}
          </Marquee>
        ) : null}
      </div>
    </Section>
  );
}
