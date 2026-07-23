"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { getIconForTitle } from "@/lib/icons";
import { fadeUpSmall, staggerContainer, viewportOnce } from "@/animations/variants";
import type { IndustriesContent } from "@/types/cms";

type IndustriesProps = {
  content: IndustriesContent;
};

export function Industries({ content }: IndustriesProps) {
  return (
    <Section id="industries">
      <Container wide>
        <SectionHeading eyebrow="Industries" title={content.title} />

        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5"
        >
          {content.items.map((name) => {
            const Icon = getIconForTitle(name);
            return (
              <motion.div
                key={name}
                variants={fadeUpSmall}
                className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-[#F9FAFC] px-4 py-8 text-center shadow-xs transition-all duration-[400ms] ease-[var(--ease-out)] hover:-translate-y-1.5 hover:border-primary-200 hover:shadow-md"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-800 transition-colors duration-300 group-hover:bg-primary-800 group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-primary-900">
                  {name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
