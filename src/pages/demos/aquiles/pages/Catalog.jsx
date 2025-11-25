import React, { useState } from 'react';
import { Filter, Search, ChevronDown, Zap, ArrowRight } from 'lucide-react';

export default function AquilesCatalog() {
    const [activeCategory, setActiveCategory] = useState('Todos');

    const categories = ['Todos', 'Iluminación LED', 'Cables', 'Térmicas', 'Tomacorrientes', 'Herramientas', 'Accesorios'];

    const products = [
        { id: 1, name: 'Panel LED 18W Redondo', category: 'Iluminación LED', price: 4500, image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=800&auto=format&fit=crop' },
        { id: 2, name: 'Cable Unipolar 2.5mm', category: 'Cables', price: 12500, image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800&auto=format&fit=crop' },
        { id: 3, name: 'Llave Térmica 2x25A', category: 'Térmicas', price: 8900, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop' },
        { id: 4, name: 'Kit Tomacorriente Doble', category: 'Tomacorrientes', price: 3200, image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=800&auto=format&fit=crop' },
        { id: 5, name: 'Reflector LED 50W', category: 'Iluminación LED', price: 15600, image: 'https://images.unsplash.com/photo-1563302111-eab4b145e6c9?q=80&w=800&auto=format&fit=crop' },
        { id: 6, name: 'Cinta Aisladora 20m', category: 'Accesorios', price: 1200, image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800&auto=format&fit=crop' },
        { id: 7, name: 'Lámpara Smart WiFi RGB', category: 'Iluminación LED', price: 9500, image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop' },
        { id: 8, name: 'Pinza Amperimétrica', category: 'Herramientas', price: 45000, image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=800&auto=format&fit=crop' },
    ];

    const filteredProducts = activeCategory === 'Todos'
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Catálogo de Productos</h1>
                        <p className="text-slate-500">Encontrá todo lo que necesitás para tu instalación.</p>
                    </div>
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
                            <div className="flex items-center gap-2 font-bold text-slate-900 mb-4">
                                <Filter size={20} />
                                Filtros
                            </div>
                            <div className="space-y-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all group overflow-hidden border border-slate-100">
                                    <div className="aspect-square relative overflow-hidden flex items-center justify-center">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <button className="absolute bottom-4 right-4 bg-white text-blue-600 p-2 rounded-full shadow-lg translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
                                            <ArrowRight size={20} />
                                        </button>
                                    </div>
                                    <div className="p-4">
                                        <div className="text-xs text-slate-500 mb-1">{product.category}</div>
                                        <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-blue-600">${product.price.toLocaleString()}</span>
                                            <span className="text-xs text-slate-400">Stock disponible</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
