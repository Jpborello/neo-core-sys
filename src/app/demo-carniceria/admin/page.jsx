"use client";
import dynamic from 'next/dynamic';

const ButcherAdmin = dynamic(() => import('../../../apps/neo-market/ButcherAdmin'), {
    ssr: false,
    loading: () => <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Cargando Admin...</div>
});

export default function Page() {
    return <ButcherAdmin />;
}
