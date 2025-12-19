'use client';


export default function GlobalError({ error, reset }) {
    return (
        <html>
            <body>
                <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
                    <h2 className="text-2xl font-bold mb-4">Algo salió mal!</h2>
                    <p className="mb-6 text-slate-400">Error crítico del sistema.</p>
                    <button
                        onClick={() => reset()}
                        className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                    >
                        Intentar de nuevo
                    </button>
                </div>
            </body>
        </html>
    );
}
