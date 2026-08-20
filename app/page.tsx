import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { Services } from "@/sections/Services";
import { Testimonials } from "@/sections/Testimonials";
import { WhatMakesUsDifferent } from "@/sections/WhatMakesUsDifferent";
import { HowItStarted } from "@/sections/HowItStarted";
import { ServicesFaq } from "@/sections/ServicesFaq";

import { Footer } from "@/sections/Footer";
import {
  getSiteContent,
  getNavigationContent,
  getHeaderContent,
  getHeroContent,
  getServicesContent,
  getTestimonialsContent,
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
  const footer = getFooterContent();

  const serviceJsonLd = buildServiceJsonLd(site, services.items);
  const faqJsonLd = services.faq ? buildFaqJsonLd(services.faq.items) : null;

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
      <Header navigation={navigation} header={header} site={site} />
      <main>
        <Hero content={hero} />
        <Services content={services} />
        <Testimonials content={testimonials} />
        {services.comparison ? <WhatMakesUsDifferent content={services.comparison} /> : null}
        {services.process ? <HowItStarted content={services.process} /> : null}
        {services.faq ? <ServicesFaq content={services.faq} /> : null}
      </main>
      <Footer content={footer} navigation={navigation} />
    </>
  );
}
