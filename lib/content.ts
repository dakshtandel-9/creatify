import "server-only";
import fs from "fs";
import path from "path";
import type {
  SiteContent,
  ThemeContent,
  SeoContent,
  NavigationContent,
  HeaderContent,
  HeroContent,
  ServicesContent,
  IndustriesContent,
  FaqContent,
  ContactContent,
  FooterContent,
  AnimationsContent,
} from "@/types/cms";

const CONTENT_DIR = path.join(process.cwd(), "content");

/**
 * Reads a content/*.json file fresh on every call (no module-level caching),
 * so editing a file and reloading the page reflects the change immediately.
 */
function readContent<T>(file: string): T {
  const filePath = path.join(CONTENT_DIR, file);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export const getSiteContent = () => readContent<SiteContent>("site.json");
export const getThemeContent = () => readContent<ThemeContent>("theme.json");
export const getSeoContent = () => readContent<SeoContent>("seo.json");
export const getNavigationContent = () => readContent<NavigationContent>("navigation.json");
export const getHeaderContent = () => readContent<HeaderContent>("header.json");
export const getHeroContent = () => readContent<HeroContent>("hero.json");
export const getServicesContent = () => readContent<ServicesContent>("services.json");
export const getIndustriesContent = () => readContent<IndustriesContent>("industries.json");
export const getFaqContent = () => readContent<FaqContent>("faq.json");
export const getContactContent = () => readContent<ContactContent>("contact.json");
export const getFooterContent = () => readContent<FooterContent>("footer.json");
export const getAnimationsContent = () => readContent<AnimationsContent>("animations.json");
