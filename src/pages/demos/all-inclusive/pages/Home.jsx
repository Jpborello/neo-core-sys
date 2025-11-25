import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaShippingFast, FaUndo, FaShieldAlt } from 'react-icons/fa';
import heroImg from '../../../../assets/all_in_clusive/indumentaria1.jpg';
import lifestyleImg from '../../../../assets/all_in_clusive/indumentaria2.jpg';
import { products } from '../data/products';

export default function Home() {
    const featuredProducts = products.filter(p => p.isNew).slice(0, 3);

    return (
        <div className="bg-black">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={heroImg} alt="Hero background – All Inclusive Men" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
                </div>
                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <h2 className="text-yellow-500 font-bold tracking-[0.5em] uppercase mb-4 text-sm md:text-base">Nueva Colección 2025</h2>
                        <h1 className="text-5xl md:text-8xl font-black text-white mb-8 uppercase tracking-tighter leading-none">
                            Redefine tu <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Estilo</span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
                            Indumentaria masculina diseñada para quienes no siguen tendencias, las crean. Calidad premium, corte perfecto.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/demo-all-inclusive/catalogo" className="bg-white text-black px-10 py-4 font-bold uppercase tracking-widest hover:bg-yellow-500 transition-colors duration-300">
                                Ver Colección
                            </Link>
                            <Link to="/demo-all-inclusive/contacto" className="border border-white text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
                                Contacto
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Banner */}
            <div className="bg-neutral-900 py-12 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <FaShippingFast className="text-yellow-500 text-3xl" />
                            <h3 className="text-white font-bold uppercase tracking-widest">Envíos a todo el país</h3>
                            <p className="text-gray-400 text-sm">Recibí tu pedido donde estés, rápido y seguro.</p>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <FaUndo className="text-yellow-500 text-3xl" />
                            <h3 className="text-white font-bold uppercase tracking-widest">Cambios sin cargo</h3>
                            <p className="text-gray-400 text-sm">Si no te queda bien, lo cambiamos gratis.</p>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <FaShieldAlt className="text-yellow-500 text-3xl" />
                            <h3 className="text-white font-bold uppercase tracking-widest">Calidad Garantizada</h3>
                            <p className="text-gray-400 text-sm">Materiales premium y confección de primera.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Products */}
            <section className="py-24 bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Destacados</h2>
                            <div className="h-1 w-20 bg-yellow-500"></div>
                        </div>
                        <Link to="/demo-all-inclusive/catalogo" className="hidden md:flex items-center gap-2 text-gray-400 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold">
                            Ver todo <FaArrowRight />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredProducts.map(product => (
                            <div key={product.id} className="group cursor-pointer">
                                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 mb-6">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    {product.isNew && (
                                        <div className="absolute top-4 left-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 uppercase tracking-widest">New</div>
                                    )}
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <Link to="/demo-all-inclusive/catalogo" className="bg-white text-black px-8 py-3 font-bold uppercase tracking-widest hover:bg-yellow-500 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
                                            Ver Detalle
                                        </Link>
                                    </div>
                                </div>
                                <h3 className="text-white font-bold text-lg uppercase tracking-wide mb-1">{product.name}</h3>
                                <p className="text-gray-400 font-light">${product.price.toLocaleString('es-AR')}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 text-center md:hidden">
                        <Link to="/demo-all-inclusive/catalogo" className="inline-flex items-center gap-2 text-white border border-white px-8 py-3 uppercase tracking-widest text-sm font-bold">
                            Ver todo <FaArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Moodboard / Style Section */}
            <section className="py-24 bg-neutral-900 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="relative">
                            <div className="absolute -top-10 -left-10 w-40 h-40 border-2 border-yellow-500/20 z-0"></div>
                            <img src={lifestyleImg} alt="Estilo de vida – All Inclusive Men" className="relative z-10 w-full grayscale hover:grayscale-0 transition-all duration-700" />
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-500/10 z-0"></div>
                        </div>
                        <div>
                            <h2 className="text-yellow-500 font-bold tracking-[0.5em] uppercase mb-4 text-sm">Lifestyle</h2>
                            <h3 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tighter leading-tight">
                                Más que ropa, <br />una declaración.
                            </h3>
                            <p className="text-gray-400 text-lg mb-8 font-light leading-relaxed">
                                En All Inclusive Men creemos que el estilo es personal. Nuestra colección está curada para el hombre que busca destacar sin estridencias. Elegancia atemporal con un toque moderno.
                            </p>
                            <Link to="/demo-all-inclusive/nosotros" className="text-white border-b border-yellow-500 pb-1 hover:text-yellow-500 transition-colors uppercase tracking-widest text-sm font-bold">
                                Nuestra Historia
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
