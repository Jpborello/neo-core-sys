import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import JsonLd from "@/components/JsonLd";
import { SITE, absoluteUrl } from "@/lib/site";
import "./globals.css";

// Fuentes autoalojadas (sin pedidos a Google) y precargadas por next/font.
const sans = localFont({
  src: "./fonts/Inter-latin.woff2",
  variable: "--font-sans-loaded",
  weight: "100 900",
  display: "swap",
});

const serif = localFont({
  src: [
    { path: "./fonts/Fraunces-latin.woff2", style: "normal", weight: "100 900" },
    { path: "./fonts/Fraunces-latin-italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-serif-loaded",
  display: "swap",
});

const mono = localFont({
  src: "./fonts/JetBrainsMono-latin.woff2",
  variable: "--font-mono-loaded",
  weight: "100 800",
  display: "swap",
});

const DESCRIPTION =
  "Software house en Rosario. Desarrollamos software a medida, e-commerce mayorista, plataformas web y agentes de IA que atienden y cierran ventas 24/7. Código propio, sin comisiones por venta.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Neo Core Sys | Software a Medida, E-commerce e IA en Rosario",
    template: "%s | Neo Core Sys",
  },
  description: DESCRIPTION,
  applicationName: SITE.name,
  keywords: [
    "desarrollo de software a medida",
    "software house rosario",
    "fabricación de software argentina",
    "ecommerce mayorista",
    "plataformas web",
    "desarrollo Next.js",
    "agentes de inteligencia artificial",
    "chatbot IA para ventas",
    "saas",
    "mini erp",
    "neo core sys",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: "/",
    languages: { "es-AR": "/" },
  },
  openGraph: {
    title: "Neo Core Sys | Software a Medida, E-commerce e IA en Rosario",
    description: DESCRIPTION,
    url: "/",
    siteName: SITE.name,
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Neo Core Sys — software a medida, e-commerce e IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neo Core Sys | Software a Medida, E-commerce e IA en Rosario",
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#f3efe6",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

/**
 * Grafo de entidades del sitio (una sola fuente de verdad). Las páginas
 * referencian estas entidades por @id en lugar de redefinirlas.
 */
const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ProfessionalService", "Organization"],
      "@id": absoluteUrl("/#organization"),
      name: SITE.name,
      legalName: SITE.name,
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/og-image.png"),
        width: 1200,
        height: 630,
      },
      image: absoluteUrl("/og-image.png"),
      description:
        "Software house de Rosario especializada en desarrollo de software a medida, plataformas web escalables, SaaS, e-commerce mayorista y agentes de inteligencia artificial aplicada.",
      email: SITE.email,
      telephone: SITE.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.locality,
        addressRegion: SITE.region,
        addressCountry: SITE.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: SITE.geo.latitude,
        longitude: SITE.geo.longitude,
      },
      areaServed: [
        { "@type": "Country", name: "Argentina" },
        { "@type": "AdministrativeArea", name: "Latinoamérica" },
      ],
      knowsLanguage: ["es", "en"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: SITE.phone,
        email: SITE.email,
        availableLanguage: ["Spanish", "English"],
      },
      founder: {
        "@type": "Person",
        name: SITE.founder.name,
        jobTitle: SITE.founder.jobTitle,
        sameAs: SITE.founder.github,
      },
      sameAs: [...SITE.sameAs, SITE.whatsapp],
      knowsAbout: [
        "Desarrollo de software a medida",
        "Next.js y React",
        "Agentes de inteligencia artificial",
        "E-commerce mayorista B2B",
        "Speed-to-Lead y CRM",
        "Generative Engine Optimization (GEO)",
        "Answer Engine Optimization (AEO)",
        "SEO técnico y local",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios tecnológicos",
        itemListElement: [
          "Desarrollo de software a medida y SaaS",
          "E-commerce de alto rendimiento y mini ERP",
          "Agentes de inteligencia artificial y chatbots autónomos",
          "Optimización SEO, GEO (Generative Engine Optimization) y AEO",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: SITE.url,
      name: SITE.name,
      inLanguage: "es-AR",
      publisher: { "@id": absoluteUrl("/#organization") },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLMs-full.txt" />
      </head>
      <body>
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <JsonLd data={siteGraph} />
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
