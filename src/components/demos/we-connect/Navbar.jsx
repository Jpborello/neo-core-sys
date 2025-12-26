'use client';
import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const { scrollY } = useScroll();
    const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);
    const backdropBlur = useTransform(scrollY, [0, 100], [0, 10]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <motion.nav
                style={{ backgroundColor: `rgba(0,0,0,${bgOpacity})`, backdropFilter: `blur(${backdropBlur}px)` }}
                className="fixed top-0 left-0 w-full z-50 transition-all border-b border-transparent"
                role="navigation"
                aria-label="Main Navigation"
            >
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <a href="/demo-wec" className="font-black text-2xl tracking-tighter text-white z-50 relative" aria-label="We Connect Home">
                        WE<span className="text-blue-500">CONNECT</span>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-8 text-sm font-bold text-neutral-300">
                        <a href="#about" className="hover:text-white transition-colors">AGENCIA</a>
                        <a href="#services" className="hover:text-white transition-colors">SERVICIOS</a>
                        <a href="#process" className="hover:text-white transition-colors">METODOLOGÍA</a>
                        <a href="#contact" className="px-4 py-2 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors">CONTACTO</a>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-white z-50 relative"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        <a onClick={() => setIsMenuOpen(false)} href="#about" className="text-2xl font-bold text-white hover:text-blue-500">AGENCIA</a>
                        <a onClick={() => setIsMenuOpen(false)} href="#services" className="text-2xl font-bold text-white hover:text-blue-500">SERVICIOS</a>
                        <a onClick={() => setIsMenuOpen(false)} href="#process" className="text-2xl font-bold text-white hover:text-blue-500">METODOLOGÍA</a>
                        <a onClick={() => setIsMenuOpen(false)} href="#contact" className="px-8 py-3 bg-white text-black rounded-full font-bold text-xl">CONTACTO</a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
