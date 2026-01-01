'use client';

import React from 'react';
import { Clock, Sparkles } from 'lucide-react';

const ServicesSection = ({ services }) => {
    if (!services || services.length === 0) return null;

    const scrollToBooking = () => {
        const element = document.getElementById('booking-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Service name and description transformations
    const serviceTransforms = {
        'Manicura Semi-permanente': {
            name: 'Semi-permanente con alma',
            description: 'Color que dura, diseño que perdura. Elegí tu paleta y dejame crear.'
        },
        'Nail Art Personalizado': {
            name: 'Nail art que te representa',
            description: 'Desde lo delicado hasta lo audaz. Tu personalidad en cada trazo.'
        },
        'Manicura Clásica': {
            name: 'Elegancia atemporal',
            description: 'Belleza simple y sofisticada. Para quienes aman lo esencial.'
        },
        'Uñas Esculpidas': {
            name: 'Esculpidas a medida',
            description: 'Extensión y arte en perfecta armonía. Creamos la forma que soñás.'
        },
        'Kapping Gel': {
            name: 'Kapping con cuidado',
            description: 'Fortalecimiento natural que respeta tus uñas. Belleza y salud juntas.'
        }
    };

    return (
        <section className="mili-services-artistic" id="services-section">
            <div className="mili-services-header-artistic">
                <h2 className="mili-services-title-artistic">Mis Rituales</h2>
                <p className="mili-services-subtitle-artistic">
                    Cada servicio es una experiencia pensada para vos
                </p>
            </div>

            <div className="mili-services-grid-artistic">
                {services.map((service) => {
                    const transform = serviceTransforms[service.nombre] || {
                        name: service.nombre,
                        description: service.descripcion
                    };

                    return (
                        <div key={service.id} className="mili-service-card-artistic">
                            <div className="mili-service-icon-artistic">
                                <Sparkles size={24} />
                            </div>

                            <h3 className="mili-service-name-artistic">{transform.name}</h3>

                            <p className="mili-service-description-artistic">
                                {transform.description}
                            </p>

                            <div className="mili-service-details-artistic">
                                <div className="mili-service-duration">
                                    <Clock size={16} />
                                    <span>{service.duracion} min aprox.</span>
                                </div>
                                <div className="mili-service-price">
                                    Desde ${service.precio.toLocaleString('es-AR')}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mili-services-cta-artistic">
                <button onClick={scrollToBooking} className="mili-services-btn-artistic">
                    Elegir mi ritual
                </button>
            </div>
        </section>
    );
};

export default ServicesSection;
