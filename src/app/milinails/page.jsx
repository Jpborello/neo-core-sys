'use client';

export const runtime = 'edge';

import { useEffect } from "react";
import { FaCalendarCheck } from "react-icons/fa";
import Link from "next/link";

// Components from src/components/demos/milinails
import Hero from "../../components/demos/milinails/Hero";
import About from "../../components/demos/milinails/About";
import Services from "../../components/demos/milinails/Services";
import Gallery from "../../components/demos/milinails/Gallery";
import Testimonials from "../../components/demos/milinails/Testimonials";
import Contact from "../../components/demos/milinails/Contact";
import Footer from "../../components/demos/milinails/Footer";

// Asset
// Assuming logo is in public or imported. For now using placeholder or fixed path if available.
// If the original page imported correct logo, we should try to match.
// Original import: import logo from "../../assets/milinails_logo.png";
// New relative path from app/milinails: ../../../assets/milinails_logo.png
import logo from "../../assets/milinails_logo.png";

export default function MiliNailsPage() {
    // SEO & Title Management
    useEffect(() => {
        document.title = "MiliNails | Uñas Premium en Rosario";
    }, []);

    const bookingLink = "https://docs.google.com/forms/d/e/1FAIpQLSe1ThadDmbO3fhglFWV2-hOqOTr2u90QDt3gjU0KANbT0qsQg/viewform";

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-fuchsia-500 selection:text-white overflow-x-hidden scroll-smooth">

            {/* FLOATING BOOKING BUTTON */}
            <a
                href={bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-3 px-6 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.5)] hover:scale-110 transition-transform flex items-center gap-2 animate-pulse"
            >
                <FaCalendarCheck /> <span className="hidden sm:inline">Reservar Turno</span>
            </a>

            {/* NAVBAR */}
            <nav className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 max-w-7xl mx-auto">
                <Link href="/" className="group">
                    <img
                        src={logo.src}
                        alt="MiliNails Logo"
                        className="h-12 md:h-16 w-auto object-contain drop-shadow-lg group-hover:scale-105 transition-transform"
                    />
                </Link>
                <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                    <a href="#about" className="hover:text-white hover:text-shadow-glow transition-all">Sobre Mí</a>
                    <a href="#services" className="hover:text-white hover:text-shadow-glow transition-all">Servicios</a>
                    <a href="#gallery" className="hover:text-white hover:text-shadow-glow transition-all">Galería</a>
                    <a href="#contact" className="hover:text-white hover:text-shadow-glow transition-all">Contacto</a>
                </div>
            </nav>

            {/* SECTIONS */}
            <Hero />
            <About />
            <Services />
            <Gallery />
            <Testimonials />
            <Contact />
            <Footer />

        </div>
    );
}
