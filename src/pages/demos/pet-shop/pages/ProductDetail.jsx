import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaTruck, FaShieldAlt, FaCheck, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
import { products } from '../data/products';
import { useShop } from '../context/ShopContext';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useShop();
    const product = products.find(p => p.id === parseInt(id));

    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState(null);

    if (!product) {
        return <div className="p-20 text-center">Producto no encontrado</div>;
    }

    const handleAddToCart = () => {
        addToCart(product, quantity, selectedVariant);
    };

    return (
        <div className="bg-white min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 text-gray-500 hover:text-amber-500 font-medium flex items-center gap-2"
                >
                    ← Volver
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
                            <motion.img
                                key={activeImage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                src={product.images[activeImage]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImage(index)}
                                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImage === index ? 'border-amber-500 ring-2 ring-amber-200' : 'border-transparent hover:border-gray-300'}`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        <div className="mb-6">
                            <span className="text-amber-500 font-bold uppercase tracking-wide text-sm">{product.category}</span>
                            <h1 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4">{product.name}</h1>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex text-amber-400 text-sm">
                                    {'★'.repeat(Math.round(product.rating))}
                                    <span className="text-gray-300">{'★'.repeat(5 - Math.round(product.rating))}</span>
                                </div>
                                <span className="text-gray-500 text-sm">({product.reviews} reseñas)</span>
                            </div>
                            <div className="flex items-end gap-4 mb-8">
                                <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                                {product.compareAtPrice && (
                                    <span className="text-xl text-gray-400 line-through mb-1">${product.compareAtPrice}</span>
                                )}
                                {product.compareAtPrice && (
                                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold mb-1">
                                        AHORRÁS ${Math.round(product.compareAtPrice - product.price)}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="prose prose-gray mb-8">
                            <p>{product.description}</p>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="border-t border-b border-gray-100 py-8 mb-8 space-y-6">
                            <div className="flex items-center gap-6">
                                <span className="font-bold text-gray-700">Cantidad:</span>
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 py-2 hover:bg-gray-100 text-gray-600 transition-colors"
                                    ><FaMinus /></button>
                                    <span className="px-4 font-bold text-lg w-12 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-4 py-2 hover:bg-gray-100 text-gray-600 transition-colors"
                                    ><FaPlus /></button>
                                </div>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-amber-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-amber-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3"
                            >
                                <FaShoppingCart /> AGREGAR AL CARRITO
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <FaTruck className="text-amber-500 text-xl" />
                                <div>
                                    <p className="font-bold text-sm">Envío Gratis</p>
                                    <p className="text-xs text-gray-500">En compras mayores a $50.000</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <FaShieldAlt className="text-amber-500 text-xl" />
                                <div>
                                    <p className="font-bold text-sm">Garantía Total</p>
                                    <p className="text-xs text-gray-500">30 días de satisfacción</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
