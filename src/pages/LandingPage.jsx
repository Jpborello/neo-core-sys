import { motion } from "framer-motion";
import { FaArrowRight, FaCheck, FaClock, FaCode, FaDollarSign, FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { RiSmartphoneLine, RiLayoutGridLine, RiGlobalLine, RiLightbulbLine, RiShieldCheckLine, RiRocketLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="flex flex-col items-center overflow-hidden">
            {/* HERO */}
            <main className="relative z-10 flex flex-col items-center justify-center text-center py-20 px-6 min-h-[80vh] w-full">
                {/* Animated Background Blobs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                        rotate: [0, 90, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-[500px] h-[500px] bg-purple-600/30 blur-[120px] -top-20 -left-20 -z-10 rounded-full"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                        x: [0, -50, 0]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute w-[600px] h-[600px] bg-blue-600/20 blur-[120px] bottom-0 right-0 -z-10 rounded-full"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute w-[400px] h-[400px] bg-teal-500/20 blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 rounded-full"
                />

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6"
                >
                    <span className="text-gradient">Neo-Core-Sys</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="mt-4 text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed"
                >
                    Transformamos ideas en experiencias digitales de alto impacto.
                    <br />
                    <span className="text-gray-400 text-lg">Apps Mobile • Sistemas Web • Soluciones a Medida</span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="mt-12 flex flex-col sm:flex-row gap-4"
                >
                    <a
                        href="#portfolio"
                        className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                        Ver Portfolio <FaArrowRight />
                    </a>
                    <a
                        href="#contact"
                        className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors backdrop-blur-sm"
                    >
                        Contáctanos
                    </a>
                </motion.div>
            </main>

            {/* MOBILE APPS SHOWCASE */}
            <section id="mobile-apps" className="py-24 px-6 w-full max-w-7xl">
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
            <section id="portfolio" className="py-24 px-6 w-full max-w-7xl">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-16 text-center"
                >
                    Nuestros <span className="text-purple-500">Modelos Web</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    />
                </div>
            </section>

            {/* SERVICES */}
            <section id="services" className="py-24 px-6 w-full max-w-7xl">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-16 text-center"
                >
                    Otros <span className="text-blue-500">Servicios</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ServiceCard
                        icon={<RiSmartphoneLine className="text-5xl text-purple-400" />}
                        title="Apps Mobile"
                        text="Desarrollo nativo y multiplataforma para iOS y Android con las últimas tecnologías."
                    />
                    <ServiceCard
                        icon={<RiLayoutGridLine className="text-5xl text-blue-400" />}
                        title="Sistemas Web"
                        text="Plataformas robustas, dashboards administrativos y sistemas de gestión complejos."
                    />
                    <ServiceCard
                        icon={<RiGlobalLine className="text-5xl text-teal-400" />}
                        title="E-commerce"
                        text="Tiendas online completas con pasarelas de pago y gestión de inventario."
                    />
                </div>
            </section>

            {/* WHY US */}
            <section className="py-24 px-6 w-full bg-white/5 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-16 text-center"
                    >
                        ¿Por qué <span className="text-blue-500">Elegirnos?</span>
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <WhyCard
                            icon={<RiLightbulbLine className="text-4xl text-yellow-400" />}
                            title="Innovación"
                            text="Siempre a la vanguardia de las tendencias tecnológicas y de diseño."
                        />
                        <WhyCard
                            icon={<RiShieldCheckLine className="text-4xl text-green-400" />}
                            title="Seguridad"
                            text="Arquitecturas seguras y escalables para proteger tu negocio."
                        />
                        <WhyCard
                            icon={<RiRocketLine className="text-4xl text-red-400" />}
                            title="Velocidad"
                            text="Optimización de rendimiento para tiempos de carga instantáneos."
                        />
                    </div>
                </div>
            </section>

            {/* CONTACT */}
            <section id="contact" className="py-24 px-6 w-full max-w-4xl">
                <div className="glass-panel p-10 rounded-3xl">
                    <h2 className="text-4xl font-bold mb-8 text-center">Hablemos de tu Proyecto</h2>
                    <p className="text-center text-gray-400 mb-10">¿Tenés una idea disruptiva? Hagámosla realidad.</p>

                    <div className="flex justify-center gap-8 mb-10">
                        <a href="https://www.instagram.com/juamp11/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-gray-400 hover:text-fuchsia-500 transition-colors group">
                            <div className="p-4 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                                <FaInstagram className="text-2xl" />
                            </div>
                            <span className="text-sm">Instagram</span>
                        </a>
                        <a href="https://wa.me/543417981212" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-gray-400 hover:text-green-500 transition-colors group">
                            <div className="p-4 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                                <FaWhatsapp className="text-2xl" />
                            </div>
                            <span className="text-sm">WhatsApp</span>
                        </a>
                        <a href="mailto:jpborello25@gmail.com" className="flex flex-col items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors group">
                            <div className="p-4 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                                <FaEnvelope className="text-2xl" />
                            </div>
                            <span className="text-sm">Email</span>
                        </a>
                    </div>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="text" placeholder="Nombre" className="w-full p-4 bg-black/30 border border-white/10 rounded-xl focus:border-purple-500 outline-none transition-colors" />
                            <input type="email" placeholder="Email" className="w-full p-4 bg-black/30 border border-white/10 rounded-xl focus:border-purple-500 outline-none transition-colors" />
                        </div>
                        <textarea rows="4" placeholder="Contanos sobre tu proyecto..." className="w-full p-4 bg-black/30 border border-white/10 rounded-xl focus:border-purple-500 outline-none transition-colors"></textarea>
                        <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity">
                            Enviar Mensaje
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}

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

            <div className="p-6 flex flex-col flex-grow relative z-20">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-xs text-purple-400 font-semibold mb-3 uppercase tracking-wide">{target}</p>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">{desc}</p>

                <div className="space-y-2 mb-6 flex-grow">
                    {benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2">
                            <FaCheck className="text-green-400 mt-1 flex-shrink-0 text-xs" />
                            <span className="text-gray-300 text-xs">{benefit}</span>
                        </div>
                    ))}
                </div>

                <div className="border-t border-white/10 pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <FaCode className="text-blue-400" /> {stack}
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <FaClock className="text-yellow-400" /> {time}
                    </div>
                </div>

                {isExternal ? (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-6 w-full py-2 rounded-xl font-bold text-sm text-center bg-gradient-to-r ${color} hover:opacity-90 transition-opacity block`}
                    >
                        Ver en Store
                    </a>
                ) : (
                    <Link
                        to={link}
                        className={`mt-6 w-full py-2 rounded-xl font-bold text-sm text-center bg-gradient-to-r ${color} hover:opacity-90 transition-opacity block`}
                    >
                        Ver Demo
                    </Link>
                )}
            </div>
        </motion.div>
    );
}

function ServiceCard({ icon, title, text }) {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="glass-panel p-8 rounded-2xl hover:bg-white/10 transition-colors"
        >
            <div className="mb-6">{icon}</div>
            <h3 className="text-2xl font-bold mb-4">{title}</h3>
            <p className="text-gray-400 leading-relaxed">{text}</p>
        </motion.div>
    );
}

function WhyCard({ icon, title, text }) {
    return (
        <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-gray-400">{text}</p>
        </div>
    );
}
