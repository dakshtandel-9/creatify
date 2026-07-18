import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section" | "header" | "footer" | "nav";
  wide?: boolean;
};

export function Container({
  as: Tag = "div",
  wide = false,
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        wide ? "max-w-[var(--container-max)]" : "max-w-[var(--content-max)]",
        className
      )}
      {...props}
    />
  );
}
