import React, { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';

export default function StickySmartCTA() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show CTA if user scrolled more than 500px
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className={`fixed bottom-0 left-0 w-full z-50 p-4 transform transition-all duration-300 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
        >
            <div className="max-w-md mx-auto">
                <a
                    href="#contact"
                    className="group flex items-center justify-center gap-3 w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold text-lg rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all transform hover:-translate-y-1"
                >
                    <span>¡Quiero mi web profesional!</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </a>
            </div>
        </div>
    );
}
