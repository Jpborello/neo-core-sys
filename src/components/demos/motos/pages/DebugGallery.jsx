import React from 'react';

const imageFiles = [
    "Guerrero trip f1.jpg",
    "Guerrero trip.jpg",
    "Guerrero trip f.jpg",
    "IMG-20251203-WA0089.jpg",
    "IMG-20251203-WA0090.jpg",
    "IMG-20251203-WA0091.jpg",
    "IMG-20251203-WA0092.jpg",
    "IMG-20251203-WA0093.jpg",
    "IMG-20251203-WA0094.jpg",
    "IMG-20251203-WA0095.jpg",
    "IMG-20251203-WA0127.jpg",
    "IMG-20251203-WA0128.jpg",
    "IMG-20251203-WA0129.jpg",
    "IMG-20251203-WA0130.jpg",
    "IMG-20251203-WA0131.jpg",
    "IMG-20251203-WA0132.jpg",
    "IMG-20251203-WA0133.jpg",
    "IMG-20251203-WA0134.jpg",
    "IMG-20251203-WA0135.jpg",
    "IMG-20251203-WA0136.jpg",
    "IMG-20251203-WA0137.jpg",
    "IMG-20251203-WA0138.jpg",
    "IMG-20251203-WA0139.jpg",
    "IMG-20251203-WA0140.jpg",
    "IMG-20251203-WA0141.jpg",
    "IMG-20251203-WA0142.jpg",
    "IMG-20251203-WA0143.jpg",
    "IMG-20251203-WA0144.jpg",
    "IMG-20251203-WA0145.jpg",
    "IMG-20251203-WA0146.jpg",
    "IMG-20251203-WA0147.jpg",
    "IMG-20251203-WA0148.jpg",
    "IMG-20251203-WA0149.jpg",
    "IMG-20251203-WA0150.jpg",
    "IMG-20251203-WA0151.jpg",
    "IMG-20251203-WA0152.jpg",
    "IMG-20251203-WA0153.jpg",
    "IMG-20251203-WA0154.jpg",
    "IMG-20251203-WA0155.jpg"
];

export default function DebugGallery() {
    const getUrl = (filename) => `https://firebasestorage.googleapis.com/v0/b/stepup-a42dc.firebasestorage.app/o/motos%2F${encodeURIComponent(filename)}?alt=media`;

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center">Galería de Imágenes (Debug)</h1>
            <p className="text-center mb-8">Sacale una captura a esto y pasamela para que yo sepa cuál es cuál.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {imageFiles.map((filename) => (
                    <div key={filename} className="bg-white p-4 rounded shadow">
                        <div className="h-40 bg-gray-200 mb-2 rounded overflow-hidden">
                            <img
                                src={getUrl(filename)}
                                alt={filename}
                                className="w-full h-full object-contain"
                                loading="lazy"
                            />
                        </div>
                        <p className="text-xs font-mono break-all">{filename}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
