import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/** Body copy inside a policy section. */
export function PolicyText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-[15px] leading-[1.75] text-text-muted sm:text-base", className)}>
      {children}
    </p>
  );
}

/** Wrapper for a policy bullet list. */
export function PolicyList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <ul className={cn("mt-4 space-y-3", className)}>{children}</ul>;
}

/**
 * Bullet with a ring marker, for definition-style points ("Personal Information: ...").
 * Marker colour comes from the `--policy-tone` variable set by the section wrapper.
 * Border colour is set inline because the unlayered `* { border-color }` rule in
 * globals.css outranks Tailwind's border utilities.
 */
export function PolicyBullet({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span
        aria-hidden="true"
        style={{ borderColor: "var(--policy-tone)" }}
        className="mt-[7px] h-[9px] w-[9px] shrink-0 rounded-full border-[2.5px]"
      />
      <span className="text-[15px] leading-[1.75] text-text-muted sm:text-base">
        {label ? <strong className="font-semibold text-primary-900">{label}</strong> : null}
        {label ? " " : null}
        {children}
      </span>
    </li>
  );
}

/** Bullet with a check marker, for "we do this" style lists. */
export function PolicyCheck({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span
        aria-hidden="true"
        style={{ borderColor: "var(--policy-tone)" }}
        className="mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] text-[color:var(--policy-tone)]"
      >
        <Check className="h-[11px] w-[11px]" strokeWidth={3} />
      </span>
      <span className="text-[15px] leading-[1.75] text-text-muted sm:text-base">{children}</span>
    </li>
  );
}
