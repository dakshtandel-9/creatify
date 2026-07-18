import {
  UserRoundCheck,
  LineChart,
  Compass,
  MessageSquareText,
  BrainCircuit,
  Handshake,
} from "lucide-react";
import type { WhyUsPoint } from "@/types/content";

export const WHY_US_POINTS: WhyUsPoint[] = [
  {
    title: "Dedicated strategist",
    description:
      "A single point of contact who knows your business, not a rotating cast of account managers.",
    icon: UserRoundCheck,
  },
  {
    title: "Transparent reporting",
    description:
      "Real dashboards with real numbers — every dollar spent is traceable to a result.",
    icon: LineChart,
  },
  {
    title: "Custom growth plans",
    description:
      "No templated playbooks. Every strategy is built around your goals, market, and budget.",
    icon: Compass,
  },
  {
    title: "Weekly insights",
    description:
      "Short, plain-language updates on what's working, what isn't, and what we're changing.",
    icon: MessageSquareText,
  },
  {
    title: "Data-driven decisions",
    description:
      "Every recommendation is backed by testing and analytics, not opinion or guesswork.",
    icon: BrainCircuit,
  },
  {
    title: "Long-term partnership",
    description:
      "We're incentivized by your growth, not one-off projects — most clients stay for years.",
    icon: Handshake,
  },
];
