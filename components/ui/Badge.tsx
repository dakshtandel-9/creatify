import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type BadgeProps = {
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: "neutral" | "accent" | "secondary" | "dark";
  className?: string;
};

const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
  neutral: "bg-surface text-text-muted border border-border",
  accent: "bg-accent-50 text-accent-800 border border-accent-100",
  secondary: "bg-secondary-50 text-secondary-800 border border-secondary-100",
  dark: "bg-white/10 text-text-on-dark border border-white/15 backdrop-blur-sm",
};

export function Badge({
  children,
  icon: Icon,
  variant = "neutral",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium",
        variants[variant],
        className
      )}
    >
      {Icon ? <Icon className="h-3.5 w-3.5" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
