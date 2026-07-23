"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/ui/Logo";
import { LinkedInIcon, InstagramIcon, XIcon } from "@/components/ui/SocialIcons";
import type { FooterContent, NavigationContent, ServicesContent } from "@/types/cms";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedInIcon },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "X (Twitter)", href: "https://x.com", icon: XIcon },
];

function slugify(label: string) {
  return "/" + label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

type FooterProps = {
  content: FooterContent;
  navigation: NavigationContent;
  services: ServicesContent;
};

export function Footer({ content, navigation, services }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-ink text-text-on-dark">
      <Container wide className="py-20 sm:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-12 lg:divide-x lg:divide-white/10">
          <div className="lg:col-span-1 lg:pr-8">
            <Logo tone="light" />
            <p className="mt-4 text-sm leading-relaxed text-text-on-dark-muted max-w-xs">
              {content.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-text-on-dark-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-400/50 hover:bg-accent-500/10 hover:text-accent-300"
                  >
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:px-8">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {navigation.items.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-text-on-dark-muted hover:text-white transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:px-8">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {services.items.map((service) => (
                <li key={service.title}>
                  <a
                    href="#services"
                    className="text-sm text-text-on-dark-muted hover:text-white transition-colors"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pl-8">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
              Stay Updated
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-text-on-dark-muted">
              Growth tactics and case studies, once a month. No spam.
            </p>

            {subscribed ? (
              <p className="mt-4 text-sm font-medium text-secondary-300">
                You&rsquo;re subscribed — welcome aboard.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-5 flex gap-2">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="h-12 min-w-0 flex-1 rounded-lg border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-text-on-dark-muted focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent-500 text-white transition-all duration-150 hover:brightness-105 active:scale-95"
                >
                  <ArrowRight className="h-4.5 w-4.5" aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8">
          <p className="text-sm text-text-on-dark-muted">{content.copyright}</p>
          <div className="flex items-center gap-6">
            {content.links.map((label) => (
              <a
                key={label}
                href={slugify(label)}
                className="text-sm text-text-on-dark-muted hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
