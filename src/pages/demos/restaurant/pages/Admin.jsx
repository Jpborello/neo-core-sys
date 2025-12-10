import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/client';
import {
    LayoutGrid, DollarSign, TrendingUp, Users, Clock, CalendarDays, Bell, CheckCircle,
    Smartphone, History, Archive, LogOut, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('live'); // live, history, hostess, metrics
    const [tables, setTables] = useState([]);
    const [history, setHistory] = useState([]);
    const [waitlist, setWaitlist] = useState([]);
    const [orders, setOrders] = useState([]);

    // Popup state for assigning table
    const [selectedRes, setSelectedRes] = useState(null);
    const [assignModalOpen, setAssignModalOpen] = useState(false);

    // --- Data Fetching ---
    useEffect(() => {
        const fetchData = async () => {
            // Live Tables
            const { data: tData } = await supabase.from('table_states').select('*').order('table_number');
            if (tData) setTables(tData);

            // History (Paid Orders)
            const { data: hData } = await supabase
                .from('orders')
                .select('*')
                .eq('payment_status', 'paid')
                .order('created_at', { ascending: false })
                .limit(50); // Limit for performance
            if (hData) setHistory(hData);

            // Waitlist
            const { data: wData } = await supabase
                .from('reservations')
                .select('*')
                .in('status', ['waiting', 'pending'])
                .order('created_at');
            if (wData) setWaitlist(wData);

            // All Orders for Metrics
            const { data: oData } = await supabase.from('orders').select('*');
            if (oData) setOrders(oData);
        };

        fetchData();

        // Realtime Subscriptions
        const subs = [
            supabase.channel('adm-tab').on('postgres_changes', { event: '*', schema: 'public', table: 'table_states' }, () => fetchData()).subscribe(),
            supabase.channel('adm-ord').on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => fetchData()).subscribe(),
            supabase.channel('adm-res').on('postgres_changes', { event: '*', schema: 'public', table: 'reservations' }, () => fetchData()).subscribe()
        ];

        return () => subs.forEach(s => s.unsubscribe());
    }, []);

    // --- ACTIONS ---

    const handleReleaseTable = async (tNum) => {
        if (!confirm(`¿Liberar Mesa ${tNum}? Se borrarán los datos de ocupación.`)) return;

        // Clear Table State
        await supabase.from('table_states').update({
            status: 'free',
            customer_name: null,
            total_amount: 0,
            payment_method: null,
            occupied_since: null,
            request_bill: false,
            needs_assistance: false
        }).eq('table_number', tNum);

        // Ideally we should also mark any 'pending' orders as cancelled or paid? 
        // For now assume they were closed.
    };

    const handleAssignTable = async (tableNum) => {
        if (!selectedRes) return;

        // 1. Update Reservation
        await supabase.from('reservations').update({
            assigned_table_number: tableNum,
            notification_status: 'notified',
            status: 'confirmed'
        }).eq('id', selectedRes.id);

        // 2. Ideally mark table as reserved? Or just let them sit.
        // Let's keep it simple. Notification sent.

        alert(`🔔 Notificación enviada a ${selectedRes.customer_name}. Asignado a Mesa ${tableNum}.`);
        setAssignModalOpen(false);
        setSelectedRes(null);
    };

    // --- METRICS CALC ---
    const getMetrics = () => {
        if (!orders.length) return { hourly: [], payMethods: [], topItems: [] };

        // Hourly Sales
        const hourly = {};
        orders.forEach(o => {
            if (o.payment_status !== 'paid') return;
            const h = new Date(o.created_at).getHours();
            hourly[h] = (hourly[h] || 0) + o.total;
        });
        const hourlyData = Object.entries(hourly).map(([h, sales]) => ({ name: `${h}hs`, sales }));

        // Pay Methods
        let cash = 0;
        let mp = 0;
        orders.forEach(o => {
            if (o.payment_status !== 'paid') return;
            if (o.payment_method === 'cash') cash += o.total;
            else mp += o.total;
        });
        const payData = [
            { name: 'Efectivo', value: cash, color: '#10b981' }, // Emerald
            { name: 'Mercado Pago', value: mp, color: '#3b82f6' } // Blue
        ];

        // Top Items
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
        if (!confirm('⚠️ PELIGRO: Esto borrará TODOS los pedidos, historial y reservas. ¿Estás seguro?')) return;
        if (!confirm('¿Realmente seguro? No hay vuelta atrás.')) return;

        // 1. Delete all orders
        // Note: Delete without filter needs a trick or iterating. Since we want to clear everything for demo:
        // We will fetch all IDs and delete them.
        const { data: allOrders } = await supabase.from('orders').select('id');
        if (allOrders?.length) {
            await supabase.from('orders').delete().in('id', allOrders.map(o => o.id));
        }

        // 2. Delete all reservations
        const { data: allRes } = await supabase.from('reservations').select('id');
        if (allRes?.length) {
            await supabase.from('reservations').delete().in('id', allRes.map(r => r.id));
        }

        // 3. Reset Tables
        await supabase.from('table_states').update({
            status: 'free',
            customer_name: null,
            total_amount: 0,
            payment_method: null,
            occupied_since: null,
            request_bill: false,
            needs_assistance: false
        }).gt('table_number', 0); // Apply to all

        alert('✨ SISTEMA REINICIADO. Tablas limpias.');
        window.location.reload();
    };


    const metricsData = getMetrics();

    // --- RENDER ---
    return (
        <div className="min-h-screen bg-neutral-950 text-white font-sans flex flex-col">
            {/* Navbar */}
            <div className="bg-neutral-900 border-b border-neutral-800 px-6 py-4 flex justify-between items-center shadow-md z-10">
                <div className="flex items-center gap-3">
                    <div
                        onDoubleClick={handleHardReset}
                        className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-black font-bold shadow-lg shadow-amber-500/20 cursor-pointer hover:bg-red-500 transition-colors"
                        title="Doble Click para Reiniciar Sistema"
                    >
                        <LayoutGrid size={20} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">Neo-Dashboard</h1>
                        <p className="text-xs text-neutral-400">Control Central</p>
                    </div>
                </div>

                <div className="flex bg-neutral-800 p-1 rounded-lg">
                    {['original', 'live', 'history', 'hostess', 'metrics'].map(t => {
                        // Removing 'original' from visible tabs if desired, but kept for full rewrite safety
                        if (t === 'original') return null;
                        return (
                            <button
                                key={t}
                                onClick={() => setActiveTab(t)}
                                className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === t ? 'bg-neutral-700 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}
                            >
                                {t === 'live' && '🔴 VIVO'}
                                {t === 'history' && '📜 CAJA'}
                                {t === 'hostess' && '⏳ HOSTESS'}
                                {t === 'metrics' && '📈 DATA'}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="flex-1 p-6 overflow-hidden flex flex-col">

                {/* 🔴 VIVO */}
                {activeTab === 'live' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><RefreshCw className="text-red-500 animate-spin-slow" /> Operaciones en Vivo</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-auto pb-4">
                            {tables.filter(t => t.status === 'occupied' || t.status === 'payment_pending' || t.status === 'paying_cash').map(t => (
                                <div key={t.table_number} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-xl flex flex-col justify-between">
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
                                        {/* Simple Items List (Using filtered orders for this table would be ideal, fetching on demand or filtering 'orders' state) */}
                                        <div className="bg-neutral-950 rounded p-3 text-sm text-neutral-300 min-h-[80px] mb-4">
                                            {orders.filter(o => o.table_number === t.table_number && o.payment_status !== 'paid').map(o => (
                                                o.items?.map((i, idx) => (
                                                    <div key={`${o.id}-${idx}`} className="flex justify-between mb-1">
                                                        <span>{i.quantity} {i.name}</span>
                                                    </div>
                                                ))
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
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
                        <div className="flex gap-6 mb-8">
                            <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 flex-1">
                                <h3 className="text-neutral-500 text-xs font-bold uppercase mb-1">Recaudación Total (Hoy)</h3>
                                <div className="text-3xl font-black text-white">${metricsData.payMethods.reduce((a, b) => a + b.value, 0).toLocaleString()}</div>
                            </div>
                            <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 flex-1">
                                <h3 className="text-neutral-500 text-xs font-bold uppercase mb-1">Efectivo</h3>
                                <div className="text-3xl font-black text-emerald-500">${metricsData.payMethods.find(p => p.name === 'Efectivo')?.value.toLocaleString() || 0}</div>
                            </div>
                            <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 flex-1">
                                <h3 className="text-neutral-500 text-xs font-bold uppercase mb-1">Mercado Pago</h3>
                                <div className="text-3xl font-black text-blue-500">${metricsData.payMethods.find(p => p.name === 'Mercado Pago')?.value.toLocaleString() || 0}</div>
                            </div>
                        </div>

                        <div className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden flex-1">
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
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><Clock className="text-amber-500" /> Lista de Espera</h2>

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

                        {/* Assign Modal */}
                        {assignModalOpen && (
                            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                                <div className="bg-neutral-900 w-full max-w-md rounded-2xl border border-neutral-800 p-6 shadow-2xl">
                                    <h3 className="text-xl font-bold mb-4">Asignar Mesa a {selectedRes?.customer_name}</h3>
                                    <p className="text-neutral-400 mb-6 text-sm">Selecciona una mesa disponible para notificar al cliente.</p>

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
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col gap-6 overflow-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[300px]">
                            <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
                                <h3 className="font-bold text-white mb-4">Ventas por Hora</h3>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={metricsData.hourly}>
                                        <XAxis dataKey="name" stroke="#525252" fontSize={12} />
                                        <YAxis stroke="#525252" fontSize={12} tickFormatter={val => `$${val}`} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#171717', border: '1px solid #404040', borderRadius: '8px' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Bar dataKey="sales" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 flex flex-col items-center">
                                <h3 className="font-bold text-white mb-4 w-full text-left">Métodos de Pago</h3>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={metricsData.payMethods}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {metricsData.payMethods.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#171717', border: '1px solid #404040', borderRadius: '8px' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="flex gap-4 mt-4">
                                    {metricsData.payMethods.map(m => (
                                        <div key={m.name} className="flex items-center gap-2 text-sm text-neutral-400">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: m.color }}></div>
                                            {m.name} (${m.value.toLocaleString()})
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 flex-1">
                            <h3 className="font-bold text-white mb-4">Top 5 Productos</h3>
                            <div className="space-y-3">
                                {metricsData.topItems.map((item, idx) => (
                                    <div key={item.name} className="flex items-center gap-4">
                                        <span className="font-mono text-neutral-600 font-bold w-4">#{idx + 1}</span>
                                        <div className="flex-1">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-bold text-white">{item.name}</span>
                                                <span className="text-neutral-400">{item.val} vendidos</span>
                                            </div>
                                            <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-indigo-500" style={{ width: `${(item.val / metricsData.topItems[0].val) * 100}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Admin;
