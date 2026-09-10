"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";

interface FAQItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
}

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const faqs: FAQItem[] = [
    {
      id: "faq-1",
      question: "¿Qué diferencia a Neo Core Sys de usar WordPress, Shopify o Tiendanube?",
      answer: (
        <>
          Las plataformas enlatadas cobran comisiones por venta, son lentas en celulares y no permiten lógica de negocio avanzada. En <strong>Neo Core Sys desarrollamos sobre código nativo de alto rendimiento (Next.js, TypeScript y PostgreSQL)</strong>. 
          Esto garantiza velocidad instantánea (Core Web Vitals impecables), 100% de propiedad del sistema, cero costos o comisiones por transacción y la capacidad de integrar cualquier automatización o agente de Inteligencia Artificial conectado a tu propia base de datos.
        </>
      ),
    },
    {
      id: "faq-2",
      question: "¿Cómo funciona un agente de IA que atiende y cierra ventas de forma autónoma?",
      answer: (
        <>
          A diferencia de los chatbots tradicionales que solo dan respuestas prearmadas, nuestros agentes inteligentes <strong>se conectan en tiempo real a tu base de datos de stock y precios</strong>. 
          El bot entiende lenguaje natural, consulta existencias al instante, asesora al cliente según sus necesidades de compra y puede generar el pedido final y cerrar la venta sin intervención humana, tal como opera en producción en <strong>El Paquetero</strong>.
        </>
      ),
    },
    {
      id: "faq-3",
      question: "¿Por qué mis clientes encontrarán mi web en Google y en respuestas de ChatGPT (SEO + GEO)?",
      answer: (
        <>
          Hoy en día el SEO tradicional no es suficiente. En Neo Core Sys implementamos <strong>GEO (Generative Engine Optimization)</strong> y datos semánticos estructurados (JSON-LD, llms.txt y microformatos). 
          Esto permite que tanto los algoritmos de Google como los crawlers de OpenAI (ChatGPT) y Perplexity reconozcan a tu empresa como una fuente de máxima autoridad en tu sector. Gracias a esto, nuestros clientes logran <strong>métricas récord como 68.6% de CTR en Google Search Console</strong> y menciones automáticas en recomendaciones de ChatGPT en solo un mes de estar online.
        </>
      ),
    },
    {
      id: "faq-4",
      question: "¿Necesito conocimientos técnicos para administrar mi sistema o cargar productos?",
      answer: (
        <>
          Absolutamente no. Diseñamos cada panel administrativo pensando en la simplicidad: interfaces limpias y veloces donde podés <strong>actualizar precios, cargar inventario, ver métricas de facturación y gestionar clientes</strong> desde cualquier computadora o teléfono móvil en segundos. Además, te capacitamos sin costo a vos y a tu equipo.
        </>
      ),
    },
    {
      id: "faq-5",
      question: "¿Cuáles son los tiempos de entrega y cómo trabajamos durante el proyecto?",
      answer: (
        <>
          Trabajamos mediante metodologías ágiles y transparentes. Desarrollos institucionales o catálogos digitales suelen entregarse en <strong>2 a 3 semanas</strong>, mientras que plataformas a medida (E-commerce + Mini ERP, sistemas de turnos o portales institucionales masivos) llevan entre <strong>4 y 8 semanas</strong>. Cada semana tenés una demo funcional para probar avances antes del lanzamiento.
        </>
      ),
    },
  ];

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className={styles.faqSection}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <span className="sectionSubtitle" style={{
            fontSize: "0.85rem",
            textTransform: "uppercase",
            letterSpacing: "3px",
            background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 700,
            marginBottom: "12px",
            display: "inline-block"
          }}>
            Despejá tus dudas
          </span>
          <h2 style={{
            fontFamily: "var(--font-title)",
            fontSize: "2.75rem",
            fontWeight: 800,
            letterSpacing: "-0.5px",
            marginBottom: "16px",
            background: "linear-gradient(180deg, #ffffff 40%, rgba(255, 255, 255, 0.6))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Preguntas Frecuentes
          </h2>
          <p style={{
            color: "var(--text-secondary)",
            fontSize: "1.05rem",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.6
          }}>
            Todo lo que necesitás saber sobre nuestra metodología, tecnología a medida y resultados comprobables.
          </p>
        </div>

        <div className={styles.faqContainer}>
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}
              >
                <button
                  type="button"
                  className={styles.faqHeader}
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.faqQuestion}>{faq.question}</span>
                  <div
                    className={`${styles.faqIconWrapper} ${
                      isOpen ? styles.faqIconRotated : ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </button>

                <div
                  className={`${styles.faqBody} ${
                    isOpen ? styles.faqBodyOpen : ""
                  }`}
                >
                  <div className={styles.faqContent}>
                    <div className={styles.faqAnswer}>{faq.answer}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
