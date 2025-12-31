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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* --- 1. SYSTEM CARD: VENTAS --- */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-slate-900/50 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl group flex flex-col"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>

                    {/* Visual Mockup (Top) */}
                    <div className="bg-slate-800/50 p-8 h-64 flex items-center justify-center relative overflow-hidden shrink-0">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

                        {/* Abstract Split View Mockup */}
                        <div className="relative z-10 w-full max-w-[280px] aspect-video bg-slate-900 rounded-xl shadow-2xl border border-slate-600 p-3 transform group-hover:scale-105 transition-transform duration-500 flex flex-col gap-2">
                            <div className="flex gap-1.5 mb-1">
                                <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                            </div>
                            <div className="flex-1 flex gap-2">
                                <div className="flex-1 bg-white/5 rounded p-2 flex flex-col gap-1 border border-white/5 relative">
                                    <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <div className="h-1.5 w-1/2 bg-blue-500/30 rounded"></div>
                                    <div className="grid grid-cols-2 gap-1 mt-1">
                                        <div className="aspect-square bg-slate-700 rounded-sm"></div>
                                        <div className="aspect-square bg-slate-700 rounded-sm"></div>
                                    </div>
                                    <div className="mt-auto h-4 bg-blue-600 rounded flex items-center justify-center text-[6px] text-white font-bold">SHOP</div>
                                </div>
                                <div className="flex-1 bg-slate-950 rounded p-2 flex flex-col gap-1 border border-purple-500/20">
                                    <div className="h-1.5 w-3/4 bg-purple-500/30 rounded"></div>
                                    <div className="space-y-1">
                                        <div className="h-0.5 w-full bg-slate-800 rounded"></div>
                                        <div className="h-0.5 w-full bg-slate-800 rounded"></div>
                                    </div>
                                    <div className="mt-auto h-4 bg-purple-700 rounded flex items-center justify-center text-[6px] text-white font-bold">ADMIN</div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-4 right-4 bg-blue-500/20 border border-blue-500/50 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md">
                            Ecommerce B2B/B2C
                        </div>
                    </div>

                    {/* Content (Bottom) */}
                    <div className="p-8 flex flex-col flex-1 relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-3">Ventas y Gestión</h3>
                        <p className="text-gray-400 text-sm mb-6 flex-1">
                            Plataforma integral que une <span className="text-white">Tienda Online</span> con <span className="text-white">Panel de Control</span>. Ideal para distribuidoras y mayoristas.
                        </p>

                        <div className="space-y-3 mb-8">
                            <FeatureItem text="Tienda con Stock en Tiempo Real" icon={<RiStore2Line className="text-blue-400" />} />
                            <FeatureItem text="Gestión de Pedidos y Clientes" icon={<RiDashboardLine className="text-purple-400" />} />
                        </div>

                        <div className="flex gap-3 mt-auto">
                            <Link href="/demo-shop" className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-500/25">
                                Ver Tienda
                            </Link>
                            <Link href="/en/demo-admin" className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all">
                                Ver Admin
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* --- 2. SYSTEM CARD: TURNOS --- */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="relative bg-slate-900/50 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl group flex flex-col"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-transparent to-teal-900/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>

                    {/* Visual Mockup (Top) */}
                    <div className="bg-slate-800/50 p-8 h-64 flex items-center justify-center relative overflow-hidden shrink-0">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

                        {/* Abstract Calendar Mockup */}
                        <div className="relative z-10 w-full max-w-[280px] aspect-video bg-neutral-100 rounded-xl shadow-2xl border border-neutral-300 p-3 transform group-hover:scale-105 transition-transform duration-500 flex flex-col gap-2">
                            <div className="flex justify-between items-center mb-1">
                                <div className="h-1.5 w-1/3 bg-neutral-300 rounded"></div>
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-300"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-300"></div>
                                </div>
                            </div>
                            <div className="flex-1 grid grid-cols-4 gap-1">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className={`rounded-sm border ${i === 2 ? 'bg-indigo-500 border-indigo-600' : 'bg-white border-neutral-200'} relative`}>
                                        {i === 2 && <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 border border-white rounded-full"></div>}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-auto h-5 bg-neutral-900 rounded flex items-center justify-center text-[7px] text-white font-medium">Reservar Turno</div>
                        </div>

                        <div className="absolute top-4 right-4 bg-indigo-500/20 border border-indigo-500/50 text-indigo-400 text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md">
                            Booking Inteligente
                        </div>
                    </div>

                    {/* Content (Bottom) */}
                    <div className="p-8 flex flex-col flex-1 relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-3">Turnos y Agenda</h3>
                        <p className="text-gray-400 text-sm mb-6 flex-1">
                            Motor de reservas que organiza tu negocio. Reduce ausentismo con <span className="text-white">Reglas Automáticas</span> y recordatorios.
                        </p>

                        <div className="space-y-3 mb-8">
                            <FeatureItem text="Reserva Online con Seña/Datos" icon={<FaCheckCircle className="text-indigo-400" />} />
                            <FeatureItem text="Agenda con Bloqueos Inteligentes" icon={<FaCheckCircle className="text-teal-400" />} />
                        </div>

                        <div className="flex gap-3 mt-auto">
                            <Link href="/demo-turnos" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-indigo-500/25 group/btn">
                                Probar Demo <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

const FeatureItem = ({ text, icon }) => (
    <div className="flex items-center gap-2 text-gray-300 text-sm">
        {icon}
        <span>{text}</span>
    </div>
);

export default SystemsShowcase;
