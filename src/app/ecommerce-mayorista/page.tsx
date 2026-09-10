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

export default function EcommerceMayoristaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      q: "¿Cómo se manejan las listas de precios diferenciadas por cliente o volumen?",
      a: (
        <>
          El sistema permite configurar <strong>múltiples listas de precios automáticas</strong> (por ejemplo: revendedores, distribuidores grandes, compras por bulto cerrado o por curva de talles). Cuando el cliente mayorista inicia sesión con su CUIT o usuario, ve únicamente los precios y descuentos que le corresponden, evitando errores de cotización.
        </>
      ),
    },
    {
      q: "¿El bot de IA realmente consulta el stock antes de confirmar un pedido?",
      a: (
        <>
          Sí. A diferencia de un bot genérico de respuestas predefinidas, nuestro agente de IA está <strong>conectado en tiempo real a tu base de datos PostgreSQL</strong>. Puede responder consultas complejas como <em>"¿Tenés 50 remeras talle L en color negro?"</em>, verificar el stock físico al instante, reservar los productos y generar el pedido listo para despachar, tal como funciona en <strong>El Paquetero</strong>.
        </>
      ),
    },
    {
      q: "¿Por qué un desarrollo propio a medida y no Tiendanube o Shopify?",
      a: (
        <>
          Las plataformas enlatadas cobran comisiones por cada venta, son lentas para catálogos masivos y no permiten lógicas B2B reales (como compras por curva, mínimos por bulto cerrado o límites de crédito por cuenta corriente). Con un sistema propio desarrollado en <strong>Next.js</strong>, tenés <strong>cero comisiones recurrentes por venta</strong>, velocidad de carga instantánea y la propiedad total de tu software.
        </>
      ),
    },
    {
      q: "¿Cómo se conecta el sistema con la logística y facturación de la empresa?",
      a: (
        <>
          Desarrollamos el sistema con un <strong>Mini ERP integrado</strong> que emite remitos, hojas de ruta para el depósito y se puede sincronizar con sistemas contables existentes o servicios de logística (transporte de cargas, expresos y despachos a todo el país).
        </>
      ),
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "E-Commerce Mayorista B2B & Mini ERP Neo Core Sys",
      "operatingSystem": "Web / Cloud",
      "applicationCategory": "BusinessApplication",
      "description": "Plataforma integral de venta mayorista B2B con catálogo reactivo, control de inventario en tiempo real y agente de IA autónomo para atención y cierre de ventas 24/7.",
      "url": "https://neo-core-sys.com.ar/ecommerce-mayorista",
      "provider": {
        "@type": "ProfessionalService",
        "name": "Neo Core Sys",
        "url": "https://neo-core-sys.com.ar"
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
          "text": typeof faq.a === "string" ? faq.a : "Ver detalles en la plataforma oficial de Neo Core Sys."
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
              ⚡ E-COMMERCE B2B • MINI ERP • AGENTE IA 24/7
            </div>
            <h1 className={styles.title}>
              Dejá de perder pedidos por demoras en WhatsApp. Tu <span className={styles.titleGradient}>E-Commerce Mayorista</span> que vende solo.
            </h1>
            <p className={styles.subtitle}>
              Diseñamos plataformas mayoristas a medida para fábricas y distribuidores. Catálogo en tiempo real, listas de precios por CUIT y un bot de IA conectado a tu base de datos que atiende consultas de stock y concreta pedidos 24/7.
            </p>
            <div className={styles.heroActions}>
              <a
                href="https://wa.me/5493417981212?text=Hola!%20Quiero%20cotizar%20un%20E-Commerce%20Mayorista%20con%20bot%20de%20IA."
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                Cotizar mi plataforma mayorista
              </a>
              <a href="#caso-real" className={styles.btnSecondary}>
                Ver caso de éxito en producción
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS SECTION */}
      <section className={styles.section} style={{ background: "rgba(0,0,0,0.2)" }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSubtitle}>El dolor del mercado</span>
            <h2 className={styles.sectionTitle}>¿Por qué las distribuidoras pierden el 40% de sus ventas?</h2>
            <p className={styles.sectionDesc}>
              Hoy el comprador mayorista no tiene paciencia. Consulta a tres proveedores a la vez y le compra al primero que le responde con stock y precio.
            </p>
          </div>

          <div className={styles.painGrid}>
            <div className={styles.painCard}>
              <div className={styles.painIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <h3 className={styles.painTitle}>Demoras infinitas por WhatsApp</h3>
              <p className={styles.painText}>
                Tus vendedores colapsan respondiendo una por una preguntas como "¿Tenés stock de esto?", demoran horas en cotizar y el cliente termina comprándole a tu competidor.
              </p>
            </div>

            <div className={styles.painCard}>
              <div className={styles.painIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              </div>
              <h3 className={styles.painTitle}>Listas de precios en PDF obsoletas</h3>
              <p className={styles.painText}>
                Mandar un catálogo o PDF de 50 páginas es engorroso. Con la inflación argentina, quedan desactualizados en días y generan desacuerdos de precios con los clientes.
              </p>
            </div>

            <div className={styles.painCard}>
              <div className={styles.painIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              </div>
              <h3 className={styles.painTitle}>Descontrol de stock y pedidos duplicados</h3>
              <p className={styles.painText}>
                Sin un sistema centralizado en tiempo real, dos vendedores pueden comprometer la misma mercadería física, generando cancelaciones y clientes enojados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION FEATURES */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSubtitle}>La solución definitiva</span>
            <h2 className={styles.sectionTitle}>Arquitectura Diseñada para la Venta Mayorista Real</h2>
            <p className={styles.sectionDesc}>
              Construimos un ecosistema digital que automatiza la operativa desde que el cliente busca un producto hasta que sale el remito del depósito.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h3 className={styles.featureTitle}>Precios por CUIT y Volumen</h3>
              <p className={styles.featureText}>
                Configurá listas diferenciadas (Revendedor, Distribuidor, Mayorista directo), escalas por cantidad y mínimos de compra obligatorios por bulto o curva.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
              </div>
              <h3 className={styles.featureTitle}>Mini ERP de Stock y Despacho</h3>
              <p className={styles.featureText}>
                Control en tiempo real de unidades físicas, alertas de quiebre de stock, gestión de pedidos pendientes y emisión automática de remitos para el depósito.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="4"/></svg>
              </div>
              <h3 className={styles.featureTitle}>Bot de IA Autónomo</h3>
              <p className={styles.featureText}>
                Agente inteligente conectado directo a la base de datos PostgreSQL. Atiende clientes en la web y WhatsApp, verifica existencias en segundos y cierra ventas sin operador humano.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <h3 className={styles.featureTitle}>Cero Comisiones por Venta</h3>
              <p className={styles.featureText}>
                El código y la base de datos son 100% de tu empresa. No pagás porcentajes sobre tus ventas ni mensualidades abusivas a plataformas de terceros.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY SPOTLIGHT: EL PAQUETERO */}
      <section id="caso-real" className={styles.section} style={{ background: "rgba(0,0,0,0.3)" }}>
        <div className="container">
          <div className={styles.caseSpotlight}>
            <div>
              <div className={styles.caseBadge}>
                ✓ CASO DE ESTUDIO EN PRODUCCIÓN
              </div>
              <h2 className={styles.caseTitle}>
                El Paquetero Mayorista Textil
              </h2>
              <p className={styles.caseDesc}>
                Diseñamos e implementamos el sistema integral de venta mayorista para <strong>El Paquetero</strong> (Rosario, Santa Fe). Integramos catálogo reactivo, mini ERP logístico y un <strong>bot de IA autónomo</strong> conectado a PostgreSQL. El sistema ya cierra ventas de forma 100% automatizada y logró ser recomendado directamente en ChatGPT en solo un mes de estar en producción.
              </p>
              <a
                href="https://www.elpaquetero.com.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
                style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 10px 25px -5px rgba(16,185,129,0.4)" }}
              >
                Visitar elpaquetero.com.ar ↗
              </a>
            </div>

            <div className={styles.caseStats}>
              <div>
                <div className={styles.statNumber}>100%</div>
                <div className={styles.statLabel}>Ventas cerradas en automático por Bot IA</div>
              </div>
              <div>
                <div className={styles.statNumber}>30 días</div>
                <div className={styles.statLabel}>Para ser citado en respuestas de ChatGPT (GEO)</div>
              </div>
              <div>
                <div className={styles.statNumber}>0 ms</div>
                <div className={styles.statLabel}>Demora en cotizar stock a clientes mayoristas</div>
              </div>
              <div>
                <div className={styles.statNumber}>0%</div>
                <div className={styles.statLabel}>Comisión por venta a plataformas externas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSubtitle}>Dudas frecuentes</span>
            <h2 className={styles.sectionTitle}>Preguntas sobre E-Commerce Mayorista</h2>
            <p className={styles.sectionDesc}>
              Respuestas directas a las preguntas que nos hacen los directores y dueños de distribuidoras.
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

      {/* BOTTOM CTA BANNER */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={styles.ctaBanner}>
            <h2 className={styles.ctaTitle}>¿Listo para modernizar las ventas de tu distribuidora?</h2>
            <p className={styles.ctaDesc}>
              Analizamos tu catálogo actual, definimos el flujo mayorista a medida y te preparamos una demo funcional sin cargo.
            </p>
            <div className={styles.heroActions}>
              <a
                href="https://wa.me/5493417981212?text=Hola!%20Quiero%20solicitar%20una%20reunion%20para%20un%20E-Commerce%20Mayorista."
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                Solicitar reunión por WhatsApp
              </a>
              <a href="/#contacto" className={styles.btnSecondary}>
                Enviar formulario de contacto
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
