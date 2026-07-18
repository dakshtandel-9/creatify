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
          ? "py-12 sm:py-16 lg:py-20"
          : "py-16 sm:py-20 lg:py-24 xl:py-32",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
