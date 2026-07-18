"use client";

import { motion } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { GrowthChart } from "@/components/ui/GrowthChart";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-950 to-ink py-20 sm:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(70,211,243,0.16), transparent 45%), radial-gradient(circle at 10% 85%, rgba(255,122,26,0.12), transparent 45%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/2 w-full max-w-2xl -translate-x-1/2 opacity-[0.18]"
      >
        <GrowthChart />
      </div>

      <Container wide className="relative">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.12] text-text-on-dark"
          >
            Ready to turn your marketing into a growth engine?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-lg leading-relaxed text-text-on-dark-muted"
          >
            Tell us about your business and we&rsquo;ll prepare a growth
            strategy tailored to your goals — no obligation, no generic pitch.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button href="#contact" variant="primary" size="lg" icon={ArrowRight}>
              Book Free Strategy Call
            </Button>
            <Button href="#contact" variant="ghost" size="lg" icon={PhoneCall} iconPosition="left">
              Get a Free Proposal
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
