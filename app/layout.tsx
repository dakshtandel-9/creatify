import type { Metadata } from "next";
import { Golos_Text, Caveat } from "next/font/google";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { ContactModalProvider } from "@/components/layout/ContactModalProvider";
import { PageLoaderProvider } from "@/components/layout/PageLoaderProvider";
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

const caveat = Caveat({
  variable: "--font-handwritten",
  subsets: ["latin"],
  weight: ["600", "700"],
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
      // A square 180x180 logo tile (rather than a 1200x630 banner) is what makes
      // Telegram/WhatsApp/X render the compact "app card" preview: logo thumbnail
      // on the left, title + description + domain on the right.
      images: [
        {
          url: seo.ogImage,
          width: 180,
          height: 180,
          type: "image/png",
          alt: site.name,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage],
    },
    icons: {
      icon: [
        { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
        { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      ],
      apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
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
    <html lang="en" className={`${golosText.variable} ${caveat.variable}`}>
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
        <PageLoaderProvider>
          <SmoothScrollProvider>
            <ContactModalProvider content={contact}>{children}</ContactModalProvider>
          </SmoothScrollProvider>
        </PageLoaderProvider>
      </body>
    </html>
  );
}
