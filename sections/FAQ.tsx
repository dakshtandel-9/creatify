"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { AccordionItem } from "@/components/ui/AccordionItem";
import type { FaqContent } from "@/types/cms";

type FAQProps = {
  content: FaqContent;
};

const TWO_COLUMN_THRESHOLD = 6;

export function FAQ({ content }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = content.items;
  const useTwoColumns = items.length >= TWO_COLUMN_THRESHOLD;

  const midpoint = useTwoColumns ? Math.ceil(items.length / 2) : items.length;
  const columns = useTwoColumns
    ? [items.slice(0, midpoint), items.slice(midpoint)]
    : [items];

  return (
    <Section id="faq">
      <Container wide={useTwoColumns} className={useTwoColumns ? undefined : "max-w-3xl"}>
        <SectionHeading eyebrow="FAQ" title={content.title} />

        <div
          className={
            useTwoColumns
              ? "mt-14 grid grid-cols-1 lg:grid-cols-2 gap-x-12"
              : "mt-14"
          }
        >
          {columns.map((column, colIndex) => (
            <div key={colIndex}>
              {column.map((item, i) => {
                const globalIndex = colIndex === 0 ? i : i + midpoint;
                return (
                  <AccordionItem
                    key={item.question}
                    question={item.question}
                    answer={item.answer}
                    open={openIndex === globalIndex}
                    onToggle={() =>
                      setOpenIndex(openIndex === globalIndex ? null : globalIndex)
                    }
                  />
                );
              })}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
