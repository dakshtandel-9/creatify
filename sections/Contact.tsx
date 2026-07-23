"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Mail, MapPin, Clock, Phone, Send } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { BorderGlow } from "@/components/ui/BorderGlow";
import { FieldWrapper, Input, Select, Textarea } from "@/components/ui/FormField";
import {
  contactFormSchema,
  type ContactFormValues,
  BUDGET_OPTIONS,
  SERVICE_OPTIONS,
} from "@/lib/validation";
import { cn } from "@/lib/utils";
import { gsap, useGSAP } from "@/lib/gsap";
import type { ContactContent } from "@/types/cms";

type ContactProps = {
  content: ContactContent;
};

export function Contact({ content }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 900));
  };

  const contactDetails = [
    { icon: MapPin, label: "Address", value: content.address },
    { icon: Phone, label: "Phone", value: content.phone },
    { icon: Mail, label: "Email", value: content.email },
    { icon: Clock, label: "Hours", value: content.workingHours },
  ];

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 0.6 },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".contact-details > *", { autoAlpha: 0, y: 24, stagger: 0.08 }).from(
        ".contact-form-card",
        { autoAlpha: 0, y: 24 },
        "-=0.4"
      );
    },
    { scope: sectionRef }
  );

  return (
    <Section id="contact" ref={sectionRef}>
      <Container wide>
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16">
          <div className="contact-details">
            <span className="text-sm font-semibold uppercase tracking-[0.08em] text-accent-700">
              Contact
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold leading-[1.12] text-primary-900">
              {content.title}
            </h2>

            <ul className="mt-10 space-y-6">
              {contactDetails.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label} className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-800">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-primary-900">{item.label}</p>
                      <p className="text-sm text-text-muted mt-0.5">{item.value}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <p className="text-sm text-text-muted">
                <span className="font-semibold text-primary-900">1 business day</span>{" "}
                average response time — a strategist reviews every submission.
              </p>
            </div>
          </div>

          <BorderGlow
            className="contact-form-card"
            backgroundColor="#F9FAFC"
            borderRadius={24}
            colors={["#ff7a1a", "#46d3f3", "#0a355b"]}
          >
          <div className="shadow-lg p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {isSubmitSuccessful ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center text-center py-16"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-primary-900">
                    Thanks — we&rsquo;ve got it.
                  </h3>
                  <p className="mt-2 text-text-muted max-w-sm">
                    A strategist will review your details and follow up within
                    one business day.
                  </p>
                  <Button
                    type="button"
                    variant="secondary"
                    className="mt-8"
                    onClick={() => reset()}
                  >
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FieldWrapper
                      label="Business Name"
                      htmlFor="businessName"
                      error={errors.businessName?.message}
                    >
                      <Input
                        id="businessName"
                        hasError={!!errors.businessName}
                        placeholder="Acme Inc."
                        {...register("businessName")}
                      />
                    </FieldWrapper>

                    <FieldWrapper label="Your Name" htmlFor="name" error={errors.name?.message}>
                      <Input
                        id="name"
                        hasError={!!errors.name}
                        placeholder="Jordan Lee"
                        {...register("name")}
                      />
                    </FieldWrapper>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FieldWrapper label="Email" htmlFor="email" error={errors.email?.message}>
                      <Input
                        id="email"
                        type="email"
                        hasError={!!errors.email}
                        placeholder="jordan@acme.com"
                        {...register("email")}
                      />
                    </FieldWrapper>

                    <FieldWrapper label="Phone" htmlFor="phone" error={errors.phone?.message}>
                      <Input
                        id="phone"
                        type="tel"
                        hasError={!!errors.phone}
                        placeholder="+1 (555) 000-0000"
                        {...register("phone")}
                      />
                    </FieldWrapper>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FieldWrapper label="Budget" htmlFor="budget" error={errors.budget?.message}>
                      <Select
                        id="budget"
                        hasError={!!errors.budget}
                        defaultValue=""
                        {...register("budget")}
                      >
                        <option value="" disabled>
                          Select a range
                        </option>
                        {BUDGET_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </Select>
                    </FieldWrapper>

                    <FieldWrapper label="Service" htmlFor="service" error={errors.service?.message}>
                      <Select
                        id="service"
                        hasError={!!errors.service}
                        defaultValue=""
                        {...register("service")}
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </Select>
                    </FieldWrapper>
                  </div>

                  <FieldWrapper label="Message" htmlFor="message" error={errors.message?.message}>
                    <Textarea
                      id="message"
                      rows={4}
                      hasError={!!errors.message}
                      placeholder="Tell us about your business and goals..."
                      {...register("message")}
                    />
                  </FieldWrapper>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    icon={Send}
                    loading={isSubmitting}
                    className={cn("w-full sm:w-auto")}
                  >
                    {isSubmitting ? "Sending..." : content.button}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
          </BorderGlow>
        </div>
      </Container>
    </Section>
  );
}
