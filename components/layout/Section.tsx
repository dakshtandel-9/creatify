import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  id?: string;
  tone?: "light" | "surface" | "dark";
  compact?: boolean;
  ref?: React.Ref<HTMLElement>;
};

const toneStyles: Record<NonNullable<SectionProps["tone"]>, string> = {
  light: "bg-background text-text",
  surface: "bg-background text-text",
  dark: "bg-ink text-text-on-dark",
};

export function Section({
  id,
  tone = "light",
  compact = false,
  className,
  children,
  ref,
  ...props
}: SectionProps) {
  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        toneStyles[tone],
        compact
          ? "py-8 sm:py-10 lg:py-12"
          : "py-10 sm:py-14 lg:py-[60px]",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
