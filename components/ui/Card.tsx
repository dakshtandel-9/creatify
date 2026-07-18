import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
  tone?: "light" | "dark";
};

export function Card({
  interactive = true,
  tone = "light",
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 sm:p-8 transition-all duration-[400ms] ease-[var(--ease-out)]",
        tone === "light"
          ? "bg-white border-border shadow-sm"
          : "bg-white/[0.04] border-white/10 backdrop-blur-sm",
        interactive &&
          (tone === "light"
            ? "hover:-translate-y-2 hover:border-accent-200 hover:shadow-lg"
            : "hover:-translate-y-2 hover:border-secondary-400/40 hover:bg-white/[0.06]"),
        className
      )}
      {...props}
    />
  );
}
