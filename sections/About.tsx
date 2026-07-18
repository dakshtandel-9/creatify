"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GrowthSystemArt } from "@/components/ui/GrowthSystemArt";
import { fadeUp, fadeUpSmall, staggerContainer, viewportOnce } from "@/animations/variants";
import type { AboutContent, HeaderContent } from "@/types/cms";

type AboutProps = {
  content: AboutContent;
  primaryButtonLink: HeaderContent["primaryButton"]["link"];
};

export function About({ content, primaryButtonLink }: AboutProps) {
  return (
    <Section id="about" tone="surface">
      <Container wide>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1 pb-6 lg:pb-0"
          >
            <GrowthSystemArt />
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="order-1 lg:order-2"
          >
            <motion.div variants={fadeUp}>
              <Badge variant="secondary">{content.title}</Badge>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.12] text-primary-900"
            >
              {content.heading}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-lg leading-relaxed text-text-muted"
            >
              {content.description}
            </motion.p>

            <motion.ul variants={staggerContainer(0.08)} className="mt-8 space-y-4">
              {content.features.map((point) => (
                <motion.li
                  key={point}
                  variants={fadeUpSmall}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent-500"
                    aria-hidden="true"
                  />
                  <span className="text-base text-text leading-relaxed">
                    {point}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-10">
              <Button href={primaryButtonLink} variant="primary" size="lg">
                {content.button}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
