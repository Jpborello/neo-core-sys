'use client';
import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-black">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/hero-weconnect.png"
                    alt="Hero Background"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60"></div>
            </div>

            {/* Grid Pattern Overlay (Subtle) */}
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 z-10 pointer-events-none"></div>

            <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-20">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-6 leading-tight"
                >
                    POTENCIAMOS TU
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 pb-2">COMUNICACIÓN DIGITAL</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-neutral-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light"
                >
                    Estrategias integrales para marcas que buscan destacar en un mundo saturado.
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                    CONOCÉ MÁS
                </motion.button>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-400 z-20"
            >
                <div className="w-6 h-10 border-2 border-neutral-500 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-3 bg-neutral-300 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
