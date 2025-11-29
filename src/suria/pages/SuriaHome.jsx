import React from 'react';
import { Link } from 'react-router-dom';

const SuriaHome = () => {
    return (
        <div className="font-sans">
            {/* Hero Section - Christmas Theme */}
            <div className="relative h-[600px] flex items-center justify-center bg-[#C40024] overflow-hidden">
                {/* Snow Effect */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute bg-white rounded-full opacity-70 animate-snow"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `-${Math.random() * 20}%`,
                                width: `${Math.random() * 10 + 5}px`,
                                height: `${Math.random() * 10 + 5}px`,
                                animationDuration: `${Math.random() * 5 + 5}s`,
                                animationDelay: `${Math.random() * 5}s`
                            }}
                        />
                    ))}
                </div>

                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543253687-c931c8e01820?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-multiply"></div>

                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                    <div className="mb-6 animate-bounce-slow">
                        <span className="text-6xl">🎅</span>
                    </div>
                    <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight drop-shadow-lg">
                        Se vienen las fiestas... <br />
                        <span className="italic text-gold-300">y en Suria lo sabemos</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 font-light tracking-wide drop-shadow-md">
                        Papá Noel trae ofertas increíbles para tu negocio.
                    </p>
                    <Link
                        to="/suria/catalogo"
                        className="inline-block bg-white text-[#C40024] px-10 py-4 font-bold tracking-[0.2em] hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-xl rounded-full"
                    >
                        VER CATÁLOGO FESTIVO
                    </Link>
                </div>
            </div>

            {/* Intro Section */}
            <div className="py-20 bg-white text-center">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="font-serif text-3xl text-gray-900 mb-6">Lencería Mayorista Premium</h2>
                    <p className="text-gray-600 leading-relaxed text-lg">
                        Descubrí nuestra colección exclusiva diseñada para potenciar tus ventas en esta temporada.
                        Calidad, diseño y precios directos de fábrica.
                    </p>
                </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                <div className="relative h-96 group overflow-hidden">
                    <img src="/suria/products/Lenceria/lenceria_1.png" alt="Conjuntos" className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition flex items-center justify-center">
                        <h3 className="text-white font-serif text-3xl tracking-wider">CONJUNTOS</h3>
                    </div>
                </div>
                <div className="relative h-96 group overflow-hidden">
                    <img src="/suria/products/Atrevidas/Atrevida_1.png" alt="Bodys" className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition flex items-center justify-center">
                        <h3 className="text-white font-serif text-3xl tracking-wider">ATREVIDAS</h3>
                    </div>
                </div>
                <div className="relative h-96 group overflow-hidden">
                    <img src="/suria/products/Pijamas/pijama_1.png" alt="Novedades" className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition flex items-center justify-center">
                        <h3 className="text-white font-serif text-3xl tracking-wider">PIJAMAS</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuriaHome;
