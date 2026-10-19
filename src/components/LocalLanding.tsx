import Link from "next/link";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import { type FaqItem, faqJsonLd } from "@/lib/faqs";
import { SOLUTIONS } from "@/lib/solutions";
import { SITE, absoluteUrl, whatsappLink } from "@/lib/site";
import shared from "./Landing.module.css";

interface Card {
  title: string;
  text: string;
}

interface CaseItem {
  pill: string;
  name: string;
  text: string;
  url: string;
  cta: string;
}

interface Place {
  "@type": "City" | "AdministrativeArea" | "Country";
  name: string;
}

export interface LocalLandingProps {
  /** Ruta de la página, ej. "/desarrollo-software-rosario". */
  path: string;
  /** Nombre de la página para WebPage y breadcrumb. */
  name: string;
  breadcrumb: string;
  service: {
    name: string;
    serviceType: string;
    description: string;
    areaServed: Place[];
  };
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  whatsappHero: string;
  whatsappCta: string;
  pains: { eyebrow: string; title: React.ReactNode; description: string; items: Card[] };
  advantages: { eyebrow: string; title: React.ReactNode; description: string; items: Card[] };
  cases: { title: React.ReactNode; description: string; items: CaseItem[] };
  faq: { title: React.ReactNode; description: string; items: FaqItem[] };
  cta: { title: React.ReactNode; text: string };
}

/**
 * Plantilla de las landings locales/de servicio. Mismo HTML semántico y el
 * mismo grafo JSON-LD (WebPage + Breadcrumb + Service + FAQPage) en todas,
 * referenciando la organización global por @id.
 */
export default function LocalLanding(props: LocalLandingProps) {
  const pageUrl = absoluteUrl(props.path);
  const related = SOLUTIONS.filter((s) => s.href !== props.path);

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: props.name,
        inLanguage: "es-AR",
        isPartOf: { "@id": absoluteUrl("/#website") },
        about: { "@id": `${pageUrl}#service` },
        dateModified: SITE.lastUpdated,
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE.url },
          { "@type": "ListItem", position: 2, name: props.breadcrumb, item: pageUrl },
        ],
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        ...props.service,
        url: pageUrl,
        provider: { "@id": absoluteUrl("/#organization") },
      },
      { "@id": `${pageUrl}#faq`, ...faqJsonLd(props.faq.items) },
    ],
  };

  return (
    <>
      <JsonLd data={graph} />

      <section className={shared.hero} aria-labelledby="titulo">
        <div className="container">
          <div className={shared.heroInner}>
            <p className="eyebrow">{props.eyebrow}</p>
            <h1 id="titulo" className={shared.title}>
              {props.title}
            </h1>
            <p className={shared.lead}>{props.lead}</p>
            <div className={shared.actions}>
              <a
                href={whatsappLink(props.whatsappHero)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--solid"
              >
                Consulta sin cargo
              </a>
              <Link href="#casos" className="link-u">
                Ver casos reales ↓
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={shared.section} aria-labelledby="realidad-title">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow" data-n="01">
              {props.pains.eyebrow}
            </p>
            <h2 id="realidad-title" className="section-title">
              {props.pains.title}
            </h2>
            <p className="section-desc">{props.pains.description}</p>
          </header>

          <ul className={shared.grid}>
            {props.pains.items.map((pain) => (
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
              {props.advantages.eyebrow}
            </p>
            <h2 id="propuesta-title" className="section-title">
              {props.advantages.title}
            </h2>
            <p className="section-desc">{props.advantages.description}</p>
          </header>

          <ul className={shared.grid}>
            {props.advantages.items.map((item) => (
              <li key={item.title} className={shared.card}>
                <span className={shared.cardTag}>Incluido</span>
                <h3 className={shared.cardTitle}>{item.title}</h3>
                <p className={shared.cardText}>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="casos" className={shared.section} aria-labelledby="casos-title">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow" data-n="03">
              Trayectoria comprobada
            </p>
            <h2 id="casos-title" className="section-title">
              {props.cases.title}
            </h2>
            <p className="section-desc">{props.cases.description}</p>
          </header>

          <div className={shared.cases}>
            {props.cases.items.map((item) => (
              <article key={item.name} className={shared.caseItem}>
                <p className={shared.casePill}>{item.pill}</p>
                <h3 className={shared.caseName}>{item.name}</h3>
                <p className={shared.caseText}>{item.text}</p>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className={shared.caseLink}>
                  {item.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQ
        group="faq-landing"
        n="04"
        eyebrow="Preguntas frecuentes"
        title={props.faq.title}
        description={props.faq.description}
        items={props.faq.items}
      />

      <section className={shared.section} aria-labelledby="soluciones-title">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow" data-n="05">
              Otras soluciones
            </p>
            <h2 id="soluciones-title" className="section-title">
              También <em>desarrollamos</em>
            </h2>
          </header>
          <nav className={shared.related} aria-label="Otras soluciones">
            {related.map((s) => (
              <Link key={s.href} href={s.href} className={shared.relatedLink}>
                <span className={shared.relatedTitle}>{s.label} →</span>
                <span className={shared.relatedText}>{s.text}</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className={shared.section} aria-labelledby="cta-title">
        <div className="container">
          <div className={shared.cta}>
            <h2 id="cta-title" className={shared.ctaTitle}>
              {props.cta.title}
            </h2>
            <p className={shared.ctaText}>{props.cta.text}</p>
            <div className={shared.actions}>
              <a
                href={whatsappLink(props.whatsappCta)}
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
