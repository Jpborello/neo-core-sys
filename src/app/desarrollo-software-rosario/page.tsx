import Link from "next/link";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import { ROSARIO_FAQS, faqJsonLd } from "@/lib/faqs";
import { SITE, absoluteUrl, whatsappLink } from "@/lib/site";
import shared from "@/components/Landing.module.css";
import styles from "./page.module.css";

const PAGE_URL = absoluteUrl("/desarrollo-software-rosario");

const PAINS = [
  {
    title: "Sistemas de escritorio de hace 20 años",
    text: "Programas instalados en una sola máquina que no se pueden ver desde el celular ni desde afuera de la oficina, obligando a los directores a estar atados físicamente.",
  },
  {
    title: "Fuga de clientes por demoras en responder",
    text: "En un mercado competitivo, el que responde primero se lleva la venta. Si tu empresa tarda 6 u 8 horas en cotizar por WhatsApp, el cliente ya le compró a otro.",
  },
  {
    title: "Planillas de Excel que nadie entiende",
    text: "Archivos compartidos desincronizados, fórmulas que se rompen, datos borrados accidentalmente y falta total de métricas de rendimiento en tiempo real.",
  },
];

const ADVANTAGES = [
  {
    title: "100% en la nube",
    text: "Accedé a tus paneles administrativos, métricas y pedidos desde cualquier computadora, tablet o celular, en cualquier lugar del mundo.",
  },
  {
    title: "Respuesta inmediata con IA",
    text: "Agentes que atienden y retienen clientes las 24 horas, consultan stock en la base de datos y derivan de inmediato a tus vendedores.",
  },
  {
    title: "Next.js y PostgreSQL",
    text: "Código limpio, sin plantillas lentas ni dependencias frágiles. Carga instantánea, alta concurrencia y máxima seguridad en tus datos.",
  },
  {
    title: "Soporte directo y local",
    text: "Tratás directamente con los desarrolladores del sistema. Sin intermediarios, sin tickets infinitos y con capacitación presencial o virtual en Rosario.",
  },
];

const CASES = [
  {
    pill: "Rosario · mayorista e IA",
    name: "El Paquetero Mayorista",
    text: "E-commerce mayorista textil con mini ERP y bot de IA autónomo conectado a PostgreSQL. El sistema ya concreta ventas de forma 100% automatizada y fue indexado en las recomendaciones de ChatGPT en 30 días.",
    url: "https://www.elpaquetero.com.ar/",
    cta: "Ver elpaquetero.com.ar ↗",
  },
  {
    pill: "Rosario · e-commerce B2B",
    name: "Dulce Valentín y Rey de Reyes",
    text: "Tiendas mayoristas de indumentaria y calzado con catálogo, carrito, seguimiento de pedidos, niveles de cliente y descuentos escalonados para revendedores de todo el país.",
    url: "https://dulcevalentin.com.ar/",
    cta: "Ver dulcevalentin.com.ar ↗",
  },
  {
    pill: "Santa Fe · institucional y DDJJ",
    name: "ATFAR Gremial",
    text: "Plataforma de gestión sindical que nuclea a las farmacias del norte de Santa Fe. Integra declaraciones juradas mensuales (DDJJ) para empleadores, padrón masivo y bolsa de trabajo.",
    url: "https://www.atfar.com.ar/",
    cta: "Ver atfar.com.ar ↗",
  },
  {
    pill: "Rosario · SEO local récord",
    name: "Las Manitos de Mili",
    text: "Sistema de turnos online y posicionamiento SEO local en Rosario que alcanzó 68.6% de CTR en Google Search Console y posición media top 2 en búsquedas orgánicas.",
    url: "https://lasmanitosdemili.com.ar/",
    cta: "Ver caso de estudio ↗",
  },
];

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Desarrollo de Software a Medida en Rosario y Santa Fe",
      inLanguage: "es-AR",
      isPartOf: { "@id": absoluteUrl("/#website") },
      about: { "@id": `${PAGE_URL}#service` },
      dateModified: SITE.lastUpdated,
      breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Desarrollo de software en Rosario", item: PAGE_URL },
      ],
    },
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Desarrollo de software a medida en Rosario",
      serviceType: "Desarrollo de software a medida",
      description:
        "Software house en Rosario especializada en software a medida, sistemas de gestión cloud, modernización de sistemas obsoletos, CRM con agentes de IA y plataformas de alta velocidad para empresas de Rosario y Santa Fe.",
      url: PAGE_URL,
      provider: { "@id": absoluteUrl("/#organization") },
      areaServed: [
        { "@type": "City", name: "Rosario" },
        { "@type": "AdministrativeArea", name: "Santa Fe" },
      ],
    },
    { "@id": `${PAGE_URL}#faq`, ...faqJsonLd(ROSARIO_FAQS) },
  ],
};

export default function DesarrolloSoftwareRosarioPage() {
  return (
    <>
      <JsonLd data={graph} />

      <section className={shared.hero} aria-labelledby="titulo">
        <div className="container">
          <div className={shared.heroInner}>
            <p className="eyebrow">Software house · Rosario, Santa Fe</p>
            <h1 id="titulo" className={shared.title}>
              Desarrollo de <em>software a medida</em> y sistemas web en Rosario.
            </h1>
            <p className={shared.lead}>
              Modernizamos la infraestructura digital de tu empresa. Desarrollamos sistemas en la
              nube, plataformas comerciales y CRM con atención inmediata por IA para que nunca más
              pierdas una venta por demoras en contestar.
            </p>
            <div className={shared.actions}>
              <a
                href={whatsappLink("Hola! Estoy en Rosario y quiero cotizar un software a medida.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--solid"
              >
                Consulta sin cargo
              </a>
              <Link href="#casos-rosario" className="link-u">
                Ver casos en Santa Fe ↓
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={shared.section} aria-labelledby="realidad-title">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow" data-n="01">
              La realidad empresarial
            </p>
            <h2 id="realidad-title" className="section-title">
              ¿Por qué las empresas siguen atrapadas en sistemas <em>viejos</em>?
            </h2>
            <p className="section-desc">
              El software obsoleto frena el crecimiento, genera cuellos de botella y ahuyenta a los
              clientes que esperan respuestas instantáneas.
            </p>
          </header>

          <ul className={shared.grid}>
            {PAINS.map((pain) => (
              <li key={pain.title} className={`${shared.card} ${shared.cardPain}`}>
                <span className={shared.cardTag}>Problema</span>
                <h3 className={shared.cardTitle}>{pain.title}</h3>
                <p className={shared.cardText}>{pain.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={shared.section} aria-labelledby="propuesta-title">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow" data-n="02">
              Nuestra propuesta
            </p>
            <h2 id="propuesta-title" className="section-title">
              Ingeniería de software <em>moderna</em> para empresas
            </h2>
            <p className="section-desc">
              Construimos herramientas que resuelven los problemas específicos de tu operación con
              tecnología de primer nivel mundial.
            </p>
          </header>

          <ul className={shared.grid}>
            {ADVANTAGES.map((item) => (
              <li key={item.title} className={shared.card}>
                <span className={shared.cardTag}>Incluido</span>
                <h3 className={shared.cardTitle}>{item.title}</h3>
                <p className={shared.cardText}>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="casos-rosario" className={shared.section} aria-labelledby="casos-title">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow" data-n="03">
              Trayectoria comprobada
            </p>
            <h2 id="casos-title" className="section-title">
              Empresas que <em>confían</em> en nosotros en la región
            </h2>
            <p className="section-desc">
              Soluciones reales en producción, con métricas validadas por clientes de Santa Fe.
            </p>
          </header>

          <div className={styles.cases}>
            {CASES.map((item) => (
              <article key={item.name} className={styles.caseItem}>
                <p className={styles.casePill}>{item.pill}</p>
                <h3 className={styles.caseName}>{item.name}</h3>
                <p className={styles.caseText}>{item.text}</p>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.caseLink}>
                  {item.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQ
        group="faq-rosario"
        n="04"
        eyebrow="Preguntas frecuentes"
        title={
          <>
            Dudas sobre desarrollo de software en <em>Rosario</em>
          </>
        }
        description="Información clara sobre nuestra metodología de trabajo y contratación en la zona."
        items={ROSARIO_FAQS}
      />

      <section className={shared.section} aria-labelledby="cta-title">
        <div className="container">
          <div className={shared.cta}>
            <h2 id="cta-title" className={shared.ctaTitle}>
              Hablemos de tu próximo <em>sistema</em>
            </h2>
            <p className={shared.ctaText}>
              Contanos sobre los procesos que querés automatizar y coordinamos una reunión para
              evaluar la solución ideal para tu empresa.
            </p>
            <div className={shared.actions}>
              <a
                href={whatsappLink(
                  "Hola! Quiero coordinar una reunion sobre desarrollo de software en Rosario."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--solid"
              >
                Escribir por WhatsApp
              </a>
              <Link href="/#contacto" className="btn btn--line">
                Completar formulario
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
