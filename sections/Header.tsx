"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, MessageCircle, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";
import type { NavigationContent, HeaderContent, SiteContent } from "@/types/cms";

type HeaderProps = {
  navigation: NavigationContent;
  header: HeaderContent;
  site: SiteContent;
};

export function Header({ navigation, header, site }: HeaderProps) {
  const scrolled = useScrolled(24);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        header.sticky ? "fixed" : "absolute",
        "inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4 lg:px-8 lg:pt-5"
      )}
    >
      {/* Floating card — the nav sits on the hero rather than banding across it */}
      <div
        className={cn(
          "mx-auto flex h-[64px] w-full max-w-[1320px] items-center justify-between gap-4",
          "rounded-[20px] bg-white px-4 sm:px-5 lg:h-[82px] lg:rounded-[26px] lg:px-7",
          "transition-shadow duration-[250ms] ease-[var(--ease-out)]",
          header.showGlassEffect &&
            "supports-[backdrop-filter]:bg-white/95 supports-[backdrop-filter]:backdrop-blur-xl",
          scrolled
            ? "shadow-[0_14px_40px_-14px_rgba(10,53,91,0.26)]"
            : "shadow-[0_8px_30px_-16px_rgba(10,53,91,0.22)]"
        )}
      >
        <a
          href="#home"
          className="flex shrink-0 items-center"
          aria-label={`${site.name} home`}
        >
          <Logo imageClassName="h-[34px] lg:h-[46px]" />
        </a>

        <nav
          className="hidden flex-1 items-center justify-center gap-7 lg:flex xl:gap-10"
          aria-label="Primary"
        >
          {navigation.items.map((link) => (
            <a
              key={`${link.title}-${link.href}`}
              href={link.href}
              className="whitespace-nowrap text-[15px] font-medium text-primary-900 transition-colors duration-150 hover:text-primary-500"
            >
              {link.title}
            </a>
          ))}
        </nav>

        <a
          href={header.primaryButton.link}
          className="hidden shrink-0 items-center gap-2.5 rounded-full bg-primary-900 px-6 py-3.5 text-[15px] font-semibold text-white transition-all duration-[250ms] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:bg-primary-800 hover:shadow-[0_12px_28px_-10px_rgba(8,39,68,0.55)] active:scale-[0.98] lg:inline-flex"
        >
          {header.primaryButton.text}
          <MessageCircle className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
        </a>

        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-primary-900 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 w-full max-w-[1320px] overflow-hidden rounded-[20px] bg-white shadow-[0_18px_44px_-16px_rgba(10,53,91,0.28)] lg:hidden"
          >
            <nav className="flex flex-col p-3" aria-label="Mobile primary">
              {navigation.items.map((link) => (
                <a
                  key={`${link.title}-${link.href}`}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3.5 text-base font-medium text-primary-900 transition-colors hover:bg-surface"
                >
                  {link.title}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
