import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaWhatsapp, FaBars, FaTimes, FaShoppingBag } from 'react-icons/fa';

// Import logo - assuming it's in the public folder or we import it from src
// For now, let's use a text logo if image fails, or try to import the one we saved
import logoImg from '/src/assets/all_in_clusive/logo.jpg';

export default function Layout() {
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
    }, [location]);

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-600 selection:text-black">
            {/* Navbar */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-4 shadow-lg border-b border-white/10' : 'bg-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/demo-all-inclusive" className="relative z-50 group">
                        <div className="flex items-center gap-2">
                            <img src={logoImg} alt="All Inclusive" className="h-24 w-auto object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }} />
                            <div className="hidden text-2xl font-black tracking-tighter uppercase border-2 border-white px-2 py-1">
                                All<span className="text-yellow-500">Inclusive</span>
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 uppercase text-sm tracking-widest font-medium">
                        <Link to="/demo-all-inclusive" className="hover:text-yellow-500 transition-colors">Home</Link>
                        <Link to="/demo-all-inclusive/catalogo" className="hover:text-yellow-500 transition-colors">Colección</Link>
                        <Link to="/demo-all-inclusive/nosotros" className="hover:text-yellow-500 transition-colors">Nosotros</Link>
                        <Link to="/demo-all-inclusive/contacto" className="hover:text-yellow-500 transition-colors">Contacto</Link>
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center gap-4">
                        <a href="https://www.instagram.com/allinclusiveindumentaria/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500 transition-colors"><FaInstagram size={20} /></a>
                        <a href="#" className="hover:text-yellow-500 transition-colors"><FaFacebookF size={20} /></a>
                        <Link to="/demo-all-inclusive/catalogo" className="hover:text-yellow-500 transition-colors"><FaShoppingBag size={20} /></Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button className="md:hidden z-50 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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
                        <div className="flex flex-col gap-8 text-center text-2xl font-light tracking-widest uppercase">
                            <Link to="/demo-all-inclusive" className="hover:text-yellow-500">Home</Link>
                            <Link to="/demo-all-inclusive/catalogo" className="hover:text-yellow-500">Colección</Link>
                            <Link to="/demo-all-inclusive/nosotros" className="hover:text-yellow-500">Nosotros</Link>
                            <Link to="/demo-all-inclusive/contacto" className="hover:text-yellow-500">Contacto</Link>
                        </div>
                        <div className="flex gap-6 mt-12">
                            <a href="https://www.instagram.com/allinclusiveindumentaria/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500"><FaInstagram size={24} /></a>
                            <a href="#" className="text-gray-400 hover:text-yellow-500"><FaFacebookF size={24} /></a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="pt-0 min-h-screen">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-neutral-900 text-gray-400 py-12 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-white font-bold uppercase tracking-widest mb-4">All Inclusive</h3>
                        <p className="text-sm leading-relaxed">Indumentaria masculina premium. Estilo, calidad y elegancia para el hombre moderno.</p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest mb-4">Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/demo-all-inclusive/catalogo" className="hover:text-white transition-colors">Colección</Link></li>
                            <li><Link to="/demo-all-inclusive/nosotros" className="hover:text-white transition-colors">Sobre Nosotros</Link></li>
                            <li><Link to="/demo-all-inclusive/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest mb-4">Ayuda</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Envíos</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Cambios</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Talles</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest mb-4">Contacto</h4>
                        <ul className="space-y-2 text-sm">
                            <li>Mendoza 6440, Rosario</li>
                            <li>+54 341 284-4169</li>
                            <li className="flex gap-4 mt-4">
                                <a href="https://www.instagram.com/allinclusiveindumentaria/" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaInstagram size={20} /></a>
                                <a href="#" className="hover:text-white"><FaFacebookF size={20} /></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/5 text-center text-xs tracking-widest">
                    &copy; 2025 ALL INCLUSIVE MEN. TODOS LOS DERECHOS RESERVADOS.
                </div>
            </footer>

            {/* WhatsApp Button */}
            <a
                href="https://wa.me/543412844169"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all z-50 hover:scale-110 animate-bounce-slow"
            >
                <FaWhatsapp size={28} />
            </a>
        </div>
    );
}
