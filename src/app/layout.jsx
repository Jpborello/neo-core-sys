import '../index.css';
import Footer from '../components/Footer';
import { Inter } from 'next/font/google';
import LazyChatWidget from '../components/LazyChatWidget';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});


export const runtime = 'edge';


export const metadata = {
    metadataBase: new URL('https://neo-core-sys.com'),
    title: {
        default: 'Neo-Core-Sys | Desarrollo Web, Apps & IA en Rosario',
        template: '%s | Neo-Core-Sys'
    },
    description: 'Agencia de software en Rosario. Expertos en Desarrollo Web, Apps Móviles, Inteligencia Artificial y Automatización de Negocios. Transformamos ideas en sistemas rentables.',
    keywords: ['Desarrollo Web Rosario', 'Software a Medida', 'Apps Móviles', 'Inteligencia Artificial', 'Automatización de Negocios', 'Diseño Web', 'E-commerce', 'Chatbots'],
    icons: {
        icon: '/vite.svg',
        apple: '/vite.svg',
    },
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'Neo-Core-Sys | Desarrollo Web & IA de Alto Impacto',
        description: 'No hacemos simples páginas web. Creamos sistemas que venden. Desarrollo Web, Apps y Automatización con IA en Rosario.',
        url: 'https://neo-core-sys.com',
        siteName: 'Neo-Core-Sys',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Neo-Core-Sys - Desarrollo de Software y AI',
            },
        ],
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Neo-Core-Sys | Desarrollo Web & IA',
        description: 'Agencia líder en desarrollo de software y automatización en Rosario.',
        images: ['/og-image.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({ children }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Neo-Core-Sys",
        "url": "https://neo-core-sys.com",
        "logo": "https://neo-core-sys.com/vite.svg", // Asumiendo que existe o se reemplazará
        "image": "https://neo-core-sys.com/og-image.png",
        "description": "Agencia de desarrollo de software en Rosario. Especialistas en Web, Apps y Automatización con IA.",
        "email": "admin@neo-core-sys.com",
        "telephone": "+543417981212",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Rosario Centro",
            "addressLocality": "Rosario",
            "addressRegion": "Santa Fe",
            "postalCode": "2000",
            "addressCountry": "AR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-32.94682",
            "longitude": "-60.63932"
        },
        "areaServed": {
            "@type": "Country",
            "name": "Argentina"
        },
        "priceRange": "$$$",
        "sameAs": [
            "https://www.instagram.com/neocoresystem/",
            "https://github.com/jpborello",
            "https://www.linkedin.com"
        ],
        "knowsAbout": ["Desarrollo de Software", "Inteligencia Artificial", "Aplicaciones Móviles", "E-commerce", "Automatización de Procesos"]
    };

    return (
        <html lang="es">
            <body className={`${inter.className} antialiased bg-[#0a0a0a] text-white flex flex-col min-h-screen`}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <div className="flex-grow">
                    {children}
                </div>
                <Footer />
                <LazyChatWidget />
            </body>
        </html>
    );
}
