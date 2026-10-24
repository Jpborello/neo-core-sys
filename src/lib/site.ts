/**
 * Datos únicos de la marca. Todo lo que aparece en metadatos, JSON-LD, footer
 * y llms.txt sale de acá para evitar inconsistencias (nombre, email, teléfono).
 */
export const SITE = {
  name: "Neo Core Sys",
  url: "https://www.neo-core-sys.com.ar",
  email: "neocoresystem@gmail.com",
  phone: "+5493417981212",
  phoneDisplay: "+54 9 341 798-1212",
  whatsapp: "https://wa.me/5493417981212",
  locality: "Rosario",
  region: "Santa Fe",
  country: "AR",
  geo: { latitude: -32.94682, longitude: -60.63932 },
  founder: {
    name: "Juan Pablo Borello",
    jobTitle: "Lead Software Architect & Founder",
    github: "https://github.com/Jpborello",
  },
  sameAs: [
    "https://www.linkedin.com/company/neo-core-sys",
    "https://github.com/Jpborello",
  ],
  /** Fecha de última actualización de contenido (ISO). Se usa en sitemap y JSON-LD. */
  lastUpdated: "2026-10-18",
} as const;

export const absoluteUrl = (path = "/") =>
  `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;

export const whatsappLink = (text: string) =>
  `${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
