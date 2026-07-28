"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { BorderGlow } from "@/components/ui/BorderGlow";
import { gsap, useGSAP } from "@/lib/gsap";
import type { ServicesFaq as ServicesFaqContent } from "@/types/cms";

type ServicesFaqProps = {
  content: ServicesFaqContent;
};

export function ServicesFaq({ content }: ServicesFaqProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      gsap.from(".service-faq-item", {
        autoAlpha: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: ".service-faq",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <Section id="faq" tone="surface" ref={sectionRef}>
      <Container>
        <BorderGlow
          className="service-faq mx-auto max-w-[880px]"
          backgroundColor="#F9FAFC"
          borderRadius={28}
          colors={["#ff7a1a", "#46d3f3", "#0a355b"]}
        >
          <div className="p-6 shadow-lg sm:p-10 lg:p-14">
            <div className="flex items-center justify-center gap-3 border-b border-border pb-8 text-center sm:pb-10">
              <h2 className="text-3xl font-bold leading-[1.1] text-primary-900 sm:text-4xl lg:text-[44px]">
                {content.title}
              </h2>
              {content.emoji ? (
                <span className="text-4xl sm:text-5xl" aria-hidden="true">
                  {content.emoji}
                </span>
              ) : null}
            </div>

            <div className="pt-8 sm:pt-10">
              {content.items.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={item.question}
                    className="service-faq-item border-b border-border last:border-b-0"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="group flex w-full items-center justify-between gap-4 py-7 text-left"
                    >
                      <span className="text-base font-bold text-primary-900 transition-colors duration-150 group-hover:text-accent-700 sm:text-lg">
                        {item.question}
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                          isOpen
                            ? "border-accent-500 bg-accent-500 text-white"
                            : "border-border text-primary-900 group-hover:border-primary-300"
                        }`}
                        aria-hidden="true"
                      >
                        {isOpen ? (
                          <Minus className="h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pb-7 text-sm leading-relaxed text-text-muted sm:text-[15px]">
                            {item.answer}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </BorderGlow>
      </Container>
    </Section>
  );
}
