'use client';

import React from 'react';
import { Calendar, Instagram } from 'lucide-react';

const HeroSection = ({ about }) => {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="mili-hero-artistic">
            {/* Subtle overlay */}
            <div className="mili-hero-overlay"></div>

            {/* Asymmetric content layout */}
            <div className="mili-hero-content-artistic">
                {/* Left side - Typography protagonist */}
                <div className="mili-hero-left">
                    <div className="mili-hero-badge-artistic">
                        Nail art personalizado · Rosario
                    </div>

                    <h1 className="mili-hero-title-artistic">
                        Tus manos<br />
                        como tu<br />
                        firma personal
                    </h1>

                    <p className="mili-hero-subtext-artistic">
                        Un espacio íntimo donde el arte se encuentra con vos
                    </p>

                    <div className="mili-hero-ctas-artistic">
                        <button
                            onClick={() => scrollToSection('booking-section')}
                            className="mili-cta-primary-artistic"
                        >
                            Comenzar mi ritual
                        </button>
                        <button
                            onClick={() => scrollToSection('gallery-section')}
                            className="mili-cta-secondary-artistic"
                        >
                            Ver mi trabajo
                        </button>
                    </div>

                    {about?.instagram && (
                        <a
                            href={`https://www.instagram.com/${about.instagram.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mili-hero-instagram-link"
                        >
                            <Instagram size={18} />
                            <span>{about.instagram}</span>
                        </a>
                    )}
                </div>

                {/* Right side - Professional image */}
                <div className="mili-hero-right">
                    <div className="mili-hero-image-container">
                        <img
                            src="https://res.cloudinary.com/dlv3ajcqf/image/upload/v1767291391/sami_profesional_suzkdh.jpg"
                            alt="Samanta - Nail Artist Profesional"
                            className="mili-hero-image"
                        />
                        <div className="mili-hero-floating-badge">
                            ✨ Cada set es único
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="mili-hero-scroll">
                <div className="mili-scroll-indicator"></div>
            </div>
        </section>
    );
};

export default HeroSection;
