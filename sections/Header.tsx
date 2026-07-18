"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
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
  const scrolled = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isSticky = header.sticky;
  const useGlass = header.showGlassEffect;

  return (
    <header
      className={cn(
        isSticky ? "fixed" : "relative",
        "inset-x-0 top-0 z-50 h-[72px] lg:h-[88px] transition-all duration-[250ms] ease-[var(--ease-in-out)]",
        scrolled || menuOpen
          ? cn("border-b border-border shadow-sm bg-white/85", useGlass && "backdrop-blur-md")
          : "bg-transparent border-b border-transparent"
      )}
    >
      <Container wide className="flex h-full items-center justify-between">
        <a href="#home" className="flex items-center" aria-label={`${site.name} home`}>
          <Logo />
        </a>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {navigation.items.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-muted hover:text-primary-900 transition-colors duration-150"
            >
              {link.title}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href={header.primaryButton.link} variant="primary" size="md">
            {header.primaryButton.text}
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg text-primary-900"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed inset-x-0 top-[72px] z-50 h-[calc(100vh-72px)] bg-white flex flex-col"
          >
            <nav
              className="flex flex-col gap-1 px-6 py-8"
              aria-label="Mobile primary"
            >
              {navigation.items.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3.5 text-lg font-medium text-primary-900 hover:bg-surface transition-colors"
                >
                  {link.title}
                </a>
              ))}
            </nav>
            <div className="mt-auto px-6 pb-10">
              <Button
                href={header.primaryButton.link}
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => setMenuOpen(false)}
              >
                {header.primaryButton.text}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
