import { z } from "zod";

const websitePattern = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().min(1, "Enter your email").email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .regex(/^[\d\s()+-]+$/, "Use numbers, spaces, and + - ( ) only"),
  budget: z.string().trim().min(1, "Enter your budget"),
  website: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || websitePattern.test(value),
      "Enter a valid website (e.g. creadify.in)"
    )
    .optional(),
  message: z.string().trim().min(10, "Tell us a bit more (10+ characters)"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
