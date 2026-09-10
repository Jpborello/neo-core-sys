import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Desarrollo de Software a Medida en Rosario & Santa Fe | Neo Core Sys",
  description: "Software House boutique en Rosario. Desarrollamos software a medida, sistemas de gestión cloud, modernización de sistemas obsoletos y CRM con bot de IA para empresas de Rosario y la región.",
  keywords: "desarrollo de software rosario, software a medida rosario, sistemas para empresas rosario, fabricacion de software santa fe, software house rosario argentina, programadores rosario, crm rosario",
  alternates: {
    canonical: "https://neo-core-sys.com.ar/desarrollo-software-rosario",
  },
  openGraph: {
    title: "Desarrollo de Software a Medida en Rosario & Santa Fe | Neo Core Sys",
    description: "Sistemas web y software empresarial a medida en Rosario. Modernizamos tu operativa con código nativo, velocidad extrema y soporte local.",
    url: "https://neo-core-sys.com.ar/desarrollo-software-rosario",
    siteName: "Neo Core Sys",
    locale: "es_AR",
    type: "website",
  },
};

export default function DesarrolloSoftwareRosarioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
