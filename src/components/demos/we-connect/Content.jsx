'use client';
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section className="py-24 bg-neutral-900 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2"
                    >
                        <span className="text-purple-500 font-bold tracking-widest text-sm uppercase">Somos We Connect</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-6">Creatividad que impulsa resultados</h2>
                        <p className="text-neutral-400 text-lg leading-relaxed mb-6">
                            Somos una agencia liderada por mujeres apasionadas por la comunicación digital. Creemos en el poder de las historias para conectar marcas con personas.
                        </p>
                        <p className="text-neutral-400 text-lg leading-relaxed">
                            Nuestro enfoque combina datos, estrategia y creatividad para construir presencias digitales sólidas y memorables.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 relative"
                    >
                        {/* Abstract Image Placeholder with Gradient Border */}
                        <div className="aspect-square rounded-2xl overflow-hidden relative border-2 border-white/10 z-10">
                            {/* In a real app, this would be a team photo */}
                            <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
                                <span className="text-neutral-600 font-bold text-xl">IMAGEN DE EQUIPO</span>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 mix-blend-overlay"></div>
                        </div>
                        {/* Decor elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600 rounded-full blur-[80px] opacity-30"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600 rounded-full blur-[80px] opacity-30"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const Contact = () => {
    return (
        <section className="py-24 bg-black relative">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-black text-white mb-8"
                >
                    HABLEMOS
                </motion.h2>
                <p className="text-neutral-400 text-xl mb-12">¿Listo para llevar tu marca al siguiente nivel?</p>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6 text-left max-w-xl mx-auto"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-neutral-500 mb-2">NOMBRE</label>
                            <input type="text" className="w-full bg-neutral-900 border border-neutral-800 text-white p-4 rounded-lg focus:outline-none focus:border-blue-600 transition-colors" placeholder="Tu nombre" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-neutral-500 mb-2">EMAIL</label>
                            <input type="email" className="w-full bg-neutral-900 border border-neutral-800 text-white p-4 rounded-lg focus:outline-none focus:border-blue-600 transition-colors" placeholder="tu@email.com" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-neutral-500 mb-2">MENSAJE</label>
                        <textarea rows="4" className="w-full bg-neutral-900 border border-neutral-800 text-white p-4 rounded-lg focus:outline-none focus:border-blue-600 transition-colors" placeholder="Contanos sobre tu proyecto..."></textarea>
                    </div>
                    <button className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-neutral-200 transition-colors tracking-widest text-sm">
                        ENVIAR MENSAJE
                    </button>
                </motion.form>
            </div>
        </section>
    );
};

export { About, Contact };
