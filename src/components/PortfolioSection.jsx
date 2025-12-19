import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCode, FaClock, FaArrowRight, FaCheck } from 'react-icons/fa';

function PortfolioCard({ title, target, desc, benefits, stack, time, link, color, image }) {
    const isExternal = link.startsWith("http");

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="glass-panel rounded-3xl overflow-hidden flex flex-col h-full border border-white/5 hover:border-white/20 transition-colors"
        >
            {image ? (
                <div className="h-48 w-full overflow-hidden relative group">
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10`} />
                    <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
            ) : (
                <div className={`h-2 w-full bg-gradient-to-r ${color}`} />
            )}

            <div className="p-5 md:p-6 flex flex-col flex-grow relative z-20">
                <h3 className="text-lg md:text-xl font-bold mb-2">{title}</h3>
                <p className="text-xs md:text-xs text-purple-400 font-semibold mb-3 uppercase tracking-wide">{target}</p>
                <p className="text-gray-400 mb-4 text-sm md:text-sm leading-relaxed">{desc}</p>

                <div className="space-y-2 mb-6 flex-grow">
                    {benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2">
                            <FaCheck className="text-green-400 mt-1 flex-shrink-0 text-sm md:text-xs" />
                            <span className="text-gray-300 text-sm md:text-xs">{benefit}</span>
                        </div>
                    ))}
                </div>

                <div className="border-t border-white/10 pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm md:text-xs">
                        <FaCode className="text-blue-400" /> {stack}
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm md:text-xs">
                        <FaClock className="text-yellow-400" /> {time}
                    </div>
                </div>

                {isExternal ? (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-6 w-full py-3 md:py-2 rounded-xl font-bold text-sm text-center bg-gradient-to-r ${color} hover:opacity-90 transition-opacity block`}
                    >
                        Ver en Store
                    </a>
                ) : (
                    <Link
                        href={link}
                        className={`mt-6 w-full py-3 md:py-2 rounded-xl font-bold text-sm text-center bg-gradient-to-r ${color} hover:opacity-90 transition-opacity block`}
                    >
                        Ver Demo
                    </Link>
                )}
            </div>
        </motion.div>
    );
}

export default function PortfolioSection() {
    return (
        <>
            {/* MOBILE APPS SHOWCASE */}
            <section id="mobile-apps" className="py-24 px-6 w-full max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-16 text-center"
                >
                    Apps <span className="text-blue-500">Mobile</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
                    <PortfolioCard
                        title="Step Up App"
                        target="Fitness, Salud"
                        desc="App completa para rutinas de gym, nutrición y comunidad."
                        benefits={[
                            "Rutinas personalizadas",
                            "Pagos (MP/PayPal)",
                            "Comunidad activa",
                            "Nutrición"
                        ]}
                        stack="Mobile App (Android)"
                        time="Ya Terminado"
                        link="https://play.google.com/store/apps/details?id=com.jpborello.stepupapp"
                        color="from-blue-600 to-cyan-500"
                        image="https://play-lh.googleusercontent.com/5g5SsTG2LQ2JBBbTzeQuv8ngWUX4jzPMQLVXdvWDHNs7kNzNLePb_8w2e2vOtBL3j0neguQIHH31Ke2fTCSlH1I=w480-h960-rw"
                    />
                </div>
            </section>

            {/* WEB MODELS / PORTFOLIO */}
            <section id="portfolio" className="py-24 px-6 w-full max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-16 text-center"
                >
                    Nuestros <span className="text-purple-500">Modelos Web</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    <PortfolioCard
                        title="Distribuidora B2B (System)"
                        target="Mayoristas, Logística"
                        desc="Sistema integral de pedidos con roles (Cliente/Vendedor/Admin), control de stock real, rutas con IA y métricas avanzadas."
                        benefits={[
                            "Roles Interactivos",
                            "Stock Real Automático",
                            "Optimización Rutas IA",
                            "Sugerencia Precios"
                        ]}
                        stack="React + AI + LocalStorage"
                        time="15 a 20 días"
                        link="/demo-distribuidora"
                        color="from-blue-600 to-indigo-600"
                        image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
                    />
                    <PortfolioCard
                        title="Portfolio Framer Style"
                        target="Freelancers, Creativos"
                        desc="Diseño minimalista y premium con animaciones suaves y estética high-end."
                        benefits={[
                            "Diseño Minimalista",
                            "Animaciones Framer",
                            "100% Editable",
                            "Estética Premium"
                        ]}
                        stack="React + Framer Motion"
                        time="3 a 5 días"
                        link="/web-framer"
                        color="from-gray-900 to-gray-600"
                        image="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80"
                    />
                    <PortfolioCard
                        title="MiliNails (Glam)"
                        target="Estética, Belleza"
                        desc="Diseño Premium con sistema de reservas y galería."
                        benefits={[
                            "Estética de Lujo",
                            "Reserva de Turnos",
                            "Galería Interactiva",
                            "Contacto Directo"
                        ]}
                        stack="React + Framer Motion"
                        time="5 a 7 días"
                        link="/milinails"
                        color="from-fuchsia-600 to-pink-500"
                        image="https://images.unsplash.com/photo-1604654894610-df49ff550cca?auto=format&fit=crop&w=800&q=80"
                    />

                    <PortfolioCard
                        title="Sistema de Turnos Premium"
                        target="Gestión, SaaS"
                        desc="Plataforma completa para gestión de reservas y clientes."
                        benefits={[
                            "Dashboard Analítico",
                            "Calendario Interactivo",
                            "Gestión de Clientes",
                            "Configuración Total"
                        ]}
                        stack="React + Context + Motion"
                        time="10 a 15 días"
                        link="/demo-turnos/login"
                        color="from-violet-600 to-indigo-600"
                        image="https://images.unsplash.com/photo-1506784919141-935049915272?auto=format&fit=crop&w=800&q=80"
                    />

                    <PortfolioCard
                        title="Dashboard Profesional"
                        target="Negocios, Analytics"
                        desc="Panel de control con métricas avanzadas y reportes."
                        benefits={[
                            "Gráficos Interactivos",
                            "Análisis de Ingresos",
                            "Mapas de Calor",
                            "Reportes en Tiempo Real"
                        ]}
                        stack="React + Recharts"
                        time="12 a 18 días"
                        link="/demo-metrics/overview"
                        color="from-cyan-500 to-blue-600"
                        image="https://images.unsplash.com/photo-1551288049-bbbda5366392?auto=format&fit=crop&w=800&q=80"
                    />

                    <PortfolioCard
                        title="Sistema de Turnos Mobile-First"
                        target="Estética, Salud"
                        desc="Sistema de turnos mobile-first con interfaz tipo app."
                        benefits={[
                            "Diseño App Nativa",
                            "Calendario Táctil",
                            "Animaciones Suaves",
                            "Panel para Profesionales"
                        ]}
                        stack="React + Framer Motion"
                        time="10 a 15 días"
                        link="/demo-turnos-mobile"
                        color="from-fuchsia-500 to-purple-600"
                        image="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
                    />

                    <PortfolioCard
                        title="TurnoPredict – IA"
                        target="Clínicas, Alta Demanda"
                        desc="Sistema inteligente que predice demanda y optimiza la agenda."
                        benefits={[
                            "Predicción de Demanda (IA)",
                            "Dashboard de Analytics",
                            "Sugiere Horarios Óptimos",
                            "Interfaz Dual (Cliente/Admin)"
                        ]}
                        stack="React + Recharts + AI Logic"
                        time="15 a 20 días"
                        link="/demo-turnopredict"
                        color="from-pink-500 to-rose-600"
                        image="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"
                    />

                    <PortfolioCard
                        title="NeoGym AI Manager"
                        target="Gimnasios, SaaS"
                        desc="Dashboard de gestión con IA para predicción de abandono y revenue."
                        benefits={[
                            "Predicción de Churn (IA)",
                            "Smart Insights Automáticos",
                            "Proyección de Ingresos",
                            "Gestión de Usuarios & Cuotas"
                        ]}
                        stack="React + AI Engine + Recharts"
                        time="20 a 25 días"
                        link="/gimnasio-ai-demo"
                        color="from-emerald-500 to-cyan-600"
                        image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
                    />

                    <PortfolioCard
                        title="Landing Page Premium"
                        target="Startups, Lanzamientos"
                        desc="Diseño de alto impacto visual enfocado en la conversión."
                        benefits={[
                            "Animaciones fluidas",
                            "Estructura de ventas",
                            "Diseño 'Wow' factor"
                        ]}
                        stack="React + Motion"
                        time="3 a 5 días"
                        link="/demo-landing"
                        color="from-pink-500 to-purple-600"
                        image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                    />

                    <PortfolioCard
                        title="Web Corporativa"
                        target="Consultoras, PyMEs"
                        desc="Sitio web profesional que transmite confianza y solidez."
                        benefits={[
                            "Diseño limpio",
                            "Secciones de Servicios",
                            "Optimización SEO"
                        ]}
                        stack="React + SEO"
                        time="5 a 7 días"
                        link="/demo-corporate"
                        color="from-blue-500 to-cyan-600"
                        image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                    />

                    <PortfolioCard
                        title="Restaurantes / Bares"
                        target="Gastronomía"
                        desc="Experiencia visual inmersiva que despierta el apetito."
                        benefits={[
                            "Galería de fotos",
                            "Menú digital",
                            "Reservas/WhatsApp"
                        ]}
                        stack="React + Motion"
                        time="4 a 6 días"
                        link="/demo-restaurant"
                        color="from-amber-500 to-orange-600"
                        image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                    />

                    <PortfolioCard
                        title="Tienda Online"
                        target="Retail, Marcas"
                        desc="Plataforma de ventas completa con carrito y pagos."
                        benefits={[
                            "Carrito de compras",
                            "Pasarela de pagos",
                            "Panel de control"
                        ]}
                        stack="React + Stripe"
                        time="7 a 10 días"
                        link="/ecommerce"
                        color="from-green-500 to-emerald-600"
                        image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
                    />

                    <PortfolioCard
                        title="PetShop Dropshipping"
                        target="Mascotas, E-commerce"
                        desc="Tienda online completa para productos de mascotas con sistema de carrito y checkout."
                        benefits={[
                            "Catálogo de Productos",
                            "Carrito Funcional",
                            "Checkout Multi-paso",
                            "Diseño Pet-Friendly"
                        ]}
                        stack="React + Context API"
                        time="8 a 12 días"
                        link="/demo-petshop"
                        color="from-amber-500 to-orange-500"
                        image="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80"
                    />

                    <PortfolioCard
                        title="SalonHub - Gestión de Peluquería"
                        target="Salones, Estética"
                        desc="Sistema completo de gestión con turnos online, login de clientes y dashboard administrativo."
                        benefits={[
                            "Turnos Online 24/7",
                            "Login/Registro Clientes",
                            "Dashboard Admin",
                            "Gestión de Servicios"
                        ]}
                        stack="React + LocalStorage + Auth"
                        time="10 a 15 días"
                        link="/demo-peluqueria"
                        color="from-yellow-500 to-yellow-600"
                        image="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"
                    />

                    <PortfolioCard
                        title="Suria Lencería"
                        target="Indumentaria, E-commerce"
                        desc="Tienda mayorista de lencería con catálogo dinámico, sistema de carrito y pedido directo por WhatsApp."
                        benefits={[
                            "Catálogo Mayorista",
                            "Filtros por Categoría",
                            "Carrito de Pedidos",
                            "Diseño Minimalista"
                        ]}
                        stack="React + Context API"
                        time="8 a 12 días"
                        link="/suria"
                        color="from-rose-500 to-red-600"
                        image="https://images.unsplash.com/photo-1582232093198-d4481c0add12?auto=format&fit=crop&w=800&q=80"
                    />

                    <PortfolioCard
                        title="HG Motos"
                        target="Concesionaria, Motos"
                        desc="Showroom digital de motos con galería interactiva, financiación online y contacto directo."
                        benefits={[
                            "Galería de Alta Calidad",
                            "Información de Financiación",
                            "Contacto WhatsApp",
                            "Optimizado para Móvil"
                        ]}
                        stack="React + Framer Motion"
                        time="8 a 12 días"
                        link="/motos"
                        color="from-blue-600 to-blue-800"
                        image="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80"
                    />

                    <PortfolioCard
                        title="Ginex Motors"
                        target="Concesionaria, Motos"
                        desc="Concesionaria de motos premium con estética dark y acentos rojos. Catálogo de motos nuevas y usadas con filtros avanzados."
                        benefits={[
                            "Diseño Dark + Red Neon",
                            "Catálogo 0KM y Usadas",
                            "Filtros por Categoría",
                            "WhatsApp Integrado"
                        ]}
                        stack="React + Framer Motion"
                        time="8 a 12 días"
                        link="/ginex-motors"
                        color="from-black to-red-600"
                        image="https://images.unsplash.com/photo-1614165933833-97a9860b715e?auto=format&fit=crop&w=800&q=80"
                    />
                </div>
            </section>
        </>
    );
}
