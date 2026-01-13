import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, BarChart3, TrendingUp, TrendingDown, Minus,
    AlertCircle, CheckCircle, Smartphone, Globe, RefreshCcw,
    Lock, Sparkles, BrainCircuit, ExternalLink
} from 'lucide-react';
import { useDemo } from '../../../context/DemoContext';

// Intelligence API Configuration
const INTELLIGENCE_API_URL = 'http://localhost:3000';
const INTELLIGENCE_API_KEY = 'sk_hcauUOUVZt5u6Jn_AKX0fSqi6kdKU9bC';

const MarketAnalysis = () => {
    const { products } = useDemo();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [scrapedProducts, setScrapedProducts] = useState([]);
    const [aiAnalysis, setAiAnalysis] = useState(null);

    // Función para buscar productos con el scraper real
    const searchIntelligence = async (productName) => {
        try {
            const response = await fetch(`${INTELLIGENCE_API_URL}/api/search?q=${encodeURIComponent(productName)}`, {
                headers: {
                    'X-API-Key': INTELLIGENCE_API_KEY
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error searching Intelligence:', error);
            return null;
        }
    };

    // Función para obtener análisis IA
    const getAIAnalysis = async (productName) => {
        try {
            const response = await fetch(`${INTELLIGENCE_API_URL}/api/analysis?q=${encodeURIComponent(productName)}`, {
                headers: {
                    'X-API-Key': INTELLIGENCE_API_KEY
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error getting AI analysis:', error);
            return null;
        }
    };

    // Función principal de análisis
    const analyzeProduct = async (product) => {
        setIsAnalyzing(true);
        setAnalysisResult(null);
        setScrapedProducts([]);
        setAiAnalysis(null);

        try {
            // 1. Buscar productos en el mercado
            console.log('🔍 Buscando productos en el mercado...');
            const searchData = await searchIntelligence(product.name);

            if (searchData && searchData.products && searchData.products.length > 0) {
                setScrapedProducts(searchData.products);
                console.log(`✅ Encontrados ${searchData.products.length} productos de ${searchData.totalItems} fuentes`);

                // Calcular estadísticas
                const prices = searchData.products.map(p => p.price).filter(p => p > 0);
                const minPrice = Math.min(...prices);
                const maxPrice = Math.max(...prices);
                const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;

                // Determinar tipo de precio
                let resultType = 'optimal';
                if (product.price < avgPrice * 0.9) resultType = 'underpriced';
                else if (product.price > avgPrice * 1.1) resultType = 'overpriced';

                // Agrupar por fuente
                const bySource = {};
                searchData.products.forEach(p => {
                    if (!bySource[p.source]) {
                        bySource[p.source] = [];
                    }
                    bySource[p.source].push(p);
                });

                // Crear lista de competidores
                const competitors = Object.entries(bySource).map(([source, items]) => {
                    const avgSourcePrice = items.reduce((sum, item) => sum + item.price, 0) / items.length;
                    return {
                        name: source.charAt(0).toUpperCase() + source.slice(1),
                        price: avgSourcePrice,
                        source: 'Supermercado',
                        count: items.length
                    };
                });

                setAnalysisResult({
                    type: resultType,
                    marketAvg: Math.round(avgPrice),
                    minPrice: Math.round(minPrice),
                    maxPrice: Math.round(maxPrice),
                    competitors,
                    confidence: 95,
                    totalProducts: searchData.products.length,
                    sources: Object.keys(bySource).length
                });

                // 2. Obtener análisis IA
                console.log('🤖 Obteniendo análisis IA...');
                const aiData = await getAIAnalysis(product.name);

                if (aiData && aiData.insights) {
                    setAiAnalysis(aiData);
                    console.log('✅ Análisis IA completado');
                }

            } else {
                // Fallback a datos simulados
                console.warn('⚠️ No se encontraron productos, usando datos simulados');
                analyzeProductMock(product);
            }

        } catch (error) {
            console.error('Error al analizar producto:', error);
            analyzeProductMock(product);
        } finally {
            setTimeout(() => {
                setIsAnalyzing(false);
            }, 500);
        }
    };

    // Función de análisis simulado (fallback)
    const analyzeProductMock = (product) => {
        const variance = Math.random();
        let resultType = 'optimal';
        if (variance < 0.3) resultType = 'underpriced';
        else if (variance > 0.7) resultType = 'overpriced';

        const marketAvg = product.price * (resultType === 'underpriced' ? 1.15 : (resultType === 'overpriced' ? 0.85 : 1.02));
        const minPrice = marketAvg * 0.9;
        const maxPrice = marketAvg * 1.1;

        const mockCompetitors = [
            { name: 'MercadoLibre', price: marketAvg * 0.98, source: 'Marketplace' },
            { name: 'Carrefour', price: marketAvg * 1.05, source: 'Supermercado' },
            { name: 'Coto', price: marketAvg * (Math.random() > 0.5 ? 0.95 : 1.1), source: 'Supermercado' }
        ];

        setAnalysisResult({
            type: resultType,
            marketAvg: Math.round(marketAvg),
            minPrice: Math.round(minPrice),
            maxPrice: Math.round(maxPrice),
            competitors: mockCompetitors,
            confidence: 85,
            isMock: true
        });
    };

    const formatCurrency = (val) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(val);

    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

    // Generar recomendación basada en análisis
    const getRecommendation = () => {
        if (!analysisResult) return null;

        const { type, marketAvg } = analysisResult;
        const currentPrice = selectedProduct.price;
        let recommendation = "";
        let color = "";

        if (type === 'underpriced') {
            const diff = Math.round(((marketAvg - currentPrice) / currentPrice) * 100);
            recommendation = `Tu precio está un ${diff}% por debajo del promedio. Podrías aumentar hasta ${formatCurrency(marketAvg)} sin perder competitividad y mejorar tu margen.`;
            color = "text-emerald-400";
        } else if (type === 'overpriced') {
            const diff = Math.round(((currentPrice - marketAvg) / marketAvg) * 100);
            recommendation = `Estás un ${diff}% por encima del mercado. Considerá una oferta o pack promocional para no perder ventas frente a la competencia.`;
            color = "text-red-400";
        } else {
            recommendation = "Tu precio es competitivo y está alineado con el mercado. Mantené este posicionamiento para fidelizar clientes.";
            color = "text-blue-400";
        }

        return { recommendation, color };
    };

    const rec = getRecommendation();

    return (
        <div className="flex flex-col h-full bg-slate-900 text-slate-100 rounded-xl overflow-hidden relative">

            {/* Header */}
            <div className="p-6 border-b border-slate-700 bg-slate-900/50 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 flex items-center gap-2">
                        <BrainCircuit /> Inteligencia de Precios
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">Comparativa de mercado en tiempo real con scraping de 10+ supermercados.</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Status Indicators */}
                    <div className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/50 text-emerald-300">
                        <Sparkles size={12} className="animate-pulse" />
                        INTELLIGENCE ACTIVO
                    </div>
                    <div className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 bg-blue-500/10 border border-blue-500/50 text-blue-300">
                        <Globe size={12} />
                        {scrapedProducts.length > 0 ? `${scrapedProducts.length} PRODUCTOS` : 'SCRAPING REAL'}
                    </div>
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
                                onClick={() => { setSelectedProduct(product); setAnalysisResult(null); setScrapedProducts([]); setAiAnalysis(null); }}
                                className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-all ${selectedProduct?.id === product.id ? 'bg-purple-500/20 border border-purple-500/50 shadow-md' : 'hover:bg-slate-700/50 border border-transparent'}`}
                            >
                                <img src={product.image} alt="" className="w-10 h-10 rounded-md object-cover bg-slate-700" />
                                <div className="min-w-0">
                                    <div className={`font-bold text-sm truncate ${selectedProduct?.id === product.id ? 'text-white' : 'text-slate-300'}`}>{product.name}</div>
                                    <div className="text-xs text-slate-500 flex items-center justify-between gap-2">
                                        <span>Actual: {formatCurrency(product.price)}</span>
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
                                        <h4 className="text-xl font-bold text-white mb-2">Buscando en supermercados...</h4>
                                        <div className="flex flex-col gap-1 items-center text-slate-400 text-sm font-mono">
                                            <span className="animate-pulse delay-75">🌐 Carrefour, Coto, Día...</span>
                                            <span className="animate-pulse delay-150">🔍 Jumbo, Disco, Vea...</span>
                                            <span className="animate-pulse delay-300">🛒 MercadoLibre, Farmacity...</span>
                                            <span className="animate-pulse delay-450">🤖 Analizando con IA...</span>
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
                                                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-red-500 opacity-50"></div>

                                                {/* Status Badge */}
                                                {analysisResult.isMock ? (
                                                    <div className="absolute top-3 right-3 bg-amber-500/20 border border-amber-500/50 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold">
                                                        DEMO
                                                    </div>
                                                ) : (
                                                    <div className="absolute top-3 right-3 bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                                                        <Sparkles size={10} /> REAL
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
                                                <p className="text-slate-400 text-sm">vs. Promedio de Mercado</p>
                                                {analysisResult.totalProducts && (
                                                    <p className="text-slate-500 text-xs mt-2">{analysisResult.totalProducts} productos de {analysisResult.sources} fuentes</p>
                                                )}
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
                                                {rec && (
                                                    <p className={`text-lg leading-relaxed font-medium ${rec.color}`}>
                                                        "{rec.recommendation}"
                                                    </p>
                                                )}
                                                {aiAnalysis && aiAnalysis.summary && (
                                                    <div className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                                                        <p className="text-sm text-slate-300">{aiAnalysis.summary}</p>
                                                        <p className="text-xs text-slate-500 mt-2">Análisis IA: {aiAnalysis.provider} ({aiAnalysis.model})</p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Competitor List */}
                                            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-lg">
                                                <h4 className="font-bold text-slate-300 mb-4 text-sm uppercase">Fuentes Detectadas</h4>
                                                <div className="space-y-3 max-h-64 overflow-y-auto">
                                                    {analysisResult.competitors.map((comp, i) => (
                                                        <div key={i} className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-colors group">
                                                            <div className="flex items-center gap-3 flex-1">
                                                                <div className="bg-slate-700 p-2 rounded-full text-slate-400">
                                                                    {comp.source === 'Marketplace' ? <Globe size={14} /> : <Smartphone size={14} />}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="font-bold text-sm text-slate-200">{comp.name}</div>
                                                                    <div className="text-xs text-slate-500">{comp.source} {comp.count && `(${comp.count} productos)`}</div>
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

                                        {/* Scraped Products List */}
                                        {scrapedProducts.length > 0 && (
                                            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-lg">
                                                <h4 className="font-bold text-slate-300 mb-4 text-sm uppercase flex items-center gap-2">
                                                    <ExternalLink size={16} /> Productos Encontrados ({scrapedProducts.length})
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                                                    {scrapedProducts.slice(0, 12).map((product, i) => (
                                                        <div key={i} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50 hover:border-purple-500/50 transition-colors">
                                                            <div className="flex items-start gap-2">
                                                                {product.image && (
                                                                    <img src={product.image} alt="" className="w-12 h-12 rounded object-cover bg-slate-700" />
                                                                )}
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="text-xs font-bold text-slate-300 truncate">{product.name}</div>
                                                                    <div className="text-xs text-slate-500 capitalize">{product.source}</div>
                                                                    <div className="text-sm font-bold text-white mt-1">{formatCurrency(product.price)}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                {scrapedProducts.length > 12 && (
                                                    <p className="text-center text-xs text-slate-500 mt-3">Y {scrapedProducts.length - 12} productos más...</p>
                                                )}
                                            </div>
                                        )}

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
