import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { CLIENT_LOGOS } from "@/constants/logos";

export function LogoCloud() {
  const marqueeItems = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section
      className="border-t border-border bg-surface py-10 sm:py-12"
      aria-label="Powered by industry-leading platforms"
    >
      <Container wide>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.1em] text-text-subtle mb-8">
          Powered by Industry-Leading Platforms
        </p>
      </Container>

      <span className="sr-only">
        Integrates with {CLIENT_LOGOS.map((logo) => logo.name).join(", ")}.
      </span>

      <div className="relative overflow-hidden" aria-hidden="true">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-surface to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-surface to-transparent z-10" />

        <div className="flex w-max animate-marquee gap-16 motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-16 motion-reduce:gap-y-4">
          {marqueeItems.map((logo, i) => (
            <span
              key={`${logo.name}-${i}`}
              className="shrink-0 select-none grayscale opacity-60 hover:opacity-90 transition-opacity duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={320}
                height={80}
                className="h-14 w-auto object-contain sm:h-16"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
