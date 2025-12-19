"use client";

import dynamic from 'next/dynamic';

// Disable SSR for the SPA wrapper to avoid hydration errors with React Router
const RestaurantApp = dynamic(() => import('../RestaurantWrapper'), {
    ssr: false,
    loading: () => <div className="min-h-screen bg-black flex items-center justify-center text-white">Cargando Restaurante...</div>
});

export default function Page() {
    return <RestaurantApp />;
}
