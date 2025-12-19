import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Heart } from 'lucide-react';
import logo from '../../../assets/cuanto-te-quiero/logo.jpg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Inicio', path: '/CuantoTeQuiero' },
        { name: 'Mamá', path: '/CuantoTeQuiero/categoria/Mamá' },
        { name: 'Bebé', path: '/CuantoTeQuiero/categoria/Indumentaria' }, // Assuming we might split later, for now mapping to existing logic
        { name: 'Muebles', path: '/CuantoTeQuiero/categoria/Muebles' },
        { name: 'Juguetes', path: '/CuantoTeQuiero/categoria/Juguetes' },
    ];

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/CuantoTeQuiero" className="flex-shrink-0 flex items-center gap-3">
                            <img className="h-12 w-auto rounded-full" src={logo} alt="Cuanto Te Quiero" />
                            <span className="font-serif text-2xl text-gray-800 tracking-wide hidden sm:block">Cuanto Te Quiero</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-gray-600 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === link.path ? 'text-pink-500 font-semibold' : ''
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <button className="p-2 text-gray-400 hover:text-pink-500 transition-colors">
                            <Heart className="h-6 w-6" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-pink-500 transition-colors relative">
                            <ShoppingBag className="h-6 w-6" />
                            <span className="absolute top-1 right-1 bg-pink-400 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
                        </button>
                    </div>

                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className="text-gray-600 hover:text-pink-500 block px-3 py-2 rounded-md text-base font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

import WhatsAppButton from './WhatsAppButton';
import { Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-pink-50 mt-auto relative">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                        <h3 className="text-lg font-serif text-gray-800 mb-4">Cuanto Te Quiero</h3>
                        <p className="text-gray-500 text-sm">
                            Todo para tu bebé y para vos. Acompañándote en la etapa más linda de la vida con productos pensados con amor.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">Categorías</h3>
                        <ul className="space-y-2">
                            <li><Link to="/CuantoTeQuiero/categoria/Mamá" className="text-gray-600 hover:text-pink-500 text-sm">Mamá</Link></li>
                            <li><Link to="/CuantoTeQuiero/categoria/Muebles" className="text-gray-600 hover:text-pink-500 text-sm">Muebles</Link></li>
                            <li><Link to="/CuantoTeQuiero/categoria/Juguetes" className="text-gray-600 hover:text-pink-500 text-sm">Juguetes</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">Contacto</h3>
                        <p className="text-gray-500 text-sm mb-2">📍 Mendoza 6378 - ROSARIO</p>
                        <a href="https://wa.me/543416199597" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 text-sm mb-2 block transition-colors">📞 +54 341 619-9597</a>
                        <a href="https://www.instagram.com/cuanto_tequiero/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 text-sm flex items-center justify-center md:justify-start gap-2 mt-2">
                            <Instagram size={18} /> @cuanto_tequiero
                        </a>
                    </div>
                </div>
                <div className="mt-8 border-t border-pink-100 pt-8 text-center">
                    <p className="text-gray-400 text-sm">&copy; 2024 Cuanto Te Quiero. Todos los derechos reservados.</p>
                </div>
            </div>
            <WhatsAppButton />
        </footer>
    );
};

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
