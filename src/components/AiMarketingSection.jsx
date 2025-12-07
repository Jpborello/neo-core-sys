import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';

// Import Videos
import nailsVideo from '../assets/videos/Uñas.mp4';
import shoesVideo from '../assets/videos/Shoes.mp4';
import bagVideo from '../assets/videos/Bolso.mp4';
import perfumeVideo from '../assets/videos/perfume.mp4';

const VideoCard = ({ videoSrc, label, category }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0; // Reset logic if desired, or just pause
            setIsPlaying(false);
        }
    };

    return (
        <motion.div
            className="relative group rounded-2xl overflow-hidden cursor-pointer aspect-[9/16] md:aspect-[3/4] lg:aspect-[9/16]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            {/* Video Element */}
            <video
                ref={videoRef}
                src={videoSrc}
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay / Play Button (Visible when NOT playing) */}
            <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                    <Play fill="white" className="text-white ml-1" size={32} />
                </div>
            </div>

            {/* Content Overlay (Always visible or visible on hover? Design choice: Always visible at bottom for context) */}
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1 block">{category}</span>
                <h3 className="text-xl font-bold text-white">{label}</h3>
            </div>
        </motion.div>
    );
};

const AiMarketingSection = () => {
    const demos = [
        { id: 1, label: "Las Manitos de Mili", category: "Belleza & Estética", video: nailsVideo },
        { id: 2, label: "Moda Urbana", category: "E-commerce", video: shoesVideo },
        { id: 3, label: "DistriNet Dashboard", category: "Software & SaaS", video: bagVideo }, // Placeholder mapping as agreed
        { id: 4, label: "Gastronomía", category: "Restaurantes", video: perfumeVideo }, // Placeholder mapping as agreed
    ];

    return (
        <section className="py-24 px-6 w-full bg-gray-900 border-t border-gray-800">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        NeoStudios: <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">Marketing Digital con IA</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Creamos spots publicitarios de nivel cinematográfico para tu negocio. <br className="hidden md:block" />
                        <span className="text-gray-200">Sin rodajes costosos, solo creatividad e Inteligencia Artificial.</span>
                    </p>
                </motion.div>

                {/* Video Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {demos.map((demo) => (
                        <VideoCard
                            key={demo.id}
                            videoSrc={demo.video}
                            label={demo.label}
                            category={demo.category}
                        />
                    ))}
                </div>

                {/* CTA Button */}
                <div className="flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-orange-500/25 flex items-center gap-3 transition-all"
                    >
                        Solicitar Presupuesto de Video <ArrowRight size={20} />
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default AiMarketingSection;
