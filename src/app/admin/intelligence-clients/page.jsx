"use client";

import { useState, useEffect } from 'react';
import { supabase, clientAuth } from '@/lib/supabase';
import { UserPlus, Users, Key, Trash2, CheckCircle, XCircle, RefreshCcw } from 'lucide-react';

export default function IntelligenceClientsAdminPage() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);

    // Form state
    const [newClient, setNewClient] = useState({
        email: '',
        password: '',
        name: '',
        plan: 'single',
        monthlySearches: 500,
        monthlyAiAnalysis: 100
    });

    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('clients')
                .select('*, client_quotas(*)')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setClients(data || []);
        } catch (error) {
            console.error('Error loading clients:', error);
            alert('Error al cargar clientes');
        } finally {
            setLoading(false);
        }
    };

    const createClient = async (e) => {
        e.preventDefault();
        setCreating(true);

        try {
            const response = await fetch('/api/intelligence/create-client', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newClient)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error creating client');
            }

            alert(`✅ Cliente creado exitosamente!\n\nEmail: ${data.email}\nPassword: ${newClient.password}\nAPI Key: ${data.apiKey}`);

            // Reset form
            setNewClient({
                email: '',
                password: '',
                name: '',
                plan: 'single',
                monthlySearches: 500,
                monthlyAiAnalysis: 100
            });

            // Reload clients
            loadClients();

        } catch (error) {
            console.error('Error creating client:', error);
            alert('Error al crear cliente: ' + error.message);
        } finally {
            setCreating(false);
        }
    };

    const toggleClientStatus = async (clientId, currentStatus) => {
        try {
            const { error } = await supabase
                .from('clients')
                .update({ active: !currentStatus })
                .eq('id', clientId);

            if (error) throw error;
            loadClients();
        } catch (error) {
            console.error('Error toggling status:', error);
            alert('Error al cambiar estado');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Intelligence - Admin Panel
                    </h1>
                    <p className="text-slate-400">Gestión de Clientes del Scraper</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Create Client Form */}
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <UserPlus className="w-6 h-6 text-purple-400" />
                            Crear Nuevo Cliente
                        </h2>

                        <form onSubmit={createClient} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={newClient.email}
                                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white"
                                    placeholder="cliente@ejemplo.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Contraseña</label>
                                <input
                                    type="text"
                                    value={newClient.password}
                                    onChange={(e) => setNewClient({ ...newClient, password: e.target.value })}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white"
                                    placeholder="Mínimo 6 caracteres"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Nombre</label>
                                <input
                                    type="text"
                                    value={newClient.name}
                                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white"
                                    placeholder="Nombre del cliente"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Plan</label>
                                <select
                                    value={newClient.plan}
                                    onChange={(e) => setNewClient({ ...newClient, plan: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white"
                                >
                                    <option value="single">Single (500 búsquedas/mes)</option>
                                    <option value="team">Team (2000 búsquedas/mes)</option>
                                    <option value="enterprise">Enterprise (Ilimitado)</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Búsquedas/mes</label>
                                    <input
                                        type="number"
                                        value={newClient.monthlySearches}
                                        onChange={(e) => setNewClient({ ...newClient, monthlySearches: parseInt(e.target.value) })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Análisis IA/mes</label>
                                    <input
                                        type="number"
                                        value={newClient.monthlyAiAnalysis}
                                        onChange={(e) => setNewClient({ ...newClient, monthlyAiAnalysis: parseInt(e.target.value) })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={creating}
                                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                            >
                                {creating ? (
                                    <><RefreshCcw className="w-5 h-5 animate-spin" /> Creando...</>
                                ) : (
                                    <><UserPlus className="w-5 h-5" /> Crear Cliente</>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Clients List */}
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <Users className="w-6 h-6 text-purple-400" />
                                Clientes ({clients.length})
                            </h2>
                            <button
                                onClick={loadClients}
                                className="bg-white/5 hover:bg-white/10 p-2 rounded-lg transition-colors"
                            >
                                <RefreshCcw className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-3 max-h-[600px] overflow-y-auto">
                            {loading ? (
                                <div className="text-center py-8 text-slate-400">Cargando...</div>
                            ) : clients.length === 0 ? (
                                <div className="text-center py-8 text-slate-400">No hay clientes aún</div>
                            ) : (
                                clients.map((client) => (
                                    <div key={client.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1">
                                                <div className="font-bold text-white">{client.name}</div>
                                                <div className="text-sm text-slate-400">{client.contact_email}</div>
                                                <div className="text-xs text-slate-500 capitalize mt-1">
                                                    Plan: {client.plan} | {client.subscription_status}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => toggleClientStatus(client.id, client.active)}
                                                className={`p-2 rounded-lg transition-colors ${client.active
                                                    ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                                                    : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                                    }`}
                                            >
                                                {client.active ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                                            </button>
                                        </div>

                                        {client.client_quotas && client.client_quotas.length > 0 && (
                                            <div className="mt-3 pt-3 border-t border-white/10">
                                                <div className="grid grid-cols-2 gap-2 text-xs">
                                                    <div>
                                                        <span className="text-slate-400">Búsquedas:</span>{' '}
                                                        <span className="text-white font-bold">
                                                            {client.client_quotas[0].searches_used} / {client.client_quotas[0].monthly_searches}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="text-slate-400">Análisis IA:</span>{' '}
                                                        <span className="text-white font-bold">
                                                            {client.client_quotas[0].ai_analysis_used} / {client.client_quotas[0].monthly_ai_analysis}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
