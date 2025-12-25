"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight, FaWhatsapp, FaCheckCircle } from 'react-icons/fa';
import { RiStore2Line, RiDashboardLine, RiRocketLine } from 'react-icons/ri';

const SystemsShowcase = () => {
    return (
        <section className="py-24 px-6 w-full max-w-7xl mx-auto relative z-20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                    Sistemas para Empresas <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">(Demos en vivo)</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
                    Soluciones reales funcionando. <span className="text-white font-medium">Probá cómo trabaja Neo Core.</span>
                </p>
            </motion.div>

            {/* Main Feature Card */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative bg-slate-900/50 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl group"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="grid grid-cols-1 lg:grid-cols-2">

                    {/* Visual Side (Mockup Representation) */}
                    <div className="bg-slate-800/50 p-8 md:p-12 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

                        {/* Abstract Representation of the System */}
                        <div className="relative z-10 w-full max-w-md aspect-video bg-slate-900 rounded-xl shadow-2xl border border-slate-600 p-4 transform group-hover:scale-105 transition-transform duration-500 flex flex-col gap-3">
                            {/* Fake Browser Header */}
                            <div className="flex gap-2 mb-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                            </div>

                            {/* Split View */}
                            <div className="flex-1 flex gap-3 h-full">
                                {/* Shop Side */}
                                <div className="flex-1 bg-white/5 rounded-lg p-3 flex flex-col gap-2 border border-white/5">
                                    <div className="h-2 w-1/2 bg-blue-500/30 rounded"></div>
                                    <div className="grid grid-cols-2 gap-2 mt-1">
                                        <div className="aspect-square bg-slate-700 rounded-md"></div>
                                        <div className="aspect-square bg-slate-700 rounded-md"></div>
                                    </div>
                                    <div className="mt-auto h-6 bg-blue-600 rounded-md flex items-center justify-center text-[8px] text-white font-bold">SHOP</div>
                                </div>

                                {/* Arrow */}
                                <div className="flex items-center justify-center text-slate-500">
                                    <RiRocketLine />
                                </div>

                                {/* Admin Side */}
                                <div className="flex-1 bg-slate-950 rounded-lg p-3 flex flex-col gap-2 border border-purple-500/20">
                                    <div className="h-2 w-3/4 bg-purple-500/30 rounded"></div>
                                    <div className="flex-1 space-y-1">
                                        <div className="h-1 w-full bg-slate-800 rounded"></div>
                                        <div className="h-1 w-full bg-slate-800 rounded"></div>
                                        <div className="h-1 w-2/3 bg-slate-800 rounded"></div>
                                    </div>
                                    <div className="mt-auto h-6 bg-purple-700 rounded-md flex items-center justify-center text-[8px] text-white font-bold">ADMIN</div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badges */}
                        <div className="absolute top-6 right-6 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                            ● Tiempo Real
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="p-8 md:p-12 flex flex-col justify-center relative z-10">
                        <div className="mb-2 text-blue-400 font-bold uppercase tracking-wider text-sm">Producto Estrella</div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Sistema de Ventas y Gestión Comercial</h3>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Plataforma completa que integra <span className="text-white font-semibold">Tienda Online</span> y <span className="text-white font-semibold">Panel Administrativo</span>. Diseñada para que vendas, gestiones stock y controles pedidos sin fricción.
                        </p>

                        {/* Features List */}
                        <div className="space-y-6 mb-10">
                            <FeatureRow
                                icon={<RiStore2Line className="text-blue-400 text-xl" />}
                                title="Tienda Online (B2C)"
                                items={['Catálogo vivo con precios y stock real', 'Carrito y checkout funcional', 'Alertas automáticas de stock']}
                            />
                            <FeatureRow
                                icon={<RiDashboardLine className="text-purple-400 text-xl" />}
                                title="Panel Administrativo (B2B)"
                                items={['Gestión total de pedidos y stock', 'Botón de WhatsApp en cada pedido', 'Métricas y Sorteos']}
                            />
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/demo-shop"
                                className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-500/25 group/btn"
                            >
                                Ver Tienda Demo <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/demo-admin"
                                className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 hover:border-purple-500 rounded-xl font-bold flex items-center justify-center gap-2 transition-all group/btn"
                            >
                                Ver Panel Admin <RiDashboardLine className="group-hover/btn:text-purple-400 transition-colors" />
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

const FeatureRow = ({ icon, title, items }) => (
    <div className="flex gap-4">
        <div className="mt-1 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
            {icon}
        </div>
        <div>
            <h4 className="text-white font-bold text-lg mb-2">{title}</h4>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
                {items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-gray-400 text-sm">
                        <FaCheckCircle className="text-slate-600 text-xs" />
                        <span>{item}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default SystemsShowcase;
