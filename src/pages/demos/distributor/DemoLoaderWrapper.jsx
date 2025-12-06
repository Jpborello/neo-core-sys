import React, { useState, Suspense, lazy } from 'react';
import { FiLoader } from 'react-icons/fi';

// Lazy load the heavy component
const DistributorOrdersDemo = lazy(() => import('./DistributorOrdersDemo'));

export default function DemoLoaderWrapper() {
    const [isDemoLoaded, setIsDemoLoaded] = useState(false);

    if (!isDemoLoaded) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4 font-sans">
                <div className="max-w-2xl w-full text-center space-y-10 animate-fade-in-up">

                    {/* Header */}
                    <div className="space-y-4">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold tracking-wide uppercase">
                            Premium Demo
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 leading-tight drop-shadow-sm">
                            Distributor Orders
                            <span className="block text-white mt-2">Simulation</span>
                        </h1>
                    </div>

                    <p className="text-slate-400 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
                        Experimenta un sistema completo B2B con roles dinámicos, gestión de stock en tiempo real y dashboards potenciados por Inteligencia Artificial.
                    </p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left bg-white/5 p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm">
                        <Feature
                            icon="📦"
                            title="Stock Real"
                            desc="El inventario se debita automáticamente con cada pedido confirmado."
                        />
                        <Feature
                            icon="👥"
                            title="Multi-Rol"
                            desc="Alterna instantáneamente entre Cliente, Vendedor y Administrador."
                        />
                        <Feature
                            icon="🧠"
                            title="IA Power"
                            desc="Algoritmos de optimización de rutas y sugerencias de precios."
                        />
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4">
                        <button
                            onClick={() => setIsDemoLoaded(true)}
                            className="group relative inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white font-bold text-xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                        >
                            <span className="relative z-10">Iniciar Demo (3 Paneles) 🚀</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-2xl"></div>
                        </button>
                        <p className="text-xs text-slate-500 mt-4">
                            *Carga diferida activada para optimizar rendimiento inicial.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Loader Fallback
    return (
        <Suspense fallback={
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-600">
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                    <FiLoader className="relative animate-spin text-5xl text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 animate-pulse">Cargando Motor de Simulación...</h3>
                <div className="flex flex-col items-center gap-2 mt-2 text-sm text-slate-400">
                    <span className="animate-fade-in" style={{ animationDelay: '0.2s' }}>• Inicializando base de datos local</span>
                    <span className="animate-fade-in" style={{ animationDelay: '0.7s' }}>• Configurando módulos de IA</span>
                    <span className="animate-fade-in" style={{ animationDelay: '1.2s' }}>• Cargando assets 3D</span>
                </div>
            </div>
        }>
            <DistributorOrdersDemo />
        </Suspense>
    );
}

const Feature = ({ icon, title, desc }) => (
    <div className="flex flex-col space-y-3 p-2 hover:bg-white/5 rounded-xl transition-colors">
        <span className="text-3xl bg-white/10 w-12 h-12 flex items-center justify-center rounded-xl">{icon}</span>
        <div>
            <h3 className="font-bold text-slate-200 text-lg">{title}</h3>
            <p className="text-sm text-slate-400 leading-snug mt-1">{desc}</p>
        </div>
    </div>
);
