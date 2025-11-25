import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { FaFilter } from 'react-icons/fa';

export default function Catalog() {
    const [filter, setFilter] = useState('Todos');
    const categories = ['Todos', ...new Set(products.map(p => p.category))];

    const filteredProducts = filter === 'Todos'
        ? products
        : products.filter(p => p.category === filter);

    const handleBuy = (product) => {
        // Mercado Pago Demo Link (simulated)
        const message = `Hola! Quiero comprar: ${product.name} - $${product.price}`;
        const whatsappUrl = `https://wa.me/543412844169?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="bg-black min-h-screen pt-24 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">Colección</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto font-light">
                        Explorá nuestra selección de prendas premium. Calidad y diseño en cada detalle.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 uppercase tracking-widest text-sm font-bold border transition-all duration-300 ${filter === cat
                                ? 'bg-white text-black border-white'
                                : 'bg-transparent text-gray-400 border-gray-800 hover:border-white hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {filteredProducts.map((product) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key={product.id}
                            className="group"
                        >
                            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 mb-4">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {product.isNew && (
                                    <div className="absolute top-3 left-3 bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                                        New
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-1">{product.name}</h3>
                                    <p className="text-gray-500 text-xs uppercase tracking-widest">{product.category}</p>
                                </div>
                                <span className="text-white font-light">${product.price.toLocaleString('es-AR')}</span>
                            </div>
                            <button
                                onClick={() => handleBuy(product)}
                                className="w-full bg-white text-black py-3 font-bold uppercase tracking-widest text-xs hover:bg-yellow-500 transition-colors mt-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300"
                            >
                                Comprar Ahora
                            </button>
                            {/* Mobile Buy Button (Always visible) */}
                            <button
                                onClick={() => handleBuy(product)}
                                className="md:hidden w-full border border-white/20 text-white py-3 font-bold uppercase tracking-widest text-xs mt-4"
                            >
                                Comprar
                            </button>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
