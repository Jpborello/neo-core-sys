"use client";

import dynamic from 'next/dynamic';

const GymApp = dynamic(() => import('../GymWrapper'), {
    ssr: false,
    loading: () => <div className="min-h-screen bg-black flex items-center justify-center text-white">Cargando Gym AI...</div>
});

export default function Page() {
    return <GymApp />;
}
