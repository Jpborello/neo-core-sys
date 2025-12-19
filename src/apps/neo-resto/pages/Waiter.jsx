import React, { useState, useEffect } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { supabase } from '../supabase/client';
import {
    LayoutGrid, Search, Plus, Minus, Send, Trash2, Edit2,
    CheckCircle2, UtensilsCrossed, ChevronLeft, User, Bell, FileText, DollarSign, CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Waiter = () => {
    const {
        setTable, tableNumber,
        cart, addToCart, removeFromCart, updateQuantity, addComment,
        clearCart, submitOrder, loginUser, products
    } = useRestaurant();

    const [view, setView] = useState('tables'); // tables, order
    const [searchTerm, setSearchTerm] = useState('');
    const [tablesStatus, setTablesStatus] = useState({});
    const [pendingRequests, setPendingRequests] = useState([]);
    const [tableHistory, setTableHistory] = useState([]);
    const [readyToServe, setReadyToServe] = useState([]);

    // Sound effect
    const playNotificationSound = () => {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.play().catch(e => console.log("Audio play failed", e));
    };

    // Master Listener
    useEffect(() => {
        // 1. Fetch Initial Table States
        const fetchTableStates = async () => {
            const { data } = await supabase.from('table_states').select('*');
            const map = {};
            data?.forEach(s => {
                map[s.table_number] = s;
            });
            setTablesStatus(prev => ({ ...prev, ...map }));
        };
        fetchTableStates();

        // 2. Fetch Pending Orders
        const fetchPendingOrders = async () => {
            const { data } = await supabase.from('orders').select('*').eq('status', 'waiting_waiter').is('restaurant_id', null);
            if (data) setPendingRequests(data);
        };
        fetchPendingOrders();

        // 3. Fetch Ready Orders
        const fetchReadyOrders = async () => {
            const { data } = await supabase.from('orders').select('*').eq('status', 'ready').is('restaurant_id', null);
            if (data) setReadyToServe(data);
        };
        fetchReadyOrders();

        // 4. Subscriptions
        const stateChannel = supabase
            .channel('waiter-table-states')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'table_states' }, (payload) => {
                const newState = payload.new;
                setTablesStatus(prev => {
                    const prevStatus = prev[newState.table_number] || {};
                    if ((newState.needs_assistance && !prevStatus.needs_assistance) ||
                        (newState.request_bill && !prevStatus.request_bill)) {
                        playNotificationSound();
                    }
                    return { ...prev, [newState.table_number]: newState };
                });
            })
            .subscribe();

        const ordersChannel = supabase
            .channel('waiter-orders')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders', filter: 'status=eq.waiting_waiter' }, (payload) => {
                if (payload.new.restaurant_id) return;
                setPendingRequests(prev => [...prev, payload.new]);
                playNotificationSound();
            })
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, (payload) => {
                if (payload.new.restaurant_id) return;
                if (payload.new.status !== 'waiting_waiter') {
                    setPendingRequests(prev => prev.filter(o => o.id !== payload.new.id));
                }
                // Handle Ready/Delivered updates here if needed, but separate channel is cleaner for "Ready" status
            })
            .subscribe();

        const readyChannel = supabase
            .channel('waiter-ready')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders', filter: 'status=eq.ready' }, (payload) => {
                if (payload.new.restaurant_id) return;
                setReadyToServe(prev => [...prev, payload.new]);
                playNotificationSound();
            })
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders', filter: 'status=eq.delivered' }, (payload) => {
                if (payload.new.restaurant_id) return;
                setReadyToServe(prev => prev.filter(o => o.id !== payload.new.id));
            })
            .subscribe();

        loginUser({ name: 'Mozo Demo', phone: '000' });

        return () => {
            supabase.removeChannel(stateChannel);
            supabase.removeChannel(ordersChannel);
            supabase.removeChannel(readyChannel);
        };
    }, []);

    // Fetch History Effect
    useEffect(() => {
        if (view === 'order' && tableNumber) {
            const fetchHistory = async () => {
                const { data } = await supabase
                    .from('orders')
                    .select('*')
                    .eq('table_number', tableNumber)
                    .is('restaurant_id', null)
                    .neq('status', 'cancelled')
                    .order('created_at', { ascending: false });
                setTableHistory(data || []);
            };
            fetchHistory();
        }
    }, [view, tableNumber]);

    const handleCloseTable = async (tNum) => {
        const { data: orders } = await supabase.from('orders').select('total').eq('table_number', tNum).is('restaurant_id', null).neq('status', 'cancelled').neq('payment_status', 'paid');
        const total = orders?.reduce((acc, o) => acc + o.total, 0) || 0;
        if (confirm(`¿Cerrar Mesa ${tNum}? Total: $${total}`)) {
            await supabase.from('table_states').update({ status: 'payment_pending', total_amount: total, request_bill: false, needs_assistance: false }).eq('table_number', tNum);
        }
    };

    const handleConfirmPayment = async (tNum, method = 'mercadopago') => {
        if (confirm(`¿Confirmar cobro de Mesa ${tNum} (${method === 'cash' ? 'Efectivo' : 'MP'}) y liberarla?`)) {
            await supabase
                .from('orders')
                .update({ payment_status: 'paid', status: 'delivered', payment_method: method })
                .eq('table_number', tNum)
                .neq('payment_status', 'paid');

            await supabase
                .from('table_states')
                .update({ status: 'occupied', total_amount: 0, payment_method: null, needs_assistance: false, request_bill: false, customer_name: null, occupied_since: null })
                .eq('table_number', tNum);
        }
    };

    const handleResolveAssistance = async (tNum) => {
        await supabase.from('table_states').update({ needs_assistance: false }).eq('table_number', tNum);
    };

    const handleApproveOrder = async (orderId) => {
        await supabase.from('orders').update({ status: 'en_cocina' }).eq('id', orderId);
    };

    const handleDeliverOrder = async (orderId) => {
        await supabase.from('orders').update({ status: 'delivered' }).eq('id', orderId);
        setReadyToServe(prev => prev.filter(o => o.id !== orderId));
        if (view === 'order') {
            setTableHistory(prev => prev.map(o => o.id === orderId ? { ...o, status: 'delivered' } : o));
        }
    };

    const handleMarchar = async () => {
        const result = await submitOrder({ status: 'en_cocina', payment_status: 'pending' });
        if (result?.success) {
            alert('¡Pedido Marchado!');
            setView('tables');
        } else {
            alert('Error: ' + result?.error);
        }
    };

    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const requestsByTable = pendingRequests.reduce((acc, req) => {
        if (!acc[req.table_number]) acc[req.table_number] = [];
        acc[req.table_number].push(req);
        return acc;
    }, {});


    return (
        <div className="min-h-screen bg-neutral-900 text-white flex flex-col font-sans">
            {/* Header */}
            <header className="p-4 bg-neutral-800 border-b border-neutral-700 flex justify-between items-center shadow-lg z-10">
                <div className="flex items-center gap-3">
                    {view === 'order' && (
                        <button onClick={() => setView('tables')} className="p-2 bg-neutral-700 rounded-full hover:bg-neutral-600 transition-colors">
                            <ChevronLeft size={20} />
                        </button>
                    )}
                    <h1 className="font-bold text-lg flex items-center gap-2 tracking-wide">
                        <User className="text-amber-500" /> Panel de Mozo
                    </h1>
                </div>
                {view === 'order' && (
                    <div className="bg-amber-500/10 text-amber-500 px-4 py-1.5 rounded-full font-bold border border-amber-500/30 text-sm">
                        Mesa {tableNumber}
                    </div>
                )}
            </header>

            {/* DASHBOARD MESAS */}
            {view === 'tables' && (
                <div className="flex-1 flex overflow-hidden">
                    {/* Main Grid */}
                    <div className="flex-1 p-6 overflow-auto">
                        {/* Ready to Serve Alert Banner */}
                        {readyToServe.length > 0 && (
                            <div className="mb-6 bg-emerald-600/20 border border-emerald-500 p-4 rounded-xl flex items-center justify-between animate-in slide-in-from-top-4">
                                <span className="font-bold flex items-center gap-2 text-white">
                                    <UtensilsCrossed className="text-emerald-500" />
                                    ¡Platos listos para retirar! ({readyToServe.length})
                                </span>
                                <div className="flex gap-2">
                                    {readyToServe.map(order => (
                                        <button
                                            key={order.id}
                                            onClick={() => handleDeliverOrder(order.id)}
                                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-lg text-xs font-bold"
                                        >
                                            Mesa {order.table_number}: Entregar
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-neutral-300"><LayoutGrid size={24} /> Estado del Salón</h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {Array.from({ length: 15 }, (_, i) => i + 1).map(num => {
                                const tState = tablesStatus[num] || {};
                                const reqs = requestsByTable[num] || [];
                                const hasAlerts = tState.needs_assistance || tState.request_bill || reqs.length > 0;
                                const isPaying = tState.status === 'payment_pending';
                                const isCash = tState.status === 'paying_cash';

                                return (
                                    <button
                                        key={num}
                                        onClick={() => {
                                            setTable(num);
                                            setView('order');
                                            clearCart();
                                        }}
                                        className={`
                                            aspect-square rounded-2xl flex flex-col justify-between p-4 border transition-all relative overflow-hidden group
                                            ${isPaying || isCash
                                                ? 'bg-purple-900/20 border-purple-500/50 hover:bg-purple-900/40'
                                                : tState.needs_assistance
                                                    ? 'bg-red-900/20 border-red-500 hover:bg-red-900/30 animate-pulse'
                                                    : tState.request_bill
                                                        ? 'bg-orange-900/20 border-orange-500 hover:bg-orange-900/30'
                                                        : tState.status === 'occupied'
                                                            ? 'bg-emerald-900/20 border-emerald-500 hover:bg-emerald-900/30'
                                                            : 'bg-neutral-800/50 border-neutral-700 hover:bg-neutral-750'
                                            }
                                        `}
                                    >
                                        <div className="flex justify-between w-full">
                                            <span className={`text-3xl font-bold ${tState.status === 'occupied' ? 'text-emerald-500' : 'opacity-50'}`}>{num}</span>
                                            <div className="flex flex-col gap-1 items-end">
                                                {tState.needs_assistance && (
                                                    <div onClick={(e) => { e.stopPropagation(); handleResolveAssistance(num) }} className="bg-red-600 text-white text-[10px] p-1 rounded animate-pulse cursor-pointer flex items-center gap-1 hover:bg-red-500 shadow-lg shadow-red-900/50">
                                                        AYUDA <CheckCircle2 size={10} />
                                                    </div>
                                                )}
                                                {tState.request_bill && <div className="bg-orange-500 text-white text-[10px] p-1 rounded animate-pulse">CUENTA</div>}
                                                {reqs.length > 0 && <span className="bg-blue-500 text-white text-[10px] p-1 rounded animate-pulse">+{reqs.length} PEDIDOS</span>}
                                            </div>
                                        </div>

                                        {/* Occupied With Name */}
                                        {tState.status === 'occupied' && !isPaying && !isCash && !tState.needs_assistance && !tState.request_bill && (
                                            <div className="flex items-center gap-1 text-emerald-400">
                                                <User size={14} />
                                                <span className="text-sm font-bold truncate max-w-[100px]">{tState.customer_name || 'Cliente'}</span>
                                            </div>
                                        )}

                                        <div className="flex flex-col gap-1 w-full">
                                            {isCash ? (
                                                <div className="text-center">
                                                    <span className="text-purple-400 text-xs font-bold block mb-1 blink-1">PAGA EFECTIVO</span>
                                                    <div
                                                        onClick={(e) => { e.stopPropagation(); handleConfirmPayment(num); }}
                                                        className="bg-purple-600 hover:bg-purple-500 text-white text-xs py-2 px-3 rounded-lg font-bold w-full flex items-center justify-center gap-1"
                                                    >
                                                        <DollarSign size={14} /> COBRAR
                                                    </div>
                                                </div>
                                            ) : isPaying ? (
                                                <div className="text-center">
                                                    <span className="text-purple-400 text-xs font-bold block mb-1">ESPERANDO PAGO</span>
                                                    <div
                                                        onClick={(e) => { e.stopPropagation(); handleConfirmPayment(num); }}
                                                        className="bg-purple-600 hover:bg-purple-500 text-white text-xs py-2 px-3 rounded-lg font-bold w-full"
                                                    >
                                                        FORZAR COBRO
                                                    </div>
                                                </div>
                                            ) : (
                                                tState.request_bill ? (
                                                    <div onClick={(e) => { e.stopPropagation(); handleCloseTable(num); }} className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs py-2 px-3 rounded-lg font-bold w-full text-center">
                                                        CERRAR MESA
                                                    </div>
                                                ) : (
                                                    <span className={`text-xs font-bold uppercase ${tState.needs_assistance ? 'text-red-400' : hasAlerts ? 'text-amber-500' : tState.status === 'occupied' ? 'text-emerald-600' : 'text-neutral-500'}`}>
                                                        {tState.needs_assistance ? 'SOLICITA MOZO' : hasAlerts ? 'Atención' : tState.status === 'occupied' ? 'Ocupada' : 'Libre'}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Panel: Incoming Requests (Notifications) */}
                    <div className="w-[300px] xl:w-[350px] bg-neutral-800/50 border-l border-neutral-700 flex flex-col">
                        <div className="p-4 border-b border-neutral-700 bg-neutral-800">
                            <h2 className="font-bold flex items-center gap-2"><Bell className="text-amber-500" /> Solicitudes ({pendingRequests.length})</h2>
                        </div>
                        <div className="flex-1 overflow-auto p-4 space-y-4">
                            {pendingRequests.length === 0 && (
                                <div className="text-center text-neutral-500 mt-10 text-sm">No hay pedidos pendientes de aprobación</div>
                            )}
                            {pendingRequests.map(req => (
                                <div key={req.id} className="bg-neutral-900 border border-neutral-700 p-3 rounded-xl shadow-sm">
                                    <div className="flex justify-between items-center mb-2 pb-2 border-b border-neutral-800">
                                        <span className="font-bold text-amber-500">Mesa {req.table_number}</span>
                                        <span className="text-xs text-neutral-500">{new Date(req.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                    <div className="space-y-1 mb-3">
                                        {req.items?.map((item, idx) => (
                                            <div key={idx} className="flex justify-between text-sm">
                                                <span>{item.quantity}x {item.name}</span>
                                                {item.comments && <span className="text-xs text-yellow-500 ml-2 italic">({item.comments})</span>}
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => handleApproveOrder(req.id)}
                                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg text-sm font-bold transition-colors"
                                    >
                                        APROBAR Y ENVIAR
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ORDER INTERFACE (Reused) */}
            {view === 'order' && (
                <div className="flex-1 flex overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    {/* Left: Product List */}
                    <div className="flex-1 flex flex-col border-r border-neutral-700 bg-neutral-800/30">
                        <div className="p-4 border-b border-neutral-700">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 text-neutral-500" size={18} />
                                <input
                                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl py-2.5 pl-10 focus:outline-none focus:border-amber-500 transition-colors"
                                    placeholder="Buscar producto..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className="flex-1 overflow-auto p-2">
                            {filteredProducts.map(p => (
                                <button
                                    key={p.id}
                                    onClick={() => addToCart(p)}
                                    className="w-full text-left p-3 hover:bg-neutral-700 rounded-xl flex justify-between items-center mb-1 group transition-colors"
                                >
                                    <span className="font-bold">{p.name}</span>
                                    <span className="text-amber-500 font-mono">${p.price}</span>
                                    <Plus className="opacity-0 group-hover:opacity-100 text-emerald-400" size={18} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Cart / Comanda */}
                    <div className="w-[400px] flex flex-col bg-neutral-900 border-l border-neutral-800">
                        {/* History Section */}
                        {view === 'order' && tableHistory.length > 0 && (
                            <div className="h-1/3 border-b border-neutral-700 flex flex-col bg-neutral-800/20">
                                <div className="p-3 bg-neutral-800/50 font-bold text-xs uppercase tracking-wider text-neutral-500 flex items-center gap-2">
                                    <FileText size={14} /> Historial Mesa {tableNumber}
                                </div>
                                <div className="flex-1 overflow-auto p-3 space-y-2">
                                    {tableHistory.map(order => (
                                        <div key={order.id} className="text-sm bg-neutral-800 p-2 rounded border border-neutral-700">
                                            <div className="flex justify-between mb-1">
                                                <span className={`font-bold text-[10px] uppercase px-1.5 py-0.5 rounded ${order.status === 'delivered' ? 'bg-neutral-700 text-neutral-400' :
                                                    order.status === 'ready' ? 'bg-emerald-500 text-black animate-pulse' :
                                                        order.status === 'en_cocina' ? 'bg-amber-500 text-black' :
                                                            'bg-blue-500 text-white'
                                                    }`}>
                                                    {order.status === 'en_cocina' ? 'En Cocina' :
                                                        order.status === 'ready' ? 'Listo' :
                                                            order.status === 'delivered' ? 'Despachado' :
                                                                order.status}
                                                </span>
                                                <span className="text-xs text-neutral-500">{new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                            {order.items?.map((it, idx) => (
                                                <div key={idx} className="flex justify-between pl-1">
                                                    <span>{it.quantity}x {it.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="p-4 bg-neutral-800 border-b border-neutral-700">
                            <h2 className="font-bold flex items-center gap-2"><UtensilsCrossed size={18} /> Comanda Manual</h2>
                        </div>

                        <div className="flex-1 overflow-auto p-4 space-y-4">
                            {cart.length === 0 && (
                                <div className="text-center text-neutral-500 mt-10 text-sm">Selecciona productos para agregar a la mesa</div>
                            )}
                            {cart.map((item, idx) => (
                                <div key={idx} className="bg-neutral-800 p-3 rounded-xl border border-neutral-700">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-bold text-md">{item.name}</span>
                                        <span className="font-mono text-amber-500">${item.price * item.quantity}</span>
                                    </div>

                                    <div className="flex items-center gap-3 mb-3">
                                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 bg-neutral-700 rounded hover:bg-neutral-600"><Minus size={14} /></button>
                                        <span className="font-bold">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 bg-neutral-700 rounded hover:bg-neutral-600"><Plus size={14} /></button>
                                        <div className="flex-1"></div>
                                        <button onClick={() => removeFromCart(item.id)} className="text-neutral-500 hover:text-red-400"><Trash2 size={16} /></button>
                                    </div>

                                    <div className="relative">
                                        <Edit2 className="absolute left-2 top-2.5 text-neutral-500" size={12} />
                                        <input
                                            placeholder="Notas (ej: Sin sal)"
                                            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-1.5 pl-7 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                                            value={item.comments || ''}
                                            onChange={(e) => addComment(item.id, e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-neutral-800 border-t border-neutral-700">
                            <div className="flex justify-between items-end mb-4 text-xl font-bold">
                                <span>Total</span>
                                <span>${cart.reduce((a, b) => a + (b.price * b.quantity), 0).toLocaleString()}</span>
                            </div>
                            <button
                                onClick={handleMarchar}
                                disabled={cart.length === 0}
                                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <Send size={20} /> MARCHAR DIRECTO
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Waiter;
