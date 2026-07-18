"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { MARKETING_STACK } from "@/constants/marketingStack";
import { fadeUpSmall, staggerContainer, viewportOnce } from "@/animations/variants";

export function MarketingStack() {
  return (
    <Section compact>
      <Container wide>
        <SectionHeading
          eyebrow="Our Stack"
          title="Best-in-class tools, not guesswork"
          description="We work inside platforms your team already knows, so handoffs and reporting stay simple."
        />

        <motion.div
          variants={staggerContainer(0.04)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          {MARKETING_STACK.map((tool) => (
            <motion.span
              key={tool}
              variants={fadeUpSmall}
              className="rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-text-muted shadow-xs transition-colors duration-200 hover:border-primary-300 hover:text-primary-900"
            >
              {tool}
            </motion.span>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
