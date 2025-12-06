import React, { useState } from 'react';

export default function AiProjectSimulator() {
    const [requirements, setRequirements] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const simulateAnalysis = (text) => {
        setIsLoading(true);
        setAnalysisResult(null);

        // Simulate AI processing delay
        setTimeout(() => {
            const lowerText = text.toLowerCase();
            let result = {
                type: 'Proyecto Personalizado / Consulta',
                time: 'Por definir (Requiere Reunión)',
                tech_focus: 'Evaluación Técnica Inicial',
                confidence: '75%'
            };

            // Lógica de Clasificación mejorada
            switch (true) {
                case lowerText.includes('ia') || lowerText.includes('inteligencia') || lowerText.includes('predicción') || lowerText.includes('automatización'):
                    result = {
                        type: 'Integración de IA Avanzada / Machine Learning',
                        time: '15 a 20 días',
                        tech_focus: 'Python (FastAPI) + Modelos Custom / Gemini API',
                        confidence: '95%'
                    };
                    break;
                case lowerText.includes('turno') || lowerText.includes('agenda') || lowerText.includes('gestión') || lowerText.includes('dashboard'):
                    result = {
                        type: 'SaaS de Gestión de Turnos y Clientes',
                        time: '20 a 25 días',
                        tech_focus: 'React + Supabase / Firebase + Analítica',
                        confidence: '98%'
                    };
                    break;
                case lowerText.includes('venta') || lowerText.includes('e-commerce') || lowerText.includes('tienda') || lowerText.includes('carrito') || lowerText.includes('dropshipping'):
                    result = {
                        type: 'Plataforma E-commerce Premium',
                        time: '15 a 20 días',
                        tech_focus: 'Next.js + Tailwind + Pasarela de Pagos',
                        confidence: '90%'
                    };
                    break;
                case lowerText.includes('app') || lowerText.includes('movil') || lowerText.includes('mobile') || lowerText.includes('android') || lowerText.includes('ios'):
                    result = {
                        type: 'Aplicación Mobile Multiplataforma',
                        time: '30 a 45 días',
                        tech_focus: 'React Native / Flutter',
                        confidence: '88%'
                    };
                    break;
                case lowerText.includes('landing') || lowerText.includes('presentacion') || lowerText.includes('conversion') || lowerText.includes('marketing'):
                    result = {
                        type: 'Landing Page de Alto Impacto / Conversión',
                        time: '3 a 5 días',
                        tech_focus: 'React + Framer Motion + SEO',
                        confidence: '98%'
                    };
                    break;
            }

            setAnalysisResult(result);
            setIsLoading(false);
        }, 1500); // 1.5s delay for effect
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!requirements.trim()) return;
        simulateAnalysis(requirements);
    };

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <span role="img" aria-label="robot">🤖</span> AiProjectSimulator
                    </h2>
                    <p className="text-blue-100 mt-1 text-xs">
                        Cuéntame tu idea y analizaré la viabilidad técnica.
                    </p>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">

                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div>
                            <textarea
                                id="requirements"
                                rows="3"
                                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                placeholder="Ej: Necesito una app para gestionar los turnos..."
                                value={requirements}
                                onChange={(e) => setRequirements(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !requirements.trim()}
                            className={`w-full py-2 px-4 rounded-lg font-semibold text-sm text-white shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.99] 
                ${isLoading
                                    ? 'bg-gray-600 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500'
                                }`}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Analizando...
                                </span>
                            ) : (
                                'Clasificar con IA'
                            )}
                        </button>
                    </form>

                    {/* Results Area */}
                    {analysisResult && (
                        <div className="mt-4 animate-fade-in-up">
                            <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 relative overflow-hidden">
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>

                                <h3 className="text-sm font-bold text-blue-400 mb-3 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    Resultados
                                </h3>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-gray-800 p-2 rounded border border-gray-700">
                                        <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Tipo</p>
                                        <p className="text-sm font-semibold text-white leading-tight">{analysisResult.type}</p>
                                    </div>

                                    <div className="bg-gray-800 p-2 rounded border border-gray-700">
                                        <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Tiempo</p>
                                        <p className="text-sm font-semibold text-emerald-400">{analysisResult.time}</p>
                                    </div>

                                    <div className="bg-gray-800 p-2 rounded border border-gray-700 col-span-2">
                                        <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Tecnología</p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-medium text-purple-300">{analysisResult.tech_focus}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
