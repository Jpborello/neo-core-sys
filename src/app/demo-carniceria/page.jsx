"use client";
import dynamic from 'next/dynamic';

const ButcherDemo = dynamic(() => import('../../apps/neo-market/ButcherDemo'), {
    ssr: false,
    loading: () => <div className="min-h-screen bg-[#F3E6D0] flex items-center justify-center text-[#3D2B1F]">Cargando Carnicería...</div>
});

export default function Page() {
    return <ButcherDemo />;
}
