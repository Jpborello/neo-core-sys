import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';

const SuccessStories = () => {
    return (
        <section id="success-stories" className="py-24 px-6 w-full max-w-7xl mx-auto relative z-20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                    Resultados <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Reales</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
                    No solo vendemos promesas. <span className="text-white font-medium">Construimos negocios digitales que funcionan.</span>
                </p>
            </motion.div>

            {/* Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                <StoryCard
                    title="Ferreyra Embutidos"
                    category="Gastronomía & Branding"
                    desc="Desarrollo integral de identidad digital. Sitio web enfocado en la exhibición de productos de calidad y captación de distribuidores mayoristas."
                    link="https://www.ferreyraembutidos.com/"
                    color="from-red-900/40 to-orange-900/40"
                    borderColor="hover:border-red-500/50"
                    textColor="text-red-400"
                />
                <StoryCard
                    title="All Inclusive"
                    category="Ecommerce B2C"
                    desc="Tienda online de alto rendimiento diseñada para la conversión. Catálogo masivo con filtros inteligentes y experiencia de usuario fluida."
                    link="https://www.allinclusive.com.ar/"
                    color="from-blue-900/40 to-cyan-900/40"
                    borderColor="hover:border-cyan-500/50"
                    textColor="text-cyan-400"
                />
                <StoryCard
                    title="Hacelo Tuyo"
                    category="Plataforma Personalizada"
                    desc="Sistema de pedidos para productos personalizados (Print on Demand). Optimizamos el flujo de compra para reducir errores en encargos."
                    link="https://www.hacelotuyo.com.ar/"
                    color="from-purple-900/40 to-pink-900/40"
                    borderColor="hover:border-pink-500/50"
                    textColor="text-pink-400"
                />
            </div>

            {/* Trusted By (Secondary) */}
            <div className="text-center border-t border-white/5 pt-16">
                <p className="text-gray-500 uppercase tracking-widest text-sm mb-8 font-medium">
                    Empresas que confían en nosotros y comienzan en Enero
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
                    <span className="text-2xl font-bold text-white/40 hover:text-white/80 transition-colors cursor-default">LOLOFIT</span>
                    <span className="text-2xl font-bold text-white/40 hover:text-white/80 transition-colors cursor-default">CUÁNTO TE QUIERO</span>
                </div>
            </div>
        </section>
    );
};

const StoryCard = ({ title, category, desc, link, color, borderColor, textColor }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className={`relative bg-slate-900/40 rounded-3xl p-8 border border-white/5 ${borderColor} transition-all duration-300 group flex flex-col`}
        >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>

            <div className="relative z-10 flex flex-col h-full">
                <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${textColor}`}>{category}</div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:translate-x-1 transition-transform">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
                    {desc}
                </p>

                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white font-bold text-sm bg-white/5 hover:bg-white/10 px-4 py-3 rounded-xl w-fit transition-colors"
                >
                    Ver Proyecto Real <FaExternalLinkAlt className="text-xs opacity-70" />
                </a>
            </div>
        </motion.div>
    );
};

export default SuccessStories;
