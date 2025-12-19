import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
import { ArrowRight, Star, ShoppingBag } from 'lucide-react';
import TestimonialsSection from '../components/TestimonialsSection';

const CategoryCard = ({ title, image, link, color }) => (
    <Link to={link} className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 aspect-[4/5]">
        <div className={`absolute inset-0 ${color} opacity-20 group-hover:opacity-30 transition-opacity`} />
        <img src={image} alt={title} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-white text-xl font-medium font-serif">{title}</h3>
            <span className="text-white/90 text-sm mt-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                Ver productos <ArrowRight size={16} />
            </span>
        </div>
    </Link>
);

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

import { Heart } from 'lucide-react';

export default function Home() {
    const { categories, products } = useProducts();

    // Get one image for each category for the hero/category section
    const mamaImg = categories['Mamá']?.[0]?.image;
    const mueblesImg = categories['Muebles']?.[0]?.image;
    const juguetesImg = categories['Juguetes']?.[0]?.image;
    const accesoriosImg = categories['Accesorios']?.[0]?.image;

    // Get featured products (just taking first 4 for now)
    const featuredProducts = products.slice(0, 4);

    return (
        <div className="space-y-16 pb-16">
            {/* Hero Section */}
            <section className="relative bg-pink-50 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 bg-pink-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl font-serif">
                                    <span className="block xl:inline">Todo para tu bebé</span>{' '}
                                    <span className="block text-pink-500 xl:inline">y para vos</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-auto">
                                    Descubrí nuestra colección pensada para acompañarte en la maternidad. Desde la primera ropita hasta el cuarto de sus sueños.
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <Link to="/CuantoTeQuiero/categoria/Mamá" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-500 hover:bg-pink-600 md:py-4 md:text-lg transition-colors">
                                            Ver Colección
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <img
                        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                        src={mamaImg || "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"}
                        alt="Madre y bebé"
                    />
                </div>
            </section>

            {/* Categories Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-serif text-gray-900">Nuestras Categorías</h2>
                    <p className="mt-4 text-gray-500">Encontrá todo lo que necesitás en un solo lugar</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mamaImg && <CategoryCard title="Mamá" image={mamaImg} link="/CuantoTeQuiero/categoria/Mamá" color="bg-pink-200" />}
                    {mueblesImg && <CategoryCard title="Muebles" image={mueblesImg} link="/CuantoTeQuiero/categoria/Muebles" color="bg-blue-200" />}
                    {juguetesImg && <CategoryCard title="Juguetes" image={juguetesImg} link="/CuantoTeQuiero/categoria/Juguetes" color="bg-yellow-200" />}
                    {accesoriosImg && <CategoryCard title="Accesorios" image={accesoriosImg} link="/CuantoTeQuiero/categoria/Accesorios" color="bg-purple-200" />}
                </div>
            </section>

            {/* Featured Products */}
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-2xl font-serif text-gray-900">Destacados de la semana</h2>
                            <p className="mt-2 text-gray-500">Los favoritos de nuestras mamás</p>
                        </div>
                        <Link to="/CuantoTeQuiero/categoria/Mamá" className="text-pink-500 hover:text-pink-600 font-medium flex items-center gap-1">
                            Ver todo <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-pink-50 rounded-2xl p-8 md:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-pink-500 mb-4 shadow-sm">
                                <Star size={24} fill="currentColor" />
                            </div>
                            <h3 className="font-medium text-gray-900">Calidad Premium</h3>
                            <p className="text-sm text-gray-500 mt-2">Materiales seleccionados para el cuidado de tu bebé</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-pink-500 mb-4 shadow-sm">
                                <Heart size={24} fill="currentColor" />
                            </div>
                            <h3 className="font-medium text-gray-900">Hecho con Amor</h3>
                            <p className="text-sm text-gray-500 mt-2">Diseños pensados para la comodidad y seguridad</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-pink-500 mb-4 shadow-sm">
                                <ShoppingBag size={24} />
                            </div>
                            <h3 className="font-medium text-gray-900">Compra Segura</h3>
                            <p className="text-sm text-gray-500 mt-2">Tu satisfacción es nuestra prioridad</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Testimonials */}
            <TestimonialsSection />
        </div>
    );
}
