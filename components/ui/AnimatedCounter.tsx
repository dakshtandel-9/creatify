"use client";

import { useCounter } from "@/hooks/useCounter";

type AnimatedCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
};

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration,
  className,
}: AnimatedCounterProps) {
  const { ref, value: current } = useCounter({ end: value, duration, decimals });

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={className}>
      {prefix}
      {current.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
