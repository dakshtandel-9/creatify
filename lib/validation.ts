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
  budget: z.string().trim().min(1, "Enter your budget"),
  service: z.string().trim().min(1, "Enter the service you need"),
  message: z.string().trim().min(10, "Tell us a bit more (10+ characters)"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
