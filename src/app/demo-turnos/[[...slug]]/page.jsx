"use client";

import dynamic from 'next/dynamic';

const TurnosApp = dynamic(() => import('../TurnosWrapper'), {
    ssr: false,
    loading: () => <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-800">Cargando Turnos...</div>
});

export default function Page() {
    return <TurnosApp />;
}
