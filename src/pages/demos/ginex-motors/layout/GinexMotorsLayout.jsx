import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaWhatsapp, FaBars, FaTimes, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import logoMoto from '/src/assets/logo_moto.jpg';

export default function GinexMotorsLayout() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-500 selection:text-black">
            {/* Navbar */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/95 backdrop-blur-md py-3 shadow-lg shadow-yellow-900/20 border-b border-yellow-600/30' : 'bg-transparent py-5'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/ginex-motors" className="relative z-50 group">
                        <div className="flex items-center gap-3">
                            <img src={logoMoto} alt="Ginex Motors" className="h-14 w-auto object-contain" />
                            <div className="h-8 w-1 bg-yellow-500 group-hover:h-10 transition-all"></div>
                            <span className="text-xs text-gray-400 uppercase tracking-widest hidden md:block">Motos 0KM & Usadas</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 uppercase text-sm tracking-widest font-bold">
                        <Link to="/ginex-motors" className="hover:text-yellow-500 transition-colors relative group">
                            Home
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all"></span>
                        </Link>
                        <Link to="/ginex-motors/catalogo" className="hover:text-yellow-500 transition-colors relative group">
                            Catálogo
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all"></span>
                        </Link>
                        <a href="#servicios" className="hover:text-yellow-500 transition-colors relative group">
                            Servicios
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all"></span>
                        </a>
                        <a href="#contacto" className="hover:text-yellow-500 transition-colors relative group">
                            Contacto
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all"></span>
                        </a>
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center gap-4">
                        <a href="https://www.instagram.com/ginexmotors/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500 transition-colors">
                            <FaInstagram size={22} />
                        </a>
                        <a href="tel:+543413317035" className="hover:text-yellow-500 transition-colors">
                            <FaPhone size={20} />
                        </a>
                    </div>

                    {/* Mobile Toggle */}
                    <button className="md:hidden z-50 text-white hover:text-yellow-500 transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-black flex flex-col justify-center items-center md:hidden"
                    >
                        <div className="flex flex-col gap-8 text-center text-2xl font-bold tracking-widest uppercase">
                            <Link to="/ginex-motors" className="hover:text-yellow-500 transition-colors">Home</Link>
                            <Link to="/ginex-motors/catalogo" className="hover:text-yellow-500 transition-colors">Catálogo</Link>
                            <a href="#servicios" className="hover:text-yellow-500 transition-colors">Servicios</a>
                            <a href="#contacto" className="hover:text-yellow-500 transition-colors">Contacto</a>
                        </div>
                        <div className="flex gap-6 mt-12">
                            <a href="https://www.instagram.com/ginexmotors/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500 transition-colors">
                                <FaInstagram size={28} />
                            </a>
                            <a href="tel:+543413317035" className="text-gray-400 hover:text-yellow-500 transition-colors">
                                <FaPhone size={26} />
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="pt-0 min-h-screen">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-zinc-950 text-gray-400 py-16 border-t border-yellow-600/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div>
                            <img src={logoMoto} alt="Ginex Motors" className="h-12 w-auto object-contain mb-4" />
                            <p className="text-sm leading-relaxed">Tu concesionaria de confianza. Motos nuevas y usadas con la mejor atención y garantía del mercado.</p>
                        </div>
                        <div>
                            <h4 className="text-yellow-500 font-bold uppercase tracking-widest mb-4 text-sm">Navegación</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/ginex-motors" className="hover:text-white transition-colors">Home</Link></li>
                                <li><Link to="/ginex-motors/catalogo" className="hover:text-white transition-colors">Catálogo Completo</Link></li>
                                <li><a href="#servicios" className="hover:text-white transition-colors">Servicios</a></li>
                                <li><a href="#contacto" className="hover:text-white transition-colors">Contacto</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-yellow-500 font-bold uppercase tracking-widest mb-4 text-sm">Servicios</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Financiación</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Transferencias</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Garantías</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Repuestos</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-yellow-500 font-bold uppercase tracking-widest mb-4 text-sm">Contacto</h4>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center gap-2">
                                    <FaPhone className="text-yellow-500" />
                                    <a href="tel:+543413317035" className="hover:text-white transition-colors">+54 341 331-7035</a>
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-yellow-500" />
                                    <span>Rosario, Santa Fe</span>
                                </li>
                                <li className="flex gap-4 mt-4">
                                    <a href="https://www.instagram.com/ginexmotors/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500 transition-colors">
                                        <FaInstagram size={20} />
                                    </a>
                                    <a href="https://wa.me/543413317035" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500 transition-colors">
                                        <FaWhatsapp size={20} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-yellow-600/10 text-center text-xs tracking-widest">
                        © 2025 GINEX MOTORS. TODOS LOS DERECHOS RESERVADOS.
                    </div>
                </div>
            </footer>

            {/* WhatsApp Floating Button */}
            <a
                href="https://wa.me/543413317035?text=Hola! Estoy interesado en consultar por una moto"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 bg-yellow-500 text-black p-4 rounded-full shadow-lg shadow-yellow-600/50 hover:bg-yellow-600 hover:shadow-yellow-600/70 transition-all z-50 hover:scale-110 group"
            >
                <FaWhatsapp size={28} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            </a>
        </div>
    );
}
