import {
  TrendingUp,
  Search,
  MonitorSmartphone,
  LayoutTemplate,
  Palette,
  BarChart3,
  Mail,
  Workflow,
  Share2,
  Target,
  Megaphone,
  Briefcase,
  Rocket,
  Building2,
  ShoppingBag,
  Store,
  HeartPulse,
  GraduationCap,
  BedDouble,
  Landmark,
  Home,
  Factory,
  Compass,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";

/** Maps a content title (service name, industry name, process step) to an icon.
 *  Content stays data-driven from JSON; icons are a presentation concern kept in code. */
const ICON_MAP: Record<string, LucideIcon> = {
  "Performance Marketing": TrendingUp,
  "Google Ads": Target,
  "Meta Ads": Share2,
  SEO: Search,
  "Website Design": MonitorSmartphone,
  "Website Development": MonitorSmartphone,
  "Landing Pages": LayoutTemplate,
  "E-commerce Development": Briefcase,
  Branding: Palette,
  "Brand Identity": Palette,
  "Social Media Marketing": Megaphone,
  "Email Marketing": Mail,
  "Marketing Automation": Workflow,
  "Conversion Rate Optimization": BarChart3,

  Startups: Rocket,
  SMEs: Building2,
  "E-Commerce": ShoppingBag,
  "E-commerce": ShoppingBag,
  "Local Business": Store,
  Healthcare: HeartPulse,
  Education: GraduationCap,
  Hospitality: BedDouble,
  Restaurants: Store,
  Finance: Landmark,
  "Real Estate": Home,
  Industrial: Factory,
  Manufacturing: Factory,
  Travel: Rocket,

  Discover: Search,
  Research: FlaskConical,
  Strategy: Compass,
  Execution: Rocket,
  Scale: TrendingUp,
};

const FALLBACK_ICON = Briefcase;

export function getIconForTitle(title: string): LucideIcon {
  return ICON_MAP[title] ?? FALLBACK_ICON;
}
