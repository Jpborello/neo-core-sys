'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Lightbulb, Star, LineChart } from 'lucide-react';

const Step = ({ icon: Icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.7 }}
        className="flex flex-col items-center text-center group"
    >
        <motion.div
            whileHover={{ scale: 1, rotate: [0, -10, 10, 0], borderRadius: "50%" }}
            animate={{ y: [0, -10, 0] }}
            transition={{
                rotate: { duration: 0.5 },
                y: { repeat: Infinity, duration: 3, ease: "easeInOut", delay: Math.random() * 2 }
            }}
            className="w-20 h-20 mb-6 border-2 border-white rounded-2xl flex items-center justify-center backdrop-blur-sm bg-black/20 group-hover:bg-white group-hover:text-black transition-all duration-300"
        >
            <Icon size={40} strokeWidth={1.5} />
        </motion.div>

        <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">{title}</h3>
        <p className="text-white/80 text-sm leading-relaxed max-w-[280px]">
            {desc}
        </p>
    </motion.div>
);

const Process = () => {
    const steps = [
        {
            icon: MessageCircle,
            title: "WE CONNECT",
            desc: "Realizamos una inmersión profunda en la marca, para convertirnos en expertos en el tema, y entender todas las necesidades, objetivos y expectativas de la marca."
        },
        {
            icon: Lightbulb,
            title: "WE PROJECT",
            desc: "Creamos una estrategia digital para redes sociales, así como una estética única para hacer cada marca única en su rubro."
        },
        {
            icon: Star,
            title: "WE START",
            desc: "¡Tiempo de trabajar! Llevamos a cabo todo lo que planificamos para comenzar a cumplir los objetivos. Siempre en contacto contigo para que estés al tanto."
        },
        {
            icon: LineChart,
            title: "WE EVALUATE",
            desc: "Analizamos todas las métricas, elaboramos conclusiones e hipótesis y reformulamos plan de acción para seguir en constante mejora."
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-black">
            {/* Background Image with Heavy Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/hero-weconnect.png"
                    alt="Background"
                    className="w-full h-full object-cover opacity-40 grayscale blur-[2px] scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/90"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {steps.map((step, i) => (
                        <Step key={i} {...step} delay={i * 0.2} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
