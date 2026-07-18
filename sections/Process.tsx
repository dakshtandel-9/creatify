"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { getIconForTitle } from "@/lib/icons";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";
import type { ProcessContent } from "@/types/cms";

type ProcessProps = {
  content: ProcessContent;
};

export function Process({ content }: ProcessProps) {
  return (
    <Section id="process" tone="surface">
      <Container wide>
        <SectionHeading eyebrow="Our Process" title={content.title} />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-12"
        >
          {/* Connecting line — desktop only */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-0 right-0 top-8 h-px bg-border"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="h-full origin-left bg-gradient-to-r from-primary-300 via-secondary-400 to-accent-500"
            />
          </div>

          {content.steps.map((step, i) => {
            const Icon = getIconForTitle(step);
            return (
              <motion.div
                key={step}
                variants={fadeUp}
                className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                <span className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-primary-800 bg-white text-primary-800 shadow-sm">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <span className="mt-4 text-xs font-bold tracking-[0.1em] text-accent-700">
                  STEP {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1.5 text-lg font-bold text-primary-900">
                  {step}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
