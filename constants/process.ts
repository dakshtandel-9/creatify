import { Search, FlaskConical, Compass, Rocket, TrendingUp } from "lucide-react";
import type { ProcessStep } from "@/types/content";

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description: "We learn your business, market, and goals before recommending a single channel.",
    icon: Search,
  },
  {
    number: "02",
    title: "Research",
    description: "Competitor, audience, and data analysis to find where the real opportunity is.",
    icon: FlaskConical,
  },
  {
    number: "03",
    title: "Strategy",
    description: "A custom growth plan with clear channels, budgets, and measurable targets.",
    icon: Compass,
  },
  {
    number: "04",
    title: "Execution",
    description: "Campaigns, pages, and systems go live — tracked from day one, not month three.",
    icon: Rocket,
  },
  {
    number: "05",
    title: "Scale",
    description: "We double down on what's working and cut what isn't, quarter over quarter.",
    icon: TrendingUp,
  },
];
