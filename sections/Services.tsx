"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getIconForTitle } from "@/lib/icons";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";
import type { ServicesContent, HeaderContent } from "@/types/cms";

type ServicesProps = {
  content: ServicesContent;
  primaryButtonLink: HeaderContent["primaryButton"]["link"];
};

export function Services({ content, primaryButtonLink }: ServicesProps) {
  return (
    <Section id="services" tone="surface">
      <Container wide>
        <SectionHeading
          eyebrow={content.title}
          title={content.heading}
        />

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {content.items.map((service) => {
            const Icon = getIconForTitle(service.title);
            return (
              <motion.div key={service.title} variants={fadeUp} className="h-full">
                <Card className="group h-full flex flex-col">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-700 transition-colors duration-300 group-hover:bg-accent-500 group-hover:text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-primary-900">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted flex-1">
                    {service.description}
                  </p>

                  <a
                    href={primaryButtonLink}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-800 group-hover:text-accent-700 transition-colors"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </a>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-12 flex justify-center">
          <Button href={primaryButtonLink} variant="secondary" size="lg">
            {content.button}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
