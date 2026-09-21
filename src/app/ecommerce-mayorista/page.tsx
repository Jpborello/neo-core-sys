import Link from "next/link";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import { ECOMMERCE_FAQS, faqJsonLd } from "@/lib/faqs";
import { SITE, absoluteUrl, whatsappLink } from "@/lib/site";
import shared from "@/components/Landing.module.css";
import styles from "./page.module.css";

const PAGE_URL = absoluteUrl("/ecommerce-mayorista");

const PAINS = [
  {
    title: "Demoras infinitas por WhatsApp",
    text: "Tus vendedores colapsan respondiendo una por una preguntas como “¿Tenés stock de esto?”, demoran horas en cotizar y el cliente termina comprándole a tu competidor.",
  },
  {
    title: "Listas de precios en PDF obsoletas",
    text: "Mandar un catálogo de 50 páginas es engorroso. Con la inflación argentina quedan desactualizados en días y generan desacuerdos de precios con los clientes.",
  },
  {
    title: "Descontrol de stock y pedidos duplicados",
    text: "Sin un sistema centralizado en tiempo real, dos vendedores pueden comprometer la misma mercadería física, generando cancelaciones y clientes enojados.",
  },
];

const FEATURES = [
  {
    title: "Precios por CUIT y volumen",
    text: "Listas diferenciadas (revendedor, distribuidor, mayorista directo), escalas por cantidad y mínimos de compra obligatorios por bulto o curva.",
  },
  {
    title: "Mini ERP de stock y despacho",
    text: "Control en tiempo real de unidades físicas, alertas de quiebre de stock, gestión de pedidos pendientes y emisión automática de remitos para el depósito.",
  },
  {
    title: "Bot de IA autónomo",
    text: "Agente conectado directo a la base de datos PostgreSQL. Atiende clientes en la web y WhatsApp, verifica existencias en segundos y cierra ventas sin operador humano.",
  },
  {
    title: "Cero comisiones por venta",
    text: "El código y la base de datos son 100% de tu empresa. No pagás porcentajes sobre tus ventas ni mensualidades abusivas a plataformas de terceros.",
  },
];

const CASE_STATS = [
  { value: "100%", label: "ventas cerradas en automático por el bot de IA" },
  { value: "30 días", label: "para ser citado en respuestas de ChatGPT (GEO)" },
  { value: "0 ms", label: "de demora en cotizar stock a clientes mayoristas" },
  { value: "0%", label: "comisión por venta a plataformas externas" },
];

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "E-Commerce Mayorista B2B y Mini ERP con Bot de IA",
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
        { "@type": "ListItem", position: 2, name: "E-commerce mayorista", item: PAGE_URL },
      ],
    },
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Desarrollo de e-commerce mayorista B2B y mini ERP con agente de IA",
      serviceType: "Desarrollo de e-commerce mayorista",
      description:
        "Plataforma de venta mayorista B2B a medida con catálogo en tiempo real, listas de precios por CUIT, control de inventario y agente de IA autónomo que atiende y cierra ventas 24/7.",
      url: PAGE_URL,
      provider: { "@id": absoluteUrl("/#organization") },
      areaServed: { "@type": "Country", name: "Argentina" },
    },
    { "@id": `${PAGE_URL}#faq`, ...faqJsonLd(ECOMMERCE_FAQS) },
  ],
};

export default function EcommerceMayoristaPage() {
  return (
    <>
      <JsonLd data={graph} />

      <section className={shared.hero} aria-labelledby="titulo">
        <div className="container">
          <div className={shared.heroInner}>
            <p className="eyebrow">E-commerce mayorista · Mini ERP · Agente de IA</p>
            <h1 id="titulo" className={shared.title}>
              Dejá de perder pedidos por demoras en WhatsApp. Tu <em>e-commerce mayorista</em> que
              vende solo.
            </h1>
            <p className={shared.lead}>
              Diseñamos plataformas mayoristas a medida para fábricas y distribuidores. Catálogo en
              tiempo real, listas de precios por CUIT y un bot de IA conectado a tu base de datos
              que atiende consultas de stock y concreta pedidos 24/7.
            </p>
            <div className={shared.actions}>
              <a
                href={whatsappLink("Hola! Quiero cotizar un E-Commerce Mayorista con bot de IA.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--solid"
              >
                Cotizar plataforma
              </a>
              <Link href="#caso-real" className="link-u">
                Ver caso en producción ↓
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={shared.section} aria-labelledby="dolor-title">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow" data-n="01">
              El dolor del mercado
            </p>
            <h2 id="dolor-title" className="section-title">
              ¿Por qué las distribuidoras pierden <em>ventas</em>?
            </h2>
            <p className="section-desc">
              Hoy el comprador mayorista no tiene paciencia. Consulta a tres proveedores a la vez y
              le compra al primero que le responde con stock y precio.
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

      <section className={shared.section} aria-labelledby="solucion-title">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow" data-n="02">
              La solución
            </p>
            <h2 id="solucion-title" className="section-title">
              Arquitectura diseñada para la venta mayorista <em>real</em>
            </h2>
            <p className="section-desc">
              Un ecosistema digital que automatiza la operativa desde que el cliente busca un
              producto hasta que sale el remito del depósito.
            </p>
          </header>

          <ul className={shared.grid}>
            {FEATURES.map((feature) => (
              <li key={feature.title} className={shared.card}>
                <span className={shared.cardTag}>Incluido</span>
                <h3 className={shared.cardTitle}>{feature.title}</h3>
                <p className={shared.cardText}>{feature.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="caso-real" className={shared.section} aria-labelledby="caso-title">
        <div className="container">
          <div className={styles.spot}>
            <div>
              <p className={styles.spotBadge}>Caso de estudio en producción</p>
              <h2 id="caso-title" className={styles.spotTitle}>
                El Paquetero: mayorista <em>textil</em>
              </h2>
              <p className={styles.spotText}>
                Diseñamos e implementamos el sistema integral de venta mayorista de{" "}
                <strong>El Paquetero</strong> (Rosario, Santa Fe). Integramos catálogo reactivo,
                mini ERP logístico y un <strong>bot de IA autónomo</strong> conectado a PostgreSQL.
                El sistema ya cierra ventas de forma 100% automatizada y fue recomendado
                directamente en ChatGPT en su primer mes en producción.
              </p>
              <a
                href="https://www.elpaquetero.com.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--solid"
              >
                Visitar elpaquetero.com.ar ↗
              </a>
            </div>

            <dl className={styles.stats}>
              {CASE_STATS.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <FAQ
        group="faq-ecommerce"
        n="03"
        eyebrow="Dudas frecuentes"
        title={
          <>
            Preguntas sobre e-commerce <em>mayorista</em>
          </>
        }
        description="Respuestas directas a las preguntas que nos hacen los directores y dueños de distribuidoras."
        items={ECOMMERCE_FAQS}
      />

      <section className={shared.section} aria-labelledby="cta-title">
        <div className="container">
          <div className={shared.cta}>
            <h2 id="cta-title" className={shared.ctaTitle}>
              ¿Listo para modernizar las ventas de tu <em>distribuidora</em>?
            </h2>
            <p className={shared.ctaText}>
              Analizamos tu catálogo actual, definimos el flujo mayorista a medida y te preparamos
              una demo funcional sin cargo.
            </p>
            <div className={shared.actions}>
              <a
                href={whatsappLink("Hola! Quiero solicitar una reunion para un E-Commerce Mayorista.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--solid"
              >
                Reunión por WhatsApp
              </a>
              <Link href="/#contacto" className="btn btn--line">
                Enviar formulario
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
