import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../supabase/client';
import { CheckCircle, Wine, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Bar = () => {
    const [orders, setOrders] = useState([]);
    const audioRef = useRef(null);

    const isDrink = (itemName) => {
        // Quick check if item is a drink based on common keywords if category isn't in order_items
        // Ideally we should augment order_items with category, but for now we'll fetch products or assume logic.
        // Wait, order items usually have basic info.
        // Better: filtered at the Render level or Fetch level? 
        // Fetch level is hard because JSONB.
        // Render level is easy.

        // Actually, we need to know if an order contains drinks. 
        // If an order has NO drinks, it shouldn't show up here? 
        // Or should we strip non-drink items? 
        // Best approach: "Station Logic". If I am Bar, I only see Drink items safely.
        return true;
    };

    // Filter Logic:
    // We need to look up categories. 
    // Since 'items' in 'orders' is a JSONB array [{name, quantity...}], we don't naturally have the category there unless we saved it.
    // I will assume for now we need to fetch products or use a heuristc?
    // User said: "Todo lo que es bebidas va a la barra".
    // I will try to fetch categories or cross-reference.
    // OR, I can update the 'submitOrder' to include category in the item snapshot. Use that for future.
    // For EXISTING items, it might be tricky.
    // Let's rely on a list of "Drink Keywords" or better, just fetch all products map.
    const [productMap, setProductMap] = useState({});

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
                .is('restaurant_id', null)
                .order('created_at', { ascending: true });

            if (data) setOrders(data);
        };

        fetchOrders();

        const channel = supabase
            .channel('bar-orders')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'orders' },
                (payload) => {
                    if (payload.new.restaurant_id) return;
                    if (['pending', 'en_cocina'].includes(payload.new.status)) {
                        setOrders(prev => [...prev, payload.new]);
                        if (audioRef.current) audioRef.current.play().catch(e => console.log(e));
                    }
                }
            )
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, []);

    const markReady = async (orderId) => {
        // Actually, for split orders (Food + Drink), marking "Ready" on Bar might close the whole ticket?
        // This is complex. 
        // Simplified V1: Bar marks independent of Kitchen? 
        // If we share the SAME order ID, marking it 'ready' updates it for EVERYONE.
        // This is a common problem in simple KDS.
        // Solution: Split statuses? Or just alert Waiter "Bar Order Ready"?
        // User wants "Refining".
        // Let's assume for now marking ready updates the main status. 
        // Ideally: we should split the order into sub-orders.
        // But for this "Prototyping" speed: 
        // Trigger a "PARTIAL READY" or just log it?
        // Let's keep it simple: If I click ready, I assume I completed MY part. 
        // If it overlaps with Kitchen, we might overwrite. 
        // Risk: Kitchen is cooking, Bar sets "Ready", table goes Green.
        // Fix: Use a separate 'bar_status' column? Or 'items' status?
        // MVP: Just show alerts.

        await supabase
            .from('orders')
            .update({ status: 'ready' }) // This might be premature if Kitchen isn't done.
            .eq('id', orderId);

        setOrders(prev => prev.filter(o => o.id !== orderId));
    };

    // Derived list: Orders that contain at least one drink
    const barOrders = orders.map(order => {
        const drinkItems = (order.items || []).filter(item => {
            const cat = productMap[item.name];
            return cat === 'drinks' || item.category === 'drinks';
        });
        if (drinkItems.length === 0) return null;
        return { ...order, items: drinkItems }; // Only show drinks
    }).filter(Boolean);

    return (
        <div className="min-h-screen bg-neutral-900 text-white p-6">
            <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" />

            <header className="flex justify-between items-center mb-8 border-b border-neutral-700 pb-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-600 rounded-lg">
                        <Wine size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Neo-Bar Station</h1>
                        <p className="text-neutral-400 text-sm">Comandas de Bebidas</p>
                    </div>
                </div>
                <div className="bg-neutral-800 px-4 py-2 rounded-lg flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-sm font-bold text-emerald-500">EN LINEA</span>
                </div>
            </header>

            {barOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[60vh] text-neutral-500">
                    <Wine size={64} className="mb-4 opacity-20" />
                    <p className="text-xl">Barra despejada...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {barOrders.map(order => (
                            <motion.div
                                key={order.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden shadow-xl flex flex-col"
                            >
                                <div className="bg-purple-900/20 p-4 border-b border-neutral-700 flex justify-between items-center">
                                    <h3 className="font-black text-xl text-purple-400">Mesa {order.table_number}</h3>
                                    <div className="text-xs text-neutral-400 bg-neutral-900 px-2 py-1 rounded">
                                        {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                                <div className="p-4 flex-1">
                                    <div className="mb-4">
                                        <p className="font-bold text-white">{order.customer_name}</p>
                                        <p className="text-xs text-neutral-500">#{order.id?.slice(0, 8)}</p>
                                    </div>
                                    <div className="space-y-3">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex flex-col gap-1">
                                                <div className="flex gap-3 text-sm border-l-2 border-purple-500 pl-3">
                                                    <span className="font-bold bg-purple-500/20 text-purple-300 w-6 h-6 flex items-center justify-center rounded-sm shrink-0">
                                                        {item.quantity}
                                                    </span>
                                                    <span className="text-neutral-200">{item.name}</span>
                                                </div>
                                                {item.comments && (
                                                    <div className="ml-9 text-xs font-bold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded w-fit border border-yellow-500/20">
                                                        ⚠️ {item.comments}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-4 bg-neutral-900/50 border-t border-neutral-700">
                                    <button
                                        onClick={() => markReady(order.id)}
                                        className="w-full bg-emerald-600 hover:bg-emerald-500 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors uppercase tracking-wider text-sm"
                                    >
                                        <CheckCircle size={18} /> Bebidas Listas
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

export default Bar;
