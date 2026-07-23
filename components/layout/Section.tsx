import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  id?: string;
  tone?: "light" | "surface" | "dark";
  compact?: boolean;
};

const toneStyles: Record<NonNullable<SectionProps["tone"]>, string> = {
  light: "bg-background text-text",
  surface: "bg-surface text-text",
  dark: "bg-ink text-text-on-dark",
};

export function Section({
  id,
  tone = "light",
  compact = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        toneStyles[tone],
        compact
          ? "py-14 sm:py-18 lg:py-24"
          : "py-20 sm:py-24 lg:py-28 xl:py-36",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
