'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import HeroSection from './sections/HeroSection';
import WelcomeSection from './sections/WelcomeSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import GallerySection from './sections/GallerySection';
import BookingSection from './sections/BookingSection';
import WhatsAppButton from './components/WhatsAppButton';
import './styles/mili-styles.css';

const MiliDemo = () => {
    const [services, setServices] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [about, setAbout] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);

            // Fetch services
            const { data: servicesData, error: servicesError } = await supabase
                .from('mili_servicios')
                .select('*')
                .eq('activo', true)
                .order('precio', { ascending: true });

            if (servicesError) throw servicesError;

            // Fetch gallery
            const { data: galleryData, error: galleryError } = await supabase
                .from('mili_galeria')
                .select('*')
                .order('orden', { ascending: true });

            if (galleryError) throw galleryError;

            // Fetch about
            const { data: aboutData, error: aboutError } = await supabase
                .from('mili_about')
                .select('*')
                .limit(1)
                .single();

            if (aboutError) throw aboutError;

            setServices(servicesData || []);
            setGallery(galleryData || []);
            setAbout(aboutData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="mili-loading">
                <div className="mili-spinner"></div>
                <p>Cargando...</p>
            </div>
        );
    }

    return (
        <div className="mili-container">
            <HeroSection about={about} />
            <WelcomeSection gallery={gallery} />
            <AboutSection about={about} />
            <ServicesSection services={services} />
            <GallerySection gallery={gallery} />
            <BookingSection services={services} />
            <WhatsAppButton phone={about?.whatsapp} />
        </div>
    );
};

export default MiliDemo;
