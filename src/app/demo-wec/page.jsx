import React from 'react';
import Hero from '@/components/demos/we-connect/Hero';
import Services from '@/components/demos/we-connect/Services';
import Process from '@/components/demos/we-connect/Process';
import { About, Contact } from '@/components/demos/we-connect/Content';
import Stats from '@/components/demos/we-connect/Stats';
import Navbar from '@/components/demos/we-connect/Navbar';
import Footer from '@/components/demos/we-connect/Footer';

// Metadata for SEO (Server Side)
export async function generateMetadata() {
    return {
        title: "Agencia de Marketing Digital | We Connect Demo",
        description: "Potenciamos tu comunicación digital con estrategias integrales. Redes Sociales, Publicidad, Branding y Capacitaciones. Demo técnica en Next.js.",
        keywords: ["Marketing Digital", "Agencia", "Next.js Demo", "SEO", "We Connect"],
        robots: "index, follow",
        alternates: {
            canonical: "https://neo-core-sys.com/demo-wec",
        },
        openGraph: {
            title: "We Connect | Agencia de Marketing Digital",
            description: "Estrategias de comunicación que conectan marcas con personas. Demo técnica High-Performance.",
            type: "website",
            url: "https://neo-core-sys.com/demo-wec",
            siteName: "We Connect Demo",
            images: [
                {
                    url: "https://weconnectagencia.com/wp-content/uploads/2023/08/cropped-favicon-we-connect-270x270.png", // Using original favicon as placeholder or local OG
                    width: 270,
                    height: 270,
                    alt: "We Connect Logo",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: "We Connect | Agencia Digital",
            description: "Demo técnica de alta performance.",
        },
    };
}

export default function WeConnectDemo() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-blue-500 selection:text-white lang='es'">
            <Navbar />
            <div id="hero">
                <Hero />
            </div>
            <div id="about">
                <About />
            </div>
            <Stats />
            <div id="services">
                <Services />
            </div>
            <div id="process">
                <Process />
            </div>
            <div id="contact">
                <Contact />
            </div>
            <Footer />
        </main>
    );
};
