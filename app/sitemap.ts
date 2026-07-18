import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteContent();

  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
