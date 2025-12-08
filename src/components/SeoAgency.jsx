import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

export default function SeoAgency({ title, description, image, url }) {
    const siteTitle = 'Neo-Core-Sys | Desarrollo Web, Apps & IA en Rosario';
    const defaultDescription = 'Agencia de desarrollo de software en Rosario, Argentina. Expertos en Programación Web, Apps Mobile, Inteligencia Artificial y Automatización de Negocios.';
    const siteUrl = 'https://neo-core-sys.com';
    const defaultImage = `${siteUrl}/og-image.png`;

    const finalTitle = title ? `${title} | Neo-Core-Sys` : siteTitle;
    const finalDescription = description || defaultDescription;
    const finalImage = image || defaultImage;
    const finalUrl = url || siteUrl;

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Neo-Core-Sys",
        "url": siteUrl,
        "logo": `${siteUrl}/vite.svg`,
        "image": finalImage,
        "description": finalDescription,
        "priceRange": "$$$",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Rosario",
            "addressRegion": "Santa Fe",
            "addressCountry": "Argentina"
        },
        "telephone": "+543417981212",
        "sameAs": [
            "https://www.instagram.com/juamp11/"
        ],
        "areaServed": "Argentina",
        "knowsAbout": ["Desarrollo Web", "Apps Móviles", "Inteligencia Artificial", "Sistemas de Gestión", "Automatización"]
    };

    return (
        <Helmet>
            {/* Idioma */}
            <html lang="es-AR" />

            {/* Metadatos Básicos */}
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            <link rel="canonical" href={finalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={finalUrl} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={finalImage} />
            <meta property="og:site_name" content="Neo-Core-Sys" />
            <meta property="og:locale" content="es_AR" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={finalImage} />

            {/* Schema.org JSON-LD */}
            <script type="application/ld+json">
                {JSON.stringify(schemaData)}
            </script>
        </Helmet>
    );
}

SeoAgency.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    url: PropTypes.string,
};
