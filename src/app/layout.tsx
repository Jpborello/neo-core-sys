import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neo Core Sys | Desarrollo de Software Premium & Consultoría IT",
  description: "Creamos plataformas e-commerce, sistemas a medida, SaaS y soluciones de alta performance con diseño de vanguardia. Impulsando la transformación digital de tu negocio.",
  keywords: "desarrollo de software, consultoría it, e-commerce, saas, inteligencia artificial, neo core sys, argentina",
  authors: [{ name: "Neo Core Sys" }],
  openGraph: {
    title: "Neo Core Sys | Desarrollo de Software Premium & Consultoría IT",
    description: "Creamos plataformas e-commerce, sistemas a medida, SaaS y soluciones de alta performance con diseño de vanguardia.",
    url: "https://neo-core-sys.com.ar",
    siteName: "Neo Core Sys",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
