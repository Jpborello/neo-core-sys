import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight, X, Maximize2, Volume2 } from 'lucide-react';

// Import Videos
// Import Videos replaced with Supabase Storage links
const nailsVideo = 'https://res.cloudinary.com/dzyjtal3k/video/upload/v1766605270/Nails_ua8qry.mp4';
const shoesVideo = 'https://res.cloudinary.com/dzyjtal3k/video/upload/v1766605273/Shoes_nwbeih.mp4';
const bagVideo = 'https://res.cloudinary.com/dzyjtal3k/video/upload/Bolso_t2mqro.mp4';
const perfumeVideo = 'https://res.cloudinary.com/dzyjtal3k/video/upload/v1766605270/perfume_wh3mz6.mp4';

const VideoModal = ({ videoSrc, onClose }) => {
    // Close on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-5xl rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-white/20 text-white rounded-full transition-colors"
                >
                    <X size={24} />
                </button>

                <video
                    src={videoSrc}
                    className="w-full h-auto max-h-[85vh] object-contain"
                    controls
                    autoPlay
                    playsInline
                />
            </motion.div>
        </motion.div>
    );
};

const VideoCard = ({ videoSrc, label, category, onClick }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => { }); // Ignore autoplay errors
            setIsPlaying(true);
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    return (
        <motion.div
            className="relative group rounded-2xl overflow-hidden cursor-pointer aspect-[9/16] md:aspect-[3/4] lg:aspect-[9/16] border border-white/5 hover:border-orange-500/50 transition-colors"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            {/* Video Element (Preview) */}
            <video
                ref={videoRef}
                src={videoSrc}
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />

            {/* Hover Overlay: Play Icon */}
            <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                    <Play fill="white" className="text-white ml-1" size={32} />
                </div>
            </div>

            {/* Hover Action Hint (Click to Expand) */}
            <div className={`absolute top-4 right-4 bg-black/60 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0`}>
                <Maximize2 className="text-white" size={20} />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <div className="flex justify-between items-end">
                    <div>
                        <span className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1 block">{category}</span>
                        <h3 className="text-xl font-bold text-white">{label}</h3>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const AiMarketingSection = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);

    const demos = [
        { id: 1, label: "Las Manitos de Mili", category: "Belleza & Estética", video: nailsVideo },
        { id: 2, label: "Moda Urbana", category: "E-commerce", video: shoesVideo },
        { id: 3, label: "DistriNet Dashboard", category: "Software & SaaS", video: bagVideo },
        { id: 4, label: "Gastronomía", category: "Restaurantes", video: perfumeVideo },
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
                            onClick={() => setSelectedVideo(demo.video)}
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

            {/* Lightbox / Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <VideoModal
                        videoSrc={selectedVideo}
                        onClose={() => setSelectedVideo(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default AiMarketingSection;
