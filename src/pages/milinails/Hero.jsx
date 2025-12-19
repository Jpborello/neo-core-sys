import { motion } from "framer-motion";
import { FaCalendarCheck } from "react-icons/fa";
import Image from "next/image";

// Placeholder for hero image if not passed as prop, but we should try to use one from the gallery if possible or a specific hero asset
// For now, I'll assume the parent passes it or we import one. 
// Let's import one of the gallery images to use as a fallback hero if needed, or just use a placeholder color/gradient until verified.
import heroImg from "../../assets/milinails_gallery/584396432_18409557901141258_4382440215725663460_n.jpg";

export default function Hero() {
    const bookingLink = "https://docs.google.com/forms/d/e/1FAIpQLSe1ThadDmbO3fhglFWV2-hOqOTr2u90QDt3gjU0KANbT0qsQg/viewform";

    return (
        <section className="relative h-screen flex items-center justify-center text-center px-6 overflow-hidden bg-black">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={heroImg}
                    alt="MiliNails Hero"
                    fill
                    priority
                    className="object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black"></div>

                {/* Subtle Particles/Glitter Effect (CSS based for performance or simple divs) */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight tracking-tight"
                >
                    Tus manos cuentan <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 italic pr-2">
                        tu historia.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-xl md:text-2xl text-gray-300 mb-12 font-light tracking-wide max-w-2xl mx-auto"
                >
                    Yo las hago brillar. Experiencia premium en cada detalle.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <a
                        href={bookingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative px-8 py-4 bg-fuchsia-800 text-white font-bold uppercase tracking-widest overflow-hidden rounded-sm transition-all hover:bg-fuchsia-700 hover:shadow-[0_0_30px_rgba(192,38,211,0.5)]"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <FaCalendarCheck /> Reservar Turno
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </a>

                    <a
                        href="#gallery"
                        className="px-8 py-4 bg-transparent border border-white/30 text-white font-bold uppercase tracking-widest hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300 backdrop-blur-sm"
                    >
                        Ver Trabajos
                    </a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm uppercase tracking-widest"
            >
                Scroll
            </motion.div>
        </section>
    );
}
