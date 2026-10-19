/**
 * Landings de intención del sitio. Alimenta el footer, el sitemap y los
 * enlaces cruzados entre landings, para que ninguna página quede huérfana.
 */
export interface Solution {
  href: string;
  /** Texto corto para menús y footer. */
  label: string;
  /** Una línea que explica para quién es. */
  text: string;
}

export const SOLUTIONS: Solution[] = [
  {
    href: "/desarrollo-software-rosario",
    label: "Desarrollo de software en Rosario",
    text: "Software a medida, sistemas de gestión cloud y CRM con IA para empresas de Rosario.",
  },
  {
    href: "/empresa-de-software-santa-fe",
    label: "Empresa de software en Santa Fe",
    text: "Sistemas a medida para empresas de Santa Fe capital, Rafaela, Reconquista y toda la provincia.",
  },
  {
    href: "/desarrollo-aplicaciones-rosario",
    label: "Desarrollo de aplicaciones web y apps",
    text: "Aplicaciones web, apps móviles Android/iOS y sitios web profesionales hechos en Rosario.",
  },
  {
    href: "/ecommerce-mayorista",
    label: "E-commerce mayorista B2B",
    text: "Venta mayorista online con listas de precios por cliente, mini ERP y bot de IA.",
  },
];

/** Casos en producción que se citan en las landings locales. */
export const REGION_CASES = {
  paquetero: {
    pill: "Rosario · mayorista e IA",
    name: "El Paquetero Mayorista",
    text: "E-commerce mayorista textil con mini ERP y bot de IA autónomo conectado a PostgreSQL. El sistema ya concreta ventas de forma 100% automatizada y fue indexado en las recomendaciones de ChatGPT en 30 días.",
    url: "https://www.elpaquetero.com.ar/",
    cta: "Ver elpaquetero.com.ar ↗",
  },
  dulceValentin: {
    pill: "Rosario · e-commerce B2B",
    name: "Dulce Valentín y Rey de Reyes",
    text: "Tiendas mayoristas de indumentaria y calzado con catálogo, carrito, seguimiento de pedidos, niveles de cliente y descuentos escalonados para revendedores de todo el país.",
    url: "https://dulcevalentin.com.ar/",
    cta: "Ver dulcevalentin.com.ar ↗",
  },
  atfar: {
    pill: "Santa Fe · institucional y DDJJ",
    name: "ATFAR",
    text: "Plataforma de la asociación que nuclea a las farmacias del norte de Santa Fe. Integra declaraciones juradas mensuales (DDJJ) para empleadores, padrón de afiliados, almanaque de pagos y bolsa de trabajo.",
    url: "https://www.atfar.com.ar/",
    cta: "Ver atfar.com.ar ↗",
  },
  manitos: {
    pill: "Rosario · turnos y SEO local",
    name: "Las Manitos de Mili",
    text: "Aplicación web de turnos online y posicionamiento SEO local en Rosario que alcanzó 68.6% de CTR en Google Search Console y posición media top 2 en búsquedas orgánicas.",
    url: "https://lasmanitosdemili.com.ar/",
    cta: "Ver lasmanitosdemili.com.ar ↗",
  },
} as const;
