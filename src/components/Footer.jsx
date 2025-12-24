"use client";

import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaLinkedin, FaWhatsapp, FaGithub } from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-[#0a0a0a] border-t border-white/5 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                {/* BRAND */}
                <div className="md:col-span-1">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
                        Neo-Core-Sys
                    </h2>
                    <p className="text-gray-400 text-sm mb-6">
                        Transformamos negocios con tecnología de punta. Desarrollo Web, Apps Móviles e Inteligencia Artificial en Rosario para el mundo.
                    </p>
                    <div className="flex gap-4">
                        <SocialLink href="https://www.instagram.com/neocoresystem/" icon={<FaInstagram />} label="Instagram" />
                        <SocialLink href="https://wa.me/543417981212" icon={<FaWhatsapp />} label="WhatsApp" />
                        <SocialLink href="https://github.com/jpborello" icon={<FaGithub />} label="GitHub" />
                        <SocialLink href="https://linkedin.com" icon={<FaLinkedin />} label="LinkedIn" />
                    </div>
                </div>

                {/* SERVICIOS */}
                <div>
                    <h3 className="text-white font-bold mb-4">Soluciones</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><FooterLink href="#services">Desarrollo Web</FooterLink></li>
                        <li><FooterLink href="#services">Apps Móviles (iOS/Android)</FooterLink></li>
                        <li><FooterLink href="#services">Automatización & IA</FooterLink></li>
                        <li><FooterLink href="/ecommerce">E-commerce</FooterLink></li>
                        <li><FooterLink href="/TDirector">Consultoría CTO</FooterLink></li>
                    </ul>
                </div>

                {/* EMPRESA */}
                <div>
                    <h3 className="text-white font-bold mb-4">Empresa</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><FooterLink href="#portfolio">Portfolio</FooterLink></li>
                        <li><FooterLink href="#contact">Contacto</FooterLink></li>

                    </ul>
                </div>

                {/* CONTACTO */}
                <div>
                    <h3 className="text-white font-bold mb-4">Contacto</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500">📍</span>
                            Rosario, Santa Fe, Argentina
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">📱</span>
                            +54 341 798 1212
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-500">✉️</span>
                            admin@neo-core-sys.com
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                <p>&copy; {currentYear} Neo-Core-Sys. Todos los derechos reservados.</p>
                <div className="flex gap-6">
                    <span>Privacidad</span>
                    <span>Términos</span>
                    <span>Sitemap</span>
                </div>
            </div>
        </footer>
    );
}

function FooterLink({ href, children }) {
    return (
        <Link href={href} className="hover:text-blue-400 transition-colors">
            {children}
        </Link>
    );
}

function SocialLink({ href, icon, label }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all text-gray-400"
        >
            {icon}
        </a>
    );
}
