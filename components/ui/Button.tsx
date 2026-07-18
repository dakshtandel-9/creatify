import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "text";
type Size = "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
    external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold " +
  "transition-all duration-[250ms] ease-[var(--ease-out)] " +
  "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-700 text-white shadow-sm hover:-translate-y-0.5 hover:shadow-glow-accent hover:bg-accent-800",
  secondary:
    "bg-transparent text-primary-800 border-2 border-primary-800 hover:-translate-y-0.5 hover:bg-primary-800 hover:text-white hover:shadow-md",
  ghost:
    "bg-white/10 text-white border border-white/25 backdrop-blur-sm hover:bg-white/20 hover:-translate-y-0.5",
  text: "text-primary-800 hover:text-accent-700 px-1",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-6 text-sm sm:text-base",
  lg: "h-14 px-8 text-base sm:text-lg",
};

function isLinkProps(props: ButtonProps): props is ButtonAsLink {
  return typeof (props as ButtonAsLink).href === "string";
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    icon: Icon,
    iconPosition = "right",
    loading = false,
    className,
    children,
  } = props;

  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    variant === "text" ? "h-auto" : undefined,
    className
  );

  const content = (
    <>
      {loading ? (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      ) : (
        <>
          {Icon && iconPosition === "left" ? (
            <Icon className="h-[1.1em] w-[1.1em] shrink-0" aria-hidden="true" />
          ) : null}
          <span>{children}</span>
          {Icon && iconPosition === "right" ? (
            <Icon
              className="h-[1.1em] w-[1.1em] shrink-0 transition-transform duration-[250ms] group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          ) : null}
        </>
      )}
    </>
  );

  if (isLinkProps(props)) {
    const {
      href,
      external,
      variant: _variant,
      size: _size,
      icon: _icon,
      iconPosition: _iconPosition,
      loading: _loading,
      className: _className,
      children: _children,
      ...anchorRest
    } = props;

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...anchorRest}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  const {
    type = "button",
    variant: _variant,
    size: _size,
    icon: _icon,
    iconPosition: _iconPosition,
    loading: _loading,
    className: _className,
    children: _children,
    ...rest
  } = props as ButtonAsButton;

  return (
    <button type={type} className={classes} disabled={loading || rest.disabled} {...rest}>
      {content}
    </button>
  );
}
