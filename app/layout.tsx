import type { Metadata } from "next";
import { Golos_Text } from "next/font/google";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { ContactModalProvider } from "@/components/layout/ContactModalProvider";
import { PageLoader } from "@/components/ui/PageLoader";
import { getSiteContent, getSeoContent, getContactContent } from "@/lib/content";
import {
  buildOrganizationJsonLd,
  buildLocalBusinessJsonLd,
  buildWebsiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

const golosText = Golos_Text({
  variable: "--font-golos",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = getSiteContent();
  const seo = getSeoContent();

  return {
    metadataBase: new URL(site.url),
    title: {
      default: seo.title,
      template: `%s | ${site.name}`,
    },
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: site.name }],
    creator: site.name,
    publisher: site.name,
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: site.url,
      siteName: site.name,
      title: seo.title,
      description: seo.description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: site.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/opengraph-image"],
    },
    icons: {
      icon: "/icon.svg",
      shortcut: "/icon.svg",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = getSiteContent();
  const contact = getContactContent();

  const organizationJsonLd = buildOrganizationJsonLd(site, contact);
  const localBusinessJsonLd = buildLocalBusinessJsonLd(site, contact);
  const websiteJsonLd = buildWebsiteJsonLd(site);

  return (
    <html lang="en" className={golosText.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-text antialiased">
        <PageLoader />
        <SmoothScrollProvider>
          <ContactModalProvider content={contact}>{children}</ContactModalProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
