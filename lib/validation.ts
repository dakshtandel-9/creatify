import { z } from "zod";

export const contactFormSchema = z.object({
  businessName: z.string().trim().min(2, "Enter your business name"),
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().min(1, "Enter your email").email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .regex(/^[\d\s()+-]+$/, "Use numbers, spaces, and + - ( ) only"),
  budget: z.string().min(1, "Select a budget range"),
  service: z.string().min(1, "Select a service"),
  message: z.string().trim().min(10, "Tell us a bit more (10+ characters)"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const BUDGET_OPTIONS = [
  "Under $2,000/mo",
  "$2,000 – $5,000/mo",
  "$5,000 – $10,000/mo",
  "$10,000+/mo",
] as const;

export const SERVICE_OPTIONS = [
  "Performance Marketing",
  "SEO",
  "Website Design",
  "Branding",
  "E-commerce Development",
  "Marketing Automation",
  "Not sure yet",
] as const;
