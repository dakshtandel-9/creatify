import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center"
          ? "items-center text-center mx-auto max-w-2xl"
          : "items-start text-left max-w-2xl",
        className
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em]",
            tone === "dark" ? "text-secondary-300" : "text-accent-700"
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-[3rem] font-bold leading-[1.1]",
          tone === "dark" ? "text-text-on-dark" : "text-primary-900"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-base sm:text-lg leading-relaxed",
            tone === "dark" ? "text-text-on-dark-muted" : "text-text-muted"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
