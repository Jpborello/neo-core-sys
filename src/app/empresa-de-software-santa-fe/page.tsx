import type { Metadata } from "next";
import LocalLanding from "@/components/LocalLanding";
import { SANTA_FE_FAQS } from "@/lib/faqs";
import { REGION_CASES } from "@/lib/solutions";

const TITLE = "Empresa de Software en Santa Fe";
const DESCRIPTION =
  "Empresa de desarrollo de software para toda la provincia de Santa Fe: sistemas de gestión a medida, portales institucionales, e-commerce y CRM con IA. Base en Rosario y trabajo remoto con empresas de toda la provincia.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/empresa-de-software-santa-fe" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/empresa-de-software-santa-fe",
    siteName: "Neo Core Sys",
    locale: "es_AR",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Neo Core Sys" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-image.png"] },
};

export default function EmpresaSoftwareSantaFePage() {
  return (
    <LocalLanding
      path="/empresa-de-software-santa-fe"
      name="Empresa de Software en Santa Fe"
      breadcrumb="Empresa de software en Santa Fe"
      service={{
        name: "Desarrollo de software a medida en la provincia de Santa Fe",
        serviceType: "Desarrollo de software a medida",
        description:
          "Empresa de software santafesina con base en Rosario: sistemas de gestión cloud, portales institucionales, e-commerce mayorista, CRM con agentes de IA y migración de sistemas legados para empresas e instituciones de toda la provincia de Santa Fe.",
        areaServed: [
          { "@type": "AdministrativeArea", name: "Provincia de Santa Fe" },
          { "@type": "City", name: "Santa Fe" },
          { "@type": "City", name: "Rosario" },
          { "@type": "City", name: "Rafaela" },
          { "@type": "City", name: "Reconquista" },
          { "@type": "City", name: "Venado Tuerto" },
        ],
      }}
      eyebrow="Empresa de software · Provincia de Santa Fe"
      title={
        <>
          Empresa de <em>software</em> para empresas de Santa Fe.
        </>
      }
      lead="Neo Core Sys es una empresa de desarrollo de software santafesina. Desde Rosario diseñamos y programamos sistemas a medida para empresas, comercios e instituciones de Santa Fe capital, Rafaela, Reconquista, Venado Tuerto y toda la provincia, con trato directo con quienes escriben el código."
      whatsappHero="Hola! Tengo una empresa en Santa Fe y quiero cotizar un software a medida."
      whatsappCta="Hola! Quiero coordinar una reunion sobre un desarrollo de software para mi empresa en Santa Fe."
      pains={{
        eyebrow: "El problema",
        title: (
          <>
            Lo que frena a las empresas <em>santafesinas</em>
          </>
        ),
        description:
          "Muchas pymes e instituciones de la provincia operan con herramientas que no acompañan su crecimiento.",
        items: [
          {
            title: "Proveedores lejanos o enlatados",
            text: "Sistemas genéricos de Buenos Aires o del exterior que no se adaptan a la operativa local y cobran licencias por usuario o comisiones por venta.",
          },
          {
            title: "Información repartida en Excel y papel",
            text: "Padrones, pedidos, cobranzas y declaraciones juradas en planillas sueltas, sin control de versiones ni acceso desde el celular.",
          },
          {
            title: "Consultas que nadie responde a tiempo",
            text: "Clientes y socios que escriben por WhatsApp fuera de horario y no obtienen respuesta hasta el día siguiente.",
          },
        ],
      }}
      advantages={{
        eyebrow: "Qué desarrollamos",
        title: (
          <>
            Software a medida para <em>toda la provincia</em>
          </>
        ),
        description:
          "Soluciones en la nube, accesibles desde cualquier ciudad de Santa Fe y pensadas para la forma de trabajar de cada organización.",
        items: [
          {
            title: "Sistemas de gestión cloud",
            text: "Stock, pedidos, clientes, cobranzas y reportes en un solo panel web, accesible desde la oficina, el depósito o el celular.",
          },
          {
            title: "Portales institucionales",
            text: "Padrones de afiliados, declaraciones juradas, pagos y bolsas de trabajo para cámaras, asociaciones y colegios profesionales.",
          },
          {
            title: "E-commerce y venta mayorista",
            text: "Tiendas online B2B y B2C con listas de precios por cliente, mini ERP integrado y cero comisiones por venta.",
          },
          {
            title: "Agentes de IA y CRM",
            text: "Atención automática 24/7 por web y WhatsApp conectada a tu base de datos, con derivación inmediata a tu equipo comercial.",
          },
        ],
      }}
      cases={{
        title: (
          <>
            Proyectos en producción en <em>Santa Fe</em>
          </>
        ),
        description: "Sistemas reales que usan todos los días empresas e instituciones de la provincia.",
        items: [REGION_CASES.atfar, REGION_CASES.paquetero, REGION_CASES.dulceValentin, REGION_CASES.manitos],
      }}
      faq={{
        title: (
          <>
            Preguntas sobre nuestra empresa de software en <em>Santa Fe</em>
          </>
        ),
        description: "Cómo trabajamos con empresas de toda la provincia.",
        items: SANTA_FE_FAQS,
      }}
      cta={{
        title: (
          <>
            Contanos qué necesita tu <em>empresa</em>
          </>
        ),
        text: "Coordinamos una reunión online sin cargo, entendemos tu operación y te enviamos una propuesta por etapas con tiempos y costos claros.",
      }}
    />
  );
}
