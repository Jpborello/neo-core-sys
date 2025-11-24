// Mock data for SalonHub demo
export const mockServices = [
    {
        id: '1',
        name: 'Corte Caballero',
        description: 'Corte clásico o moderno adaptado a tu estilo',
        price: 15000,
        duration: 30,
        category: 'Hombre',
        image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=800',
        active: true
    },
    {
        id: '2',
        name: 'Corte + Barba',
        description: 'Corte completo más perfilado y arreglo de barba',
        price: 22000,
        duration: 45,
        category: 'Hombre',
        image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800',
        active: true
    },
    {
        id: '3',
        name: 'Corte Dama',
        description: 'Corte personalizado según tu tipo de cabello',
        price: 18000,
        duration: 45,
        category: 'Mujer',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800',
        active: true
    },
    {
        id: '4',
        name: 'Tintura Completa',
        description: 'Coloración completa con productos premium',
        price: 35000,
        duration: 120,
        category: 'Mujer',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
        active: true
    },
    {
        id: '5',
        name: 'Brushing',
        description: 'Secado y peinado profesional',
        price: 12000,
        duration: 30,
        category: 'Mujer',
        image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800',
        active: true
    },
    {
        id: '6',
        name: 'Tratamiento Capilar',
        description: 'Hidratación profunda y reparación del cabello',
        price: 25000,
        duration: 60,
        category: 'Unisex',
        image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=800',
        active: true
    }
];

export const mockStylists = [
    {
        id: 'st1',
        name: 'María González',
        specialty: 'Coloración y Mechas',
        bio: 'Especialista en colorimetría con 10 años de experiencia',
        avatar: 'https://i.pravatar.cc/150?img=1',
        workingHours: {
            monday: { start: '09:00', end: '18:00' },
            tuesday: { start: '09:00', end: '18:00' },
            wednesday: { start: '09:00', end: '18:00' },
            thursday: { start: '09:00', end: '18:00' },
            friday: { start: '09:00', end: '18:00' },
            saturday: { start: '09:00', end: '14:00' }
        },
        active: true
    },
    {
        id: 'st2',
        name: 'Carlos Rodríguez',
        specialty: 'Barbería y Cortes Modernos',
        bio: 'Experto en técnicas de barbería clásica y moderna',
        avatar: 'https://i.pravatar.cc/150?img=12',
        workingHours: {
            monday: { start: '10:00', end: '19:00' },
            tuesday: { start: '10:00', end: '19:00' },
            wednesday: { start: '10:00', end: '19:00' },
            thursday: { start: '10:00', end: '19:00' },
            friday: { start: '10:00', end: '19:00' },
            saturday: { start: '10:00', end: '15:00' }
        },
        active: true
    },
    {
        id: 'st3',
        name: 'Ana Martínez',
        specialty: 'Cortes y Peinados',
        bio: 'Especialista en cortes de tendencia y peinados para eventos',
        avatar: 'https://i.pravatar.cc/150?img=5',
        workingHours: {
            tuesday: { start: '09:00', end: '17:00' },
            wednesday: { start: '09:00', end: '17:00' },
            thursday: { start: '09:00', end: '17:00' },
            friday: { start: '09:00', end: '17:00' },
            saturday: { start: '09:00', end: '14:00' }
        },
        active: true
    }
];

export const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'
];

// Demo users
export const demoUsers = {
    admin: {
        email: 'admin@salonhub.com',
        password: 'admin123',
        role: 'admin',
        name: 'Admin SalonHub'
    },
    client: {
        email: 'cliente@demo.com',
        password: 'demo123',
        role: 'client',
        name: 'Cliente Demo'
    }
};
