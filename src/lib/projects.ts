export interface Readout {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  name: string;
  url: string;
  /** Dominio visible en la tarjeta. */
  host: string;
  /** Rubro corto, se muestra como etiqueta. */
  kind: string;
  summary: string;
  readouts: Readout[];
  tags: string[];
  /** Nombre largo para datos estructurados (ItemList / schema.org). */
  schemaName: string;
  /** Colores de la vista previa ilustrativa de la tarjeta (no es una captura). */
  look: { bar: string; block: string };
}

export const PROJECTS: Project[] = [
  {
    id: "dulce-valentin",
    name: "Dulce Valentín",
    url: "https://dulcevalentin.com.ar/",
    host: "dulcevalentin.com.ar",
    kind: "E-commerce mayorista B2B",
    summary:
      "Tienda mayorista de indumentaria, calzado, lencería y bebés para revendedoras y comercios de todo el país. Catálogo con búsqueda por categorías, carrito, pedidos con seguimiento y un Club Mayorista con sorteos por compra.",
    readouts: [
      { value: "B2B", label: "venta mayorista" },
      { value: "$50.000", label: "compra mínima web" },
    ],
    tags: ["Next.js", "E-commerce", "Carrito", "Seguimiento de pedidos", "Mercado Pago"],
    schemaName: "Dulce Valentín - E-Commerce Mayorista de Indumentaria y Calzado",
    look: { bar: "#e8a5b8", block: "#f0d5dc" },
  },
  {
    id: "rey-de-reyes",
    name: "Rey de Reyes",
    url: "https://reydreyes.ar/",
    host: "reydreyes.ar",
    kind: "Importadora mayorista",
    summary:
      "Tienda online de una importadora directa de indumentaria en Rosario. Catálogo por género, carrito, rastreo de pedidos y niveles de cliente (Bronce, Plata, Oro y Platinum) con descuentos escalonados según las compras acumuladas.",
    readouts: [
      { value: "4", label: "niveles de cliente" },
      { value: "B2B", label: "importación directa" },
    ],
    tags: ["Next.js", "E-commerce", "Niveles de cliente", "Rastreo de pedidos", "WhatsApp"],
    schemaName: "Rey de Reyes - Tienda Mayorista con Niveles de Cliente",
    look: { bar: "#c8502d", block: "#e9d3c6" },
  },
  {
    id: "el-paquetero",
    name: "El Paquetero",
    url: "https://www.elpaquetero.com.ar/",
    host: "elpaquetero.com.ar",
    kind: "E-commerce + ERP + IA",
    summary:
      "Plataforma integral de venta mayorista textil con e-commerce, mini ERP logístico y CRM. Un agente de IA autónomo conectado a PostgreSQL consulta stock en tiempo real y ya cerró ventas completas sin intervención humana.",
    readouts: [
      { value: "30 días", label: "hasta la cita en ChatGPT" },
      { value: "100%", label: "ventas autónomas del bot" },
    ],
    tags: ["Next.js", "AI Agent", "Mini ERP", "CRM", "PostgreSQL", "GEO"],
    schemaName: "El Paquetero - E-Commerce + ERP con Bot IA Autónomo y GEO",
    look: { bar: "#f97316", block: "#f6dcc4" },
  },
  {
    id: "manitos-de-mili",
    name: "Las Manitos de Mili",
    url: "https://lasmanitosdemili.com.ar/",
    host: "lasmanitosdemili.com.ar",
    kind: "Turnos online + SEO local",
    summary:
      "Sistema web de turnos online y gestión para un estudio de manicuría en Rosario. Arquitectura SEO local con microformatos que alcanzó posición media top 2 en búsquedas locales.",
    readouts: [
      { value: "68.6%", label: "CTR en Search Console" },
      { value: "2.1", label: "posición media en Google" },
    ],
    tags: ["Next.js", "SEO local", "Turnos online", "WhatsApp API"],
    schemaName: "Las Manitos de Mili - Turnos Online y SEO Local con 68.6% CTR",
    look: { bar: "#9a6fb0", block: "#e6dcee" },
  },
  {
    id: "atfar",
    name: "ATFAR Gremial",
    url: "https://www.atfar.com.ar/",
    host: "atfar.com.ar",
    kind: "Gestión sindical",
    summary:
      "Portal institucional y administrativo de las farmacias del norte de Santa Fe. Declaraciones juradas mensuales para empleadores, padrón masivo de afiliados, bolsa de empleo y mapa de geolocalización.",
    readouts: [
      { value: "DDJJ", label: "declaraciones online" },
      { value: "Padrón", label: "masivo de afiliados" },
    ],
    tags: ["Next.js", "React", "Padrón", "Bolsa de empleo", "Mapas"],
    schemaName: "ATFAR - Sistema de Gestión Gremial de Farmacias",
    look: { bar: "#2f6f8f", block: "#d6e3ea" },
  },
  {
    id: "cuanto-te-quiero",
    name: "Cuánto Te Quiero",
    url: "https://cuanto-te-quiero.vercel.app/",
    host: "cuanto-te-quiero.vercel.app",
    kind: "E-commerce B2C",
    summary:
      "E-commerce de blanquería e indumentaria infantil pensado para alto tráfico: catálogo reactivo, carrito optimizado y un panel de administración para gestionar stock y pedidos.",
    readouts: [
      { value: "B2C", label: "tienda online" },
      { value: "Admin", label: "stock y pedidos" },
    ],
    tags: ["Next.js", "TypeScript", "E-commerce", "Panel admin"],
    schemaName: "Cuánto Te Quiero - E-Commerce Infantil de Alto Tráfico",
    look: { bar: "#d9a032", block: "#f5e6c4" },
  },
];
