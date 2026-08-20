"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLenisControls } from "@/components/layout/SmoothScrollProvider";
import { FieldWrapper, Input, Textarea } from "@/components/ui/FormField";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import type { ContactContent } from "@/types/cms";

type ContactModalProps = {
  content: ContactContent;
  isOpen: boolean;
  onClose: () => void;
};

export function ContactModal({ content, isOpen, onClose }: ContactModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const lenis = useLenisControls();
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

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, lenis]);

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-primary-950/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
          role="presentation"
          data-lenis-prevent
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            className="relative min-h-dvh w-full bg-white"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-60%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close contact form"
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full text-primary-900 transition-colors duration-150 hover:bg-primary-50 sm:right-8 sm:top-8 lg:right-12 lg:top-10"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>

            <AnimatePresence mode="wait">
              {isSubmitSuccessful ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex min-h-dvh flex-col items-center justify-center px-6 py-20 text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-2xl font-bold text-primary-900">
                    Thanks — we&rsquo;ve got it.
                  </h3>
                  <p className="mt-2 max-w-sm text-text-muted">
                    A strategist will review your details and follow up within one
                    business day.
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
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mx-auto flex min-h-dvh w-full max-w-[1400px] flex-col justify-center gap-12 px-6 py-20 sm:px-10 sm:py-24 lg:flex-row lg:gap-20 lg:px-14"
                >
                  {/* Left — headline, intro, contact blocks */}
                  <div className="flex flex-col lg:w-[46%]">
                    <h2
                      id="contact-modal-title"
                      className="text-[2.75rem] font-bold leading-[0.95] tracking-[-0.03em] text-primary-900 sm:text-6xl lg:text-[clamp(3.5rem,6vw,6rem)]"
                    >
                      Send a
                      <br className="hidden lg:block" /> message.
                    </h2>
                    <p className="mt-6 max-w-md text-base text-text-muted sm:text-lg">
                      We&rsquo;re here to answer any question you may have.
                    </p>

                    <div className="mt-10 grid grid-cols-2 gap-6 sm:gap-10 lg:mt-auto lg:pt-20">
                      <div>
                        <p className="text-sm font-bold text-primary-900">Careers</p>
                        <p className="mt-2 text-sm text-text-muted">
                          Would you like to join our growing team?
                        </p>
                        <a
                          href="mailto:hr@creadify.in"
                          className="mt-3 inline-block text-sm font-bold text-black transition-colors duration-150 hover:text-accent-600"
                        >
                          hr@creadify.in
                        </a>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary-900">
                          Direct Contact
                        </p>
                        <p className="mt-2 text-sm text-text-muted">
                          Have a project in mind?
                        </p>
                        <a
                          href={`mailto:${content.email}`}
                          className="mt-3 inline-block text-sm font-bold text-black transition-colors duration-150 hover:text-accent-600"
                        >
                          {content.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right — form */}
                  <div className="w-full lg:flex-1 lg:self-center">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                      className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2"
                    >
                      <FieldWrapper error={errors.name?.message}>
                        <Input
                          id="modal-name"
                          placeholder="Your name?"
                          aria-label="Your name"
                          autoComplete="name"
                          hasError={!!errors.name}
                          className="h-12"
                          {...register("name")}
                        />
                      </FieldWrapper>

                      <FieldWrapper error={errors.email?.message}>
                        <Input
                          id="modal-email"
                          type="email"
                          placeholder="Your Email address?"
                          aria-label="Your email address"
                          autoComplete="email"
                          hasError={!!errors.email}
                          className="h-12"
                          {...register("email")}
                        />
                      </FieldWrapper>

                      <FieldWrapper error={errors.phone?.message}>
                        <Input
                          id="modal-phone"
                          type="tel"
                          placeholder="Your Phone Number?"
                          aria-label="Your phone number"
                          autoComplete="tel"
                          hasError={!!errors.phone}
                          className="h-12"
                          {...register("phone")}
                        />
                      </FieldWrapper>

                      <FieldWrapper error={errors.budget?.message}>
                        <div className="relative">
                          <span
                            className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-base text-text"
                            aria-hidden="true"
                          >
                            ₹
                          </span>
                          <Input
                            id="modal-budget"
                            inputMode="numeric"
                            placeholder="What's your budget?"
                            aria-label="What's your budget?"
                            hasError={!!errors.budget}
                            className="h-12 pl-5"
                            {...register("budget")}
                          />
                        </div>
                      </FieldWrapper>

                      <div className="sm:col-span-2">
                        <FieldWrapper error={errors.website?.message}>
                          <Input
                            id="modal-website"
                            placeholder="Your Website?"
                            aria-label="Your website"
                            autoComplete="url"
                            hasError={!!errors.website}
                            className="h-12"
                            {...register("website")}
                          />
                        </FieldWrapper>
                      </div>

                      <div className="sm:col-span-2">
                        <FieldWrapper error={errors.message?.message}>
                          <Textarea
                            id="modal-message"
                            rows={2}
                            placeholder="Tell us about your project"
                            aria-label="Tell us about your project"
                            hasError={!!errors.message}
                            className="py-3"
                            {...register("message")}
                          />
                        </FieldWrapper>
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        loading={isSubmitting}
                        className={cn(
                          "mt-2 w-full rounded-none bg-[#4A9FE6] uppercase tracking-[0.08em] hover:bg-[#3182CE] sm:col-span-2"
                        )}
                      >
                        {isSubmitting ? "Sending..." : content.button}
                      </Button>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
