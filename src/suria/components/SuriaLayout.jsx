import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const SuriaLayout = () => {
    return (
        <div className="font-serif min-h-screen flex flex-col bg-white text-gray-900">
            {/* Navbar */}
            <nav className="bg-[#C40024] text-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <Link to="/suria" className="flex items-center gap-3">
                        <img src={logo} alt="Suria Lingerie" className="h-12 w-auto object-contain bg-white rounded px-1" />
                        <span className="text-2xl font-bold tracking-widest hidden sm:block">SURIA</span>
                    </Link>

                    <div className="flex items-center gap-6 text-sm font-sans tracking-wide">
                        <Link to="/suria" className="hover:text-gray-200 transition">INICIO</Link>
                        <Link to="/suria/catalogo" className="hover:text-gray-200 transition">CATÁLOGO</Link>
                        <Link to="/suria/checkout" className="hover:text-gray-200 transition">PEDIDO</Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-black text-white py-8 font-sans">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-400 text-sm mb-2">Mayorista de Lencería</p>
                    <p className="text-xl font-serif mb-4">SURIA</p>
                    <div className="flex justify-center gap-4 text-sm text-gray-500">
                        <a href="https://instagram.com/surialingerierosario" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Instagram</a>
                        <a href="https://wa.me/543417409310" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">WhatsApp</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default SuriaLayout;
