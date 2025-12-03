import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
    const phoneNumber = '543416199597';
    const message = 'Hola! Vengo de la web Cuanto Te Quiero y me gustaría consultar por...';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 flex items-center justify-center group"
            aria-label="Contactar por WhatsApp"
        >
            <MessageCircle size={32} fill="white" className="group-hover:animate-pulse" />
            <span className="absolute right-full mr-4 bg-white text-gray-800 px-3 py-1 rounded-lg text-sm font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
                ¡Escribinos!
            </span>
        </a>
    );
};

export default WhatsAppButton;
