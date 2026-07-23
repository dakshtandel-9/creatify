import PillNav from "@/components/ui/PillNav";
import { Hero } from "@/sections/Hero";
import { LogoCloud } from "@/sections/LogoCloud";
import { Services } from "@/sections/Services";
import { Testimonials } from "@/sections/Testimonials";
import { WhatMakesUsDifferent } from "@/sections/WhatMakesUsDifferent";
import { HowItStarted } from "@/sections/HowItStarted";
import { ServicesFaq } from "@/sections/ServicesFaq";

import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import {
  getSiteContent,
  getNavigationContent,
  getHeaderContent,
  getHeroContent,
  getServicesContent,
  getTestimonialsContent,
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
  const testimonials = getTestimonialsContent();
  const contact = getContactContent();
  const footer = getFooterContent();

  const serviceJsonLd = buildServiceJsonLd(site, services.items);
  const faqJsonLd = services.faq ? buildFaqJsonLd(services.faq.items) : null;

  const primaryButtonLink = header.primaryButton.link;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
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
        <Testimonials content={testimonials} />
        {services.comparison ? <WhatMakesUsDifferent content={services.comparison} /> : null}
        {services.process ? <HowItStarted content={services.process} /> : null}
        {services.faq ? <ServicesFaq content={services.faq} /> : null}
        <Contact content={contact} />
      </main>
      <Footer content={footer} navigation={navigation} services={services} />
    </>
  );
}
