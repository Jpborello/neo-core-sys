import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, ShoppingBag, ChevronLeft, Star, ArrowRight, CreditCard } from 'lucide-react';
import { useRestaurant } from '@/context/RestaurantContext';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
    { id: 'all', name: 'Todo' },
    { id: 'burgers', name: 'Burgers' },
    { id: 'drinks', name: 'Bebidas' },
    { id: 'sides', name: 'Acompañamientos' },
    { id: 'desserts', name: 'Postres' }
];

const Menu = () => {
    const navigate = useNavigate();
    // 1. ALL HOOKS FIRST
    const { addToCart, cart, products, loadingProducts, requestAssistance, requestBill, tableState, requestPayCash, fetchTableOrders } = useRestaurant();

    // State Declarations
    const [activeCategory, setActiveCategory] = useState('all');
    const [search, setSearch] = useState('');
    const [assistanceRequested, setAssistanceRequested] = useState(false);
    const [billRequested, setBillRequested] = useState(false);

    // Payment/Tip State
    const [orderHistory, setOrderHistory] = useState([]);
    const [tipAmount, setTipAmount] = useState(0);
    const [showTipInput, setShowTipInput] = useState(false);

    // Orders Modal State
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [myOrders, setMyOrders] = useState([]);

    // Effects
    React.useEffect(() => {
        if (tableState) {
            setAssistanceRequested(tableState.needs_assistance);
            setBillRequested(tableState.request_bill);
        }
    }, [tableState]);

    React.useEffect(() => {
        if (tableState?.status === 'payment_pending') {
            fetchTableOrders().then(orders => {
                // Flatten items from all orders
                const allItems = orders ? orders.flatMap(o => o.items) : [];
                setOrderHistory(allItems);
            });
        }
    }, [tableState?.status]);

    useEffect(() => {
        if (showStatusModal) {
            fetchTableOrders().then(data => setMyOrders(data || []));
        }
    }, [showStatusModal]);

    // 2. LOGIC & HANDLERS
    const handleCallWaiter = () => {
        const newValue = !assistanceRequested;
        setAssistanceRequested(newValue);
        requestAssistance(newValue);
    };

    const handleRequestBill = () => {
        if (!billRequested) {
            if (confirm('¿Desea pedir la cuenta?')) {
                setBillRequested(true);
                requestBill();
            }
        }
    };

    const handlePayCash = () => {
        requestPayCash();
    };

    const styles = {
        modalOverlay: "fixed inset-0 z-50 bg-neutral-900 flex flex-col items-center justify-center p-6 animate-in fade-in duration-300",
        modalContent: "w-full max-w-md text-center space-y-8"
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'waiting_waiter': return { text: 'Esperando Confirmación', color: 'text-neutral-400' };
            case 'en_cocina': return { text: 'En Preparación 👨‍🍳', color: 'text-amber-500' };
            case 'ready': return { text: 'Listo para servir 🍽️', color: 'text-emerald-500 animate-pulse' };
            case 'delivered': return { text: 'Entregado ✅', color: 'text-neutral-500' };
            default: return { text: status, color: 'text-white' };
        }
    };

    // 3. CALCULATIONS
    const filteredProducts = products.filter(p =>
        (activeCategory === 'all' || p.category === activeCategory) &&
        p.name?.toLowerCase().includes(search.toLowerCase())
    );

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalService = Number(tableState?.total_amount || 0);
    const finalTotal = totalService + (showTipInput ? Number(tipAmount) : 0);

    // 4. CONDITIONAL RENDERS (RETURNS)

    // CASE A: Loading
    if (loadingProducts) {
        return <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">Cargando Menú...</div>;
    }

    // CASE B: Payment Pending
    if (tableState?.status === 'payment_pending') {
        return (
            <div className="fixed inset-0 z-50 bg-neutral-900 flex flex-col items-center justify-center p-6 animate-in fade-in duration-300 overflow-y-auto">
                <div className="w-full max-w-md space-y-6 bg-neutral-800 p-6 rounded-2xl shadow-2xl border border-neutral-700 my-auto">
                    <div className="text-center border-b border-neutral-700 pb-4">
                        <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/20">
                            <span className="text-3xl">🧾</span>
                        </div>
                        <h1 className="text-2xl font-bold text-white">Detalle de Consumo</h1>
                        <p className="text-neutral-400 text-sm">Mesa {tableState.table_number}</p>
                    </div>

                    {/* Breakdown */}
                    <div className="max-h-60 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                        {orderHistory.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm items-start">
                                <div className="text-neutral-300">
                                    <span className="font-bold text-white">{item.quantity}x</span> {item.name}
                                </div>
                                <span className="text-neutral-400 font-mono">${(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>

                    {/* Totals & Tip */}
                    <div className="border-t border-neutral-700 pt-4 space-y-3">
                        <div className="flex justify-between text-neutral-400">
                            <span>Subtotal</span>
                            <span>${totalService.toLocaleString()}</span>
                        </div>

                        {/* Tip Toggle */}
                        <div className="bg-neutral-900 p-3 rounded-xl flex items-center justify-between">
                            <span className="text-sm font-bold text-emerald-400">¿Desea agregar propina?</span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => { setShowTipInput(!showTipInput); setTipAmount(0); }}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${showTipInput ? 'bg-emerald-500' : 'bg-neutral-700'}`}
                                >
                                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${showTipInput ? 'left-7' : 'left-1'}`} />
                                </button>
                            </div>
                        </div>

                        {showTipInput && (
                            <div className="flex items-center gap-2 animate-in slide-in-from-top-2">
                                <span className="text-emerald-500 font-bold">$</span>
                                <input
                                    type="number"
                                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-white focus:border-emerald-500 focus:outline-none"
                                    placeholder="Monto propina"
                                    value={tipAmount}
                                    onChange={(e) => setTipAmount(Number(e.target.value))}
                                />
                            </div>
                        )}

                        <div className="flex justify-between items-end pt-2 border-t border-dotted border-neutral-700">
                            <span className="text-xl font-bold text-white">Total Final</span>
                            <span className="text-3xl font-bold text-amber-500">${finalTotal.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="grid gap-3 pt-2">
                        <button className="bg-[#009EE3] p-4 rounded-xl flex items-center justify-center gap-3 font-bold text-white hover:bg-[#008ED0] transition-colors shadow-lg shadow-blue-500/10">
                            <CreditCard size={20} /> Pagar ${finalTotal.toLocaleString()} con MP
                        </button>
                        <button
                            onClick={handlePayCash}
                            className="bg-emerald-600 p-4 rounded-xl flex items-center justify-center gap-3 font-bold text-white hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-500/10"
                        >
                            <span className="text-xl">💵</span> Pagar con Efectivo
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-900 text-white pb-24 relative">
            {/* Status Modal */}
            <AnimatePresence>
                {showStatusModal && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-neutral-900/95 backdrop-blur-sm p-6 overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Mis Pedidos</h2>
                            <button onClick={() => setShowStatusModal(false)} className="p-2 bg-neutral-800 rounded-full"><ChevronLeft /></button>
                        </div>
                        <div className="space-y-4">
                            {myOrders.length === 0 && <p className="text-neutral-500 text-center mt-10">Aún no has realizado pedidos.</p>}
                            {myOrders.map(order => (
                                <div key={order.id} className="bg-neutral-800 p-4 rounded-xl border border-neutral-700">
                                    <div className="flex justify-between mb-3 border-b border-neutral-700 pb-2">
                                        <span className={`text-sm font-bold ${getStatusLabel(order.status).color}`}>
                                            {getStatusLabel(order.status).text}
                                        </span>
                                        <span className="text-xs text-neutral-500">
                                            {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        {order.items?.map((item, idx) => (
                                            <div key={idx} className="flex justify-between text-sm">
                                                <span>{item.quantity}x {item.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="sticky top-0 z-30 bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800 p-4">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => navigate('/demo-restaurant')} className="p-2 bg-neutral-800 rounded-full">
                        <ChevronLeft size={20} />
                    </button>
                    <h1 className="font-bold text-lg">Menú</h1>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowStatusModal(true)}
                            className="p-2 rounded-full bg-neutral-800 text-amber-500 border border-amber-500/30"
                        >
                            <span className="text-xl">📋</span>
                        </button>
                        {/* Assistance Buttons */}
                        <button
                            onClick={handleCallWaiter}
                            className={`p-2 rounded-full transition-colors ${assistanceRequested ? 'bg-violet-500 text-white animate-pulse' : 'bg-neutral-800 text-violet-500'}`}
                        >
                            <span className="text-xl">🛎️</span>
                        </button>
                        <button
                            onClick={handleRequestBill}
                            disabled={billRequested}
                            className={`p-2 rounded-full transition-colors ${billRequested ? 'bg-orange-500 text-white' : 'bg-neutral-800 text-orange-500'}`}
                        >
                            <span className="text-xl">📄</span>
                        </button>
                    </div>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-3 text-neutral-500" size={20} />
                    <input
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-amber-500 placeholder-neutral-500"
                        placeholder="Buscar..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Categories */}
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${activeCategory === cat.id
                                ? 'bg-amber-500 text-black'
                                : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map(product => {
                    // Defensive coding: Ensure properties exist
                    const safePrice = typeof product.price === 'number' ? product.price : Number(product.price) || 0;
                    const safeName = product.name || 'Producto sin nombre';
                    const safeImage = product.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=60";
                    const safeDesc = product.desc || '';

                    return (
                        <motion.div
                            key={product.id || Math.random()}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-700 flex shadow-lg"
                        >
                            <div className="w-1/3 h-full relative">
                                <img
                                    src={safeImage}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    alt={safeName}
                                    onError={(e) => e.currentTarget.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=60"}
                                />
                            </div>
                            <div className="w-2/3 p-4 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-lg leading-tight mb-1">{safeName}</h3>
                                    <p className="text-xs text-neutral-400 line-clamp-2 mb-2">{safeDesc}</p>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="font-bold text-amber-500">${safePrice.toLocaleString()}</span>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="p-2 bg-neutral-700 hover:bg-neutral-600 rounded-full text-white transition-colors"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Floating Cart Button */}
            <AnimatePresence>
                {totalItems > 0 && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="fixed bottom-6 left-0 right-0 px-6 z-40"
                    >
                        <button
                            onClick={() => navigate('/demo-restaurant/cart')}
                            className="w-full bg-amber-500 text-black p-4 rounded-2xl shadow-xl shadow-amber-500/20 flex justify-between items-center font-bold"
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-black/20 w-8 h-8 rounded-full flex items-center justify-center text-sm">
                                    {totalItems}
                                </div>
                                <span>Ver mi pedido</span>
                            </div>
                            <span>Confirmar / Pedir <ArrowRight size={18} className="inline ml-1" /></span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Menu;
