"use client";

import { useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionItemProps = {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
};

export function AccordionItem({ question, answer, open, onToggle }: AccordionItemProps) {
  const id = useId();

  return (
    <div className="border-b border-border">
      <h3>
        <button
          type="button"
          id={`faq-trigger-${id}`}
          aria-expanded={open}
          aria-controls={`faq-panel-${id}`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 py-5 text-left"
        >
          <span className="text-base sm:text-lg font-semibold text-primary-900">
            {question}
          </span>
          <ChevronDown
            className={cn(
              "h-5 w-5 shrink-0 text-text-subtle transition-transform duration-300 ease-[var(--ease-in-out)]",
              open && "rotate-180 text-accent-700"
            )}
            aria-hidden="true"
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-panel-${id}`}
            role="region"
            aria-labelledby={`faq-trigger-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm sm:text-base leading-relaxed text-text-muted pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
