"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";
import type { StatsContent } from "@/types/cms";

type StatsProps = {
  content: StatsContent;
};

export function Stats({ content }: StatsProps) {
  return (
    <Section tone="dark" className="relative overflow-hidden" compact>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(70,211,243,0.14), transparent 45%), radial-gradient(circle at 85% 80%, rgba(255,122,26,0.10), transparent 45%)",
        }}
      />

      <Container wide className="relative">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 text-center"
        >
          {content.items.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <p className="text-4xl sm:text-5xl font-bold text-text-on-dark font-display">
                {stat.number}
              </p>
              <p className="mt-2 text-sm text-text-on-dark-muted">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
