import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCode, FaClock, FaArrowRight, FaCheck } from 'react-icons/fa';

function PortfolioCard({ title, target, desc, benefits, stack, time, link, color, image }) {
    const isExternal = link.startsWith("http");

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="glass-panel rounded-3xl overflow-hidden flex flex-col h-full border border-white/5 hover:border-white/20 transition-colors"
        >
            {image ? (
                <div className="h-48 w-full overflow-hidden relative group">
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10`} />
                    <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
            ) : (
                <div className={`h-2 w-full bg-gradient-to-r ${color}`} />
            )}

            <div className="p-5 md:p-6 flex flex-col flex-grow relative z-20">
                <h3 className="text-lg md:text-xl font-bold mb-2">{title}</h3>
                <p className="text-xs md:text-xs text-purple-400 font-semibold mb-3 uppercase tracking-wide">{target}</p>
                <p className="text-gray-400 mb-4 text-sm md:text-sm leading-relaxed">{desc}</p>

                <div className="space-y-2 mb-6 flex-grow">
                    {benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2">
                            <FaCheck className="text-green-400 mt-1 flex-shrink-0 text-sm md:text-xs" />
                            <span className="text-gray-300 text-sm md:text-xs">{benefit}</span>
                        </div>
                    ))}
                </div>

                <div className="border-t border-white/10 pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm md:text-xs">
                        <FaCode className="text-blue-400" /> {stack}
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm md:text-xs">
                        <FaClock className="text-yellow-400" /> {time}
                    </div>
                </div>

                {isExternal ? (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-6 w-full py-3 md:py-2 rounded-xl font-bold text-sm text-center bg-gradient-to-r ${color} hover:opacity-90 transition-opacity block`}
                    >
                        Ver en Store
                    </a>
                ) : (
                    <Link
                        href={link}
                        className={`mt-6 w-full py-3 md:py-2 rounded-xl font-bold text-sm text-center bg-gradient-to-r ${color} hover:opacity-90 transition-opacity block`}
                    >
                        Ver Demo
                    </Link>
                )}
            </div>
        </motion.div>
    );
}

export default function PortfolioSection() {
    return (
        <>
            {/* MOBILE APPS SHOWCASE */}
            <section id="mobile-apps" className="py-24 px-6 w-full max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-16 text-center"
                >
                    Apps <span className="text-blue-500">Mobile</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
                    <PortfolioCard
                        title="Step Up App"
                        target="Fitness, Salud"
                        desc="App completa para rutinas de gym, nutrición y comunidad."
                        benefits={[
                            "Rutinas personalizadas",
                            "Pagos (MP/PayPal)",
                            "Comunidad activa",
                            "Nutrición"
                        ]}
                        stack="Mobile App (Android)"
                        time="Ya Terminado"
                        link="https://play.google.com/store/apps/details?id=com.jpborello.stepupapp"
                        color="from-blue-600 to-cyan-500"
                        image="https://play-lh.googleusercontent.com/5g5SsTG2LQ2JBBbTzeQuv8ngWUX4jzPMQLVXdvWDHNs7kNzNLePb_8w2e2vOtBL3j0neguQIHH31Ke2fTCSlH1I=w480-h960-rw"
                    />
                </div>
            </section>

            {/* WEB MODELS / PORTFOLIO (Vacío por ahora tras limpieza) */}
            {/* 
            <section id="portfolio" className="py-24 px-6 w-full max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-16 text-center"
                >
                    Nuestros <span className="text-purple-500">Modelos Web</span>
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                     Cards comentadas para evitar links rotos tras limpieza de demos
                </div>
            </section>
             */}
        </>
    );
}
