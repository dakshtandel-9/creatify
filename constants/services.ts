import {
  TrendingUp,
  Search,
  MonitorSmartphone,
  LayoutTemplate,
  Palette,
  BarChart3,
  Mail,
  Workflow,
  Share2,
  Target,
  Megaphone,
  Briefcase,
} from "lucide-react";
import type { Service } from "@/types/content";

export const SERVICES: Service[] = [
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    description:
      "Full-funnel paid media strategy that turns ad spend into predictable, measurable revenue.",
    icon: TrendingUp,
    features: ["Multi-channel strategy", "ROAS-focused budgets", "Weekly optimization"],
  },
  {
    slug: "google-ads",
    title: "Google Ads",
    description:
      "Search, Shopping, and Performance Max campaigns built to capture high-intent demand.",
    icon: Target,
    features: ["Search & Shopping", "Conversion tracking", "Bid strategy tuning"],
  },
  {
    slug: "meta-ads",
    title: "Meta Ads",
    description:
      "Facebook and Instagram campaigns engineered for scroll-stopping creative and scale.",
    icon: Share2,
    features: ["Creative testing", "Audience modeling", "Retargeting funnels"],
  },
  {
    slug: "seo",
    title: "SEO",
    description:
      "Technical, on-page, and content SEO that compounds organic traffic month over month.",
    icon: Search,
    features: ["Technical audits", "Keyword strategy", "Content roadmaps"],
  },
  {
    slug: "website-design",
    title: "Website Design",
    description:
      "Conversion-focused websites that load fast, rank well, and turn visitors into leads.",
    icon: MonitorSmartphone,
    features: ["Custom UI/UX", "Mobile-first build", "CRO baked in"],
  },
  {
    slug: "landing-pages",
    title: "Landing Pages",
    description:
      "High-converting campaign pages designed, tested, and optimized for one clear action.",
    icon: LayoutTemplate,
    features: ["A/B testing", "Fast load times", "Clear single CTA"],
  },
  {
    slug: "ecommerce-development",
    title: "E-commerce Development",
    description:
      "Shopify and headless storefronts built to convert browsers into repeat buyers.",
    icon: Briefcase,
    features: ["Shopify & headless", "Checkout optimization", "Catalog architecture"],
  },
  {
    slug: "branding",
    title: "Branding",
    description:
      "Distinct visual identity systems that make your business memorable and credible.",
    icon: Palette,
    features: ["Identity systems", "Brand guidelines", "Design assets"],
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    description:
      "Consistent, on-brand content and community management that builds real audiences.",
    icon: Megaphone,
    features: ["Content calendars", "Community management", "Platform strategy"],
  },
  {
    slug: "email-marketing",
    title: "Email Marketing",
    description:
      "Lifecycle and campaign email that nurtures leads and drives repeat revenue.",
    icon: Mail,
    features: ["Flow automation", "Segmentation", "Deliverability tuning"],
  },
  {
    slug: "marketing-automation",
    title: "Marketing Automation",
    description:
      "Systems that qualify, nurture, and hand off leads without manual follow-up.",
    icon: Workflow,
    features: ["CRM integration", "Lead scoring", "Automated nurture"],
  },
  {
    slug: "conversion-rate-optimization",
    title: "Conversion Rate Optimization",
    description:
      "Structured testing programs that turn more of your existing traffic into customers.",
    icon: BarChart3,
    features: ["Heatmap analysis", "A/B/n testing", "Funnel diagnostics"],
  },
];
