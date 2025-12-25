"use client";

import React from 'react';

import { motion } from "framer-motion";
import { useState } from "react";
import { FaArrowRight, FaCheck, FaCode, FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { RiSmartphoneLine, RiLayoutGridLine, RiGlobalLine, RiLightbulbLine, RiShieldCheckLine, RiRocketLine } from "react-icons/ri";
import Link from "next/link";
import { SiReact, SiVite, SiTailwindcss, SiFirebase, SiSupabase, SiNodedotjs, SiTauri, SiFlutter, SiPython, SiCloudflare, SiGithub, SiOpenai } from "react-icons/si";
import { Suspense, lazy } from "react";

// Components
const Neo3DDemo = lazy(() => import("../components/3d/Neo3DDemo"));
import AiProjectSimulator from "../components/AiProjectSimulator";
import StickySmartCTA from "../components/StickySmartCTA";

import AiMarketingSection from '../components/AiMarketingSection';
import PortfolioSection from '../components/PortfolioSection';
import SystemsShowcase from '../components/SystemsShowcase';


export default function Page() {
    const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('sending');

        const formData = {
            nombre: e.target.nombre.value,
            email: e.target.email.value,
            mensaje: e.target.mensaje.value,
        };

        try {
            const response = await fetch("https://formspree.io/f/xeovzyyw", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormStatus('success');
                e.target.reset();
                setTimeout(() => setFormStatus('idle'), 5000);
            } else {
                setFormStatus('error');
                setTimeout(() => setFormStatus('idle'), 5000);
            }
        } catch (error) {
            setFormStatus('error');
            setTimeout(() => setFormStatus('idle'), 5000);
        }
    };

    return (
        <div className="flex flex-col items-center overflow-hidden bg-[#0b0b0d] min-h-screen text-white pb-32" style={{ backgroundColor: '#0b0b0d' }}>
            {/* HERO */}
            <main className="relative z-10 flex flex-col items-center justify-center text-center py-20 px-6 min-h-[80vh] w-full">
                {/* Animated Background Blobs / 3D Demo */}
                <div className="absolute inset-0 z-[-1] overflow-hidden">
                    <Suspense fallback={
                        <>
                            <div className="absolute w-[500px] h-[500px] bg-purple-600/30 blur-[120px] -top-20 -left-20 rounded-full" />
                            <div className="absolute w-[600px] h-[600px] bg-blue-600/20 blur-[120px] bottom-0 right-0 rounded-full" />
                        </>
                    }>
                        <ErrorBoundary fallback={
                            <>
                                <div className="absolute w-[500px] h-[500px] bg-purple-600/30 blur-[120px] -top-20 -left-20 rounded-full" />
                                <div className="absolute w-[600px] h-[600px] bg-blue-600/20 blur-[120px] bottom-0 right-0 rounded-full" />
                            </>
                        }>
                            <div className="w-full h-full absolute top-0 left-0 opacity-60 md:opacity-100">
                                <Neo3DDemo />
                            </div>
                        </ErrorBoundary>
                    </Suspense>
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
                >
                    <span className="text-gradient">Neo-Core-Sys</span>
                    <span className="block text-2xl md:text-4xl text-gray-200 mt-4 font-bold tracking-normal">
                        Desarrollo Web, Apps & IA en Rosario
                    </span>
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
                    <Link
                        href="#contact"
                        className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                        Cotizar mi Proyecto <FaArrowRight />
                    </Link>
                    <Link
                        href="#demos"
                        className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors backdrop-blur-sm"
                    >
                        Ver Casos de Éxito
                    </Link>
                </motion.div>
            </main>

            {/* SYSTEMS SHOWCASE (NEW) */}
            <SystemsShowcase />

            {/* AI SIMULATOR SECTION */}
            <section className="py-24 px-6 w-full bg-gradient-to-b from-[#0b0b0d] to-gray-900/50 relative z-20">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        ¿Tenés una idea? <span className="text-blue-500">Simulala con IA</span>
                    </motion.h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Obtené un estimado de tiempo y tecnología en segundos. La inteligencia artificial te ayuda a visualizar tu próximo paso.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <AiProjectSimulator />
                </div>
            </section>

            {/* RESULTS VS WEBSITE SECTION */}
            <section className="py-24 px-6 w-full max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        ¿Querés una web? <span className="text-purple-500">O querés resultados.</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        En Neo-Core-Sys no creamos páginas vacías.
                        <br />
                        <span className="text-white font-semibold">Creamos sistemas que te traen clientes:</span>
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        {[
                            "Webs rápidas, modernas y 100% adaptadas a celular",
                            "Posicionamiento real en Google",
                            "Apps mobile y web personalizadas",
                            "Identidad visual poderosa",
                            "Integraciones con IA y automatizaciones"
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="p-2 bg-green-500/20 rounded-full text-green-400">
                                    <FaCheck />
                                </div>
                                <span className="text-lg text-gray-200">{item}</span>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-panel p-8 rounded-3xl text-center flex flex-col justify-center h-full border-t-4 border-purple-500"
                    >
                        <h3 className="text-2xl font-bold mb-4">Tu negocio NO puede pasar desapercibido.</h3>
                        <p className="text-gray-300 text-lg mb-6">Tiene que destacar.</p>
                        <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                            Y para eso estamos nosotros.
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* AI MARKETING SECTION (NEW) */}
            <AiMarketingSection />

            {/* SEO SECTION */}
            <section className="py-24 px-6 w-full bg-black/40">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            ¿Por qué el SEO es <span className="text-blue-500">tan importante?</span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                            Hoy tener una web no alcanza.
                            <br />
                            <span className="text-red-400 font-bold">Si no estás en Google, no existís.</span>
                        </p>
                        <p className="text-gray-400 max-w-4xl mx-auto leading-relaxed">
                            El SEO es lo que hace que cuando alguien busca lo que vos ofrecés, tu negocio aparezca entre los primeros resultados.
                            Y eso depende de construir la web de forma correcta:
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <SeoCard
                            title="Etiquetas correctas"
                            subtitle="(title, meta description, H1, ALT)"
                            desc="Google debe entender de qué trata tu web. Si esas etiquetas están mal, no te muestra."
                            icon={<FaCode className="text-3xl text-purple-400" />}
                        />
                        <SeoCard
                            title="Palabras clave reales"
                            subtitle="Contenido estratégico"
                            desc="Contenido pensado según lo que tu público está buscando realmente."
                            icon={<RiLightbulbLine className="text-3xl text-yellow-400" />}
                        />
                        <SeoCard
                            title="Velocidad optimizada"
                            subtitle="Performance extrema"
                            desc="Las webs lentas se hunden. Las nuestras vuelan."
                            icon={<RiRocketLine className="text-3xl text-red-400" />}
                        />
                        <SeoCard
                            title="Diseño responsive"
                            subtitle="100% Mobile Friendly"
                            desc="El 80% de las búsquedas es desde el celular. Si tu web no se adapta, perdés posicionamiento."
                            icon={<RiSmartphoneLine className="text-3xl text-blue-400" />}
                        />
                        <SeoCard
                            title="Estructura clara"
                            subtitle="Navegación intuitiva"
                            desc="Google premia las webs simples y fáciles de navegar."
                            icon={<RiLayoutGridLine className="text-3xl text-teal-400" />}
                        />
                        <SeoCard
                            title="Google Analytics"
                            subtitle="Search Console & Data"
                            desc="Para medir, mejorar y crecer cada mes con datos reales."
                            icon={<RiGlobalLine className="text-3xl text-green-400" />}
                        />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 text-center"
                    >
                        <h3 className="text-2xl font-bold mb-2 text-white">💡 En Neo-Core-Sys no solo hacemos tu web: la posicionamos</h3>
                        <p className="text-gray-300">Tu proyecto tiene que destacar y atraer clientes. Nosotros nos encargamos de hacerlo realidad.</p>
                    </motion.div>
                </div>
            </section>

            {/* PORTFOLIO GRID */}
            <PortfolioSection />


            {/* SERVICES DETAILED SECTION */}
            <section id="services" className="py-24 px-6 w-full max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Soluciones Integrales de <span className="text-blue-500">Software</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Cubrimos todo el ciclo de vida digital de tu negocio. Desde el diseño web hasta la automatización con Inteligencia Artificial.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ServiceCard
                        icon={<RiLayoutGridLine className="text-5xl text-blue-400" />}
                        title="Programación Web"
                        text="Desarrollo de páginas web institucionales, landing pages de alta conversión y portafolios interactivos. Código limpio, optimizado para SEO y 100% responsive."
                    />
                    <ServiceCard
                        icon={<RiSmartphoneLine className="text-5xl text-purple-400" />}
                        title="Desarrollo de Apps"
                        text="Aplicaciones móviles nativas e híbridas (iOS y Android) con Flutter y React Native. Llevá tu negocio al bolsillo de tus clientes con una experiencia de usuario impecable."
                    />
                    <ServiceCard
                        icon={<RiLightbulbLine className="text-5xl text-yellow-400" />}
                        title="Automatización con IA"
                        text="Implementamos chatbots inteligentes, análisis de datos predictivos y automatización de procesos repetitivos para ahorrar tiempo y dinero en tu empresa."
                    />
                    <ServiceCard
                        icon={<RiGlobalLine className="text-5xl text-teal-400" />}
                        title="Tiendas Ecommerce"
                        text="Plataformas de venta online robustas, seguras y escalables. Integración con Mercado Pago, Stripe y gestión de stock en tiempo real."
                    />
                    <ServiceCard
                        icon={<FaCode className="text-5xl text-red-400" />}
                        title="Integraciones API"
                        text="Conectamos tus sistemas existentes (CRM, ERP, Facturación) con nuevas herramientas digitales para un flujo de datos unificado y eficiente."
                    />
                    <ServiceCard
                        icon={<RiShieldCheckLine className="text-5xl text-green-400" />}
                        title="Mantenimiento Web"
                        text="Soporte técnico continuo, actualizaciones de seguridad y optimización de rendimiento para que tu sitio web funcione siempre como el primer día."
                    />
                </div>

                <div className="mt-16">
                    <div className="glass-panel p-8 rounded-3xl border border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-slate-900/20 flex flex-col md:flex-row items-center gap-8 hover:border-blue-500/50 transition-colors group cursor-pointer relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors"></div>
                        <div className="p-4 bg-blue-500/20 rounded-full text-blue-400 shrink-0 relative z-10">
                            <RiShieldCheckLine className="text-5xl" />
                        </div>
                        <div className="flex-1 text-center md:text-left relative z-10">
                            <h3 className="text-2xl font-bold mb-2 text-white">Director de Confianza (CTO as a Service)</h3>
                            <p className="text-gray-400 text-lg mb-4">
                                ¿Necesitás un socio tecnológico? Ofrecemos acompañamiento estratégico para tomar las mejores decisiones técnicas, evitar errores costosos y escalar tu negocio digitalmente.
                            </p>
                            <Link href="/TDirector" className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors">
                                Saber más sobre Consultoría <FaArrowRight />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* TECH STACK PREMIUM SECTION */}
            <section className="py-24 px-6 w-full bg-black/80 relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Tecnologías que usamos para llevar <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">tu proyecto al siguiente nivel</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Herramientas modernas, rápidas y confiables. Usamos lo mejor para que tu web rinda al máximo.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                        <TechCard icon={<SiReact />} name="React" desc="Interfaces dinámicas" color="text-cyan-400" />
                        <TechCard icon={<SiVite />} name="Vite" desc="Velocidad extrema" color="text-yellow-400" />
                        <TechCard icon={<SiTailwindcss />} name="TailwindCSS" desc="Diseño moderno" color="text-cyan-300" />
                        <TechCard icon={<SiFirebase />} name="Firebase" desc="Backend escalable" color="text-orange-400" />
                        <TechCard icon={<SiSupabase />} name="Supabase" desc="Base de datos real" color="text-emerald-400" />
                        <TechCard icon={<SiNodedotjs />} name="NodeJS" desc="Potencia servidor" color="text-green-500" />
                        <TechCard icon={<SiTauri />} name="Tauri" desc="Apps de escritorio" color="text-amber-300" />
                        <TechCard icon={<SiFlutter />} name="Flutter" desc="Apps nativas" color="text-blue-400" />
                        <TechCard icon={<SiPython />} name="Python" desc="Inteligencia Artificial" color="text-yellow-300" />
                        <TechCard icon={<SiCloudflare />} name="Cloudflare" desc="Seguridad y CDN" color="text-orange-500" />
                        <TechCard icon={<SiGithub />} name="GitHub" desc="Código seguro" color="text-white" />
                        <TechCard icon={<SiOpenai />} name="AI Powered" desc="Integraciones Smart" color="text-teal-400" />
                    </div>
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

            {/* FINAL CTA SECTION */}
            <section className="py-32 px-6 w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-black z-0" />

                <div className="max-w-5xl mx-auto relative z-10 text-center">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight"
                    >
                        ¿Listo para que tu negocio <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">deje de ser invisible?</span>
                    </motion.h2>

                    <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light">
                        Una web profesional no es un gasto. <br />
                        <span className="text-white font-semibold">Es tu mejor herramienta para vender más.</span>
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
                        {["Diseño Premium", "SEO que posiciona", "Apps Mobile & Web", "Automatizaciones IA", "Hosting Ultra Rápido"].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-gray-400">
                                <FaCheck className="text-purple-500" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            href="#contact"
                            className="inline-block px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-2xl font-bold shadow-[0_0_40px_rgba(124,58,237,0.5)] hover:shadow-[0_0_60px_rgba(124,58,237,0.7)] transition-shadow"
                        >
                            Quiero mi web profesional <FaArrowRight className="inline ml-2" />
                        </Link>
                    </motion.div>

                    <p className="mt-8 text-gray-500 text-sm uppercase tracking-widest">
                        Respondemos en menos de 1 hora. Tu proyecto empieza hoy.
                    </p>
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
                        <a href="mailto:admin@neo-core-sys.com" className="flex flex-col items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors group">
                            <div className="p-4 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                                <FaEnvelope className="text-2xl" />
                            </div>
                            <span className="text-sm">Email</span>
                        </a>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Nombre"
                                required
                                disabled={formStatus === 'sending'}
                                className="w-full p-4 bg-black/30 border border-white/10 rounded-xl focus:border-purple-500 outline-none transition-colors disabled:opacity-50"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                disabled={formStatus === 'sending'}
                                className="w-full p-4 bg-black/30 border border-white/10 rounded-xl focus:border-purple-500 outline-none transition-colors disabled:opacity-50"
                            />
                        </div>
                        <textarea
                            rows="4"
                            name="mensaje"
                            placeholder="Contanos sobre tu proyecto..."
                            required
                            disabled={formStatus === 'sending'}
                            className="w-full p-4 bg-black/30 border border-white/10 rounded-xl focus:border-purple-500 outline-none transition-colors disabled:opacity-50"
                        ></textarea>

                        <button
                            type="submit"
                            disabled={formStatus === 'sending'}
                            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {formStatus === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
                        </button>

                        {formStatus === 'success' && (
                            <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 text-center">
                                ¡Mensaje enviado! Te responderemos pronto 🎉
                            </div>
                        )}

                        {formStatus === 'error' && (
                            <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-center">
                                Error al enviar. Intenta nuevamente o contáctanos por WhatsApp
                            </div>
                        )}
                    </form>
                </div>
            </section>

            <StickySmartCTA />
        </div>
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

function SeoCard({ title, subtitle, desc, icon }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all"
        >
            <div className="mb-4 p-3 bg-black/30 rounded-xl w-fit">{icon}</div>
            <h3 className="text-xl font-bold mb-1">{title}</h3>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-3">{subtitle}</p>
            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
        </motion.div>
    );
}

function TechCard({ icon, name, desc, color }) {
    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-violet-500/30 hover:bg-white/10 transition-all group flex flex-col items-center text-center"
        >
            <div className={`text-5xl mb-4 ${color} drop-shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]`}>
                {icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{name}</h3>
            <p className="text-xs text-gray-400">{desc}</p>
        </motion.div>
    );
}

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("3D Demo Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}
