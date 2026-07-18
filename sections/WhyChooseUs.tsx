"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Card } from "@/components/ui/Card";
import { WHY_US_POINTS } from "@/constants/whyUs";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";

export function WhyChooseUs() {
  return (
    <Section id="why-us">
      <Container wide>
        <SectionHeading
          eyebrow="Why Creadify"
          title="Built for businesses that need results, not reports"
          description="Six commitments that shape how we work with every client, from the first strategy call to year three."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {WHY_US_POINTS.map((point) => {
            const Icon = point.icon;
            return (
              <motion.div key={point.title} variants={fadeUp}>
                <Card className="h-full">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-800">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-primary-900">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {point.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
