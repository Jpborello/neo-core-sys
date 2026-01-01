'use client';

import React, { useState, useEffect } from 'react';

const WelcomeSection = ({ gallery }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Select 3 featured images for the carousel
    const featuredImages = gallery.filter(item => item.destacado).slice(0, 3);

    useEffect(() => {
        if (featuredImages.length === 0) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % featuredImages.length);
        }, 6000); // Slower, more contemplative - 6 seconds

        return () => clearInterval(interval);
    }, [featuredImages.length]);

    if (featuredImages.length === 0) return null;

    return (
        <section className="mili-welcome-artistic">
            <div className="mili-welcome-content-artistic">
                <div className="mili-welcome-text-artistic">
                    <h2 className="mili-welcome-title-artistic">
                        No es solo manicura,<br />
                        es tu momento
                    </h2>

                    <div className="mili-welcome-pillars">
                        <div className="mili-pillar">
                            <div className="mili-pillar-emoji">🌸</div>
                            <h3>Personalizado</h3>
                            <p>Diseñado para vos,<br />no para la moda</p>
                        </div>
                        <div className="mili-pillar">
                            <div className="mili-pillar-emoji">✨</div>
                            <h3>Único</h3>
                            <p>Cada set es una<br />obra irrepetible</p>
                        </div>
                        <div className="mili-pillar">
                            <div className="mili-pillar-emoji">💝</div>
                            <h3>Íntimo</h3>
                            <p>Un espacio donde<br />sos vos misma</p>
                        </div>
                    </div>
                </div>

                <div className="mili-welcome-images-artistic">
                    {featuredImages.map((image, index) => (
                        <div
                            key={image.id}
                            className={`mili-welcome-image-artistic ${index === currentImageIndex ? 'active' : ''}`}
                        >
                            <img src={image.imagen_url} alt={image.titulo} />
                            <div className="mili-welcome-image-caption-artistic">
                                {index === 0 && "Delicadeza en cada trazo"}
                                {index === 1 && "Tu esencia en tus manos"}
                                {index === 2 && "Arte que llevás con vos"}
                            </div>
                        </div>
                    ))}

                    {/* Carousel Indicators */}
                    <div className="mili-welcome-indicators-artistic">
                        {featuredImages.map((_, index) => (
                            <button
                                key={index}
                                className={`mili-indicator-artistic ${index === currentImageIndex ? 'active' : ''}`}
                                onClick={() => setCurrentImageIndex(index)}
                                aria-label={`Go to image ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WelcomeSection;
