import React from 'react';
import { Star } from 'lucide-react';

const CloudCard = ({ name, text, stars = 5 }) => (
    <div className="relative p-8 m-4">
        {/* Cloud Shape Background */}
        <div className="absolute inset-0 bg-white rounded-[2rem] shadow-md transform hover:scale-105 transition-transform duration-300 z-0"
            style={{
                borderRadius: '50% 20% / 10% 40%',
                filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.05))'
            }}>
        </div>
        <div className="absolute inset-0 bg-white rounded-[2rem] shadow-sm z-0 transform rotate-1 scale-95 opacity-50"></div>

        <div className="relative z-10 text-center">
            <div className="flex justify-center mb-3">
                {[...Array(stars)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                ))}
            </div>
            <p className="text-gray-600 italic mb-4 font-serif">"{text}"</p>
            <h4 className="font-bold text-pink-500 text-sm uppercase tracking-wide">{name}</h4>
        </div>
    </div>
);

const TestimonialsSection = () => {
    const testimonials = [
        {
            name: "María Laura",
            text: "La ropita es hermosa y de excelente calidad. Me llegó todo súper rápido. ¡Gracias!",
            stars: 5
        },
        {
            name: "Sofía G.",
            text: "Compré el ajuar para mi bebé y quedé enamorada. La atención por WhatsApp fue divina.",
            stars: 5
        },
        {
            name: "Carla M.",
            text: "Los muebles son soñados. Quedó la habitación tal cual la imaginaba. Súper recomendables.",
            stars: 5
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-white to-pink-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-serif text-gray-900">Lo que dicen las mamás</h2>
                    <p className="mt-4 text-gray-500">Historias reales de clientes felices</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <CloudCard key={index} {...t} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
