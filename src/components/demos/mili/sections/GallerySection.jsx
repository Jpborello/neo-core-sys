'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

const GallerySection = ({ gallery }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Emotional categories
    const categories = [
        { id: 'all', name: 'Todo mi trabajo', emoji: '✨' },
        { id: 'delicado', name: 'Delicado', emoji: '🌸' },
        { id: 'audaz', name: 'Audaz', emoji: '💫' },
        { id: 'minimal', name: 'Minimal', emoji: '🤍' },
        { id: 'artistico', name: 'Artístico', emoji: '🎨' },
    ];

    // Map technical categories to emotional ones
    const categoryMapping = {
        'clasicas': 'delicado',
        'nail-art': 'artistico',
        'semi-permanente': 'minimal',
        'esculpidas': 'audaz',
    };

    // Poetic phrases for hover states (alternating)
    const poeticPhrases = [
        "Delicado",
        "Arte que perdura",
        "Hecho para vos",
        "Identidad en cada trazo",
        "Cada mano, una historia"
    ];

    const filteredGallery = selectedCategory === 'all'
        ? gallery
        : gallery.filter(item => {
            const emotionalCategory = categoryMapping[item.categoria] || item.categoria;
            return emotionalCategory === selectedCategory;
        });

    return (
        <section className="mili-gallery-lienzos" id="gallery-section">
            <div className="mili-gallery-container">
                <div className="mili-gallery-header-lienzos">
                    <h2 className="mili-gallery-title-lienzos">Lienzos Vivos</h2>
                    <p className="mili-gallery-subtitle-lienzos">
                        Cada set de uñas es un lienzo vivo,<br />
                        una obra única que expresa personalidad, estilo y emoción
                    </p>
                </div>

                {/* Emotional Category Filters */}
                <div className="mili-gallery-filters-lienzos">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`mili-filter-btn-lienzos ${selectedCategory === cat.id ? 'active' : ''}`}
                        >
                            <span className="mili-filter-emoji">{cat.emoji}</span>
                            <span className="mili-filter-name">{cat.name}</span>
                        </button>
                    ))}
                </div>

                {/* Asymmetric Gallery Grid - Art Exhibition Style */}
                <div className="mili-gallery-grid-lienzos">
                    {filteredGallery.map((item, index) => {
                        const randomPhrase = poeticPhrases[index % poeticPhrases.length];
                        // Vary sizes for asymmetric layout
                        const sizeClass = index % 5 === 0 ? 'large' : index % 3 === 0 ? 'medium' : 'regular';

                        return (
                            <div
                                key={item.id}
                                className={`mili-gallery-canvas ${sizeClass}`}
                                onClick={() => setSelectedImage(item)}
                                style={{ animationDelay: `${index * 0.08}s` }}
                            >
                                <div className="mili-canvas-frame">
                                    <img src={item.imagen_url} alt={item.titulo || 'Obra de nail art'} />
                                    <div className="mili-canvas-overlay">
                                        <span className="mili-canvas-phrase">{randomPhrase}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="mili-lightbox-lienzos" onClick={() => setSelectedImage(null)}>
                    <button className="mili-lightbox-close" onClick={() => setSelectedImage(null)}>
                        <X size={24} />
                    </button>
                    <div className="mili-lightbox-content-lienzos" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImage.imagen_url} alt={selectedImage.titulo} />
                        {selectedImage.titulo && (
                            <div className="mili-lightbox-info-lienzos">
                                <h3>{selectedImage.titulo}</h3>
                                {selectedImage.descripcion && <p>{selectedImage.descripcion}</p>}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default GallerySection;
