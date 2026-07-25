import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

type FieldWrapperProps = {
  error?: string;
  children: React.ReactNode;
};

export function FieldWrapper({ error, children }: FieldWrapperProps) {
  return (
    <div>
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
  "h-10 w-full border-0 border-b bg-transparent px-0 text-base text-text placeholder:text-primary-900 rounded-none " +
  "transition-colors duration-150 focus:outline-none";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }
>(({ className, hasError, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      fieldBase,
      hasError
        ? "border-rose-300 focus:border-rose-500"
        : "border-border focus:border-primary-900",
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
      "w-full border-0 border-b bg-transparent px-0 py-2 text-base text-text placeholder:text-primary-900 resize-none rounded-none",
      "transition-colors duration-150 focus:outline-none",
      hasError
        ? "border-rose-300 focus:border-rose-500"
        : "border-border focus:border-primary-900",
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
      "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23475569%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-no-repeat bg-[right_0.25rem_center] bg-[length:18px] pr-8",
      hasError
        ? "border-rose-300 focus:border-rose-500"
        : "border-border focus:border-primary-900",
      className
    )}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";
