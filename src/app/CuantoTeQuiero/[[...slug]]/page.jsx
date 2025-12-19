"use client";

import dynamic from 'next/dynamic';

const App = dynamic(() => import('../CuantoTeQuieroWrapper'), {
    ssr: false,
    loading: () => <div className="min-h-screen flex items-center justify-center">Cargando Cuanto Te Quiero...</div>
});

export default function Page() {
    return <App />;
}
