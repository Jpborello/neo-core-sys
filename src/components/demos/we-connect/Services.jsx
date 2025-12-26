'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Users, Monitor, BarChart3, PenTool, MessageSquare } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
        className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm group cursor-pointer transition-all hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
    >
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Icon size={24} className="text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{title}</h3>
        <p className="text-neutral-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
);

const Services = () => {
    const services = [
        { icon: Share2, title: "Redes Sociales", desc: "Gestión estratégica de comunidades. Contenido que conecta y vende." },
        { icon: Users, title: "Asesorías 1:1", desc: "Mentoria personalizada para potenciar tu marca personal o comercial." },
        { icon: Monitor, title: "Capacitaciones", desc: "Workshops in-company para equipos de marketing y ventas." },
        { icon: BarChart3, title: "Publicidad Digital", desc: "Campañas de alto rendimiento en Meta Ads y Google Ads." },
        { icon: PenTool, title: "Branding", desc: "Diseño de identidad visual que transmite la esencia de tu negocio." },
        { icon: MessageSquare, title: "Email Marketing", desc: "Automatizaciones y newsletters para fidelizar a tu audiencia." },
    ];

    return (
        <section className="py-24 bg-black relative">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-blue-500 font-bold tracking-widest text-sm uppercase">Nuestros Servicios</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mt-2">Soluciones Integrales</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((s, i) => (
                        <ServiceCard key={i} {...s} delay={i * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
