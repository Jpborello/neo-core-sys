import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPaw, FaShippingFast, FaShieldAlt, FaUndo } from 'react-icons/fa';
import { products } from '../../../components/demos/pet-shop/data/products';
import { useShop } from '../../../components/demos/pet-shop/context/ShopContext';

export default function Home() {
    const { addToCart } = useShop();
    const featuredProducts = products.slice(0, 4);

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=2000"
                        alt="Happy Dog"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-xl text-white"
                    >
                        <span className="bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-4 inline-block">
                            Nueva Colección 2025
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                            Amor en cada <br /> <span className="text-amber-400">Detalle</span>
                        </h1>
                        <p className="text-xl mb-8 text-gray-200">
                            Descubrí los mejores accesorios, juguetes y camas para consentir a tu mejor amigo. Calidad premium garantizada.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                to="/demo-petshop/catalog"
                                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
                            >
                                Ver Catálogo
                            </Link>
                            <Link
                                to="/demo-petshop/about"
                                className="bg-white/10 backdrop-blur-md border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg transition-all"
                            >
                                Nuestra Historia
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Strip */}
            <div className="bg-gray-50 py-12 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-amber-100 p-4 rounded-full mb-4 text-amber-500 text-3xl">
                                <FaShippingFast />
                            </div>
                            <h3 className="font-bold text-xl mb-2">Envío Rápido</h3>
                            <p className="text-gray-500">Recibí tu pedido en 24-48hs en todo el país.</p>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-amber-100 p-4 rounded-full mb-4 text-amber-500 text-3xl">
                                <FaShieldAlt />
                            </div>
                            <h3 className="font-bold text-xl mb-2">Garantía de Calidad</h3>
                            <p className="text-gray-500">Productos seleccionados y probados por expertos.</p>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-amber-100 p-4 rounded-full mb-4 text-amber-500 text-3xl">
                                <FaUndo />
                            </div>
                            <h3 className="font-bold text-xl mb-2">Devolución Fácil</h3>
                            <p className="text-gray-500">30 días para cambios sin preguntas.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Products */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-amber-500 font-bold uppercase tracking-wider text-sm">Favoritos del Mes</span>
                        <h2 className="text-4xl font-extrabold text-gray-900 mt-2">Lo Más Vendido</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product) => (
                            <div key={product.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col">
                                <div className="relative aspect-square overflow-hidden bg-gray-100">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {product.compareAtPrice && (
                                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            OFERTA
                                        </span>
                                    )}
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="absolute bottom-4 right-4 bg-white text-gray-900 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-amber-500 hover:text-white"
                                    >
                                        <FaPaw className="text-xl" />
                                    </button>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="text-xs text-gray-500 mb-2 uppercase font-bold tracking-wide">{product.category}</div>
                                    <Link to={`/demo-petshop/product/${product.id}`} className="block">
                                        <h3 className="font-bold text-lg text-gray-900 mb-2 hover:text-amber-500 transition-colors line-clamp-2">
                                            {product.name}
                                        </h3>
                                    </Link>
                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-bold text-gray-900">${product.price}</span>
                                            {product.compareAtPrice && (
                                                <span className="text-sm text-gray-400 line-through">${product.compareAtPrice}</span>
                                            )}
                                        </div>
                                        <div className="flex text-amber-400 text-sm">
                                            {'★'.repeat(Math.round(product.rating))}
                                            <span className="text-gray-300">{'★'.repeat(5 - Math.round(product.rating))}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to="/demo-petshop/catalog"
                            className="inline-block border-2 border-gray-900 text-gray-900 px-10 py-3 rounded-full font-bold hover:bg-gray-900 hover:text-white transition-colors uppercase tracking-wide"
                        >
                            Ver Todo el Catálogo
                        </Link>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="bg-amber-500 py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pattern-dots"></div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <FaPaw className="text-6xl text-white/30 mx-auto mb-6" />
                    <h2 className="text-4xl font-extrabold text-white mb-4">Unite al Club PetStore</h2>
                    <p className="text-xl text-white/90 mb-8">
                        Recibí tips de cuidado, noticias y un <span className="font-bold bg-white/20 px-2 rounded">10% OFF</span> en tu primera compra.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                        <input
                            type="email"
                            placeholder="Tu correo electrónico"
                            className="flex-1 px-6 py-4 rounded-full focus:outline-none focus:ring-4 focus:ring-amber-300 text-gray-900"
                        />
                        <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors shadow-lg">
                            Suscribirme
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
