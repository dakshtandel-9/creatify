"use client";

import { useEffect, useRef, useState } from "react";
import {
  ClipboardList,
  Cookie,
  Link2,
  Lock,
  Mail,
  ShieldCheck,
  SquarePen,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { useLenisControls } from "@/components/layout/SmoothScrollProvider";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export type PolicyIconKey =
  | "shield"
  | "clipboard"
  | "users"
  | "lock"
  | "user"
  | "cookie"
  | "link"
  | "edit"
  | "mail";

export type PolicySection = {
  id: string;
  /** Short label for the sidebar; the heading reuses it with its number. */
  title: string;
  icon: PolicyIconKey;
  content: React.ReactNode;
};

const ICONS: Record<PolicyIconKey, LucideIcon> = {
  shield: ShieldCheck,
  clipboard: ClipboardList,
  users: Users,
  lock: Lock,
  user: UserRound,
  cookie: Cookie,
  link: Link2,
  edit: SquarePen,
  mail: Mail,
};

/** Three brand tones cycle down the page so each section reads as its own card. */
const TONES = [
  {
    tile: "bg-primary-50 text-primary-600",
    activeRow: "bg-primary-50 text-primary-700",
    bar: "bg-primary-500",
    marker: "var(--color-primary-500)",
  },
  {
    tile: "bg-accent-50 text-accent-600",
    activeRow: "bg-accent-50 text-accent-700",
    bar: "bg-accent-500",
    marker: "var(--color-accent-600)",
  },
  {
    tile: "bg-secondary-50 text-secondary-600",
    activeRow: "bg-secondary-50 text-secondary-800",
    bar: "bg-secondary-500",
    marker: "var(--color-secondary-600)",
  },
] as const;

const toneFor = (index: number) => TONES[index % TONES.length];

/** Distance from the viewport top that a section settles at when jumped to. */
const SCROLL_OFFSET = -96;

type PrivacyPolicyBodyProps = {
  sections: PolicySection[];
};

export function PrivacyPolicyBody({ sections }: PrivacyPolicyBodyProps) {
  const bodyRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const lenis = useLenisControls();

  // Scroll spy: the active entry is the highest section whose heading has passed
  // the top band of the viewport.
  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  useGSAP(
    () => {
      gsap.from(".policy-section", {
        autoAlpha: 0,
        y: 24,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: ".policy-card",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: bodyRef }
  );

  const handleJump = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    setActiveId(id);
    lenis?.scrollTo(target, SCROLL_OFFSET);
    // Keep the URL shareable without letting the browser fight the smooth scroll.
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <section ref={bodyRef} className="bg-background pb-16 sm:pb-20 lg:pb-24">
      <Container wide>
        <div className="grid gap-6 lg:grid-cols-[300px_1fr] lg:gap-8">
          {/* ---------- Table of contents ---------- */}
          <aside className="lg:sticky lg:top-8 lg:h-fit">
            <nav
              aria-label="Privacy policy sections"
              className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-5"
            >
              <h2 className="px-2 pb-3 text-lg font-bold text-primary-900">On This Page</h2>

              <ol className="space-y-1">
                {sections.map((section, index) => {
                  const Icon = ICONS[section.icon];
                  const tone = toneFor(index);
                  const isActive = activeId === section.id;

                  return (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        onClick={(event) => handleJump(event, section.id)}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 transition-colors duration-150",
                          isActive
                            ? tone.activeRow
                            : "text-text-muted hover:bg-surface hover:text-primary-900"
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute inset-y-0 left-0 w-[3px] rounded-r-full transition-opacity duration-150",
                            tone.bar,
                            isActive ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <span
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                            tone.tile
                          )}
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="flex-1 text-[13px] font-semibold leading-snug">
                          {index + 1}. {section.title}
                        </span>
                        <span
                          className={cn(
                            "text-xs font-semibold tabular-nums",
                            isActive ? "opacity-70" : "text-text-subtle"
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </aside>

          {/* ---------- Policy content ---------- */}
          <div className="policy-card rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8 lg:p-12">
            {sections.map((section, index) => {
              const Icon = ICONS[section.icon];
              const tone = toneFor(index);

              return (
                <article
                  key={section.id}
                  id={section.id}
                  style={{ "--policy-tone": tone.marker } as React.CSSProperties}
                  className={cn(
                    "policy-section scroll-mt-28",
                    index > 0 && "mt-10 border-t border-border pt-10 sm:mt-12 sm:pt-12"
                  )}
                >
                  <div className="flex gap-4 sm:gap-6">
                    <span
                      className={cn(
                        "hidden h-14 w-14 shrink-0 items-center justify-center rounded-full sm:flex",
                        tone.tile
                      )}
                      aria-hidden="true"
                    >
                      <Icon className="h-6 w-6" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <h2 className="flex items-center gap-3 text-xl font-bold leading-snug text-primary-900 sm:text-2xl">
                        <span
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:hidden",
                            tone.tile
                          )}
                          aria-hidden="true"
                        >
                          <Icon className="h-4.5 w-4.5" />
                        </span>
                        <span>
                          {index + 1}. {section.title}
                        </span>
                      </h2>

                      <div className="mt-3 space-y-3">{section.content}</div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
