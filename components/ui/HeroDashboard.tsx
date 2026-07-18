"use client";

import { motion } from "framer-motion";
import { TrendingUp, Target, Users, ArrowUpRight } from "lucide-react";
import { GrowthChart } from "@/components/ui/GrowthChart";
import type { HeroDashboardCard } from "@/types/cms";

const float = (delay: number) => ({
  animate: {
    y: [0, -4, 0],
  },
  transition: {
    duration: 5 + delay,
    repeat: Infinity,
    ease: "easeInOut" as const,
    delay,
  },
});

const FLOATING_ICONS = [TrendingUp, Target, Users];

type HeroDashboardProps = {
  title: string;
  cards: HeroDashboardCard[];
};

export function HeroDashboard({ title, cards }: HeroDashboardProps) {
  const heroCard = cards[0];
  const metricCards = cards.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      className="relative mx-auto w-full max-w-[440px] px-6 py-10 sm:px-10"
    >
      {/* Main dashboard panel */}
      <div className="relative z-10 rounded-2xl border border-border bg-white/90 backdrop-blur-xl shadow-xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs font-medium text-text-subtle uppercase tracking-wide">
              {title}
            </p>
            {heroCard ? (
              <p className="text-2xl font-bold text-primary-900 font-display mt-0.5">
                {heroCard.value}
              </p>
            ) : null}
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Live
          </span>
        </div>

        <div className="h-36 sm:h-40 -mx-1">
          <GrowthChart />
        </div>

        {metricCards.length > 0 ? (
          <div
            className="mt-5 grid gap-2 sm:gap-3 border-t border-border pt-4"
            style={{ gridTemplateColumns: `repeat(${metricCards.length}, minmax(0, 1fr))` }}
          >
            {metricCards.map((card) => (
              <div key={card.title}>
                <p className="text-[11px] font-medium text-text-subtle uppercase tracking-wide">
                  {card.title}
                </p>
                <p className="text-base sm:text-lg font-bold text-primary-900 font-display">
                  {card.value}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Floating KPI cards — first up to 3 metric cards, drawn from the same dashboard data */}
      {metricCards.slice(0, 3).map((card, i) => {
        const Icon = FLOATING_ICONS[i % FLOATING_ICONS.length];
        const positions = [
          "hidden sm:flex absolute left-0 top-0 z-20",
          "hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20",
          "hidden sm:flex absolute left-0 bottom-0 z-20",
        ];
        const colors = [
          "bg-accent-50 text-accent-700",
          "bg-secondary-50 text-secondary-600",
          "bg-primary-50 text-primary-700",
        ];
        return (
          <motion.div
            key={card.title}
            {...float(i * 0.7)}
            className={`${positions[i]} items-center gap-3 rounded-xl border border-border bg-white shadow-lg px-4 py-3`}
          >
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${colors[i]}`}>
              <Icon className="h-4.5 w-4.5" />
            </span>
            <div>
              <p className="text-[11px] font-medium text-text-subtle">{card.title}</p>
              <p className="text-sm font-bold text-primary-900 whitespace-nowrap">{card.value}</p>
            </div>
          </motion.div>
        );
      })}

      {/* Accent glow blob behind the panel */}
      <div
        aria-hidden="true"
        className="absolute inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-secondary-200/40 via-transparent to-accent-200/40 blur-2xl"
      />

      <motion.div
        {...float(0.5)}
        className="hidden lg:flex absolute right-6 top-0 z-20 items-center gap-1.5 rounded-full border border-border bg-white shadow-md px-3 py-1.5 text-xs font-semibold text-accent-700 whitespace-nowrap"
      >
        <ArrowUpRight className="h-3.5 w-3.5" />
        Optimizing bids
      </motion.div>
    </motion.div>
  );
}
