import PillNav from "@/components/ui/PillNav";
import { Hero } from "@/sections/Hero";
import { LogoCloud } from "@/sections/LogoCloud";
import { About } from "@/sections/About";
import { WhyChooseUs } from "@/sections/WhyChooseUs";
import { Services } from "@/sections/Services";
import { Stats } from "@/sections/Stats";
import { CaseStudies } from "@/sections/CaseStudies";
import { Process } from "@/sections/Process";
import { Comparison } from "@/sections/Comparison";
import { Testimonials } from "@/sections/Testimonials";
import { MarketingStack } from "@/sections/MarketingStack";
import { FAQ } from "@/sections/FAQ";
import { FinalCTA } from "@/sections/FinalCTA";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import {
  getSiteContent,
  getNavigationContent,
  getHeaderContent,
  getHeroContent,
  getAboutContent,
  getServicesContent,
  getStatsContent,
  getCaseStudiesContent,
  getProcessContent,
  getTestimonialsContent,
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
  const about = getAboutContent();
  const services = getServicesContent();
  const stats = getStatsContent();
  const caseStudies = getCaseStudiesContent();
  const process = getProcessContent();
  const testimonials = getTestimonialsContent();
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
        <About content={about} primaryButtonLink={primaryButtonLink} />
        <WhyChooseUs />
        <Services content={services} primaryButtonLink={primaryButtonLink} />
        <Stats content={stats} />
        <CaseStudies content={caseStudies} primaryButtonLink={primaryButtonLink} />
        <Process content={process} />
        <Comparison />
        <Testimonials content={testimonials} />
        <MarketingStack />
        <FAQ content={faq} />
        <FinalCTA />
        <Contact content={contact} />
      </main>
      <Footer content={footer} navigation={navigation} services={services} />
    </>
  );
}
