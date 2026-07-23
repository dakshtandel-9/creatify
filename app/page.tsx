import PillNav from "@/components/ui/PillNav";
import { Hero } from "@/sections/Hero";
import { LogoCloud } from "@/sections/LogoCloud";
import { Services } from "@/sections/Services";
import { FAQ } from "@/sections/FAQ";
import { FinalCTA } from "@/sections/FinalCTA";

import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import {
  getSiteContent,
  getNavigationContent,
  getHeaderContent,
  getHeroContent,
  getServicesContent,
  getFaqContent,
  getContactContent,
  getFooterContent,
} from "@/lib/content";
import { buildServiceJsonLd, buildFaqJsonLd } from "@/lib/seo";

export default function Home() {
  const site = getSiteContent();
  const navigation = getNavigationContent();
  const header = getHeaderContent();
  const hero = getHeroContent();
  const services = getServicesContent();
  const faq = getFaqContent();
  const contact = getContactContent();
  const footer = getFooterContent();

  const serviceJsonLd = buildServiceJsonLd(site, services.items);
  const faqJsonLd = buildFaqJsonLd(faq.items);

  const primaryButtonLink = header.primaryButton.link;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PillNav
        items={navigation.items.map((item) => ({ label: item.title, href: item.href }))}
        activeHref="#home"
        ctaLabel={header.primaryButton.text}
        ctaHref={header.primaryButton.link}
        baseColor="#0A355B"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#0A355B"
      />
      <main>
        <Hero content={hero} />
        <LogoCloud />
        <Services content={services} />
        <FAQ content={faq} />
        <FinalCTA />
        <Contact content={contact} />
      </main>
      <Footer content={footer} navigation={navigation} services={services} />
    </>
  );
}
