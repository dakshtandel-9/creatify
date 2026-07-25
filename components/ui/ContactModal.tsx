"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLenisControls } from "@/components/layout/SmoothScrollProvider";
import { FieldWrapper, Input, Select, Textarea } from "@/components/ui/FormField";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import type { ContactContent } from "@/types/cms";

type ContactModalProps = {
  content: ContactContent;
  isOpen: boolean;
  onClose: () => void;
};

const SERVICE_OPTIONS = [
  "Strategic Marketing",
  "Eye-catchy Designs",
  "Social Media",
  "Web Development",
  "Robust SEO",
  "Automation",
];

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
          className="fixed inset-0 z-[100] flex justify-center overflow-y-auto overscroll-contain bg-primary-950/60 backdrop-blur-sm px-4 py-6 sm:px-6 sm:py-10"
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
            className="relative my-auto w-full max-w-3xl rounded-3xl bg-white shadow-xl"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-60%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close contact form"
              className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full text-primary-900 transition-colors duration-150 hover:bg-primary-50 sm:right-6 sm:top-6"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="p-6 sm:p-10">
              <AnimatePresence mode="wait">
                {isSubmitSuccessful ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 text-xl font-bold text-primary-900">
                      Thanks — we&rsquo;ve got it.
                    </h3>
                    <p className="mt-2 max-w-sm text-text-muted">
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
                  <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h2
                      id="contact-modal-title"
                      className="text-3xl font-bold leading-[1.1] text-primary-900 sm:text-4xl"
                    >
                      Send a
                      <br />
                      message.
                    </h2>
                    <p className="mt-3 max-w-sm text-text-muted">
                      We&rsquo;re here to answer any question you may have.
                    </p>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                      className="mt-8 space-y-5"
                    >
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <FieldWrapper
                          label="Your Name"
                          htmlFor="modal-name"
                          error={errors.name?.message}
                        >
                          <Input
                            id="modal-name"
                            hasError={!!errors.name}
                            placeholder="Jordan Lee"
                            {...register("name")}
                          />
                        </FieldWrapper>

                        <FieldWrapper
                          label="Email Address"
                          htmlFor="modal-email"
                          error={errors.email?.message}
                        >
                          <Input
                            id="modal-email"
                            type="email"
                            hasError={!!errors.email}
                            placeholder="jordan@acme.com"
                            {...register("email")}
                          />
                        </FieldWrapper>
                      </div>

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <FieldWrapper
                          label="Phone Number"
                          htmlFor="modal-phone"
                          error={errors.phone?.message}
                        >
                          <Input
                            id="modal-phone"
                            type="tel"
                            hasError={!!errors.phone}
                            placeholder="+1 (555) 000-0000"
                            {...register("phone")}
                          />
                        </FieldWrapper>

                        <FieldWrapper
                          label="Budget"
                          htmlFor="modal-budget"
                          error={errors.budget?.message}
                        >
                          <div className="relative">
                            <span
                              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base text-text"
                              aria-hidden="true"
                            >
                              ₹
                            </span>
                            <Input
                              id="modal-budget"
                              inputMode="numeric"
                              hasError={!!errors.budget}
                              placeholder="50,000/mo"
                              className="pl-8"
                              {...register("budget")}
                            />
                          </div>
                        </FieldWrapper>
                      </div>

                      <FieldWrapper
                        label="Service"
                        htmlFor="modal-service"
                        error={errors.service?.message}
                      >
                        <Select
                          id="modal-service"
                          hasError={!!errors.service}
                          defaultValue=""
                          {...register("service")}
                        >
                          <option value="" disabled>
                            Select a service...
                          </option>
                          {SERVICE_OPTIONS.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </Select>
                      </FieldWrapper>

                      <FieldWrapper
                        label="Tell us about your project"
                        htmlFor="modal-message"
                        error={errors.message?.message}
                      >
                        <Textarea
                          id="modal-message"
                          rows={3}
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
                        className={cn("w-full")}
                      >
                        {isSubmitting ? "Sending..." : content.button}
                      </Button>
                    </form>

                    <div className="mt-10 grid grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-2">
                      <div>
                        <p className="text-sm font-bold text-primary-900">Careers</p>
                        <p className="mt-1 text-sm text-text-muted">
                          Would you like to join our growing team?
                        </p>
                        <a
                          href="mailto:hr@creadify.in"
                          className="mt-1 inline-block text-sm font-bold text-accent-700 hover:text-accent-800"
                        >
                          hr@creadify.in
                        </a>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary-900">Direct Contact</p>
                        <p className="mt-1 text-sm text-text-muted">
                          Prefer email or a call?
                        </p>
                        <a
                          href={`mailto:${content.email}`}
                          className="mt-1 inline-block text-sm font-bold text-accent-700 hover:text-accent-800"
                        >
                          {content.email}
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
