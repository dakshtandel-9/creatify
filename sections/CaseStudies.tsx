"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CaseStudyVisual } from "@/components/ui/CaseStudyVisual";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";
import type { CaseStudiesContent, HeaderContent } from "@/types/cms";

type CaseStudiesProps = {
  content: CaseStudiesContent;
  primaryButtonLink: HeaderContent["primaryButton"]["link"];
};

export function CaseStudies({ content, primaryButtonLink }: CaseStudiesProps) {
  const items = content.items ?? [];

  return (
    <Section id="case-studies">
      <Container wide>
        <SectionHeading eyebrow={content.title} title={content.heading} />

        {items.length > 0 ? (
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {items.map((study) => (
              <motion.div key={study.client} variants={fadeUp} className="h-full">
                <Card className="h-full flex flex-col p-0 overflow-hidden">
                  <div className="p-3">
                    <CaseStudyVisual variant={study.image} />
                  </div>

                  <div className="flex flex-1 flex-col px-6 pb-6 sm:px-7 sm:pb-7">
                    <span className="text-xs font-semibold uppercase tracking-wide text-accent-700">
                      {study.industry}
                    </span>
                    <h3 className="mt-1.5 text-xl font-bold text-primary-900">
                      {study.client}
                    </h3>

                    <div className="mt-4 space-y-3 text-sm">
                      <div>
                        <p className="font-semibold text-text">Challenge</p>
                        <p className="mt-1 text-text-muted leading-relaxed">
                          {study.challenge}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-text">Solution</p>
                        <p className="mt-1 text-text-muted leading-relaxed">
                          {study.solution}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-2 border-t border-border pt-5">
                      {study.results.map((result) => (
                        <div key={result.label}>
                          <p className="text-lg font-bold text-primary-900 font-display">
                            {result.value}
                          </p>
                          <p className="text-[11px] text-text-subtle leading-tight mt-0.5">
                            {result.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : null}

        <div className="mt-12 flex justify-center">
          <Button href={primaryButtonLink} variant="primary" size="lg" icon={ArrowRight}>
            {content.button}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
