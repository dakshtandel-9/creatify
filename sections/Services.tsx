import Image from "next/image";
import {
  LineChart,
  Palette,
  Users,
  MonitorSmartphone,
  Search,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils";
import type { ServiceAccent, ServicesContent } from "@/types/cms";

type ServicesProps = {
  content: ServicesContent;
};

const ICON_BY_TITLE: Record<string, LucideIcon> = {
  "Strategic Marketing": LineChart,
  "Creative Design": Palette,
  "Social Media Management": Users,
  "Tech Solution": MonitorSmartphone,
  SEO: TrendingUp,
  Automation: Workflow,
};

const FALLBACK_ICONS: LucideIcon[] = [
  LineChart,
  Palette,
  Users,
  MonitorSmartphone,
  Search,
  Workflow,
];

const ACCENT_STYLES: Record<ServiceAccent, string> = {
  orange: "bg-accent-50 text-accent-700",
  blue: "bg-primary-50 text-primary-700",
  green: "bg-emerald-50 text-emerald-700",
  purple: "bg-violet-50 text-violet-700",
  cyan: "bg-secondary-50 text-secondary-700",
  pink: "bg-rose-50 text-rose-700",
};

const PLACEHOLDER_GRADIENTS: Record<ServiceAccent, string> = {
  orange: "from-accent-100 via-rose-100 to-primary-100",
  blue: "from-primary-100 via-secondary-100 to-violet-100",
  green: "from-emerald-100 via-secondary-100 to-primary-100",
  purple: "from-violet-100 via-primary-100 to-rose-100",
  cyan: "from-secondary-100 via-primary-100 to-emerald-100",
  pink: "from-rose-100 via-accent-100 to-violet-100",
};

export function Services({ content }: ServicesProps) {
  return (
    <Section id="services" tone="surface" className="rounded-t-[100px]">
      <Container>
        <div className="mx-auto max-w-[880px] rounded-[28px] border border-border bg-white p-6 shadow-lg sm:p-10 lg:p-14">
          <div className="flex flex-col items-center gap-3 border-b border-border pb-8 text-center sm:pb-10">
            <span className="-rotate-3 text-sm font-semibold text-accent-600 [font-family:var(--font-display)]">
              {content.title}
            </span>
            <h2 className="text-3xl font-bold leading-[1.1] text-primary-900 sm:text-4xl lg:text-[44px]">
              {content.heading}
            </h2>
            {content.description ? (
              <p className="max-w-xl text-base text-text-muted sm:text-[17px]">
                {content.description}
              </p>
            ) : null}
          </div>

          <ul className="grid grid-cols-1 gap-x-12 gap-y-8 pt-8 sm:pt-10 md:grid-cols-2">
            {content.items.map((item, index) => {
              const Icon = ICON_BY_TITLE[item.title] ?? FALLBACK_ICONS[index % FALLBACK_ICONS.length];
              return (
                <li key={item.title} className="flex items-start gap-4">
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                      ACCENT_STYLES[item.accent]
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-primary-900 sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-muted sm:text-[15px]">
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 flex justify-center sm:mt-12">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-5 py-2.5 text-sm text-text-muted">
              Want to discuss?{" "}
              <a
                href="#contact"
                className="font-semibold text-primary-900 underline decoration-1 underline-offset-2 transition-colors duration-150 hover:text-accent-700"
              >
                {content.button}
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-[880px] flex-col gap-8">
          {content.items.map((item, index) => {
            const imageFirst = index % 2 === 0;
            const eyebrow = item.eyebrow ?? item.title;

            const imageBlock = (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div
                    className={cn(
                      "flex h-full w-full items-center justify-center bg-gradient-to-br p-6 text-center",
                      PLACEHOLDER_GRADIENTS[item.accent]
                    )}
                  >
                    <span className="text-sm font-medium text-primary-800/70">
                      Upload image here — {item.imageRatio ?? "4:3"}
                    </span>
                  </div>
                )}
              </div>
            );

            const textBlock = (
              <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
                <span
                  className={cn(
                    "inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em]",
                    ACCENT_STYLES[item.accent]
                  )}
                >
                  {eyebrow}
                </span>
                <h3 className="text-2xl font-bold text-primary-900 sm:text-[26px]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted sm:text-[15px]">
                  {item.description}
                </p>
                {item.features.length ? (
                  <div className="mt-1 flex flex-wrap gap-2">
                    {item.features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text-muted"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            );

            return (
              <div
                key={item.title}
                className="overflow-hidden rounded-[28px] border border-border bg-white shadow-lg"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {imageFirst ? (
                    <>
                      <div className="p-4 sm:p-6">{imageBlock}</div>
                      {textBlock}
                    </>
                  ) : (
                    <>
                      {textBlock}
                      <div className="p-4 sm:p-6">{imageBlock}</div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
