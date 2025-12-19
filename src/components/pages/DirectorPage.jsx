import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Shield, Target, TrendingUp, Users, Brain, Lock } from 'lucide-react';
import Link from 'next/link';

export default function DirectorPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200">

            {/* Navbar Minimalista */}
            <nav className="fixed top-0 w-full bg-slate-900/90 backdrop-blur-md z-50 border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold text-white tracking-tight">
                        Neo-Core-Sys
                    </Link>
                    <Link to="/" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
                        Volver al Inicio
                    </Link>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900"></div>

                <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-semibold tracking-wide uppercase mb-8">
                            <Shield size={16} />
                            Servicio Premium
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-tight">
                            Director de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-slate-200">Confianza</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light mb-12">
                            Tu socio estratégico para tomar mejores decisiones y hacer crecer tu negocio con claridad. Te acompaño de manera personalizada para guiarte, proteger tus decisiones y optimizar cada paso.
                        </p>
                        <a
                            href="https://wa.me/543417981212"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-xl shadow-blue-900/20"
                        >
                            Agendar Consulta
                            <ArrowRight size={20} />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* WHAT IS IT */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">¿Qué es un Director de Confianza?</h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                Es un asesor estratégico que se convierte en tu mano derecha en todas las decisiones importantes de tu negocio. No es un empleado más, es un socio intelectual que vela por tus intereses.
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Evalúa, guía, corrige y ayuda a evitar pérdidas de tiempo y dinero, asegurando que cada acción tenga sentido y beneficie tu crecimiento a largo plazo.
                            </p>
                        </div>
                        <div className="flex-shrink-0 bg-slate-100 p-8 rounded-2xl border border-slate-200">
                            <Shield size={64} className="text-blue-600 mb-4" />
                            <div className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-2">Seguridad</div>
                            <div className="text-sm text-slate-500">Tus decisiones, blindadas.</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BENEFITS */}
            <section className="py-24 bg-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">¿Para qué sirve?</h2>
                        <p className="text-slate-500 text-lg">Beneficios tangibles para tu empresa</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <BenefitCard
                            icon={<Brain />}
                            title="Claridad Mental"
                            desc="Tomar decisiones con claridad y sin la soledad del líder."
                        />
                        <BenefitCard
                            icon={<Target />}
                            title="Estrategia Pura"
                            desc="Organizar tus ideas y definir un camino claro hacia el éxito."
                        />
                        <BenefitCard
                            icon={<Users />}
                            title="Supervisión de Equipos"
                            desc="Supervisar a diseñadores, desarrolladores y equipos de marketing."
                        />
                        <BenefitCard
                            icon={<Lock />}
                            title="Protección de Activos"
                            desc="Evitar errores caros o inversiones innecesarias."
                        />
                        <BenefitCard
                            icon={<TrendingUp />}
                            title="Optimización Digital"
                            desc="Optimizar tu comunicación y presencia digital al máximo."
                        />
                        <BenefitCard
                            icon={<Check />}
                            title="Seguimiento Real"
                            desc="Acompañamiento semanal constante para no perder el rumbo."
                        />
                    </div>
                </div>
            </section>

            {/* PRICING */}
            <section className="py-24 bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Planes y Precios</h2>
                        <p className="text-slate-400 text-xl">Inversión estratégica para tu crecimiento</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Plan Inicial */}
                        <PricingCard
                            title="Plan Inicial"
                            price="399"
                            desc="Para emprendedores que necesitan orden."
                            features={[
                                "Acompañamiento estratégico",
                                "Correcciones y guía semanal",
                                "Soporte por WhatsApp",
                                "Revisión de objetivos mensuales"
                            ]}
                        />

                        {/* Plan Crecimiento */}
                        <PricingCard
                            title="Plan Crecimiento"
                            price="699"
                            featured={true}
                            desc="Para negocios en expansión activa."
                            features={[
                                "Seguimiento más profundo",
                                "Optimización de procesos",
                                "Análisis de marca y proyección",
                                "Auditoría de proveedores",
                                "2 Reuniones semanales"
                            ]}
                        />

                        {/* Plan Ejecutivo */}
                        <PricingCard
                            title="Plan Ejecutivo"
                            price="1200"
                            desc="Soporte total para alta gerencia."
                            features={[
                                "Supervisión completa",
                                "Acceso prioritario 24/7",
                                "Revisión de equipos y proyectos",
                                "Decisiones clave en tiempo real",
                                "Estrategia de largo plazo"
                            ]}
                        />
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-32 bg-white text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">¿Querés llevar tu negocio al siguiente nivel?</h2>
                    <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
                        No dejes que la incertidumbre frene tu crecimiento. Empezá a tomar decisiones con respaldo profesional hoy mismo.
                    </p>
                    <a
                        href="https://wa.me/543417981212"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-blue-600 transition-all shadow-xl hover:scale-105 transform duration-200"
                    >
                        Agendar Consulta
                        <ArrowRight size={24} />
                    </a>
                </div>
            </section>

            {/* Footer Simple */}
            <footer className="bg-slate-50 py-12 border-t border-slate-200 text-center text-slate-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Neo-Core-Sys. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

function BenefitCard({ icon, title, desc }) {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                {React.cloneElement(icon, { size: 24 })}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
            <p className="text-slate-600 leading-relaxed">{desc}</p>
        </div>
    );
}

function PricingCard({ title, price, desc, features, featured = false }) {
    return (
        <div className={`relative p-8 rounded-3xl border flex flex-col ${featured ? 'bg-slate-800 border-blue-500 shadow-2xl scale-105 z-10' : 'bg-slate-900/50 border-slate-800'}`}>
            {featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                    Más Elegido
                </div>
            )}
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-slate-400 text-sm mb-6">{desc}</p>
            <div className="mb-8">
                <span className="text-4xl font-bold text-white">USD {price}</span>
                <span className="text-slate-500"> / mes</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                        <Check size={16} className="text-blue-400 mt-0.5 shrink-0" />
                        {feature}
                    </li>
                ))}
            </ul>
            <a
                href="https://wa.me/543417981212"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 rounded-xl font-bold text-center transition-colors ${featured ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}
            >
                Elegir Plan
            </a>
        </div>
    );
}
