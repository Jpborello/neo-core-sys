"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import ChatWidget from "@/components/ChatWidget";
import styles from "./page.module.css";

interface MetricBadge {
  text: string;
  color?: "cyan" | "green" | "purple" | "orange";
}

interface Project {
  id: string;
  title: string;
  link: string;
  description: string;
  metrics?: MetricBadge[];
  tags: string[];
  visualStyle: {
    background: string;
    icon: React.ReactNode;
  };
}

interface MarqueeItem {
  name: string;
  category: string;
}

interface TechItem {
  name: string;
  desc: string;
  icon: React.ReactNode;
}

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "web-app",
    message: "",
  });
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Parallax mouse offsets
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Relative coordinates between -1 and 1
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    
    setParallaxOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setParallaxOffset({ x: 0, y: 0 });
  };

  // Card spotlight hover tracking state
  const [spotlights, setSpotlights] = useState<Record<string, { x: number; y: number }>>({});

  const handleCardMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSpotlights((prev) => ({
      ...prev,
      [id]: { x, y },
    }));
  };

  const marqueeItems: MarqueeItem[] = [
    { name: "El Paquetero", category: "E-Commerce + ERP + IA" },
    { name: "Las Manitos de Mili", category: "Turnos & SEO Local (68% CTR)" },
    { name: "ATFAR", category: "Sistema de Gestión Sindical" },
    { name: "CuantoTeQuiero", category: "E-Commerce de Alto Tráfico" },
    { name: "OncoGyn Clinical Hub", category: "Plataforma Médica con IA" },
    { name: "Ferreyra Embutidos", category: "Comercio Mayorista B2B" },
    { name: "Bianco Pastelería", category: "Autogestión Gastronómica QR" },
  ];

  const technologies: TechItem[] = [
    {
      name: "Next.js & React",
      desc: "Estructuras web de nivel enterprise, renderizado híbrido y optimización de velocidad nativa.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
          <g stroke="currentColor">
            <ellipse rx="11" ry="4.2" transform="rotate(0)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      )
    },
    {
      name: "TypeScript",
      desc: "Código robusto y fuertemente tipado para minimizar fallos en entornos productivos críticos.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"></path>
          <path d="M8 10h4"></path>
          <path d="M10 10v6"></path>
          <path d="M16 12a2 2 0 0 1 0 4h-2v-4h2z"></path>
        </svg>
      )
    },
    {
      name: "Inteligencia Artificial",
      desc: "Integración de Modelos de Lenguaje (LLMs) y procesamiento inteligente de datos a flujos de trabajo.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
          <circle cx="12" cy="12" r="4"></circle>
        </svg>
      )
    },
    {
      name: "PostgreSQL & Databases",
      desc: "Estructuración de datos relacionales con alta integridad, queries optimizadas y escalabilidad de lectura.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
        </svg>
      )
    },
    {
      name: "Node.js & APIs",
      desc: "Desarrollo de servicios backend ágiles y microservicios con validaciones estrictas y respuesta ultra rápida.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
      )
    },
    {
      name: "Cloud & Vercel",
      desc: "Implementación en infraestructura cloud serverless para máxima estabilidad ante picos de tráfico.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 22h20L12 2z"></path>
        </svg>
      )
    }
  ];

  const projects: Project[] = [
    {
      id: "elpaquetero",
      title: "El Paquetero Mayorista",
      link: "https://www.elpaquetero.com.ar/",
      description: "Plataforma integral de venta mayorista textil que integra e-commerce, mini ERP logístico y CRM. Cuenta con un agente de IA autónomo conectado directamente a la base de datos PostgreSQL que consulta stock en tiempo real y ya cerró ventas completas sin intervención humana. En solo 30 días fue indexado y recomendado por ChatGPT (GEO).",
      metrics: [
        { text: "🚀 Top ChatGPT en 30 días (GEO)", color: "green" },
        { text: "🤖 Bot IA con ventas 100% autónomas", color: "cyan" },
        { text: "📦 E-Commerce + Mini ERP + CRM", color: "purple" },
      ],
      tags: ["Next.js", "AI Agent (Autonomous)", "Mini ERP", "CRM", "PostgreSQL", "GEO Optimization"],
      visualStyle: {
        background: "linear-gradient(135deg, #18181b 0%, #3b1406 100%)",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#f97316", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}>
            <path d="M16.5 9.4 7.55 4.24a1.48 1.48 0 0 0-1.5 0L3.5 5.7"></path>
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        )
      }
    },
    {
      id: "lasmanitosdemili",
      title: "Las Manitos de Mili",
      link: "https://lasmanitosdemili.com.ar/",
      description: "Sistema web de turnos online y gestión integral para estudio de manicuría en Rosario. Implementa arquitectura SEO local avanzada y microformatos, logrando una tasa récord del 68.6% de CTR en Google Search Console y posición media top 2 indiscutida en búsquedas locales.",
      metrics: [
        { text: "📈 68.6% CTR en Google Search Console", color: "green" },
        { text: "🥇 Posición Media 2.1 en Google", color: "cyan" },
        { text: "📅 Turnos Online & WhatsApp CRM", color: "purple" },
      ],
      tags: ["Next.js", "SEO Local", "Google Search Console", "Turnos Online", "WhatsApp API", "UX/UI"],
      visualStyle: {
        background: "linear-gradient(135deg, #2e1065 0%, #4c0519 100%)",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#f472b6", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
            <path d="m9 16 2 2 4-4"></path>
          </svg>
        )
      }
    },
    {
      id: "atfar",
      title: "ATFAR Gremial",
      link: "https://www.atfar.com.ar/",
      description: "Plataforma institucional y portal administrativo que centraliza el funcionamiento de todas las farmacias del norte de la provincia de Santa Fe. Integra sistema de declaraciones juradas mensuales (DDJJ) para empleadores, padrón masivo de afiliados, bolsa de empleo digital y mapa de geolocalización.",
      metrics: [
        { text: "🏛️ Gremio Farmacéutico Norte de Santa Fe", color: "cyan" },
        { text: "📑 Sistema Masivo de DDJJ y Padrón", color: "purple" },
      ],
      tags: ["Next.js", "React", "Gestión Sindical", "Bolsa de Empleo", "Mapas Interactivos"],
      visualStyle: {
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#10b981", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M12 2v9"></path>
            <path d="M8 5h8"></path>
          </svg>
        )
      }
    },
    {
      id: "cuantotequiero",
      title: "Cuánto Te Quiero",
      link: "https://cuanto-te-quiero.vercel.app/",
      description: "Plataforma e-commerce completa para blanquería e indumentaria infantil. Diseñada para alto rendimiento y tráfico masivo continuo con catálogo reactivo, carrito de compras optimizado y un panel de administración robusto para gestionar stock y pedidos.",
      metrics: [
        { text: "🛍️ Alto Volumen y Visitas Concurrentes", color: "orange" },
        { text: "⚡ Rendimiento y Checkout Veloz", color: "cyan" },
      ],
      tags: ["Next.js", "TypeScript", "E-Commerce", "Admin Dashboard", "CSS Modules"],
      visualStyle: {
        background: "linear-gradient(135deg, #ffd1dc 0%, #add8e6 100%)",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#ffffff", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))" }}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        )
      }
    },
    {
      id: "oncogyn",
      title: "OncoGyn Clinical Hub",
      link: "https://oncogyn-clinical-hub-two.vercel.app/",
      description: "Plataforma digital especializada para oncología médica. Incorpora el seguimiento de historias clínicas, generación de recetas, alertas automatizadas y asistencia virtual con IA para notas de evolución médica.",
      metrics: [
        { text: "🩺 Asistencia Clínica con IA", color: "purple" },
        { text: "🔒 Seguridad de Datos e Historias Médicas", color: "cyan" },
      ],
      tags: ["Next.js", "AI Integration", "Clinical Management", "Security & HIPAA"],
      visualStyle: {
        background: "linear-gradient(135deg, #1e1b4b 0%, #311042 100%)",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#a855f7", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}>
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        )
      }
    },
    {
      id: "bianco",
      title: "Bianco Pastelería",
      link: "https://bianco-omega.vercel.app/",
      description: "Sistema gastronómico interactivo con autogestión por códigos QR individuales en mesa. Permite a los comensales pedir directamente desde sus celulares, llamar al mozo y solicitar la cuenta en tiempo real.",
      metrics: [
        { text: "📱 Pedidos y Cuenta en Mesa por QR", color: "orange" },
      ],
      tags: ["Next.js", "Real-Time DB", "QR System", "Restaurant Dashboard"],
      visualStyle: {
        background: "linear-gradient(135deg, #1c1917 0%, #44403c 100%)",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#d97706", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <rect x="7" y="7" width="3" height="3"></rect>
            <rect x="14" y="7" width="3" height="3"></rect>
            <rect x="7" y="14" width="3" height="3"></rect>
            <path d="M14 14h3v3h-3z"></path>
          </svg>
        )
      }
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: "success", message: data.message });
        setFormData({ name: "", email: "", phone: "", projectType: "web-app", message: "" });
      } else {
        setStatus({ type: "error", message: data.error || "Algo salió mal. Por favor reintenta." });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "Error de red. Por favor, verifica tu conexión." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Neo Core Sys",
      "image": "https://neo-core-sys.com.ar/og-image.png",
      "url": "https://neo-core-sys.com.ar",
      "telephone": "+5493417981212",
      "email": "neocoresystem@gmail.com",
      "priceRange": "$$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Rosario",
        "addressRegion": "Santa Fe",
        "addressCountry": "AR"
      },
      "description": "Software House premium especializada en desarrollo de software a medida, plataformas web escalables, SaaS, e-commerce e inteligencia artificial para empresas.",
      "sameAs": [
        "https://wa.me/5493417981212"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Servicios Tecnológicos",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Desarrollo de Software a Medida y SaaS"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "E-Commerce de Alto Rendimiento y Mini ERP"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Agentes de Inteligencia Artificial y Chatbots Autónomos"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Optimización SEO, GEO (Generative Engine Optimization) y AOE"
            }
          }
        ]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Qué diferencia a Neo Core Sys de usar WordPress, Shopify o Tiendanube?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Desarrollamos sobre código nativo (Next.js, TypeScript y PostgreSQL), lo que garantiza velocidad instantánea (Core Web Vitals impecables), propiedad total del código, cero comisiones por venta y capacidad de integrar bots de IA autónomos conectados a bases de datos."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cómo funciona un agente de IA que atiende y cierra ventas de forma autónoma?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nuestros agentes se conectan en tiempo real a la base de datos de stock y precios. Entienden lenguaje natural, asesoran al cliente según sus necesidades de compra y cierran pedidos de forma 100% autónoma, como en el caso de producción de El Paquetero."
          }
        },
        {
          "@type": "Question",
          "name": "¿Por qué mis clientes encontrarán mi web en Google y en respuestas de ChatGPT (SEO + GEO)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Aplicamos GEO (Generative Engine Optimization) y esquemas JSON-LD semánticos para que tanto Google como ChatGPT y Perplexity indexen tu negocio como una fuente de máxima autoridad. Nuestros clientes han logrado 68.6% de CTR en Google Search Console y recomendaciones directas en ChatGPT en 30 días."
          }
        },
        {
          "@type": "Question",
          "name": "¿Necesito conocimientos técnicos para administrar mi sistema o cargar productos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Cada sistema incluye un panel de administración a medida intuitivo y veloz para actualizar precios, stock y pedidos desde cualquier dispositivo."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Casos de Éxito de Neo Core Sys",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "El Paquetero - E-Commerce + ERP con Bot IA Autónomo y GEO",
          "url": "https://www.elpaquetero.com.ar/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Las Manitos de Mili - Turnos Online y SEO Local con 68.6% CTR",
          "url": "https://lasmanitosdemili.com.ar/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "ATFAR - Sistema de Gestión Gremial de Farmacias",
          "url": "https://www.atfar.com.ar/"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Cuánto Te Quiero - E-Commerce Infantil de Alto Tráfico",
          "url": "https://cuanto-te-quiero.vercel.app/"
        }
      ]
    }
  ];

  return (
    <div className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      {/* 1. HERO SECTION WITH INTERACTIVE MOUSE PARALLAX BINDING */}
      <section 
        id="inicio" 
        className={styles.hero}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* THREE BACKGROUND LAYERS WITH PARALLAX VALUES BINDING */}
        <div 
          className={styles.backgroundWrapper}
          style={{
            "--parallax-x": parallaxOffset.x,
            "--parallax-y": parallaxOffset.y,
          } as React.CSSProperties}
        >
          {/* Layer 1: Tenue Grid Pattern */}
          <div className={styles.gridLayer}></div>
          {/* Layer 3: Radial Focus Mask */}
          <div className={styles.radialFocusLayer}></div>
          {/* Layer 2: Slow Moving Infinite Orbs */}
          <div className={styles.orbsLayer}>
            <div className={styles.orbCyan}></div>
            <div className={styles.orbViolet}></div>
          </div>
        </div>

        <div className="container">
          <div className={styles.heroGrid}>
            
            {/* COLUMNA IZQUIERDA (45% Ancho) */}
            <div className={styles.leftCol}>
              {/* Badge */}
              <div className={`${styles.heroBadge} ${styles.animateHero}`}>
                <span className={styles.heroBadgeDot}></span>
                Disponible para nuevos proyectos
              </div>
              
              {/* H1 Contundente de Dos Líneas */}
              <h1 className={`${styles.heroTitle} ${styles.animateHero}`}>
                Desarrollo de <span className={styles.heroTitleGradient}>Software a Medida</span> para Empresas.
              </h1>
              
              {/* Subtítulo de Dos Líneas */}
              <p className={`${styles.heroSubtitle} ${styles.delaySubtitle}`}>
                Diseñamos y desarrollamos plataformas web, sistemas empresariales, aplicaciones móviles e inteligencia artificial que optimizan procesos, automatizan tareas y ayudan a las empresas a crecer.
              </p>
              
              {/* CTA Buttons */}
              <div className={`${styles.heroActions} ${styles.delayBtn}`}>
                <a href="#contacto" className={styles.btnPrimary}>Solicitar una consulta</a>
                <a href="#casos-de-exito" className={styles.btnSecondary}>Ver casos de éxito</a>
              </div>

            </div>

            {/* COLUMNA DERECHA (55% Ancho - Dashboards Interactivos) */}
            <div className={styles.rightCol}>
              <div className={styles.dashboardContainer}>
                
                {/* CARD 1: OncoGyn Clinical Hub (Medical System) */}
                <div className={`${styles.cardWrapper} ${styles.delayCard1}`}>
                  <div className={`${styles.dbCard} ${styles.dbCardOncoGyn}`}>
                    <div className={styles.cardHeader}>
                      <span className={styles.cardTitle}>OncoGyn Clinical Hub</span>
                      <span className={styles.cardDot} style={{ backgroundColor: "#10b981", boxShadow: "0 0 8px #10b981" }}></span>
                    </div>
                    <div className={styles.cardValue}>84</div>
                    <div className={styles.cardLabel}>Pacientes Activos • Dr. Rossi</div>
                    <div style={{ height: "32px", display: "flex", alignItems: "center", margin: "10px 0" }}>
                      <svg viewBox="0 0 100 30" width="100%" height="30">
                        <path d="M0,15 L25,15 L30,5 L35,25 L40,10 L45,15 L100,15" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className={styles.trendUp} style={{ color: "#a855f7" }}>
                      <span>IA: Dosis de tratamiento validada</span>
                    </div>
                  </div>
                </div>

                {/* CARD 2: El Paquetero (ERP Mayorista + Bot IA) */}
                <div className={`${styles.cardWrapper} ${styles.delayCard2}`}>
                  <div className={`${styles.dbCard} ${styles.dbCardBianco}`}>
                    <div className={styles.cardHeader}>
                      <span className={styles.cardTitle}>El Paquetero ERP</span>
                      <span className={styles.cardDot} style={{ backgroundColor: "#f97316", boxShadow: "0 0 8px #f97316" }}></span>
                    </div>
                    <div className={styles.cardValue}>$85.400</div>
                    <div className={styles.cardLabel}>Venta Cerrada por Bot IA 🤖</div>
                    <div className={styles.trendUp} style={{ color: "#10b981", fontSize: "0.7rem", marginBottom: "6px" }}>
                      <span>✓ Stock validado en PostgreSQL</span>
                    </div>
                    <div style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      background: "rgba(16, 185, 129, 0.1)",
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                      padding: "3px 8px",
                      borderRadius: "6px",
                      fontSize: "0.68rem",
                      color: "#34d399",
                      fontWeight: 600
                    }}>
                      ChatGPT Citation • Top #1
                    </div>
                  </div>
                </div>

                {/* CARD 3: Cuánto Te Quiero (Analytics E-commerce) */}
                <div className={`${styles.cardWrapper} ${styles.delayCard3}`}>
                  <div className={`${styles.dbCard} ${styles.dbCardCuanto}`}>
                    <div className={styles.cardHeader}>
                      <span className={styles.cardTitle}>Cuánto Te Quiero</span>
                      <span className={styles.cardDot} style={{ backgroundColor: "#f43f5e", boxShadow: "0 0 8px #f43f5e" }}></span>
                    </div>
                    <div className={styles.cardValue}>$1.84M</div>
                    <div className={styles.cardLabel}>Ventas Semanales</div>
                    <div className={styles.trendUp}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                      </svg>
                      <span>+24.8% vs mes ant.</span>
                    </div>
                    <div className={styles.miniBars}>
                      <div className={styles.bar} style={{ height: "40%" }}></div>
                      <div className={styles.bar} style={{ height: "65%" }}></div>
                      <div className={styles.bar} style={{ height: "50%" }}></div>
                      <div className={`${styles.bar} ${styles.barActive}`} style={{ height: "90%" }}></div>
                    </div>
                  </div>
                </div>

                {/* CARD 4: ATFAR Gremial (Control Panel) */}
                <div className={`${styles.cardWrapper} ${styles.delayCard4}`}>
                  <div className={`${styles.dbCard} ${styles.dbCardAtfar}`}>
                    <div className={styles.cardHeader}>
                      <span className={styles.cardTitle}>ATFAR Gremial</span>
                      <span className={styles.cardDot} style={{ backgroundColor: "#eab308", boxShadow: "0 0 8px #eab308" }}></span>
                    </div>
                    <div className={styles.cardLabel} style={{ marginBottom: "6px" }}>Buscador de Farmacias</div>
                    <div className={styles.inputSimulation} style={{ marginBottom: "8px" }}>
                      Buscar Farmacia...
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem" }}>
                      <span style={{ color: "var(--text-secondary)" }}>Padrón Activo</span>
                      <span style={{ color: "#ffffff", fontWeight: 700 }}>412 Empleados</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Infinite Marquee Ribbon - Full Width under columns */}
          <div className={`${styles.marqueeContainer} ${styles.delayMarquee}`} style={{ marginTop: "65px" }}>
            <div className={styles.marqueeTrack}>
              {marqueeItems.map((item, idx) => (
                <React.Fragment key={`orig-${idx}`}>
                  <div className={styles.marqueeItem}>
                    <span className={styles.marqueeName}>{item.name}</span>
                    <span className={styles.marqueeCategory}>{item.category}</span>
                  </div>
                  <span className={styles.marqueeDot}></span>
                </React.Fragment>
              ))}
              {/* Duplicated set for seamless loop wrapping */}
              {marqueeItems.map((item, idx) => (
                <React.Fragment key={`dup-${idx}`}>
                  <div className={styles.marqueeItem}>
                    <span className={styles.marqueeName}>{item.name}</span>
                    <span className={styles.marqueeCategory}>{item.category}</span>
                  </div>
                  <span className={styles.marqueeDot}></span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section id="servicios" className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSubtitle}>Lo que hacemos</span>
            <h2 className={styles.sectionTitle}>Servicios Profesionales</h2>
            <p className={styles.sectionDesc}>
              Transformamos necesidades comerciales en aplicaciones web y herramientas avanzadas.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            <div className={`glass-card ${styles.serviceCard}`}>
              <div className={styles.serviceIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Sistemas a Medida</h3>
              <p className={styles.serviceText}>
                Desarrollo completo de plataformas SaaS, paneles de control administrativos y flujos integrados con lógica de negocio personalizada.
              </p>
            </div>

            <div className={`glass-card ${styles.serviceCard}`}>
              <div className={styles.serviceIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>E-Commerce Premium</h3>
              <p className={styles.serviceText}>
                Plataformas de venta al público y canales mayoristas B2B con gestión automatizada de stocks, pasarelas de pago y logística integrada.
              </p>
            </div>

            <div className={`glass-card ${styles.serviceCard}`}>
              <div className={styles.serviceIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Integración de APIs e IA</h3>
              <p className={styles.serviceText}>
                Asistentes digitales inteligentes integrados, automatización de procesos mediante flujos con IA, bots y sincronización con servicios cloud.
              </p>
            </div>

            <div className={`glass-card ${styles.serviceCard}`}>
              <div className={styles.serviceIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Capacitación y Soporte</h3>
              <p className={styles.serviceText}>
                Entrenamiento a equipos de trabajo sobre el uso de los sistemas, asesoría gratuita comercial para potenciar ventas e implementación cloud.
              </p>
            </div>
          </div>

          {/* SPEED-TO-LEAD BANNER */}
          <div className={styles.speedBanner}>
            <div>
              <div className={styles.speedBadge}>
                ⚡ REGLA DE ORO DE LAS VENTAS • SPEED-TO-LEAD
              </div>
              <h3 className={styles.speedTitle}>
                Hoy el que responde primero <span className={styles.speedTitleHighlight}>se lleva el cliente</span>.
              </h3>
              <p className={styles.speedDesc}>
                El 78% de las personas le compra a la primera empresa que contesta su consulta. Si tu negocio tarda horas o días en responder WhatsApp o mails, estás regalando clientes a la competencia. En Neo Core Sys creamos CRMs a medida con agentes de IA autónomos que responden en menos de 1 segundo, precalifican al comprador y derivan al vendedor en caliente o capturan sus datos 24/7.
              </p>
              <div className={styles.speedLinks}>
                <a href="/ecommerce-mayorista" className={`${styles.speedLinkBtn} ${styles.speedLinkPrimary}`}>
                  E-Commerce Mayorista con Bot IA →
                </a>
                <a href="/desarrollo-software-rosario" className={`${styles.speedLinkBtn} ${styles.speedLinkSecondary}`}>
                  Sistemas para Empresas en Rosario →
                </a>
              </div>
            </div>

            <div className={styles.speedComparison}>
              <div className={styles.compRow}>
                <span className={`${styles.compLabel} ${styles.compLabelRed}`}>Empresas Tradicionales</span>
                <span className={styles.compValue}>⏱️ 4 a 24 hs de demora en responder</span>
                <span style={{ fontSize: "0.78rem", color: "#f87171" }}>❌ 65% de fuga de clientes que compran en otro lado</span>
              </div>
              <div style={{ height: "1px", background: "rgba(255,255,255,0.08)" }}></div>
              <div className={styles.compRow}>
                <span className={`${styles.compLabel} ${styles.compLabelGreen}`}>Con Neo Core Sys</span>
                <span className={styles.compValue}>⚡ Menos de 1 segundo de respuesta 24/7</span>
                <span style={{ fontSize: "0.78rem", color: "#34d399" }}>✓ +390% en tasa de contacto y retención de venta</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PORTFOLIO SECTION (Casos de éxito) */}
      <section id="casos-de-exito" className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSubtitle}>Experiencia real</span>
            <h2 className={styles.sectionTitle}>Casos de éxito</h2>
            <p className={styles.sectionDesc}>
              Conocé las soluciones que diseñamos y pusimos en producción para nuestros clientes.
            </p>
          </div>

          <div className={styles.portfolioGrid}>
            {projects.map((project) => (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                key={project.id}
                className={`glowing-border-card ${styles.portfolioCard}`}
                onMouseMove={(e) => handleCardMouseMove(e, project.id)}
                style={{
                  "--mouse-x": `${spotlights[project.id]?.x || 0}px`,
                  "--mouse-y": `${spotlights[project.id]?.y || 0}px`,
                } as React.CSSProperties}
              >
                <div className={styles.portfolioVisual} style={{ background: project.visualStyle.background }}>
                  <div className={styles.visualPattern}></div>
                  <div className={styles.visualWrapper}>
                    {project.visualStyle.icon}
                  </div>
                  <span className={styles.visualText} style={{ color: "rgba(255,255,255,0.15)", position: "absolute", bottom: "10px", right: "20px" }}>
                    NEO CORE SYS
                  </span>
                </div>
                
                <div className={styles.portfolioInfo}>
                  <div className={styles.portfolioHeader}>
                    <h3 className={styles.portfolioTitle}>{project.title}</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.portfolioLinkIcon}>
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                  
                  {project.metrics && project.metrics.length > 0 && (
                    <div className={styles.metricsContainer}>
                      {project.metrics.map((m, idx) => {
                        const colorClass = 
                          m.color === "green" ? styles.metricPillGreen :
                          m.color === "purple" ? styles.metricPillPurple :
                          m.color === "orange" ? styles.metricPillOrange : "";
                        return (
                          <span key={idx} className={`${styles.metricPill} ${colorClass}`}>
                            {m.text}
                          </span>
                        );
                      })}
                    </div>
                  )}
                  
                  <p className={styles.portfolioText}>{project.description}</p>
                  
                  <div className={styles.tagContainer}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TECHNOLOGIES SECTION */}
      <section id="tecnologias" className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSubtitle}>Nuestro stack</span>
            <h2 className={styles.sectionTitle}>Tecnologías de Vanguardia</h2>
            <p className={styles.sectionDesc}>
              Elegimos herramientas de alta fidelidad para asegurar el control, rendimiento y estabilidad de cada línea de código.
            </p>
          </div>

          <div className={styles.techGrid}>
            {technologies.map((tech) => (
              <div key={tech.name} className={`glass-card ${styles.techCard}`}>
                <div className={styles.techIconWrapper}>
                  {tech.icon}
                </div>
                <h3 className={styles.techTitle}>{tech.name}</h3>
                <p className={styles.techDesc}>{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ABOUT US SECTION (Nosotros) */}
      <section id="nosotros" className={styles.section}>
        <div className="container">
          <div className={styles.aboutContent}>
            <div className={styles.aboutTextContainer}>
              <span className={styles.sectionSubtitle} style={{ alignSelf: "flex-start" }}>Quiénes somos</span>
              <h2 className={styles.aboutTitle}>Filosofía Neo Core Sys</h2>
              <p className={styles.aboutDesc}>
                Somos una fábrica de software con base en Rosario, Santa Fe. Nos enfocamos en construir infraestructura digital de calidad excepcional, utilizando código moderno y tecnologías de alto rendimiento.
              </p>
              <p className={styles.aboutDesc}>
                Creemos que el éxito de un producto digital radica en la optimización de sus recursos, la facilidad de autogestión para el cliente y un diseño que logre cautivar desde el primer impacto.
              </p>
            </div>

            <div className={styles.featureGrid}>
              <div className={styles.featureItem}>
                <h3 className={styles.featureTitle}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                  Velocidad Extrema
                </h3>
                <p className={styles.featureText}>
                  Minimizamos dependencias y optimizamos código para Core Web Vitals impecables y carga instantánea.
                </p>
              </div>

              <div className={styles.featureItem}>
                <h3 className={styles.featureTitle}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="9" y1="3" x2="9" y2="21"></line>
                    <line x1="15" y1="3" x2="15" y2="21"></line>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="3" y1="15" x2="21" y2="15"></line>
                  </svg>
                  Autogestionable
                </h3>
                <p className={styles.featureText}>
                  Entregamos paneles de control intuitivos que permiten al cliente manejar el 100% de su sistema sin depender de técnicos.
                </p>
              </div>

              <div className={styles.featureItem}>
                <h3 className={styles.featureTitle}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  Seguridad y Escalabilidad
                </h3>
                <p className={styles.featureText}>
                  Estructuramos bases de datos seguras y arquitecturas en la nube preparadas para crecer en concurrencia.
                </p>
              </div>

              <div className={styles.featureItem}>
                <h3 className={styles.featureTitle}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 8v4l3 3"></path>
                  </svg>
                  Asesoramiento Comercial
                </h3>
                <p className={styles.featureText}>
                  Brindamos consultoría gratuita de negocios para optimizar flujos de venta y escalar conversiones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <FAQ />

      {/* 7. CONTACT SECTION */}
      <section id="contacto" className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSubtitle}>¿Tenés una idea?</span>
            <h2 className={styles.sectionTitle}>Comencemos a Trabajar</h2>
            <p className={styles.sectionDesc}>
              Ponete en contacto con nosotros para recibir una propuesta a la medida de tu proyecto.
            </p>
          </div>

          <div className={`glass-card ${styles.contactContainer}`}>
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="name">Nombre / Empresa</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Tu nombre completo o de tu negocio"
                  className={styles.input}
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="ejemplo@correo.com"
                  className={styles.input}
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="phone">Teléfono / WhatsApp (Opcional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+54 9 341 123-4567"
                  className={styles.input}
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="projectType">Tipo de Proyecto</label>
                <select
                  id="projectType"
                  name="projectType"
                  className={styles.input}
                  value={formData.projectType}
                  onChange={handleInputChange}
                  style={{ color: "#ffffff", background: "rgba(9, 9, 11, 0.95)" }}
                >
                  <option value="web-app">Plataforma Web / SaaS</option>
                  <option value="e-commerce">E-Commerce / Tienda Mayorista</option>
                  <option value="integracion-ia">Automatización o Integración IA</option>
                  <option value="consultoria">Consultoría IT o Capacitación</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="message">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Contanos un poco sobre tu idea o necesidad..."
                  className={styles.textarea}
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>

              {status.type && (
                <div className={`${styles.messageStatus} ${status.type === "success" ? styles.messageSuccess : styles.messageError}`}>
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`${styles.btnPrimary} ${styles.sendBtn}`}
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
