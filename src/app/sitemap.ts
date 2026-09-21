import type { MetadataRoute } from "next";
import { SITE, absoluteUrl } from "@/lib/site";

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
    {
      url: absoluteUrl("/ecommerce-mayorista"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/desarrollo-software-rosario"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
