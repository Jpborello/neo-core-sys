import React from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import { Heart } from 'lucide-react';

const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
            <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-gray-400 hover:text-pink-500 transition-colors shadow-sm opacity-0 group-hover:opacity-100">
                <Heart size={18} />
            </button>
        </div>
        <div className="p-4">
            <p className="text-xs text-pink-500 font-medium uppercase tracking-wide mb-1">{product.category}</p>
            <h3 className="text-gray-800 font-medium truncate">{product.name}</h3>
            <div className="mt-2 flex items-center justify-between">
                <span className="text-gray-900 font-semibold">Consultar</span>
                <button className="text-sm text-gray-500 hover:text-pink-600 underline">Ver detalle</button>
            </div>
        </div>
    </div>
);

export default function Catalog() {
    const { category } = useParams();
    const { categories, products } = useProducts();

    const displayProducts = category ? categories[category] || [] : products;
    const title = category ? category : 'Todos los Productos';

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-serif text-gray-900">{title}</h1>
                <p className="mt-2 text-gray-500">
                    {displayProducts.length} productos encontrados
                </p>
            </div>

            {displayProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-xl">
                    <p className="text-gray-500 text-lg">No hay productos en esta categoría por el momento.</p>
                </div>
            )}
        </div>
    );
}
