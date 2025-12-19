export const categorizeProduct = (filename) => {
    const lowerName = filename.toLowerCase();

    if (lowerName.includes('calza') || lowerName.includes('corpiño') || lowerName.includes('faja') || lowerName.includes('jean') || lowerName.includes('mono') || lowerName.includes('tusa')) {
        return 'Mamá';
    }
    if (lowerName.includes('cuna') || lowerName.includes('cuuna')) {
        return 'Muebles';
    }
    if (lowerName.includes('gimnasio')) {
        return 'Juguetes';
    }
    if (lowerName.includes('alfombra') || lowerName.includes('mochila') || lowerName.includes('toallon')) {
        return 'Accesorios';
    }
    return 'Otros';
};

export const getProducts = () => {
    // Import all images from the assets folder
    const images = import.meta.glob('../../assets/cuanto-te-quiero/*.jpg', { eager: true });

    return Object.entries(images).map(([path, module]) => {
        const filename = path.split('/').pop();
        // Remove extension and underscores for display name
        const name = filename.replace('.jpg', '').replace(/_/g, ' ');

        return {
            id: filename,
            name: name,
            image: module.default,
            category: categorizeProduct(filename),
            price: 0, // Placeholder
        };
    });
};
