import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFilter, FaSearch } from 'react-icons/fa';
import { motorcycles } from '../data/motorcycles';

export default function Catalog() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedCondition, setSelectedCondition] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMotorcycles = motorcycles.filter(bike => {
        const matchesCategory = selectedCategory === 'all' || bike.category.toLowerCase() === selectedCategory;
        const matchesCondition = selectedCondition === 'all' || bike.condition === selectedCondition;
        const matchesSearch = bike.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bike.brand.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesCondition && matchesSearch;
    });

    return (
        <div className="bg-black min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">
                        <span className="text-white">CATÁLOGO </span>
                        <span className="text-red-600">COMPLETO</span>
                    </h1>
                    <p className="text-gray-400 text-lg">Encuentra tu moto ideal</p>
                    <div className="w-24 h-1 bg-red-600 mx-auto mt-6"></div>
                </div>

                {/* Filters */}
                <div className="bg-zinc-900 rounded-lg p-6 mb-12">
                    <div className="flex items-center gap-2 mb-6">
                        <FaFilter className="text-red-600" />
                        <h2 className="text-xl font-bold text-white">Filtros</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Search */}
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Buscar</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Marca o modelo..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 pl-10 rounded focus:outline-none focus:border-red-600 transition-colors"
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Categoría</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded focus:outline-none focus:border-red-600 transition-colors cursor-pointer"
                            >
                                <option value="all">Todas las categorías</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Condition Filter */}
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Condición</label>
                            <select
                                value={selectedCondition}
                                onChange={(e) => setSelectedCondition(e.target.value)}
                                className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded focus:outline-none focus:border-red-600 transition-colors cursor-pointer"
                            >
                                <option value="all">Todas</option>
                                <option value="0KM">0KM (Nuevas)</option>
                                <option value="Usada">Usadas</option>
                            </select>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mt-6 pt-6 border-t border-zinc-800">
                        <p className="text-gray-400 text-sm">
                            Mostrando <span className="text-red-600 font-bold">{filteredMotorcycles.length}</span> de {motorcycles.length} motos
                        </p>
                    </div>
                </div>

                {/* Motorcycles Grid */}
                {filteredMotorcycles.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-xl">No se encontraron motos con los filtros seleccionados</p>
                        <button
                            onClick={() => {
                                setSelectedCategory('all');
                                setSelectedCondition('all');
                                setSearchTerm('');
                            }}
                            className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-bold uppercase tracking-widest text-sm transition-all"
                        >
                            Limpiar Filtros
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredMotorcycles.map((bike, index) => (
                            <motion.div
                                key={bike.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group relative bg-zinc-900 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-red-600/20 transition-all"
                            >
                                {/* Condition Badge */}
                                <div className={`absolute top - 4 right - 4 z - 10 px - 3 py - 1 rounded - full text - xs font - bold uppercase ${bike.condition === '0KM' ? 'bg-red-600 text-white' : 'bg-yellow-500 text-black'} `}>
                                    {bike.condition}
                                </div>

                                {/* Mileage Badge (for used bikes) */}
                                {bike.condition === 'Usada' && (
                                    <div className="absolute top-4 left-4 z-10 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-bold">
                                        {bike.mileage.toLocaleString()} km
                                    </div>
                                )}

                                {/* Image */}
                                <div className="relative h-64 overflow-hidden bg-black">
                                    <img
                                        src={bike.image}
                                        alt={bike.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60"></div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-red-600 uppercase tracking-wide">{bike.category}</span>
                                        <span className="text-xs text-gray-500">{bike.year}</span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-600 transition-colors">{bike.name}</h3>
                                    <p className="text-gray-400 text-sm mb-4">{bike.brand} | {bike.model}</p>

                                    {/* Specs Grid */}
                                    <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-400 bg-zinc-800/50 p-3 rounded">
                                        <div className="flex items-center gap-1">
                                            <span className="text-red-600">●</span> {bike.specs.engine}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-red-600">●</span> {bike.specs.power}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-red-600">●</span> {bike.specs.transmission}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-red-600">●</span> {bike.specs.fuel}
                                        </div>
                                    </div>

                                    {/* Price and CTA */}
                                    <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide">Precio</p>
                                            <p className="text-3xl font-black text-red-600">${(bike.price / 1000000).toFixed(1)}M</p>
                                        </div>
                                        <a
                                            href={`https://wa.me/543413317035?text=Hola! Me interesa la ${bike.name} (${bike.year})`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded text-sm font-bold uppercase transition-all hover:scale-105"
                                        >
                                            Consultar
                                        </a >
                                    </div >
                                </div >
                            </motion.div >
                        ))}
                    </div >
                )}

                {/* CTA Section */}
                <div className="mt-20 bg-gradient-to-r from-red-600 to-red-800 rounded-lg p-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4 text-white">
                        ¿NO ENCONTRASTE LO QUE BUSCABAS?
                    </h2>
                    <p className="text-white/90 mb-6 text-lg">
                        Contactanos y te ayudamos a encontrar la moto perfecta para vos
                    </p>
                    <a
                        href="https://wa.me/543413317035?text=Hola! Necesito ayuda para encontrar una moto"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded font-bold uppercase tracking-widest text-sm transition-all shadow-xl"
                    >
                        Contactar por WhatsApp
                    </a>
                </div>
            </div >
        </div >
    );
}
