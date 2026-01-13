"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { clientAuth } from '@/lib/supabase';
import {
    Search, LogOut, User, TrendingUp, BarChart3,
    Sparkles, RefreshCcw, ExternalLink, BrainCircuit
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INTELLIGENCE_API_URL = process.env.NEXT_PUBLIC_INTELLIGENCE_API_URL || 'http://localhost:3000';

export default function ClientDashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [clientData, setClientData] = useState(null);
    const [quota, setQuota] = useState(null);
    const [loading, setLoading] = useState(true);

    // Search state
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const [aiAnalysis, setAiAnalysis] = useState(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const { user: currentUser } = await clientAuth.getUser();

        if (!currentUser) {
            router.push('/client/login');
            return;
        }

        setUser(currentUser);

        // Get client data
        const { data: client } = await clientAuth.getClientData(currentUser.id);
        if (client) {
            setClientData(client);

            // Get quota
            const { data: quotaData } = await clientAuth.getClientQuota(client.id);
            setQuota(quotaData);
        }

        setLoading(false);
    };

    const handleLogout = async () => {
        await clientAuth.signOut();
        router.push('/client/login');
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        setSearchResults(null);
        setAiAnalysis(null);

        try {
            // Search products
            const searchResponse = await fetch(`${INTELLIGENCE_API_URL}/api/search?q=${encodeURIComponent(searchQuery)}`);
            const searchData = await searchResponse.json();

            if (searchData.products && searchData.products.length > 0) {
                setSearchResults(searchData);

                // Get AI analysis
                setTimeout(async () => {
                    try {
                        const analysisResponse = await fetch(`${INTELLIGENCE_API_URL}/api/analysis?q=${encodeURIComponent(searchQuery)}`);
                        const analysisData = await analysisResponse.json();
                        if (analysisData.insights) {
                            setAiAnalysis(analysisData);
                        }
                    } catch (error) {
                        console.error('Error getting AI analysis:', error);
                    }
                }, 1000);

                // Refresh quota after search
                if (clientData) {
                    const { data: updatedQuota } = await clientAuth.getClientQuota(clientData.id);
                    setQuota(updatedQuota);
                }
            }
        } catch (error) {
            console.error('Error searching:', error);
            alert('Error al buscar productos. Verifica que el servidor esté corriendo.');
        } finally {
            setIsSearching(false);
        }
    };

    const formatCurrency = (val) => new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
    }).format(val);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-white text-center">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p>Cargando...</p>
                </div>
            </div>
        );
    }

    const quotaPercentage = quota ? (quota.searches_used / quota.monthly_searches) * 100 : 0;
    const remainingSearches = quota ? quota.monthly_searches - quota.searches_used : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            {/* Header */}
            <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg border border-purple-500/50 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">Intelligence</h1>
                            <p className="text-xs text-slate-400">Portal de Cliente</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* User Info */}
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                            <User className="w-4 h-4 text-slate-400" />
                            <span className="text-sm">{clientData?.name || user?.email}</span>
                        </div>

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 flex items-center gap-2 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm">Salir</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Quota Card */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-lg font-bold">Búsquedas Disponibles</h2>
                            <p className="text-sm text-slate-400">Plan: {clientData?.plan || 'Basic'}</p>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-black text-purple-400">{remainingSearches}</div>
                            <div className="text-xs text-slate-400">de {quota?.monthly_searches || 0} este mes</div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${quotaPercentage}%` }}
                        ></div>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">{quotaPercentage.toFixed(1)}% utilizado</p>
                </div>

                {/* Search Section */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Search className="w-6 h-6 text-purple-400" />
                        Buscar Productos
                    </h2>

                    <form onSubmit={handleSearch} className="flex gap-3">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Ej: arroz, aceite, leche..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                        <button
                            type="submit"
                            disabled={isSearching || remainingSearches <= 0}
                            className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-lg flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-900/20"
                        >
                            {isSearching ? (
                                <><RefreshCcw className="w-5 h-5 animate-spin" /> Buscando...</>
                            ) : (
                                <><Search className="w-5 h-5" /> Buscar</>
                            )}
                        </button>
                    </form>

                    {remainingSearches <= 0 && (
                        <div className="mt-4 bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-300 text-sm">
                            Has alcanzado tu límite de búsquedas mensuales. Contacta a soporte para ampliar tu plan.
                        </div>
                    )}
                </div>

                {/* Results Section */}
                <AnimatePresence mode="wait">
                    {isSearching && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-12 text-center"
                        >
                            <div className="relative w-20 h-20 mx-auto mb-6">
                                <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                <BrainCircuit className="absolute inset-0 m-auto text-purple-400 animate-pulse" />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2">Buscando en supermercados...</h4>
                            <div className="flex flex-col gap-1 items-center text-slate-400 text-sm">
                                <span className="animate-pulse">🌐 Carrefour, Coto, Día...</span>
                                <span className="animate-pulse delay-150">🔍 Jumbo, Disco, Vea...</span>
                                <span className="animate-pulse delay-300">🛒 MercadoLibre, Farmacity...</span>
                            </div>
                        </motion.div>
                    )}

                    {searchResults && !isSearching && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            {/* AI Analysis */}
                            {aiAnalysis && aiAnalysis.insights && (
                                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg rounded-2xl border border-purple-500/30 p-6">
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                        <BrainCircuit className="w-5 h-5 text-purple-400" />
                                        Análisis IA
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                        <div className="bg-white/5 rounded-lg p-4">
                                            <div className="text-xs text-slate-400 mb-1">Precio Promedio</div>
                                            <div className="text-2xl font-bold text-white">{formatCurrency(aiAnalysis.insights.averagePrice)}</div>
                                        </div>
                                        <div className="bg-white/5 rounded-lg p-4">
                                            <div className="text-xs text-slate-400 mb-1">Más Barato</div>
                                            <div className="text-2xl font-bold text-emerald-400">{formatCurrency(aiAnalysis.insights.minPrice)}</div>
                                            <div className="text-xs text-slate-400 capitalize">{aiAnalysis.insights.cheapestSource}</div>
                                        </div>
                                        <div className="bg-white/5 rounded-lg p-4">
                                            <div className="text-xs text-slate-400 mb-1">Diferencia</div>
                                            <div className="text-2xl font-bold text-purple-400">{aiAnalysis.insights.percentDifference.toFixed(1)}%</div>
                                        </div>
                                    </div>
                                    {aiAnalysis.summary && (
                                        <p className="text-sm text-slate-300 bg-white/5 rounded-lg p-4">{aiAnalysis.summary}</p>
                                    )}
                                </div>
                            )}

                            {/* Products Grid */}
                            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-purple-400" />
                                    Productos Encontrados ({searchResults.products.length})
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {searchResults.products.slice(0, 12).map((product, i) => (
                                        <div key={i} className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-purple-500/50 transition-colors">
                                            <div className="flex items-start gap-3">
                                                {product.image && (
                                                    <img src={product.image} alt="" className="w-16 h-16 rounded object-cover bg-slate-700" />
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-bold text-white truncate">{product.name}</div>
                                                    <div className="text-xs text-slate-400 capitalize">{product.source}</div>
                                                    <div className="text-lg font-bold text-purple-400 mt-2">{formatCurrency(product.price)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {searchResults.products.length > 12 && (
                                    <p className="text-center text-sm text-slate-400 mt-4">
                                        Y {searchResults.products.length - 12} productos más...
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
