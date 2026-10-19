import type { MetadataRoute } from "next";
import { SITE, absoluteUrl } from "@/lib/site";
import { SOLUTIONS } from "@/lib/solutions";

// Fecha real del último cambio de contenido (no `new Date()`: una fecha que
// cambia en cada request le quita credibilidad al sitemap ante Google).
const lastModified = new Date(SITE.lastUpdated);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...SOLUTIONS.map((s) => ({
      url: absoluteUrl(s.href),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
