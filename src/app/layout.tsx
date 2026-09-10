import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neo Core Sys | Desarrollo de Software a Medida y Plataformas Web",
  description: "Somos una Software House premium especializada en desarrollo de software a medida, plataformas web escalables, SaaS, e-commerce y soluciones de inteligencia artificial para empresas.",
  keywords: "desarrollo de software a medida, fabricacion de software, software house argentina, plataformas web, desarrollo Next.js, integracion de inteligencia artificial, e-commerce b2b b2c, saas premium, consultoria it, neo core sys, rosario",
  authors: [{ name: "Neo Core Sys" }],
  alternates: {
    canonical: "https://neo-core-sys.com.ar",
  },
  openGraph: {
    title: "Neo Core Sys | Desarrollo de Software a Medida y Plataformas Web",
    description: "Software House premium especializada en desarrollo de software a medida, plataformas web, SaaS e inteligencia artificial.",
    url: "https://neo-core-sys.com.ar",
    siteName: "Neo Core Sys",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "https://neo-core-sys.com.ar/og-image.png",
        width: 1200,
        height: 630,
        alt: "Neo Core Sys - Premium Software Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neo Core Sys | Desarrollo de Software a Medida y Plataformas Web",
    description: "Desarrollo de software premium, SaaS, plataformas e-commerce y soluciones empresariales con inteligencia artificial.",
    images: ["https://neo-core-sys.com.ar/og-image.png"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Neo Core Sys",
    legalName: "Neo Core Sys",
    url: "https://neo-core-sys.com.ar",
    logo: "https://neo-core-sys.com.ar/og-image.png",
    description: "Software House premium especializada en desarrollo de software a medida, plataformas web escalables, SaaS, e-commerce mayorista y soluciones de inteligencia artificial aplicada.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rosario",
      addressRegion: "Santa Fe",
      addressCountry: "AR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+54-9-341-798-1212",
      email: "contacto@neo-core-sys.com.ar",
      availableLanguage: ["Spanish", "English"],
    },
    sameAs: [
      "https://www.linkedin.com/company/neo-core-sys",
      "https://github.com/Jpborello",
    ],
    founder: {
      "@type": "Person",
      name: "Juan Pablo Borello",
      jobTitle: "Lead Software Architect & Founder",
      sameAs: "https://github.com/Jpborello",
    },
    knowsAbout: [
      "Custom Software Development",
      "Next.js Architecture",
      "Artificial Intelligence Agents",
      "Wholesale E-Commerce Systems",
      "Speed-to-Lead CRM Integration",
      "Generative Engine Optimization (GEO)",
      "Answer Engine Optimization (AEO)",
      "Autonomous Sales Bots",
    ],
  };

  return (
    <html lang="es">
      <head>
        <link
          rel="alternate"
          type="text/plain"
          href="https://neo-core-sys.com.ar/llms.txt"
          title="LLMs.txt"
        />
        <link
          rel="alternate"
          type="text/plain"
          href="https://neo-core-sys.com.ar/llms-full.txt"
          title="LLMs-full.txt"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
