import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  const site = getSiteContent();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
