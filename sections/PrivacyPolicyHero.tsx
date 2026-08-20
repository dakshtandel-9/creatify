"use client";

import { useRef } from "react";
import { ArrowLeft, CalendarDays, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { gsap, useGSAP } from "@/lib/gsap";

type PrivacyPolicyHeroProps = {
  siteName: string;
  lastUpdated: string;
};

/** Page-opening band for the policy: eyebrow badge, title, and intent line. */
export function PrivacyPolicyHero({ siteName, lastUpdated }: PrivacyPolicyHeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".policy-hero-reveal", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.09,
      });
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-surface pt-16 pb-14 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20"
    >
      {/* Soft brand wash + dotted texture, both purely decorative */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_85%_0%,rgba(70,211,243,0.16),transparent_55%),radial-gradient(90%_80%_at_100%_40%,rgba(74,159,230,0.12),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-64 w-64 opacity-[0.35] [background-image:radial-gradient(circle,var(--color-border-strong)_1.2px,transparent_1.2px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom_left,black,transparent_70%)]"
      />

      <Container className="relative">
        <div className="policy-hero-reveal">
          <Button href="/" variant="text" size="md" icon={ArrowLeft} iconPosition="left" className="mb-6 -ml-1">
            Back to Home
          </Button>
        </div>

        <div className="policy-hero-reveal">
          <Badge icon={ShieldCheck} variant="secondary">
            Your Privacy Matters
          </Badge>
        </div>

        <h1 className="policy-hero-reveal mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-primary-900 sm:text-5xl lg:text-6xl">
          Privacy Policy
        </h1>

        <p className="policy-hero-reveal mt-5 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
          At {siteName}, your privacy is important to us. This policy explains how we collect,
          use, disclose, and safeguard your information.
        </p>

        <p className="policy-hero-reveal mt-7 inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-text-subtle shadow-xs">
          <CalendarDays className="h-4 w-4 text-accent-500" aria-hidden="true" />
          Last updated: {lastUpdated}
        </p>
      </Container>
    </section>
  );
}
