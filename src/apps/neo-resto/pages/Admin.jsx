import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
    LayoutGrid, DollarSign, TrendingUp, Users, Clock, CalendarDays, Bell, CheckCircle,
    Smartphone, History, Archive, LogOut, RefreshCw, UtensilsCrossed, Building2, ChevronDown, Lock, KeyRound
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pinInput, setPinInput] = useState('');
    const [authError, setAuthError] = useState(false);

    const [activeTab, setActiveTab] = useState('live'); // live, history, hostess, metrics

    // Multi-Tenant State
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurantId, setSelectedRestaurantId] = useState('d3b07384-d9a9-4152-87c9-7d8e1327f31c'); // Default to Demo

    const [tables, setTables] = useState([]);
    const [history, setHistory] = useState([]);
    const [waitlist, setWaitlist] = useState([]);
    const [orders, setOrders] = useState([]);

    // Popup state for assigning table
    const [selectedRes, setSelectedRes] = useState(null);
    const [assignModalOpen, setAssignModalOpen] = useState(false);

    // --- Fetch Restaurants on Mount ---
    useEffect(() => {
        const fetchRestaurants = async () => {
            const { data } = await supabase.from('restaurants').select('*');
            if (data && data.length > 0) {
                setRestaurants(data);
            } else {
                setRestaurants([{ id: 'd3b07384-d9a9-4152-87c9-7d8e1327f31c', name: 'Demo Restaurant' }]);
            }
        };
        fetchRestaurants();
    }, []);

    // --- Data Fetching (Dependent on Selected Restaurant) ---
    useEffect(() => {
        if (!selectedRestaurantId || !isAuthenticated) return;

        const fetchData = async () => {
            // Live Tables
            const { data: tData } = await supabase.from('table_states').select('*').order('table_number');
            if (tData) setTables(tData);

            // History (Paid Orders)
            const { data: hData } = await supabase
                .from('orders')
                .select('*')
                .eq('payment_status', 'paid')
                .eq('restaurant_id', selectedRestaurantId)
                .order('created_at', { ascending: false })
                .limit(50);
            if (hData) setHistory(hData);

            // Waitlist
            const { data: wData } = await supabase
                .from('reservations')
                .select('*')
                .in('status', ['waiting', 'pending'])
                .eq('restaurant_id', selectedRestaurantId)
                .order('created_at');
            if (wData) setWaitlist(wData);

            // All Orders for Metrics
            const { data: oData } = await supabase
                .from('orders')
                .select('*')
                .eq('restaurant_id', selectedRestaurantId);
            if (oData) setOrders(oData);
        };

        fetchData();

        // Realtime Subscriptions
        const subs = [
            supabase.channel('adm-tab').on('postgres_changes', { event: '*', schema: 'public', table: 'table_states' }, () => fetchData()).subscribe(),
            supabase.channel('adm-ord').on('postgres_changes', { event: '*', schema: 'public', table: 'orders', filter: `restaurant_id=eq.${selectedRestaurantId}` }, () => fetchData()).subscribe(),
            supabase.channel('adm-res').on('postgres_changes', { event: '*', schema: 'public', table: 'reservations', filter: `restaurant_id=eq.${selectedRestaurantId}` }, () => fetchData()).subscribe()
        ];

        return () => subs.forEach(s => s.unsubscribe());
    }, [selectedRestaurantId, isAuthenticated]);

    // --- AUTH HANDLER ---
    const handleLogin = (e) => {
        e.preventDefault();
        // HARDCODED PIN FOR DEMO - In real SaaS use Supabase Auth
        if (pinInput === '1234') {
            setIsAuthenticated(true);
        } else {
            setAuthError(true);
            setPinInput('');
            setTimeout(() => setAuthError(false), 2000);
        }
    };

    // --- ACTIONS ---

    const handleReleaseTable = async (tNum) => {
        if (!confirm(`¿Liberar Mesa ${tNum}? Se borrarán los datos de ocupación.`)) return;
        await supabase.from('table_states').update({
            status: 'free',
            customer_name: null,
            total_amount: 0,
            payment_method: null,
            occupied_since: null,
            request_bill: false,
            needs_assistance: false
        }).eq('table_number', tNum);
    };

    const handleAssignTable = async (tableNum) => {
        if (!selectedRes) return;
        await supabase.from('reservations').update({
            assigned_table_number: tableNum,
            notification_status: 'notified',
            status: 'confirmed'
        }).eq('id', selectedRes.id);

        alert(`🔔 Notificación enviada a ${selectedRes.customer_name}. Asignado a Mesa ${tableNum}.`);
        setAssignModalOpen(false);
        setSelectedRes(null);
    };

    // --- METRICS CALC ---
    const getMetrics = () => {
        if (!orders.length) return { hourly: [], payMethods: [], topItems: [] };

        const hourly = {};
        orders.forEach(o => {
            if (o.payment_status !== 'paid') return;
            const h = new Date(o.created_at).getHours();
            hourly[h] = (hourly[h] || 0) + o.total;
        });
        const hourlyData = Object.entries(hourly).map(([h, sales]) => ({ name: `${h}hs`, sales }));

        let cash = 0, mp = 0;
        orders.forEach(o => {
            if (o.payment_status !== 'paid') return;
            if (o.payment_method === 'cash') cash += o.total;
            else mp += o.total;
        });
        const payData = [
            { name: 'Efectivo', value: cash, color: '#10b981' },
            { name: 'Mercado Pago', value: mp, color: '#3b82f6' }
        ];

        const items = {};
        orders.forEach(o => {
            if (!o.items) return;
            o.items.forEach(i => {
                items[i.name] = (items[i.name] || 0) + i.quantity;
            });
        });
        const topItems = Object.entries(items)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([name, val]) => ({ name, val }));

        return { hourly: hourlyData, payMethods: payData, topItems };
    };

    const handleHardReset = async () => {
        if (!confirm('⚠️ PELIGRO: Esto borrará TODOS los pedidos, historial y reservas de ESTE RESTAURANTE. ¿Estás seguro?')) return;
        if (!confirm('¿Realmente seguro? No hay vuelta atrás.')) return;

        await supabase.from('orders').delete().eq('restaurant_id', selectedRestaurantId);
        try {
            await supabase.from('reservations').delete().eq('restaurant_id', selectedRestaurantId);
        } catch (e) {
            console.log("Reservations cleanup failed: ", e);
        }
        await supabase.from('table_states').update({
            status: 'free',
            customer_name: null,
            total_amount: 0,
            payment_method: null,
            occupied_since: null,
            request_bill: false,
            needs_assistance: false
        }).gt('table_number', 0);

        alert('✨ SISTEMA REINICIADO (Datos de Cliente Limpios).');
        window.location.reload();
    };

    const handleInitializeTables = async () => {
        if (!confirm('🛠️ ¿Inicializar Mesas (1-20)?')) return;
        const tablesToInsert = Array.from({ length: 20 }, (_, i) => ({
            table_number: i + 1,
            status: 'free',
            needs_assistance: false,
            request_bill: false
        }));
        try {
            const { error } = await supabase.from('table_states').upsert(tablesToInsert, { onConflict: 'table_number', ignoreDuplicates: true });
            if (error) throw error;
            alert('✅ Mesas 1-20 verificadas e inicializadas.');
            window.location.reload();
        } catch (e) {
            alert('❌ Error al inicializar: ' + e.message);
        }
    };

    const handleSeedMenu = async () => {
        const rName = restaurants.find(r => r.id === selectedRestaurantId)?.name || 'Demo';
        if (!confirm(`🍔 ¿Cargar menú en: ${rName}?`)) return;

        const RESTAURANT_ID = selectedRestaurantId;

        try {
            const categoriesToSeed = [
                { name: 'Bebidas', slug: 'drinks', restaurant_id: RESTAURANT_ID },
                { name: 'Postres', slug: 'desserts', restaurant_id: RESTAURANT_ID },
                { name: 'Acompañamientos', slug: 'sides', restaurant_id: RESTAURANT_ID }
            ];
            let categoryMap = {};
            for (const cat of categoriesToSeed) {
                const { data: existing } = await supabase
                    .from('categories').select('id').eq('restaurant_id', RESTAURANT_ID).eq('slug', cat.slug).maybeSingle();
                if (existing) {
                    categoryMap[cat.slug] = existing.id;
                } else {
                    const { data: newCat, error } = await supabase.from('categories').insert([cat]).select().single();
                    if (error) throw error;
                    categoryMap[cat.slug] = newCat.id;
                }
            }

            const newProducts = [
                { name: 'Coca Cola 350ml', category_id: categoryMap['drinks'], category: 'drinks', price: 2500, is_available: true, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=60', description: 'Refresco clásico.', restaurant_id: RESTAURANT_ID },
                { name: 'Cerveza IPA Artesanal', category_id: categoryMap['drinks'], category: 'drinks', price: 4500, is_available: true, image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=500&q=60', description: 'Pinta 500ml.', restaurant_id: RESTAURANT_ID },
                { name: 'Limonada', category_id: categoryMap['drinks'], category: 'drinks', price: 3200, is_available: true, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=60', description: 'Con menta y jengibre.', restaurant_id: RESTAURANT_ID },
                { name: 'Agua Mineral', category_id: categoryMap['drinks'], category: 'drinks', price: 2000, is_available: true, image: 'https://images.unsplash.com/photo-1560707303-4e98035872dc?auto=format&fit=crop&w=500&q=60', description: '500ml.', restaurant_id: RESTAURANT_ID },
                { name: 'Tiramisú', category_id: categoryMap['desserts'], category: 'desserts', price: 5500, is_available: true, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=60', description: 'Clásico italiano.', restaurant_id: RESTAURANT_ID },
                { name: 'Cheesecake', category_id: categoryMap['desserts'], category: 'desserts', price: 5800, is_available: true, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=500&q=60', description: 'Frutos rojos.', restaurant_id: RESTAURANT_ID },
                { name: 'Papas Fritas', category_id: categoryMap['sides'], category: 'sides', price: 3500, is_available: true, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=500&q=60', description: 'Baston.', restaurant_id: RESTAURANT_ID },
                { name: 'Aros de Cebolla', category_id: categoryMap['sides'], category: 'sides', price: 3800, is_available: true, image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=500&q=60', description: 'Crocantes.', restaurant_id: RESTAURANT_ID }
            ];

            const { data: existing } = await supabase.from('products').select('name').eq('restaurant_id', RESTAURANT_ID);
            const existingNames = new Set(existing?.map(p => p.name) || []);
            const finalProducts = newProducts.filter(p => !existingNames.has(p.name));

            if (finalProducts.length > 0) {
                const { error } = await supabase.from('products').insert(finalProducts);
                if (error) throw error;
                alert(`✅ Se agregaron ${finalProducts.length} nuevos productos!`);
            } else {
                alert('ℹ️ Sin cambios.');
            }
        } catch (e) {
            console.error(e);
            alert('❌ Error: ' + e.message);
        }
    };


    const metricsData = getMetrics();

    // --- RENDER LOGIC ---
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl space-y-6 text-center">
                    <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-2 text-neutral-500">
                        <Lock size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Acceso Restringido</h2>
                    <p className="text-neutral-400 text-sm">Ingresa tu código de administrador para continuar.</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="relative">
                            <KeyRound className="absolute left-4 top-3.5 text-neutral-600" size={20} />
                            <input
                                type="password"
                                value={pinInput}
                                onChange={e => setPinInput(e.target.value)}
                                placeholder="PIN de Seguridad"
                                className={`w-full bg-neutral-950 border ${authError ? 'border-red-500 animate-pulse' : 'border-neutral-700'} rounded-xl py-3 pl-12 text-white outline-none focus:border-amber-500 transition-colors text-center tracking-widest text-lg`}
                                autoFocus
                            />
                        </div>
                        <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-xl transition-transform active:scale-95">
                            Ingresar
                        </button>
                    </form>
                    <button onClick={() => window.history.back()} className="text-neutral-600 text-xs hover:text-white">Volver</button>
                </div>
            </div>
        );
    }

    // --- MAIN RENDER ---
    return (
        <div className="min-h-screen bg-neutral-950 text-white font-sans flex flex-col">
            {/* Navbar */}
            <div className="bg-neutral-900 border-b border-neutral-800 px-6 py-4 flex justify-between items-center shadow-md z-10">
                <div className="flex items-center gap-6">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">Neo-Dashboard</h1>
                        <p className="text-xs text-neutral-400">Control Central</p>
                    </div>

                    {/* RESTAURANT SWITCHER */}
                    <div className="relative group hidden md:block">
                        <div className="flex items-center gap-2 bg-neutral-800 px-3 py-2 rounded-lg border border-neutral-700 hover:border-neutral-600 cursor-pointer transition-colors">
                            <Building2 size={16} className="text-emerald-500" />
                            <select
                                value={selectedRestaurantId}
                                onChange={(e) => setSelectedRestaurantId(e.target.value)}
                                className="bg-transparent border-none text-white text-sm font-bold focus:ring-0 cursor-pointer outline-none appearance-none pr-8 min-w-[150px]"
                            >
                                {restaurants.map(r => (
                                    <option key={r.id} value={r.id} className="bg-neutral-900">{r.name}</option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="text-neutral-400 absolute right-3 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div onDoubleClick={handleHardReset} className="hidden md:flex w-10 h-10 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-lg items-center justify-center hover:bg-red-500 hover:text-black cursor-pointer transition-colors" title="Reiniciar">
                        <LayoutGrid size={20} />
                    </div>
                    <div onClick={handleInitializeTables} className="hidden md:flex w-10 h-10 bg-blue-600/10 text-blue-500 border border-blue-500/20 rounded-lg items-center justify-center hover:bg-blue-600 hover:text-white cursor-pointer transition-colors" title="Mesas">
                        <RefreshCw size={20} />
                    </div>
                    <div onClick={handleSeedMenu} className="hidden md:flex w-10 h-10 bg-emerald-600/10 text-emerald-500 border border-emerald-500/20 rounded-lg items-center justify-center hover:bg-emerald-600 hover:text-white cursor-pointer transition-colors" title="Menú">
                        <UtensilsCrossed size={20} />
                    </div>

                    <div className="flex bg-neutral-800 p-1 rounded-lg ml-4">
                        {['live', 'history', 'hostess', 'metrics'].map(t => (
                            <button
                                key={t}
                                onClick={() => setActiveTab(t)}
                                className={`px-3 py-2 rounded-md text-xs font-bold transition-all uppercase ${activeTab === t ? 'bg-neutral-700 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}
                            >
                                {t === 'live' ? 'Vivo' : t === 'history' ? 'Caja' : t === 'hostess' ? 'Hostess' : 'Data'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 p-6 overflow-hidden flex flex-col">

                {/* 🔴 VIVO */}
                {activeTab === 'live' && (
                    <motion.div key="live" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-auto pb-4">
                            {tables.filter(t => t.status === 'occupied' || t.status === 'payment_pending' || t.status === 'paying_cash').map(t => (
                                <div key={t.table_number} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-xl flex flex-col justify-between animate-in zoom-in-95 duration-200">
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-white">Mesa {t.table_number}</h3>
                                                <div className="text-sm text-neutral-400 flex items-center gap-2">
                                                    <Users size={14} /> {t.customer_name || 'Anónimo'}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xl font-black text-emerald-400">${t.total_amount?.toLocaleString() || 0}</div>
                                                <div className={`text-[10px] font-bold px-2 py-0.5 rounded inline-block mt-1 ${t.status === 'payment_pending' ? 'bg-orange-500/20 text-orange-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                                                    {t.status === 'payment_pending' ? 'PAGANDO' : 'OCUPADA'}
                                                </div>
                                            </div>
                                        </div>
                                        {/* Simple Items List */}
                                        <div className="bg-neutral-950 rounded p-3 text-sm text-neutral-300 min-h-[80px] mb-4 overflow-y-auto max-h-[100px]">
                                            {orders.filter(o => o.table_number === t.table_number && o.payment_status !== 'paid').map(o => (
                                                <div key={o.id}>
                                                    {o.items?.map((i, idx) => (
                                                        <div key={`${o.id}-${idx}`} className="flex justify-between mb-1">
                                                            <span>{i.quantity} {i.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleReleaseTable(t.table_number)}
                                        className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-red-400 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors border border-neutral-700"
                                    >
                                        <LogOut size={16} /> Liberar Mesa
                                    </button>
                                </div>
                            ))}
                            {tables.every(t => t.status === 'free') && (
                                <div className="col-span-full h-64 flex flex-col items-center justify-center text-neutral-600">
                                    <Archive size={48} className="mb-4 opacity-50" />
                                    <p>Todas las mesas están libres.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* 📜 HISTORIAL */}
                {activeTab === 'history' && (
                    <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
                        <div className="flex gap-6 mb-8">
                            <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 flex-1">
                                <h3 className="text-neutral-500 text-xs font-bold uppercase mb-1">Recaudación Total (Hoy)</h3>
                                <div className="text-3xl font-black text-white">${metricsData.payMethods.reduce((a, b) => a + b.value, 0).toLocaleString()}</div>
                            </div>
                        </div>

                        <div className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden flex-1 overflow-y-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-neutral-950 text-neutral-400 text-xs uppercase font-bold sticky top-0">
                                    <tr>
                                        <th className="p-4">Hora</th>
                                        <th className="p-4">Mesa</th>
                                        <th className="p-4">Cliente</th>
                                        <th className="p-4">Total</th>
                                        <th className="p-4">Método</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm text-neutral-300 divide-y divide-neutral-800">
                                    {history.map(order => (
                                        <tr key={order.id} className="hover:bg-neutral-800/50 transition-colors">
                                            <td className="p-4">{new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                            <td className="p-4 font-bold text-white">{order.table_number}</td>
                                            <td className="p-4">{order.customer_name || 'Anónimo'}</td>
                                            <td className="p-4 font-mono text-emerald-400">${order.total.toLocaleString()}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${order.payment_method === 'cash' ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-900' : 'bg-blue-900/30 text-blue-400 border border-blue-900'}`}>
                                                    {order.payment_method === 'cash' ? 'Efectivo' : 'Mercado Pago'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}

                {/* ⏳ HOSTESS */}
                {activeTab === 'hostess' && (
                    <motion.div key="hostess" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
                        <div className="flex-1 overflow-auto space-y-4">
                            {waitlist.length === 0 && (
                                <div className="text-center py-20 text-neutral-600">
                                    <Clock size={48} className="mx-auto mb-4 opacity-20" />
                                    <p>No hay clientes esperando.</p>
                                </div>
                            )}
                            {waitlist.map(w => (
                                <div key={w.id} className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 flex justify-between items-center transition-all hover:border-amber-500/30">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center font-bold text-lg text-amber-500">
                                            {w.party_size}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg">{w.customer_name}</h3>
                                            <div className="flex gap-4 text-sm text-neutral-400">
                                                <span className="flex items-center gap-1"><Smartphone size={14} /> {w.customer_phone}</span>
                                                <span className="flex items-center gap-1"><History size={14} /> {Math.floor((new Date() - new Date(w.created_at)) / 60000)} min</span>
                                            </div>
                                            {w.status === 'pending' && <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded mt-1 inline-block">Reserva Futura ({new Date(w.reservation_time).toLocaleDateString()})</span>}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => { setSelectedRes(w); setAssignModalOpen(true); }}
                                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-emerald-900/20 active:scale-95 transition-transform"
                                    >
                                        ASIGNAR MESA
                                    </button>
                                </div>
                            ))}
                        </div>

                        {assignModalOpen && (
                            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                                <div className="bg-neutral-900 w-full max-w-md rounded-2xl border border-neutral-800 p-6 shadow-2xl">
                                    <h3 className="text-xl font-bold mb-4">Asignar Mesa a {selectedRes?.customer_name}</h3>
                                    <div className="grid grid-cols-4 gap-3 mb-6">
                                        {tables.map(t => (
                                            <button
                                                key={t.table_number}
                                                disabled={t.status !== 'free'}
                                                onClick={() => handleAssignTable(t.table_number)}
                                                className={`aspect-square rounded-lg font-bold text-lg flex items-center justify-center border transition-all
                                                    ${t.status === 'free'
                                                        ? 'bg-neutral-800 border-neutral-600 hover:bg-emerald-600 hover:border-emerald-500 hover:text-white cursor-pointer'
                                                        : 'bg-neutral-900/50 border-neutral-800 text-neutral-700 cursor-not-allowed'}
                                                `}
                                            >
                                                {t.table_number}
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={() => setAssignModalOpen(false)} className="w-full py-3 bg-neutral-800 rounded-lg font-bold text-neutral-400 hover:bg-neutral-700">Cancelar</button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* 📈 ANALYTICS */}
                {activeTab === 'metrics' && (
                    <motion.div key="metrics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col gap-6 overflow-auto">
                        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 h-64">
                            <h3 className="font-bold text-white mb-4">Ventas por Hora</h3>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={metricsData.hourly}>
                                    <XAxis dataKey="name" stroke="#525252" fontSize={12} />
                                    <YAxis stroke="#525252" fontSize={12} tickFormatter={val => `$${val}`} />
                                    <Tooltip contentStyle={{ backgroundColor: '#171717', border: '1px solid #404040', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
                                    <Bar dataKey="sales" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Admin;
