import type { Metadata } from "next";
import LocalLanding from "@/components/LocalLanding";
import { APPS_FAQS } from "@/lib/faqs";
import { REGION_CASES } from "@/lib/solutions";

const TITLE = "Desarrollo de Aplicaciones Web y Apps en Rosario";
const DESCRIPTION =
  "Desarrollo de aplicaciones web, apps móviles Android/iOS y sitios web profesionales en Rosario. Diseño UI/UX, Next.js, Flutter y PostgreSQL, con SEO para aparecer en Google y en ChatGPT.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/desarrollo-aplicaciones-rosario" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/desarrollo-aplicaciones-rosario",
    siteName: "Neo Core Sys",
    locale: "es_AR",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Neo Core Sys" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-image.png"] },
};

export default function DesarrolloAplicacionesRosarioPage() {
  return (
    <LocalLanding
      path="/desarrollo-aplicaciones-rosario"
      name="Desarrollo de Aplicaciones Web y Apps en Rosario"
      breadcrumb="Desarrollo de aplicaciones en Rosario"
      service={{
        name: "Desarrollo de aplicaciones web y móviles en Rosario",
        serviceType: "Desarrollo de aplicaciones web y móviles",
        description:
          "Desarrollo de aplicaciones web a medida, apps móviles para Android e iOS, diseño UI/UX y desarrollo web profesional con SEO para empresas y emprendimientos de Rosario y Santa Fe.",
        areaServed: [
          { "@type": "City", name: "Rosario" },
          { "@type": "City", name: "Funes" },
          { "@type": "AdministrativeArea", name: "Santa Fe" },
          { "@type": "Country", name: "Argentina" },
        ],
      }}
      eyebrow="Aplicaciones web · Apps móviles · Desarrollo web"
      title={
        <>
          Desarrollo de <em>aplicaciones</em> web y apps en Rosario.
        </>
      }
      lead="Diseñamos y programamos aplicaciones web, apps móviles para Android e iOS y sitios web profesionales en Rosario. Desde la idea y el diseño de cada pantalla hasta la publicación, el posicionamiento en Google y el soporte."
      whatsappHero="Hola! Estoy en Rosario y quiero cotizar el desarrollo de una aplicacion."
      whatsappCta="Hola! Quiero coordinar una reunion para desarrollar una aplicacion."
      pains={{
        eyebrow: "Antes de empezar",
        title: (
          <>
            Por qué tantas apps <em>no despegan</em>
          </>
        ),
        description:
          "Una aplicación tiene que cargar rápido, ser fácil de usar y poder encontrarse. Estos son los errores más comunes que evitamos.",
        items: [
          {
            title: "Plantillas lentas y genéricas",
            text: "Sitios armados con constructores visuales que tardan en cargar en el celular, se ven igual que la competencia y no escalan cuando el negocio crece.",
          },
          {
            title: "Apps que nadie encuentra",
            text: "Aplicaciones sin SEO ni datos estructurados que no aparecen en Google ni en las respuestas de ChatGPT, y dependen 100% de publicidad paga.",
          },
          {
            title: "Desarrollos sin dueño",
            text: "Proyectos abandonados por freelancers, sin código fuente entregado ni documentación, imposibles de mantener o mejorar.",
          },
        ],
      }}
      advantages={{
        eyebrow: "Qué hacemos",
        title: (
          <>
            De la idea a la app <em>publicada</em>
          </>
        ),
        description: "Un mismo equipo en Rosario se encarga del diseño, el desarrollo, la publicación y el soporte.",
        items: [
          {
            title: "Aplicaciones web a medida",
            text: "Sistemas de gestión, portales de clientes, turnos online y paneles administrativos con Next.js, React y PostgreSQL.",
          },
          {
            title: "Apps móviles Android e iOS",
            text: "Aplicaciones con Flutter publicadas en Google Play y App Store, con notificaciones push y sincronización con tu sistema.",
          },
          {
            title: "Diseño UI/UX",
            text: "Diseño de cada pantalla pensado para que tus usuarios encuentren lo que buscan en pocos toques, en celular y en escritorio.",
          },
          {
            title: "Desarrollo web con SEO y GEO",
            text: "Sitios rápidos, con datos estructurados y contenido preparado para Google y para buscadores de IA como ChatGPT y Perplexity.",
          },
        ],
      }}
      cases={{
        title: (
          <>
            Aplicaciones que ya están <em>funcionando</em>
          </>
        ),
        description: "Proyectos desarrollados en Rosario que hoy están en producción.",
        items: [REGION_CASES.manitos, REGION_CASES.paquetero, REGION_CASES.atfar, REGION_CASES.dulceValentin],
      }}
      faq={{
        title: (
          <>
            Dudas sobre el desarrollo de <em>aplicaciones</em>
          </>
        ),
        description: "Lo que más nos preguntan antes de empezar un proyecto.",
        items: APPS_FAQS,
      }}
      cta={{
        title: (
          <>
            Contanos tu <em>idea</em>
          </>
        ),
        text: "Te ayudamos a definir el alcance, elegir entre web o app móvil y armar un plan por etapas con tiempos y costos claros.",
      }}
    />
  );
}
