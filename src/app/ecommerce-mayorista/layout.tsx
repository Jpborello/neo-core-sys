import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Commerce Mayorista B2B y Mini ERP con Bot de IA",
  description: "Desarrollo de plataformas de venta mayorista a medida con catálogo en tiempo real, listas de precios por CUIT, control de stock y bot de IA autónomo que atiende y cierra ventas 24/7.",
  keywords: "ecommerce mayorista, plataforma b2b mayorista, sistema venta mayorista, mini erp para mayoristas, bot ia mayorista, venta mayorista rosario argentina, software catalogo mayorista",
  alternates: {
    canonical: "/ecommerce-mayorista",
  },
  openGraph: {
    title: "E-Commerce Mayorista B2B y Mini ERP con Bot de IA",
    description: "Plataformas mayoristas de alta velocidad con Mini ERP integrado y bot inteligente conectado a tu base de datos para vender 24/7.",
    url: "/ecommerce-mayorista",
    siteName: "Neo Core Sys",
    locale: "es_AR",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Neo Core Sys" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-image.png"] },
};

export default function EcommerceMayoristaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
