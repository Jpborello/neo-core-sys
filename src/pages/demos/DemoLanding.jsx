import { motion } from "framer-motion";
import { FaRocket, FaBolt, FaCheckCircle } from "react-icons/fa";

export default function DemoLanding() {
    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-pink-500 selection:text-white">
            {/* HERO */}
            <header className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-black z-0" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-block mb-4 px-4 py-1 rounded-full bg-pink-500/20 border border-pink-500/50 text-pink-300 text-sm font-bold uppercase tracking-widest"
                    >
                        Lanzamiento 2025
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-6xl md:text-8xl font-black mb-6 leading-tight"
                    >
                        Tu Producto <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">
                            Al Siguiente Nivel
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
                    >
                        Una landing page diseñada para convertir. Captura la atención de tus usuarios con animaciones fluidas y un diseño de alto impacto.
                    </motion.p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-5 bg-pink-600 hover:bg-pink-500 rounded-full font-bold text-lg shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all"
                    >
                        Comenzar Ahora
                    </motion.button>
                </div>
            </header>

            {/* FEATURES */}
            <section className="py-24 bg-black">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <FeatureCard
                            icon={<FaRocket className="text-5xl text-orange-400" />}
                            title="Velocidad Extrema"
                            desc="Optimizado para cargar en milisegundos. No pierdas ni un solo cliente por tiempos de espera."
                        />
                        <FeatureCard
                            icon={<FaBolt className="text-5xl text-yellow-400" />}
                            title="Diseño Dinámico"
                            desc="Animaciones que guían al usuario hacia la conversión sin distraerlo del objetivo principal."
                        />
                        <FeatureCard
                            icon={<FaCheckCircle className="text-5xl text-green-400" />}
                            title="Conversión Total"
                            desc="Estructura probada para maximizar leads y ventas. Cada pixel tiene un propósito."
                        />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 bg-gradient-to-t from-purple-900 to-black text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-pink-600/20 blur-[120px] rounded-full pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    <h2 className="text-5xl font-bold mb-8">¿Listo para despegar?</h2>
                    <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                        No dejes que tu competencia te gane. Obtené tu landing page premium hoy mismo.
                    </p>
                    <button className="px-12 py-6 bg-white text-purple-900 rounded-full font-black text-xl hover:scale-105 transition-transform">
                        QUIERO MI WEB
                    </button>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, desc }) {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="p-8 rounded-3xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors"
        >
            <div className="mb-6">{icon}</div>
            <h3 className="text-2xl font-bold mb-4">{title}</h3>
            <p className="text-gray-400 leading-relaxed">{desc}</p>
        </motion.div>
    );
}
