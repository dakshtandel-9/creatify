import { Container } from "@/components/layout/Container";
import { CLIENT_LOGOS } from "@/constants/logos";

export function LogoCloud() {
  const marqueeItems = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section
      className="border-y border-border bg-surface py-10 sm:py-12"
      aria-label="Trusted by businesses across industries"
    >
      <Container wide>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.1em] text-text-subtle mb-8">
          Trusted by 120+ growing businesses
        </p>
      </Container>

      <span className="sr-only">
        Clients include {CLIENT_LOGOS.join(", ")}.
      </span>

      <div className="relative overflow-hidden" aria-hidden="true">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-surface to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-surface to-transparent z-10" />

        <div className="flex w-max animate-marquee gap-16 motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-16 motion-reduce:gap-y-4">
          {marqueeItems.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="shrink-0 text-xl sm:text-2xl font-bold text-primary-900/50 font-display select-none whitespace-nowrap grayscale hover:text-primary-900/75 transition-colors duration-300"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
