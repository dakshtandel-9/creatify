import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon, XIcon } from "@/components/ui/SocialIcons";
import type { FooterContent, NavigationContent } from "@/types/cms";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/creadify_official", icon: InstagramIcon },
  { label: "X (Twitter)", href: "https://x.com/creadify_com", icon: XIcon },
];

function slugify(label: string) {
  return "/" + label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

type FooterProps = {
  content: FooterContent;
  navigation: NavigationContent;
};

export function Footer({ content }: FooterProps) {
  return (
    <footer className="bg-surface">
      <Container wide className="py-16 sm:py-20">
        <div className="flex flex-col items-center text-center">
          <Logo />
        </div>

        <div className="mt-14 border-t border-border" />

        <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <p className="text-center text-sm text-text-muted">
            {content.copyright}
            {content.links.map((label) => (
              <span key={label}>
                {" "}
                |{" "}
                <a
                  href={slugify(label)}
                  className="text-blue-600 underline transition-colors hover:text-blue-700"
                >
                  {label}
                </a>
              </span>
            ))}
          </p>
          <div className="flex items-center justify-center gap-5 sm:justify-end">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-text-muted transition-colors hover:text-primary-900"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </Container>
    </footer>
  );
}
