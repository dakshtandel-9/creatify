export type SiteContent = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  phone: string;
  address: string;
  founded: string;
};

export type ThemeContent = {
  colors: {
    primary: string;
    accent: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
  };
  typography: {
    heading: string;
    body: string;
  };
  borderRadius: {
    small: string;
    medium: string;
    large: string;
  };
  spacing: {
    unit: number;
  };
};

export type SeoContent = {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
};

export type NavigationContent = {
  items: { title: string; href: string }[];
};

export type HeaderContent = {
  sticky: boolean;
  showGlassEffect: boolean;
  primaryButton: { text: string; link: string };
};

export type HeroDashboardCard = { title: string; value: string };

export type HeroContent = {
  badge: string;
  heading: string;
  headingHighlight: string;
  subheading: string;
  primaryButton: string;
  secondaryButton: string;
  dashboard: {
    title: string;
    cards: HeroDashboardCard[];
  };
};

export type ServiceAccent = "orange" | "blue" | "green" | "purple" | "cyan" | "pink";

export type ServiceItem = {
  title: string;
  description: string;
  features: string[];
  accent: ServiceAccent;
  eyebrow?: string;
  image?: string;
  imageRatio?: string;
  video?: string;
};

export type ServiceProcessStep = {
  title: string;
  description: string;
};

export type ServicesProcess = {
  title: string;
  heading: string;
  steps: ServiceProcessStep[];
  image?: string;
  imageRatio?: string;
};

export type ServicesComparison = {
  title: string;
  heading: string;
  subheading: string;
  othersLabel: string;
  oursLabel: string;
  othersPoints: string[];
  oursPoints: string[];
  footerText: string;
  footerLinkText: string;
};

export type ServicesFaqEntry = { question: string; answer: string };

export type ServicesFaq = {
  title: string;
  emoji?: string;
  items: ServicesFaqEntry[];
};

export type ServicesContent = {
  title: string;
  heading: string;
  description: string;
  button: string;
  process?: ServicesProcess;
  comparison?: ServicesComparison;
  faq?: ServicesFaq;
  items: ServiceItem[];
};

export type IndustriesContent = {
  title: string;
  items: string[];
};

export type StatItem = { number: string; label: string };

export type StatsContent = {
  items: StatItem[];
};

export type CaseStudyEntry = {
  client: string;
  industry: string;
  image: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
};

export type CaseStudiesContent = {
  title: string;
  heading: string;
  button: string;
  items?: CaseStudyEntry[];
};

export type TestimonialEntry = {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar: string;
};

export type TestimonialsContent = {
  title: string;
  items: TestimonialEntry[];
};

export type FaqEntry = { question: string; answer: string };

export type FaqContent = {
  title: string;
  items: FaqEntry[];
};

export type ContactContent = {
  title: string;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  button: string;
};

export type FooterContent = {
  description: string;
  copyright: string;
  links: string[];
};

export type AnimationsContent = {
  pageTransition: string;
  heroAnimation: string;
  cardHover: string;
  scrollReveal: string;
  counterAnimation: boolean;
  parallax: boolean;
  smoothScroll: boolean;
};
