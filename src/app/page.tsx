import type { Metadata } from "next";
import Link from "next/link";
import CaseCard from "@/components/CaseCard";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import { HOME_FAQS, faqJsonLd } from "@/lib/faqs";
import { PROJECTS } from "@/lib/projects";
import { SITE, absoluteUrl, whatsappLink } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const KPIS = [
  { value: "68.6%", label: "CTR en Google Search Console", source: "Las Manitos de Mili" },
  { value: "<1s", label: "respuesta del agente de IA, 24/7", source: "El Paquetero" },
  { value: "30 días", label: "hasta ser citado por ChatGPT", source: "El Paquetero" },
  { value: "0%", label: "comisión por venta a terceros", source: "código propio" },
];

const SERVICES = [
  {
    tag: "Sistemas",
    title: "Sistemas a medida",
    text: "Plataformas SaaS, paneles de control administrativos y flujos con la lógica de negocio de tu empresa. Sin plantillas, sin límites.",
  },
  {
    tag: "E-commerce",
    title: "E-commerce premium",
    text: "Venta al público y canales mayoristas B2B con stock automatizado, listas de precios por cliente, pasarelas de pago y logística integrada.",
  },
  {
    tag: "IA",
    title: "APIs e inteligencia artificial",
    text: "Agentes que atienden y cierran ventas, automatización de procesos con IA, bots y sincronización con servicios cloud.",
  },
  {
    tag: "Soporte",
    title: "Capacitación y soporte",
    text: "Entrenamos a tu equipo, dejamos el sistema documentado y te acompañamos con asesoría comercial para potenciar las ventas.",
  },
];

const STACK = [
  { name: "Next.js + React", text: "Estructuras web de nivel enterprise, renderizado híbrido y velocidad nativa." },
  { name: "TypeScript", text: "Código tipado y robusto para minimizar fallos en entornos productivos críticos." },
  { name: "IA y LLMs", text: "Integración de modelos de lenguaje y procesamiento inteligente de datos en tus flujos." },
  { name: "PostgreSQL", text: "Datos relacionales con alta integridad, consultas optimizadas y escalabilidad de lectura." },
  { name: "Node.js + APIs", text: "Servicios backend ágiles con validaciones estrictas y respuesta ultra rápida." },
  { name: "Cloud + Vercel", text: "Infraestructura serverless para máxima estabilidad ante picos de tráfico." },
];

const PRINCIPLES = [
  {
    title: "Velocidad extrema",
    text: "Minimizamos dependencias y optimizamos el código para Core Web Vitals impecables y carga instantánea.",
  },
  {
    title: "Autogestionable",
    text: "Paneles intuitivos para que manejes el 100% de tu sistema sin depender de técnicos.",
  },
  {
    title: "Seguridad y escalabilidad",
    text: "Bases de datos seguras y arquitectura cloud preparada para crecer en concurrencia.",
  },
  {
    title: "Asesoramiento comercial",
    text: "Consultoría gratuita para optimizar flujos de venta y escalar conversiones.",
  },
];

const homeGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": absoluteUrl("/#webpage"),
      url: SITE.url,
      name: "Neo Core Sys | Software a Medida, E-commerce e IA en Rosario",
      inLanguage: "es-AR",
      isPartOf: { "@id": absoluteUrl("/#website") },
      about: { "@id": absoluteUrl("/#organization") },
      dateModified: SITE.lastUpdated,
    },
    { "@id": absoluteUrl("/#faq"), ...faqJsonLd(HOME_FAQS) },
    {
      "@type": "ItemList",
      "@id": absoluteUrl("/#casos"),
      name: "Casos de éxito de Neo Core Sys",
      itemListElement: PROJECTS.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.schemaName,
          url: project.url,
          description: project.summary,
          creator: { "@id": absoluteUrl("/#organization") },
        },
      })),
    },
  ],
};

const CLIENTS = PROJECTS.map((project) => project.name);

export default function Home() {
  const [featured, ...others] = PROJECTS;

  return (
    <>
      <JsonLd data={homeGraph} />

      {/* HERO */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className="container">
          <div className={styles.heroGrid}>
            <div>
              <p className="eyebrow">Software house · Rosario, Argentina</p>
              <h1 id="hero-title" className={styles.title}>
                Software a medida, hecho con <em>criterio</em>.
              </h1>
            </div>
            <div className={styles.side}>
              <p className={styles.lead}>
                Plataformas web, e-commerce mayorista y agentes de IA que atienden a tus clientes
                24/7 en menos de un segundo. Código propio, sin comisiones por venta.
              </p>
              <div className={styles.actions}>
                <Link href="/#contacto" className="btn btn--solid">
                  Solicitar consulta
                </Link>
                <Link href="/#casos-de-exito" className="link-u">
                  Ver casos ↓
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUESINA DE CLIENTES */}
      <div className={styles.marquee} aria-label="Proyectos en producción">
        <ul className={styles.track}>
          {[...CLIENTS, ...CLIENTS].map((name, index) => (
            <li key={`${name}-${index}`} aria-hidden={index >= CLIENTS.length ? true : undefined}>
              {name}
              <i aria-hidden="true">✦</i>
            </li>
          ))}
        </ul>
      </div>

      {/* KPIs */}
      <section className={styles.kpis} aria-label="Resultados en producción">
        <div className={`container ${styles.kpiGrid}`}>
          {KPIS.map((kpi) => (
            <div key={kpi.label} className={styles.kpi}>
              <p className={styles.kpiValue}>{kpi.value}</p>
              <p className={styles.kpiLabel}>{kpi.label}</p>
              <p className={styles.kpiSource}>{kpi.source}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 01 — SERVICIOS */}
      <section id="servicios" className={styles.section} aria-labelledby="servicios-title">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow" data-n="01">
              Servicios
            </p>
            <h2 id="servicios-title" className="section-title">
              Lo que <em>construimos</em>
            </h2>
            <p className="section-desc">
              Transformamos necesidades comerciales en aplicaciones web y herramientas avanzadas,
              con el mismo equipo desde la idea hasta producción.
            </p>
          </header>

          <ul className={styles.services}>
            {SERVICES.map((service, index) => (
              <li key={service.title} className={styles.service}>
                <span className={styles.serviceIndex}>{String(index + 1).padStart(2, "0")}</span>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceText}>{service.text}</p>
                <span className={styles.serviceTag}>{service.tag}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SPEED-TO-LEAD */}
      <section className={styles.speedWrap} aria-labelledby="speed-title">
        <div className="container">
          <div className={styles.speed}>
            <div>
              <p className={styles.speedBadge}>La regla de oro de las ventas · Speed-to-lead</p>
              <h2 id="speed-title" className={styles.speedTitle}>
                Hoy el que responde primero <em>se lleva al cliente</em>.
              </h2>
              <p className={styles.speedText}>
                El 78% de las personas le compra a la primera empresa que contesta su consulta. Si
                tu negocio tarda horas en responder WhatsApp o mails, estás regalando clientes a la
                competencia. Creamos CRMs a medida con agentes de IA que responden en menos de 1
                segundo, precalifican al comprador y derivan al vendedor en caliente, o capturan
                sus datos 24/7.
              </p>
              <div className={styles.actions}>
                <Link href="/ecommerce-mayorista" className={styles.onDarkSolid}>
                  E-commerce mayorista con IA
                </Link>
                <Link href="/desarrollo-software-rosario" className={styles.onDarkLink}>
                  Software en Rosario →
                </Link>
              </div>
            </div>

            <div className={styles.compare} role="group" aria-label="Comparación de tiempos de respuesta">
              <div className={styles.compareRow}>
                <p className={styles.compareValue}>4–24 hs</p>
                <div>
                  <p className={styles.compareWho}>Empresas tradicionales</p>
                  <p className={styles.compareNote}>65% de fuga: el cliente compra en otro lado.</p>
                </div>
              </div>
              <div className={`${styles.compareRow} ${styles.compareWin}`}>
                <p className={styles.compareValue}>&lt; 1 s</p>
                <div>
                  <p className={styles.compareWho}>Con Neo Core Sys, 24/7</p>
                  <p className={styles.compareNote}>+390% en tasa de contacto y retención de venta.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — CASOS */}
      <section id="casos-de-exito" className={styles.section} aria-labelledby="casos-title">
        <div className="container">
          <header className={styles.casesHead}>
            <div>
              <p className="eyebrow" data-n="02">
                Casos
              </p>
              <h2 id="casos-title" className="section-title">
                Casos de <em>éxito</em>
              </h2>
              <p className="section-desc">
                Soluciones que diseñamos y pusimos online para negocios reales. Cada una con su
                propio sistema, panel de administración y base de datos.
              </p>
            </div>
            <p className={styles.casesCount}>{PROJECTS.length} proyectos en producción</p>
          </header>

          <div className={styles.casesFeatured}>
            <CaseCard project={featured} featured />
          </div>
          <div className={styles.casesRest}>
            {others.map((project) => (
              <CaseCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* 03 — STACK */}
      <section id="tecnologias" className={styles.section} aria-labelledby="stack-title">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow" data-n="03">
              Stack
            </p>
            <h2 id="stack-title" className="section-title">
              Tecnologías de <em>vanguardia</em>
            </h2>
            <p className="section-desc">
              Elegimos herramientas de alta fidelidad para asegurar el control, el rendimiento y la
              estabilidad de cada línea de código.
            </p>
          </header>

          <ul className={styles.stackGrid}>
            {STACK.map((tech) => (
              <li key={tech.name} className={styles.tech}>
                <h3 className={styles.techName}>{tech.name}</h3>
                <p className={styles.techText}>{tech.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 04 — NOSOTROS */}
      <section id="nosotros" className={styles.section} aria-labelledby="nosotros-title">
        <div className="container">
          <div className={styles.about}>
            <div>
              <p className="eyebrow" data-n="04">
                Nosotros
              </p>
              <h2 id="nosotros-title" className="section-title">
                Filosofía <em>Neo Core Sys</em>
              </h2>
              <p className={styles.aboutText}>
                Somos una fábrica de software con base en Rosario, Santa Fe. Construimos
                infraestructura digital de calidad excepcional con código moderno y tecnologías de
                alto rendimiento.
              </p>
              <p className={styles.aboutText}>
                Creemos que el éxito de un producto digital está en la optimización de sus recursos,
                la facilidad de autogestión para el cliente y un diseño que cautive desde el primer
                impacto.
              </p>
            </div>

            <ol className={styles.principles}>
              {PRINCIPLES.map((principle, index) => (
                <li key={principle.title} className={styles.principle}>
                  <span className={styles.principleIndex} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className={styles.principleTitle}>{principle.title}</h3>
                    <p className={styles.principleText}>{principle.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 05 — FAQ */}
      <FAQ
        id="faq"
        group="faq-home"
        n="05"
        eyebrow="FAQ"
        title={
          <>
            Preguntas <em>frecuentes</em>
          </>
        }
        description="Todo lo que necesitás saber sobre nuestra metodología, la tecnología a medida y los resultados comprobables."
        items={HOME_FAQS}
      />

      {/* 06 — CONTACTO */}
      <section id="contacto" className={styles.section} aria-labelledby="contacto-title">
        <div className="container">
          <div className={styles.contact}>
            <div>
              <p className="eyebrow" data-n="06">
                Contacto
              </p>
              <h2 id="contacto-title" className="section-title">
                Comencemos a <em>trabajar</em>
              </h2>
              <p className="section-desc">
                Contanos qué querés construir y te devolvemos una propuesta a la medida de tu
                proyecto, con una demo funcional sin cargo.
              </p>

              <ul className={styles.channels}>
                <li>
                  <span>WhatsApp</span>
                  <a
                    href={whatsappLink("Hola! Quiero consultar por un desarrollo a medida.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {SITE.phoneDisplay}
                  </a>
                </li>
                <li>
                  <span>Email</span>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </li>
                <li>
                  <span>Ubicación</span>
                  <p>
                    {SITE.locality}, {SITE.region}, Argentina
                  </p>
                </li>
              </ul>
            </div>

            <div className={styles.formPanel}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
