'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = ({ phone }) => {
    if (!phone) return null;

    const handleClick = () => {
        const cleanPhone = phone.replace(/\D/g, '');
        const message = encodeURIComponent('¡Hola! Me gustaría consultar sobre los servicios de manicura 💅');
        window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
    };

    return (
        <button
            onClick={handleClick}
            className="mili-whatsapp-button"
            aria-label="Contactar por WhatsApp"
        >
            <MessageCircle size={24} />
        </button>
    );
};

export default WhatsAppButton;
