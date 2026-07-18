"use client";

import { useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { cn } from "@/lib/utils";
import type { TestimonialsContent } from "@/types/cms";

type TestimonialsProps = {
  content: TestimonialsContent;
};

export function Testimonials({ content }: TestimonialsProps) {
  const items = content.items;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex((next + items.length) % items.length);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80) goTo(index + 1);
    else if (info.offset.x > 80) goTo(index - 1);
  };

  if (items.length === 0) {
    return null;
  }

  const current = items[index];

  return (
    <Section id="testimonials" tone="surface">
      <Container className="max-w-4xl">
        <SectionHeading eyebrow="Testimonials" title={content.title} />

        <div className="relative mt-14">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction >= 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction >= 0 ? -60 : 60 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="rounded-3xl border border-border bg-white shadow-lg p-8 sm:p-12 cursor-grab active:cursor-grabbing"
              >
                <Quote className="h-10 w-10 text-accent-200" aria-hidden="true" />

                <p className="mt-4 text-xl sm:text-2xl leading-relaxed text-primary-900 font-medium">
                  &ldquo;{current.quote}&rdquo;
                </p>

                <div className="mt-8 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-800 text-white font-bold font-display">
                      {current.avatar}
                    </span>
                    <div>
                      <p className="font-bold text-primary-900">{current.name}</p>
                      <p className="text-sm text-text-muted">
                        {current.role}, {current.company}
                      </p>
                    </div>
                  </div>

                  <div
                    className="hidden sm:flex items-center gap-0.5"
                    role="img"
                    aria-label={`${current.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < current.rating
                            ? "fill-accent-500 text-accent-500"
                            : "fill-border text-border"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {items.length > 1 ? (
            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-primary-800 shadow-sm transition-all duration-150 hover:border-primary-300 hover:text-accent-700 active:scale-95"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-2">
                {items.map((t, i) => (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    aria-current={i === index}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      i === index ? "w-6 bg-accent-500" : "w-2 bg-border hover:bg-primary-200"
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-primary-800 shadow-sm transition-all duration-150 hover:border-primary-300 hover:text-accent-700 active:scale-95"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
