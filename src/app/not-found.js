'use client';

export const runtime = 'edge';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
            <h2 className="text-2xl font-bold mb-4">404 - Página no encontrada</h2>
            <p className="mb-6 text-slate-400">La página que buscas no existe.</p>
            <Link
                href="/"
                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
                Volver al inicio
            </Link>
        </div>
    );
}
