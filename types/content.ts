import type { LucideIcon } from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
};

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
};

export type Industry = {
  name: string;
  icon: LucideIcon;
};

export type Stat = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
};

export type CaseStudy = {
  client: string;
  industry: string;
  image: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type WhyUsPoint = {
  title: string;
  description: string;
  icon: LucideIcon;
};
