import React, { useState } from 'react';
import { mockDriveData } from '../data/mockDriveData';
import ProductCard from '../components/ProductCard';
import CartSummary from '../components/CartSummary';

const SuriaCatalog = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredProducts = selectedCategory === 'all'
        ? mockDriveData.products
        : mockDriveData.products.filter(p => p.categoryId === selectedCategory);

    return (
        <div className="container mx-auto px-4 py-12 pb-32">
            <div className="flex flex-col md:flex-row gap-12">
                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <h2 className="font-serif text-2xl mb-6 border-b border-gray-200 pb-2">Categorías</h2>
                    <ul className="space-y-3 font-sans text-gray-600">
                        <li>
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className={`hover:text-[#C40024] transition ${selectedCategory === 'all' ? 'text-[#C40024] font-bold' : ''}`}
                            >
                                Ver Todo
                            </button>
                        </li>
                        {mockDriveData.categories.map(cat => (
                            <li key={cat.id}>
                                <button
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`hover:text-[#C40024] transition ${selectedCategory === cat.id ? 'text-[#C40024] font-bold' : ''}`}
                                >
                                    {cat.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Product Grid */}
                <div className="flex-grow">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                    {filteredProducts.length === 0 && (
                        <p className="text-center text-gray-500 py-20">No hay productos en esta categoría.</p>
                    )}
                </div>
            </div>
            <CartSummary />
        </div>
    );
};

export default SuriaCatalog;
