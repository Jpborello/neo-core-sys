import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram, FaTimes, FaExpand } from "react-icons/fa";
import Image from "next/image";

// Import images
import img1 from "../../assets/milinails_gallery/571755296_18405628063141258_6293387730718516622_n.jpg";
import img2 from "../../assets/milinails_gallery/573784776_18406262713141258_3763569287313892057_n.jpg";
import img3 from "../../assets/milinails_gallery/573810205_18406731754141258_429043636705921679_n.jpg";
import img4 from "../../assets/milinails_gallery/574648984_18406731652141258_6371759511643176455_n.jpg";
import img5 from "../../assets/milinails_gallery/584160237_18409556755141258_7272328860586625606_n.jpg";
import img6 from "../../assets/milinails_gallery/584180623_18409557043141258_4079004623399829127_n.jpg";
import img7 from "../../assets/milinails_gallery/584396432_18409557901141258_4382440215725663460_n.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7];

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <section id="gallery" className="py-24 px-6 bg-zinc-950">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
                        Galería de <span className="text-yellow-400">Trabajos</span>
                    </h2>
                    <p className="text-gray-400">Inspiración para tu próximo diseño.</p>
                </motion.div>

                {/* MASONRY / GRID LAYOUT */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[300px]">
                    {images.map((src, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                            layoutId={`image-${index}`}
                            onClick={() => setSelectedImage(src)}
                            className={`relative group cursor-pointer overflow-hidden rounded-xl bg-zinc-900 ${index % 3 === 0 ? 'md:row-span-2' : ''}`}
                        >
                            <Image
                                src={src}
                                alt={`Nail Art ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <FaExpand className="text-white text-3xl drop-shadow-lg" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <a
                        href="https://www.instagram.com/las_manitosde_mili/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-yellow-400 border-b border-yellow-400 pb-1 hover:text-white hover:border-white transition-colors uppercase tracking-widest text-sm font-bold"
                    >
                        <FaInstagram /> Ver más en Instagram
                    </a>
                </div>
            </div>

            {/* LIGHTBOX MODAL */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <button
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <FaTimes className="text-4xl" />
                        </button>
                        <div className="relative w-full max-w-4xl h-[80vh]">
                            <Image
                                src={selectedImage} // Next.js Image works with import object here too
                                alt="Full screen"
                                fill
                                className="object-contain"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
