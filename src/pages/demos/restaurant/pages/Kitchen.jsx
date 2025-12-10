import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../supabase/client';
import { CheckCircle, Clock, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Kitchen = () => {
    const [productMap, setProductMap] = useState({});
    const [orders, setOrders] = useState([]);
    const audioRef = useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await supabase.from('products').select('name, category');
            const map = {};
            data?.forEach(p => map[p.name] = p.category);
            setProductMap(map);
        };
        fetchProducts();
    }, []);

    // Initial Fetch
    useEffect(() => {
        const fetchOrders = async () => {
            const { data } = await supabase
                .from('orders')
                .select('*')
                .in('status', ['pending', 'en_cocina'])
                .order('created_at', { ascending: true });

            if (data) setOrders(data);
        };

        fetchOrders();

        const channel = supabase
            .channel('kitchen-orders')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'orders' },
                (payload) => {
                    if (['pending', 'en_cocina'].includes(payload.new.status)) {
                        setOrders(prev => [...prev, payload.new]);
                        if (audioRef.current) {
                            audioRef.current.play().catch(e => console.error(e));
                        }
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const markReady = async (orderId) => {
        setOrders(prev => prev.filter(o => o.id !== orderId));
        await supabase
            .from('orders')
            .update({ status: 'ready' })
            .eq('id', orderId);
    };

    // Derived: Only Food (NOT drinks)
    const kitchenOrders = orders.map(order => {
        // If map not loaded yet, show all? No, safe default is show all or none. Show all to avoid missing items.
        // But better to wait. 
        const foodItems = (order.items || []).filter(item => {
            const cat = productMap[item.name];
            return cat !== 'drinks'; // Include everything properly categorized as NOT drinks (or unknown)
        });
        if (foodItems.length === 0) return null;
        return { ...order, items: foodItems };
    }).filter(Boolean);

    return (
        <div className="min-h-screen bg-slate-900 text-white p-6">
            <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" />

            <header className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-600 rounded-lg">
                        <Clock size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Neo-Kitchen KDS</h1>
                        <p className="text-slate-400 text-sm">Monitor de Cocina en Tiempo Real</p>
                    </div>
                </div>
                <div className="bg-slate-800 px-4 py-2 rounded-lg flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-sm font-bold text-emerald-500">CONECTADO</span>
                </div>
            </header>

            {kitchenOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
                    <Bell size={64} className="mb-4 opacity-20" />
                    <p className="text-xl">Todo tranquilo por ahora...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {kitchenOrders.map(order => (
                            <motion.div
                                key={order.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-xl flex flex-col"
                            >
                                <div className="bg-slate-700/50 p-4 border-b border-slate-700 flex justify-between items-center">
                                    <h3 className="font-black text-xl text-amber-500">Mesa {order.table_number}</h3>
                                    <div className="text-xs text-slate-400 bg-slate-900 px-2 py-1 rounded">
                                        {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                                <div className="p-4 flex-1">
                                    <div className="mb-4">
                                        <p className="font-bold text-white">{order.customer_name}</p>
                                        <p className="text-xs text-slate-400">ID: #{order.id}</p>
                                        {order.status === 'en_cocina' && (
                                            <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-0.5 rounded border border-purple-500/50 mt-1 inline-block">
                                                MOZO
                                            </span>
                                        )}
                                    </div>
                                    <div className="space-y-3">
                                        {Array.isArray(order.items) ? order.items.map((item, idx) => (
                                            <div key={idx} className="flex flex-col gap-1">
                                                <div className="flex gap-3 text-sm border-l-2 border-blue-500 pl-3">
                                                    <span className="font-bold bg-blue-500/20 text-blue-300 w-6 h-6 flex items-center justify-center rounded-sm shrink-0">
                                                        {item.quantity}
                                                    </span>
                                                    <span className="text-slate-200">{item.name}</span>
                                                </div>
                                                {item.comments && (
                                                    <div className="ml-9 text-xs font-bold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded w-fit border border-yellow-500/20 flex items-center gap-1">
                                                        <span>⚠️</span> {item.comments}
                                                    </div>
                                                )}
                                            </div>
                                        )) : <p className="text-red-500">Error en items</p>}
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-900/50 border-t border-slate-700">
                                    <button
                                        onClick={() => markReady(order.id)}
                                        className="w-full bg-emerald-600 hover:bg-emerald-500 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors uppercase tracking-wider text-sm"
                                    >
                                        <CheckCircle size={18} /> Marcar Listo
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default Kitchen;
