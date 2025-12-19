import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaCheckCircle, FaCreditCard, FaMoneyBillWave, FaIdCard, FaInstagram, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { motos } from '../data/motos';

export default function Home() {
    const [selectedMoto, setSelectedMoto] = useState(null);

    const whatsappNumber = "543417981212";
    const getWhatsappLink = (motoId) => {
        const text = `Hola Juan Pablo, me interesa la moto de la foto #${motoId}`;
        return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    };

    const generalWhatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola Juan Pablo, quiero consultar por una moto.")}`;

    const testimonials = [
        {
            name: "Martín G.",
            text: "Excelente atención de Juan Pablo. Me llevé mi primera moto solo con el DNI. Súper recomendable!",
            rating: 5
        },
        {
            name: "Sofía L.",
            text: "Muy buena variedad de motos usadas en perfecto estado. La financiación me salvó.",
            rating: 5
        },
        {
            name: "Lucas R.",
            text: "Rápido, fácil y transparente. En el día ya estaba andando en mi moto nueva.",
            rating: 5
        }
    ];

    return (
        <div className="bg-gray-50 text-gray-800 min-h-screen font-sans">
            {/* Hero Banner */}
            <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white py-16 px-4 overflow-hidden shadow-xl">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <div className="max-w-6xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight uppercase">
                            Vivi la Experiencia <span className="text-yellow-400">HG Motos!</span>
                        </h1>

                        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8 text-sm md:text-lg font-medium">
                            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-3 border border-white/20">
                                <FaMoneyBillWave className="text-green-400 text-xl" />
                                <span>Créditos personales en cuotas</span>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-3 border border-white/20">
                                <FaCreditCard className="text-blue-300 text-xl" />
                                <span>Tarjetas de crédito y efectivo</span>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-3 border border-white/20">
                                <FaIdCard className="text-yellow-400 text-xl" />
                                <span>Financiación solo con DNI</span>
                            </div>
                        </div>

                        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
                            <motion.a
                                href={generalWhatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors text-lg uppercase tracking-wide"
                            >
                                <FaWhatsapp className="text-2xl" /> Contactar Ahora
                            </motion.a>
                            <motion.a
                                href="https://www.instagram.com/cumpliendometashg/"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors text-lg uppercase tracking-wide"
                            >
                                <FaInstagram className="text-2xl" /> Seguinos en Insta
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Photo Book Grid */}
            <section className="py-12 px-4 max-w-[1600px] mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800 uppercase tracking-tight">Nuestro Catálogo</h2>
                    <div className="w-24 h-1 bg-yellow-400 mx-auto mt-4"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {motos.map((moto) => (
                        <motion.div
                            key={moto.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3 }}
                            className="relative group aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                            onClick={() => setSelectedMoto(moto)}
                        >
                            <img
                                src={moto.image}
                                alt={`Moto ${moto.id}`}
                                className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />

                            {/* Overlay on Hover */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="bg-white/90 text-black font-bold px-4 py-2 rounded-full text-sm uppercase tracking-wider shadow-lg">
                                        Ver Detalle
                                    </span>
                                </div>
                            </div>

                            {/* Whatsapp Button (Always visible on mobile, hover on desktop) */}
                            <a
                                href={getWhatsappLink(moto.id)}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="absolute bottom-3 right-3 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors z-10 hover:scale-110"
                                title="Consultar por WhatsApp"
                            >
                                <FaWhatsapp className="text-xl" />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 uppercase tracking-tight">Lo que dicen nuestros clientes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100"
                            >
                                <div className="flex text-yellow-400 mb-4">
                                    {[...Array(t.rating)].map((_, i) => <FaStar key={i} />)}
                                </div>
                                <p className="text-gray-600 mb-6 italic">"{t.text}"</p>
                                <p className="font-bold text-gray-900">- {t.name}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Location Section */}
            <section className="py-16 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <FaMapMarkerAlt className="text-5xl text-yellow-400 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold mb-4 uppercase">Vení a visitarnos</h2>
                    <p className="text-xl text-gray-300 mb-8">Estamos en Rosario. ¡Te esperamos para que elijas tu próxima moto!</p>

                    <div className="bg-gray-800 p-2 rounded-xl shadow-2xl mb-8">
                        {/* Placeholder for map or just a nice button if map is tricky */}
                        <div className="aspect-video w-full bg-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=1200&q=80"
                                alt="Mapa Rosario"
                                className="w-full h-full object-cover opacity-50"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <a
                                    href="https://share.google/rs1A2JNjWxkzHHZGQ"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-gray-900 font-bold py-3 px-8 rounded-full shadow-xl hover:bg-gray-100 transition-colors flex items-center gap-2"
                                >
                                    <FaMapMarkerAlt className="text-red-500" /> Ver Ubicación en Google Maps
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-6">
                        <a href="https://www.instagram.com/cumpliendometashg/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors text-3xl">
                            <FaInstagram />
                        </a>
                        <a href={generalWhatsappLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors text-3xl">
                            <FaWhatsapp />
                        </a>
                    </div>
                    <p className="mt-8 text-gray-500 text-sm">© 2024 HG Motos. Todos los derechos reservados.</p>
                </div>
            </section>

            {/* Image Modal */}
            <AnimatePresence>
                {selectedMoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
                        onClick={() => setSelectedMoto(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl w-full h-full max-h-[90vh] flex flex-col items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-0 right-0 m-4 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 z-20 transition-colors"
                                onClick={() => setSelectedMoto(null)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="relative w-full h-full flex items-center justify-center">
                                <img
                                    src={selectedMoto.image}
                                    alt={`Moto ${selectedMoto.id}`}
                                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                />

                                {/* Badge Overlay */}
                                <div className="absolute top-4 left-4 bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-bold uppercase tracking-wider shadow-lg">
                                    {selectedMoto.condition || 'Consultar'}
                                </div>
                            </div>

                            <div className="mt-6">
                                <a
                                    href={getWhatsappLink(selectedMoto.id)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-12 rounded-full shadow-xl transition-transform hover:scale-105 text-xl uppercase"
                                >
                                    <FaWhatsapp className="text-3xl" /> Consultar por esta moto
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
