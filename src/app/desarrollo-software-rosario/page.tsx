"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import styles from "./page.module.css";

interface FAQItem {
  q: string;
  a: React.ReactNode;
}

export default function DesarrolloSoftwareRosarioPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      q: "¿Por qué elegir una software house local en Rosario en vez de una agencia de Buenos Aires o el exterior?",
      a: (
        <>
          La cercanía marca la diferencia: <strong>conocemos el mercado productivo, comercial y logístico de Rosario y la región de Santa Fe</strong>. Podemos reunirnos presencialmente o coordinar llamadas inmediatas sin intermediarios técnicos. Además, trabajás directamente con los ingenieros que programan tu sistema, asegurando agilidad de respuesta y soporte real.
        </>
      ),
    },
    {
      q: "¿Se pueden migrar los datos de nuestros sistemas de escritorio antiguos o planillas de Excel?",
      a: (
        <>
          Totalmente. En casi todos nuestros proyectos (como en el caso de <strong>ATFAR</strong> o <strong>El Paquetero</strong>) migramos bases de datos históricas desde Excel, Access o sistemas legados hacia bases de datos modernas relacionales (PostgreSQL), limpiando datos duplicados y asegurando que no se pierda ningún historial contable o de clientes.
        </>
      ),
    },
    {
      q: "¿Cómo funciona el CRM con Bot de IA para responder consultas comerciales en Rosario?",
      a: (
        <>
          El 78% de las empresas pierden ventas porque tardan horas o días en contestar WhatsApp o formularios. Desarrollamos un <strong>CRM a medida con agentes de IA autónomos</strong> que atienden consultas en menos de 1 segundo, precalifican al interesado y, si es horario comercial, se lo pasan al vendedor en caliente. Si es fuera de hora, capturan su Nombre, WhatsApp y horario preferido para llamarlo a primera hora.
        </>
      ),
    },
    {
      q: "¿Cuáles son los tiempos promedio de desarrollo y entrega?",
      a: (
        <>
          Trabajamos con metodología ágil en ciclos de 2 a 4 semanas para módulos iniciales y entre 4 a 8 semanas para plataformas completas. Cada semana tenés una demo funcional online para probar el avance antes de la salida a producción.
        </>
      ),
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Neo Core Sys - Desarrollo de Software en Rosario",
      "description": "Software House boutique especializada en desarrollo de software a medida, sistemas cloud, automatización con IA y plataformas de alta velocidad para empresas de Rosario y Santa Fe.",
      "url": "https://neo-core-sys.com.ar/desarrollo-software-rosario",
      "telephone": "+5493417981212",
      "email": "neocoresystem@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Rosario",
        "addressRegion": "Santa Fe",
        "addressCountry": "AR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-32.94682",
        "longitude": "-60.63932"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": typeof faq.a === "string" ? faq.a : "Ver información detallada en Neo Core Sys."
        }
      }))
    }
  ];

  return (
    <div className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}></div>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              📍 SOFTWARE HOUSE EN ROSARIO & SANTA FE
            </div>
            <h1 className={styles.title}>
              Desarrollo de <span className={styles.titleGradient}>Software a Medida</span> y Sistemas Web en Rosario.
            </h1>
            <p className={styles.subtitle}>
              Modernizamos la infraestructura digital de tu empresa. Desarrollamos sistemas en la nube, plataformas comerciales y CRM con atención inmediata por IA para que nunca más pierdas una venta por demoras en contestar.
            </p>
            <div className={styles.heroActions}>
              <a
                href="https://wa.me/5493417981212?text=Hola!%20Estoy%20en%20Rosario%20y%20quiero%20cotizar%20un%20software%20a%20medida."
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                Solicitar consulta sin cargo
              </a>
              <a href="#casos-rosario" className={styles.btnSecondary}>
                Ver casos reales en Santa Fe
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className={styles.section} style={{ background: "rgba(0,0,0,0.2)" }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSubtitle}>La realidad empresarial</span>
            <h2 className={styles.sectionTitle}>¿Por qué las empresas siguen atrapadas en sistemas viejos?</h2>
            <p className={styles.sectionDesc}>
              El software obsoleto frena el crecimiento, genera cuellos de botella y ahuyenta a los clientes que esperan respuestas instantáneas.
            </p>
          </div>

          <div className={styles.painGrid}>
            <div className={styles.painCard}>
              <div className={styles.painIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              </div>
              <h3 className={styles.painTitle}>Sistemas de escritorio de hace 20 años</h3>
              <p className={styles.painText}>
                Programas instalados en una sola máquina que no se pueden ver desde el celular ni desde afuera de la oficina, obligando a los directores a estar atados físicamente.
              </p>
            </div>

            <div className={styles.painCard}>
              <div className={styles.painIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <h3 className={styles.painTitle}>Fuga de clientes por demoras en responder</h3>
              <p className={styles.painText}>
                En un mercado competitivo, el que responde primero se lleva la venta. Si tu empresa tarda 6 u 8 horas en cotizar por WhatsApp, el cliente ya le compró a otro.
              </p>
            </div>

            <div className={styles.painCard}>
              <div className={styles.painIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <h3 className={styles.painTitle}>Planillas de Excel que nadie entiende</h3>
              <p className={styles.painText}>
                Archivos compartidos desincronizados, fórmulas que se rompen, datos borrados accidentalmente y falta total de métricas de rendimiento en tiempo real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSubtitle}>Nuestra propuesta</span>
            <h2 className={styles.sectionTitle}>Ingeniería de Software Moderna para Empresas</h2>
            <p className={styles.sectionDesc}>
              Construimos herramientas que resuelven los problemas específicos de tu operación con tecnología de primer nivel mundial.
            </p>
          </div>

          <div className={styles.advGrid}>
            <div className={styles.advCard}>
              <div className={styles.advIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
              </div>
              <h3 className={styles.advTitle}>100% en la Nube</h3>
              <p className={styles.advText}>
                Accedé a tus paneles administrativos, métricas y pedidos desde cualquier computadora, tablet o celular en cualquier lugar del mundo.
              </p>
            </div>

            <div className={styles.advCard}>
              <div className={styles.advIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </div>
              <h3 className={styles.advTitle}>Respuesta Inmediata con IA</h3>
              <p className={styles.advText}>
                Agentes que atienden y retienen clientes las 24 horas, consultan stock en la base de datos y derivan de inmediato con tus vendedores comerciales.
              </p>
            </div>

            <div className={styles.advCard}>
              <div className={styles.advIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </div>
              <h3 className={styles.advTitle}>Next.js & PostgreSQL</h3>
              <p className={styles.advText}>
                Código limpio, sin plantillas lentas ni dependencias frágiles. Carga instantánea, alta concurrencia y máxima seguridad en tus datos.
              </p>
            </div>

            <div className={styles.advCard}>
              <div className={styles.advIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3 className={styles.advTitle}>Soporte Directo y Local</h3>
              <p className={styles.advText}>
                Tratás directamente con los desarrolladores del sistema. Sin intermediarios, sin tickets infinitos y con capacitación presencial o virtual en Rosario.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CASES IN ROSARIO & SANTA FE */}
      <section id="casos-rosario" className={styles.section} style={{ background: "rgba(0,0,0,0.3)" }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSubtitle}>Trayectoria comprobada</span>
            <h2 className={styles.sectionTitle}>Empresas que confían en nosotros en la región</h2>
            <p className={styles.sectionDesc}>
              Soluciones reales en producción con métricas validadas por clientes de Santa Fe.
            </p>
          </div>

          <div className={styles.casesRow}>
            <div className={styles.caseItem}>
              <span className={styles.casePill} style={{ background: "rgba(16, 185, 129, 0.12)", color: "#34d399", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
                Rosario • Mayorista & IA
              </span>
              <h3 className={styles.caseItemTitle}>El Paquetero Mayorista</h3>
              <p className={styles.caseItemText}>
                E-commerce mayorista textil con Mini ERP y bot de IA autónomo conectado a PostgreSQL. El sistema ya concreta ventas de forma 100% automatizada y fue indexado en las recomendaciones de ChatGPT en 30 días.
              </p>
              <a href="https://www.elpaquetero.com.ar/" target="_blank" rel="noopener noreferrer" className={styles.caseLink}>
                Ver elpaquetero.com.ar ↗
              </a>
            </div>

            <div className={styles.caseItem}>
              <span className={styles.casePill} style={{ background: "rgba(6, 182, 212, 0.12)", color: "var(--accent-cyan)", border: "1px solid rgba(6, 182, 212, 0.3)" }}>
                Santa Fe • Institucional & DDJJ
              </span>
              <h3 className={styles.caseItemTitle}>ATFAR Gremial</h3>
              <p className={styles.caseItemText}>
                Plataforma de gestión sindical que nuclea a todas las farmacias del norte de la provincia de Santa Fe. Integra sistema de declaraciones juradas mensuales (DDJJ) para empleadores, padrón masivo y bolsa de trabajo.
              </p>
              <a href="https://www.atfar.com.ar/" target="_blank" rel="noopener noreferrer" className={styles.caseLink}>
                Ver atfar.com.ar ↗
              </a>
            </div>

            <div className={styles.caseItem}>
              <span className={styles.casePill} style={{ background: "rgba(168, 85, 247, 0.12)", color: "#c084fc", border: "1px solid rgba(168, 85, 247, 0.3)" }}>
                Rosario • SEO Local Récord
              </span>
              <h3 className={styles.caseItemTitle}>Las Manitos de Mili</h3>
              <p className={styles.caseItemText}>
                Sistema de turnos online y estrategia de posicionamiento SEO local en Rosario que alcanzó una tasa récord de 68.6% de CTR en Google Search Console y posición media top 2 en búsquedas orgánicas.
              </p>
              <a href="https://lasmanitosdemili.com.ar/" target="_blank" rel="noopener noreferrer" className={styles.caseLink}>
                Ver caso de estudio ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSubtitle}>Preguntas frecuentes</span>
            <h2 className={styles.sectionTitle}>Dudas sobre desarrollo de software en Rosario</h2>
            <p className={styles.sectionDesc}>
              Información clara sobre nuestra metodología de trabajo y contratación en la zona.
            </p>
          </div>

          <div className={styles.faqContainer}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}
                >
                  <button
                    type="button"
                    className={styles.faqHeader}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <div className={`${styles.faqIcon} ${isOpen ? styles.faqIconRotated : ""}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                  </button>
                  {isOpen && <div className={styles.faqAnswer}>{faq.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={styles.ctaBanner}>
            <h2 className={styles.ctaTitle}>Hablemos de tu próximo sistema</h2>
            <p className={styles.ctaDesc}>
              Contanos sobre los procesos que querés automatizar y coordinamos una reunión para evaluar la solución ideal para tu empresa.
            </p>
            <div className={styles.heroActions}>
              <a
                href="https://wa.me/5493417981212?text=Hola!%20Quiero%20coordinar%20una%20reunion%20sobre%20desarrollo%20de%20software%20en%20Rosario."
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                Escribir por WhatsApp directo
              </a>
              <a href="/#contacto" className={styles.btnSecondary}>
                Completar formulario web
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
