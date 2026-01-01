'use client';

import React from 'react';

const AboutSection = ({ about }) => {
    if (!about) return null;

    return (
        <section className="mili-about-artistic" id="about-section">
            <div className="mili-about-content-artistic">
                <div className="mili-about-text-artistic">
                    <h2 className="mili-about-title-artistic">Conoceme</h2>

                    <div className="mili-about-story">
                        <p className="mili-about-greeting">Hola, soy Samanta 💅</p>

                        <p>
                            Para mí, cada set de uñas es una conversación.<br />
                            Me contás cómo te sentís, qué te gusta, qué te representa,<br />
                            y yo lo traduzco en un diseño que es solo tuyo.
                        </p>

                        <p>
                            No trabajo con plantillas. No hago lo mismo dos veces.<br />
                            Porque vos no sos igual a nadie.
                        </p>

                        <p>
                            Acá no hay clientas. Hay personas que confían en mí<br />
                            para llevar un pedacito de arte en sus manos.
                        </p>

                        <p className="mili-about-closing">
                            Y eso, para mí, es todo.
                        </p>
                    </div>

                    {about.instagram && (
                        <a
                            href={`https://www.instagram.com/${about.instagram.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mili-about-instagram"
                        >
                            Seguime en Instagram {about.instagram}
                        </a>
                    )}
                </div>

                <div className="mili-about-image-artistic">
                    {about.imagen_url && (
                        <div className="mili-about-photo-container">
                            <img src={about.imagen_url} alt={about.nombre} />
                            <div className="mili-about-signature">
                                ~ Samanta
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
