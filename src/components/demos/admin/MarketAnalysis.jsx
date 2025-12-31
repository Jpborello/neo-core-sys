import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, BarChart3, TrendingUp, TrendingDown, Minus,
    AlertCircle, CheckCircle, Smartphone, Globe, RefreshCcw,
    Lock, Sparkles, BrainCircuit
} from 'lucide-react';
import { useDemo } from '../../../context/DemoContext';

const MarketAnalysis = () => {
    const { products } = useDemo();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [useRealAPI, setUseRealAPI] = useState(true); // Toggle para usar API real o mock
    const [useRealScraping, setUseRealScraping] = useState(false); // Toggle para scraping real

    // Función de análisis con Groq AI
    const analyzeProduct = async (product) => {
        setIsAnalyzing(true);
        setAnalysisResult(null);

        if (!useRealAPI) {
            // Fallback a lógica simulada
            return analyzeProductMock(product);
        }

        try {
            let scrapingResults = [];

            if (useRealScraping) {
                // Scraping REAL de supermercados
                console.log('🔍 Iniciando scraping real de supermercados...');

                try {
                    const scrapeResponse = await fetch(`/api/scrape-prices?product=${encodeURIComponent(product.name)}&real=true`);
                    const scrapeData = await scrapeResponse.json();

                    if (scrapeData.sources && scrapeData.sources.length > 0) {
                        // Formato nuevo con múltiples fuentes
                        scrapingResults = scrapeData.sources;
                        console.log(`✅ Scraping exitoso: ${scrapeData.totalItems} productos de ${scrapeData.sources.length} fuente(s)`);
                    } else if (scrapeData.items && scrapeData.items.length > 0) {
                        // Formato antiguo (fallback)
                        scrapingResults = [scrapeData];
                        console.log(`✅ Scraping exitoso (fallback): ${scrapeData.items.length} productos`);
                    } else {
                        console.warn('⚠️ No se encontraron productos, usando datos simulados');
                        scrapingResults = getMockScrapingResults(product);
                    }
                } catch (scrapeError) {
                    console.error('❌ Error en scraping, usando datos simulados:', scrapeError);
                    scrapingResults = getMockScrapingResults(product);
                }
            } else {
                // Datos simulados
                scrapingResults = getMockScrapingResults(product);
            }

            const mockScrapingResults = scrapingResults;

            // Llamada a la API de análisis
            const response = await fetch('/api/analyze-price', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productName: product.name,
                    currentPrice: product.price,
                    scrapingResults: mockScrapingResults
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.useFallback) {
                    console.warn('API falló, usando datos simulados');
                    return analyzeProductMock(product);
                }
                throw new Error('Error en la API de análisis');
            }

            const result = await response.json();

            // Pequeño delay para que la animación se vea completa
            setTimeout(() => {
                setAnalysisResult(result);
                setIsAnalyzing(false);
            }, 500);

        } catch (error) {
            console.error('Error al analizar producto:', error);
            // Fallback a datos simulados
            analyzeProductMock(product);
        }
    };

    // Función de análisis simulado (fallback)
    const analyzeProductMock = (product) => {
        setTimeout(() => {
            const variance = Math.random();
            let resultType = 'optimal';
            if (variance < 0.3) resultType = 'underpriced';
            else if (variance > 0.7) resultType = 'overpriced';

            const marketAvg = product.price * (resultType === 'underpriced' ? 1.15 : (resultType === 'overpriced' ? 0.85 : 1.02));
            const minPrice = marketAvg * 0.9;
            const maxPrice = marketAvg * 1.1;

            const mockCompetitors = [
                { name: 'MercadoLibre', price: marketAvg * 0.98, source: 'Marketplace' },
                { name: 'Supermercado Local 1', price: marketAvg * 1.05, source: 'Web' },
                { name: 'Tienda Vecina', price: marketAvg * (Math.random() > 0.5 ? 0.95 : 1.1), source: 'Local' }
            ];

            let recommendation = "";
            let color = "";

            if (resultType === 'underpriced') {
                recommendation = `Tu precio está un ${Math.round(((marketAvg - product.price) / product.price) * 100)}% por debajo del promedio. Podrías aumentar hasta $${Math.round(marketAvg)} sin perder competitividad y mejorar tu margen.`;
                color = "text-emerald-400";
            } else if (resultType === 'overpriced') {
                recommendation = `Estás un ${Math.round(((product.price - marketAvg) / marketAvg) * 100)}% por encima del mercado. Considerá una oferta o pack promocional para no perder ventas frente a MercadoLibre.`;
                color = "text-red-400";
            } else {
                recommendation = "Tu precio es competitivo y está alineado con el mercado local. Mantené este posicionamiento para fidelizar clientes.";
                color = "text-blue-400";
            }

            setAnalysisResult({
                type: resultType,
                marketAvg: Math.round(marketAvg),
                minPrice: Math.round(minPrice),
                maxPrice: Math.round(maxPrice),
                competitors: mockCompetitors,
                recommendation,
                color,
                confidence: 94,
                isMock: true
            });
            setIsAnalyzing(false);
        }, 2500);
    };

    // Función helper para generar datos simulados
    const getMockScrapingResults = (product) => [
        {
            source: 'MercadoLibre',
            items: [
                { title: `${product.name} - Envío Gratis`, price: product.price * 0.95, link: 'https://mercadolibre.com.ar/...' },
                { title: `${product.name} Original`, price: product.price * 1.05, link: 'https://mercadolibre.com.ar/...' },
                { title: `Pack x2 ${product.name}`, price: product.price * 1.8, link: 'https://mercadolibre.com.ar/...' }
            ]
        },
        {
            source: 'Carrefour',
            items: [
                { title: `${product.name}`, price: product.price * 1.02, link: 'https://carrefour.com.ar/...' },
                { title: `${product.name} - Oferta`, price: product.price * 0.98, link: 'https://carrefour.com.ar/...' }
            ]
        },
        {
            source: 'Coto',
            items: [
                { title: `${product.name}`, price: product.price * 1.08, link: 'https://coto.com.ar/...' },
                { title: `${product.name} Promo`, price: product.price * 0.92, link: 'https://coto.com.ar/...' }
            ]
        }
    ];

    const formatCurrency = (val) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(val);

    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="flex flex-col h-full bg-slate-900 text-slate-100 rounded-xl overflow-hidden relative">

            {/* Header */}
            <div className="p-6 border-b border-slate-700 bg-slate-900/50 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 flex items-center gap-2">
                        <BrainCircuit /> Inteligencia de Precios
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">Comparativa de mercado y estrategia en tiempo real.</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* AI Mode Indicator */}
                    <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 ${useRealAPI ? 'bg-emerald-500/10 border border-emerald-500/50 text-emerald-300' : 'bg-amber-500/10 border border-amber-500/50 text-amber-300'}`}>
                        <Sparkles size={12} className={useRealAPI ? 'animate-pulse' : ''} />
                        {useRealAPI ? 'GROQ AI ACTIVO' : 'MODO DEMO'}
                    </div>
                    {/* Scraping Mode Indicator */}
                    <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 ${useRealScraping ? 'bg-blue-500/10 border border-blue-500/50 text-blue-300' : 'bg-slate-500/10 border border-slate-500/50 text-slate-400'}`}>
                        <Globe size={12} className={useRealScraping ? 'animate-pulse' : ''} />
                        {useRealScraping ? 'SCRAPING REAL' : 'DATOS SIMULADOS'}
                    </div>
                    {/* Toggle Buttons */}
                    <button
                        onClick={() => setUseRealAPI(!useRealAPI)}
                        className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded-lg text-xs font-bold transition-colors"
                        title={useRealAPI ? 'Cambiar a modo demo' : 'Cambiar a Groq AI'}
                    >
                        {useRealAPI ? '🤖 AI' : '🎭 Demo'}
                    </button>
                    <button
                        onClick={() => setUseRealScraping(!useRealScraping)}
                        className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded-lg text-xs font-bold transition-colors"
                        title={useRealScraping ? 'Cambiar a datos simulados' : 'Activar scraping real'}
                    >
                        {useRealScraping ? '🌐 Real' : '📊 Mock'}
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">

                {/* Visual Sidebar (Product Selection) */}
                <div className="w-80 border-r border-slate-700 bg-slate-800/50 flex flex-col">
                    <div className="p-4 border-b border-slate-700">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Buscar producto..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-600 rounded-lg py-2 pl-9 pr-4 text-sm focus:border-purple-500 outline-none transition-colors"
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-2">
                        {filteredProducts.map(product => (
                            <button
                                key={product.id}
                                onClick={() => { setSelectedProduct(product); setAnalysisResult(null); }}
                                className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-all ${selectedProduct?.id === product.id ? 'bg-purple-500/20 border border-purple-500/50 shadow-md' : 'hover:bg-slate-700/50 border border-transparent'}`}
                            >
                                <img src={product.image} alt="" className="w-10 h-10 rounded-md object-cover bg-slate-700" />
                                <div className="min-w-0">
                                    <div className={`font-bold text-sm truncate ${selectedProduct?.id === product.id ? 'text-white' : 'text-slate-300'}`}>{product.name}</div>
                                    <div className="text-xs text-slate-500 flex items-center justify-between gap-2">
                                        <span>Current: {formatCurrency(product.price)}</span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Analysis Area */}
                <div className="flex-1 p-8 overflow-y-auto relative">
                    {!selectedProduct ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center opacity-60">
                            <BarChart3 size={64} className="mb-4 text-slate-700" />
                            <h3 className="text-xl font-bold text-slate-400">Selecciona un producto</h3>
                            <p>Elige un ítem de la izquierda para analizar su competitividad.</p>
                        </div>
                    ) : (
                        <div className="max-w-4xl mx-auto space-y-8">

                            {/* Product Header */}
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4">
                                    <img src={selectedProduct.image} className="w-24 h-24 rounded-xl object-cover border border-slate-600 shadow-lg" alt="" />
                                    <div>
                                        <h3 className="text-3xl font-bold text-white mb-1">{selectedProduct.name}</h3>
                                        <div className="bg-slate-800 px-3 py-1 rounded inline-flex items-center gap-2 text-slate-300 font-mono text-lg border border-slate-700">
                                            Tu Precio: <span className="text-white font-bold">{formatCurrency(selectedProduct.price)}</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => analyzeProduct(selectedProduct)}
                                    disabled={isAnalyzing}
                                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-purple-900/20 flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isAnalyzing ? (
                                        <><RefreshCcw className="animate-spin" /> Analizando Mercado...</>
                                    ) : (
                                        <><Sparkles size={18} /> Iniciar Análisis</>
                                    )}
                                </button>
                            </div>

                            {/* Analysis Logic */}
                            <AnimatePresence mode="wait">
                                {isAnalyzing ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="bg-slate-800/50 rounded-2xl border border-slate-700 p-12 text-center"
                                    >
                                        <div className="relative w-20 h-20 mx-auto mb-6">
                                            <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                                            <div className="absolute inset-0 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                            <BrainCircuit className="absolute inset-0 m-auto text-purple-400 animate-pulse" />
                                        </div>
                                        <h4 className="text-xl font-bold text-white mb-2">{useRealScraping ? 'Buscando precios en supermercados...' : 'Escaneando competidores locales...'}</h4>
                                        <div className="flex flex-col gap-1 items-center text-slate-400 text-sm font-mono">
                                            {useRealScraping ? (
                                                <>
                                                    <span className="animate-pulse delay-75">🌐 Navegando a Coto Digital...</span>
                                                    <span className="animate-pulse delay-150">🔍 Buscando en Carrefour...</span>
                                                    <span className="animate-pulse delay-300">🛒 Consultando La Gallega...</span>
                                                    <span className="animate-pulse delay-450">🤖 Analizando con IA...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="animate-pulse delay-75">Calculando promedios de zona...</span>
                                                    <span className="animate-pulse delay-150">Verificando marketplaces...</span>
                                                    <span className="animate-pulse delay-300">Generando estrategia de precios...</span>
                                                </>
                                            )}
                                        </div>
                                    </motion.div>
                                ) : analysisResult ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-6"
                                    >
                                        {/* Main Result Card */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                            {/* Gauge */}
                                            <div className="col-span-1 bg-slate-800 rounded-2xl border border-slate-700 p-6 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden">
                                                <div className={`absolute top-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-red-500 opacity-50`}></div>

                                                {/* AI/Mock Badge */}
                                                {analysisResult.isMock && (
                                                    <div className="absolute top-3 right-3 bg-amber-500/20 border border-amber-500/50 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold">
                                                        DEMO
                                                    </div>
                                                )}
                                                {!analysisResult.isMock && (
                                                    <div className="absolute top-3 right-3 bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                                                        <Sparkles size={10} /> AI
                                                    </div>
                                                )}

                                                <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Posición de Mercado</div>

                                                <div className={`text-5xl mb-4 ${analysisResult.type === 'optimal' ? 'text-blue-400' : (analysisResult.type === 'underpriced' ? 'text-emerald-400' : 'text-red-400')}`}>
                                                    {analysisResult.type === 'optimal' && <CheckCircle size={64} />}
                                                    {analysisResult.type === 'underpriced' && <TrendingDown size={64} />}
                                                    {analysisResult.type === 'overpriced' && <TrendingUp size={64} />}
                                                </div>

                                                <h3 className="text-2xl font-black text-white capitalize mb-1">
                                                    {analysisResult.type === 'optimal' ? 'Competitivo' : (analysisResult.type === 'underpriced' ? 'Barato' : 'Costoso')}
                                                </h3>
                                                <p className="text-slate-400 text-sm">vs. Promedio Local</p>
                                            </div>

                                            {/* Stats */}
                                            <div className="col-span-2 bg-slate-800 rounded-2xl border border-slate-700 p-6 flex flex-col justify-between shadow-lg">
                                                <div>
                                                    <h4 className="text-slate-400 font-bold mb-6 flex items-center gap-2"><BarChart3 size={18} /> Referencias de Precio</h4>
                                                    <div className="flex items-end justify-between gap-4 text-center">
                                                        <div className="flex-1 p-3 bg-slate-900 rounded-lg border border-slate-700">
                                                            <div className="text-xs text-slate-500 mb-1">Mínimo</div>
                                                            <div className="text-lg font-bold text-emerald-400">{formatCurrency(analysisResult.minPrice)}</div>
                                                        </div>
                                                        <div className="flex-1 p-4 bg-slate-900 rounded-xl border border-blue-500/30 shadow-lg shadow-blue-500/10 transform -translate-y-2">
                                                            <div className="text-xs text-blue-300 font-bold mb-1 uppercase tracking-wider">Promedio Mercado</div>
                                                            <div className="text-2xl font-black text-white">{formatCurrency(analysisResult.marketAvg)}</div>
                                                        </div>
                                                        <div className="flex-1 p-3 bg-slate-900 rounded-lg border border-slate-700">
                                                            <div className="text-xs text-slate-500 mb-1">Máximo</div>
                                                            <div className="text-lg font-bold text-red-400">{formatCurrency(analysisResult.maxPrice)}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-6 pt-6 border-t border-slate-700">
                                                    <div className="flex justify-between items-center text-sm text-slate-400 mb-3">
                                                        <span>Confianza del análisis</span>
                                                        <span className="text-white font-bold">{analysisResult.confidence}%</span>
                                                    </div>
                                                    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                                        <div className="bg-purple-500 h-full rounded-full" style={{ width: `${analysisResult.confidence}%` }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Recommendation & Competitors */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* AI Recommendation */}
                                            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-purple-500/30 p-6 shadow-lg relative overflow-hidden">
                                                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Sparkles size={120} /></div>
                                                <h4 className="font-bold text-purple-300 mb-4 flex items-center gap-2 uppercase tracking-wider text-xs">
                                                    <BrainCircuit size={16} /> Recomendación Inteligente
                                                </h4>
                                                <p className={`text-lg leading-relaxed font-medium ${analysisResult.color}`}>
                                                    "{analysisResult.recommendation}"
                                                </p>
                                                <div className="mt-6 flex gap-2">
                                                    <button className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg transition-colors">
                                                        Aplicar Precio Sugerido
                                                    </button>
                                                    <button className="text-xs bg-transparent border border-slate-600 hover:bg-slate-800 text-slate-400 px-3 py-2 rounded-lg transition-colors">
                                                        Ignorar
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Competitor List */}
                                            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-lg">
                                                <h4 className="font-bold text-slate-300 mb-4 text-sm uppercase">Fuentes Detectadas</h4>
                                                <div className="space-y-3">
                                                    {analysisResult.competitors.map((comp, i) => (
                                                        <div key={i} className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-colors group">
                                                            <div className="flex items-center gap-3 flex-1">
                                                                <div className="bg-slate-700 p-2 rounded-full text-slate-400">
                                                                    {comp.source === 'Marketplace' ? <Globe size={14} /> : <Smartphone size={14} />}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="font-bold text-sm text-slate-200">{comp.name}</div>
                                                                    <div className="text-xs text-slate-500">{comp.source}</div>
                                                                    {comp.link && (
                                                                        <a
                                                                            href={comp.link}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="text-xs text-blue-400 hover:text-blue-300 underline opacity-0 group-hover:opacity-100 transition-opacity"
                                                                        >
                                                                            Ver fuente →
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="font-mono font-bold text-slate-300">{formatCurrency(comp.price)}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mt-4 text-center">
                                                    <span className="text-xs text-slate-500">Datos actualizados hace instantes</span>
                                                </div>
                                            </div>
                                        </div>

                                    </motion.div>
                                ) : (
                                    <div className="text-center py-20 opacity-50">
                                        <p className="text-slate-400">Presiona "Iniciar Análisis" para escanear el mercado.</p>
                                    </div>
                                )}
                            </AnimatePresence>

                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default MarketAnalysis;
