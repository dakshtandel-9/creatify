"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { COMPARISON_ROWS } from "@/constants/comparison";
import { fadeUp, viewportOnce } from "@/animations/variants";

function StatusIcon({ positive }: { positive: boolean }) {
  return positive ? (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
      <Check className="h-4 w-4" aria-hidden="true" />
    </span>
  ) : (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose-50 text-rose-400">
      <X className="h-4 w-4" aria-hidden="true" />
    </span>
  );
}

export function Comparison() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="The Difference"
          title="What changes when you switch to Creadify"
          description="Most agency relationships look the same on paper. Here's what's actually different in practice."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
        >
          <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_140px_140px] items-center bg-surface px-5 sm:px-8 py-4 border-b border-border">
            <span className="text-sm font-semibold text-text-subtle">Capability</span>
            <span className="text-center text-sm font-semibold text-text-subtle">
              Traditional
            </span>
            <span className="text-center text-sm font-bold text-primary-900">
              Creadify
            </span>
          </div>

          {COMPARISON_ROWS.map((row, i) => (
            <motion.div
              key={row.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_140px_140px] items-center px-5 sm:px-8 py-4 border-b border-border last:border-b-0"
            >
              <span className="text-sm sm:text-base text-text pr-4">{row.label}</span>
              <span className="flex justify-center">
                <StatusIcon positive={row.traditional} />
              </span>
              <span className="flex justify-center">
                <StatusIcon positive={row.creadify} />
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
