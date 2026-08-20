import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  tone?: "dark" | "light";
  className?: string;
  /** Overrides the default `h-9` on the mark itself (e.g. `"h-8 lg:h-10"`). */
  imageClassName?: string;
};

export function Logo({ tone = "dark", className, imageClassName }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/images/logo-new.png"
        alt="Creadify"
        width={923}
        height={289}
        priority
        className={cn(
          "h-9 w-auto",
          tone === "light" && "brightness-0 invert",
          imageClassName
        )}
      />
    </span>
  );
}
