/**
 * Preguntas frecuentes en texto plano. Se usa **negrita** para resaltar.
 * La misma fuente alimenta el HTML visible y el JSON-LD (FAQPage), así el
 * texto que leen Google y los buscadores de IA coincide con lo que ve la gente.
 */
export interface FaqItem {
  q: string;
  a: string;
}

export const HOME_FAQS: FaqItem[] = [
  {
    q: "¿Qué diferencia a Neo Core Sys de usar WordPress, Shopify o Tiendanube?",
    a: "Las plataformas enlatadas cobran comisiones por venta, son lentas en celulares y no permiten lógica de negocio avanzada. En Neo Core Sys desarrollamos sobre **código nativo (Next.js, TypeScript y PostgreSQL)**: velocidad instantánea, **100% de propiedad del sistema**, cero comisiones por transacción y la posibilidad de integrar agentes de IA conectados a tu propia base de datos.",
  },
  {
    q: "¿Cómo funciona un agente de IA que atiende y cierra ventas de forma autónoma?",
    a: "A diferencia de los chatbots de respuestas prearmadas, nuestros agentes **se conectan en tiempo real a tu base de datos de stock y precios**. Entienden lenguaje natural, consultan existencias al instante, asesoran al cliente y pueden generar el pedido final sin intervención humana, como opera en producción en **El Paquetero**.",
  },
  {
    q: "¿Por qué mis clientes van a encontrar mi web en Google y en respuestas de ChatGPT (SEO + GEO)?",
    a: "Combinamos SEO técnico con **GEO (Generative Engine Optimization)**: datos estructurados JSON-LD, archivos llms.txt, HTML semántico y contenido que responde preguntas de forma directa. Así Google, ChatGPT y Perplexity pueden entender y citar tu negocio. Nuestros clientes lograron **68.6% de CTR en Google Search Console** y su primera cita en ChatGPT en 30 días.",
  },
  {
    q: "¿Necesito conocimientos técnicos para administrar mi sistema o cargar productos?",
    a: "No. Cada sistema incluye un panel de administración a medida, simple y veloz, para **actualizar precios, cargar inventario, ver métricas y gestionar clientes** desde cualquier computadora o celular. Además capacitamos sin costo a vos y a tu equipo.",
  },
  {
    q: "¿Cuáles son los tiempos de entrega y cómo trabajamos durante el proyecto?",
    a: "Trabajamos con metodologías ágiles y transparentes. Los sitios institucionales o catálogos digitales suelen entregarse en **2 a 3 semanas**; las plataformas a medida (e-commerce + mini ERP, turnos, portales institucionales) llevan entre **4 y 8 semanas**. Cada semana tenés una demo funcional para probar avances antes del lanzamiento.",
  },
  {
    q: "¿Dónde está Neo Core Sys y a qué empresas atiende?",
    a: "Somos una software house con base en **Rosario, Santa Fe, Argentina**. Trabajamos con empresas, distribuidoras y comercios de toda la Argentina y Latinoamérica, con gestión y soporte 100% cloud y reuniones presenciales en Rosario cuando hacen falta.",
  },
  {
    q: "¿Qué proyectos desarrolló Neo Core Sys?",
    a: "Entre los casos en producción están **Dulce Valentín** y **Rey de Reyes** (e-commerce mayorista de indumentaria), **El Paquetero** (e-commerce + ERP + agente de IA), **Las Manitos de Mili** (turnos online y SEO local), **ATFAR** (gestión gremial de farmacias) y **Cuánto Te Quiero** (e-commerce infantil de alto tráfico).",
  },
];

export const ECOMMERCE_FAQS: FaqItem[] = [
  {
    q: "¿Cómo se manejan las listas de precios diferenciadas por cliente o volumen?",
    a: "El sistema permite configurar **múltiples listas de precios automáticas** (revendedores, distribuidores grandes, compras por bulto cerrado o por curva de talles). Cuando el cliente mayorista inicia sesión con su CUIT o usuario, ve únicamente los precios y descuentos que le corresponden, evitando errores de cotización.",
  },
  {
    q: "¿El bot de IA realmente consulta el stock antes de confirmar un pedido?",
    a: "Sí. Nuestro agente de IA está **conectado en tiempo real a tu base de datos PostgreSQL**. Puede responder consultas como “¿Tenés 50 remeras talle L en color negro?”, verificar el stock físico al instante, reservar los productos y generar el pedido listo para despachar, tal como funciona en **El Paquetero**.",
  },
  {
    q: "¿Por qué un desarrollo propio a medida y no Tiendanube o Shopify?",
    a: "Las plataformas enlatadas cobran comisiones por cada venta, son lentas para catálogos masivos y no permiten lógicas B2B reales (compras por curva, mínimos por bulto cerrado o límites de crédito por cuenta corriente). Con un sistema propio en **Next.js** tenés **cero comisiones por venta**, carga instantánea y la propiedad total de tu software.",
  },
  {
    q: "¿Cómo se conecta el sistema con la logística y facturación de la empresa?",
    a: "Desarrollamos un **mini ERP integrado** que emite remitos y hojas de ruta para el depósito, y que se puede sincronizar con sistemas contables existentes o servicios de logística (transporte de cargas, expresos y despachos a todo el país).",
  },
];

export const ROSARIO_FAQS: FaqItem[] = [
  {
    q: "¿Por qué elegir una software house local en Rosario en vez de una agencia de Buenos Aires o del exterior?",
    a: "La cercanía marca la diferencia: **conocemos el mercado productivo, comercial y logístico de Rosario y la región de Santa Fe**. Podemos reunirnos presencialmente o coordinar llamadas inmediatas sin intermediarios. Además trabajás directamente con los ingenieros que programan tu sistema, con agilidad de respuesta y soporte real.",
  },
  {
    q: "¿Se pueden migrar los datos de nuestros sistemas de escritorio antiguos o planillas de Excel?",
    a: "Sí. En casi todos nuestros proyectos (como **ATFAR** o **El Paquetero**) migramos bases históricas desde Excel, Access o sistemas legados hacia bases relacionales modernas (PostgreSQL), limpiando datos duplicados y cuidando que no se pierda ningún historial contable o de clientes.",
  },
  {
    q: "¿Cómo funciona el CRM con bot de IA para responder consultas comerciales en Rosario?",
    a: "Desarrollamos un **CRM a medida con agentes de IA autónomos** que atienden consultas en menos de 1 segundo, precalifican al interesado y, en horario comercial, lo derivan en caliente a tu vendedor. Fuera de hora capturan nombre, WhatsApp y horario preferido para llamarlo a primera hora.",
  },
  {
    q: "¿Cuáles son los tiempos promedio de desarrollo y entrega?",
    a: "Trabajamos con metodología ágil: ciclos de **2 a 4 semanas** para módulos iniciales y **4 a 8 semanas** para plataformas completas. Cada semana tenés una demo funcional online para probar el avance antes de salir a producción.",
  },
];

/** Quita el marcado **negrita** para usarlo como texto plano (JSON-LD, meta). */
export const stripMarkup = (text: string) => text.replace(/\*\*/g, "");

export const faqJsonLd = (items: FaqItem[]) => ({
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: stripMarkup(item.a) },
  })),
});
