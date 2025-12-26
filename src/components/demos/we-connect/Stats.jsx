'use client';
import React from 'react';
import { motion } from 'framer-motion';

const StatItem = ({ number, label, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        className="text-center"
    >
        <div className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-purple-600 mb-2">
            {number}
        </div>
        <p className="text-neutral-400 font-medium tracking-wide uppercase text-sm md:text-base">
            {label}
        </p>
    </motion.div>
);

const Stats = () => {
    return (
        <section className="py-20 bg-neutral-900 border-y border-white/5">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    <StatItem number="+5" label="Años de Experiencia" delay={0.1} />
                    <StatItem number="+50" label="Marcas Gestionadas" delay={0.2} />
                    <StatItem number="+200" label="Asesorías Realizadas" delay={0.3} />
                </div>
            </div>
        </section>
    );
};

export default Stats;
