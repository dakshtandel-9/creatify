import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

type FieldWrapperProps = {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
};

export function FieldWrapper({ label, htmlFor, error, children }: FieldWrapperProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-primary-900 mb-1.5">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-rose-600" role="alert">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

const fieldBase =
  "h-14 w-full rounded-xl border bg-white px-4 text-base text-text placeholder:text-text-subtle " +
  "transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }
>(({ className, hasError, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      fieldBase,
      hasError
        ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
        : "border-border focus:border-accent-400 focus:ring-accent-100",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { hasError?: boolean }
>(({ className, hasError, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full rounded-xl border bg-white px-4 py-3.5 text-base text-text placeholder:text-text-subtle resize-none",
      "transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0",
      hasError
        ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
        : "border-border focus:border-accent-400 focus:ring-accent-100",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & { hasError?: boolean }
>(({ className, hasError, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      fieldBase,
      "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23475569%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-no-repeat bg-[right_1rem_center] bg-[length:20px] pr-10",
      hasError
        ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
        : "border-border focus:border-accent-400 focus:ring-accent-100",
      className
    )}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";
