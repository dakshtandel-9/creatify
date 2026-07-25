import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  tone?: "dark" | "light";
  className?: string;
};

export function Logo({ tone = "dark", className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/images/logo.png"
        alt="Creadify"
        width={550}
        height={131}
        priority
        className={cn("h-9 w-auto", tone === "light" && "brightness-0 invert")}
      />
    </span>
  );
}
