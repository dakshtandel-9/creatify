import type { SiteContent, SeoContent, ContactContent } from "@/types/cms";

export function buildOrganizationJsonLd(site: SiteContent, contact: ContactContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    description: site.description,
    sameAs: ["https://linkedin.com", "https://instagram.com", "https://x.com"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contact.phone,
      contactType: "sales",
      email: contact.email,
      availableLanguage: "English",
    },
  };
}

export function buildLocalBusinessJsonLd(site: SiteContent, contact: ContactContent) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    image: `${site.url}/icon.svg`,
    url: site.url,
    telephone: contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Flat No 2, 2nd Floor, Khajoorbanna Dargah Road, Mahendru",
      addressLocality: "Patna",
      addressRegion: "Bihar",
      postalCode: "800006",
      addressCountry: "IN",
    },
    priceRange: "$$$",
  };
}

export function buildWebsiteJsonLd(site: SiteContent) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildServiceJsonLd(
  site: SiteContent,
  services: { title: string; description: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Digital Marketing Agency Services",
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${site.name} Services`,
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          url: `${site.url}/#services`,
        },
      })),
    },
  };
}

export function buildFaqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildMetadataFromContent(site: SiteContent, seo: SeoContent) {
  return {
    site,
    seo,
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    ogImage: seo.ogImage,
  };
}
