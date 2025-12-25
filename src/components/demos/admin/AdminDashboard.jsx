"use client";
import React, { useState, useEffect } from 'react';
import {
    LayoutGrid, DollarSign, TrendingUp, Truck, MapPin, Search,
    Package, ArrowRight, MessageCircle, AlertCircle, ShoppingBag,
    CheckCircle, X, Clock, Lock, BarChart3, AlertTriangle, Send,
    Plus, Edit, UploadCloud, Trash2, Save, Image as ImageIcon, Ticket, LogOut,
    Megaphone, Gift, Trophy, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


import { useDemo } from '../../../context/DemoContext';
import confetti from 'canvas-confetti';


const AdminDashboard = () => {
    // --- CONTEXT ---
    const {
        products, orders, updateOrderStatus, updateProduct, deleteProduct,
        carouselSlides, updateCarousel, raffleWinners, addRaffleWinner,
        isRaffleActive, toggleRaffle
    } = useDemo();
    const [activeTab, setActiveTab] = useState('orders'); // orders, sent, metrics, products
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Auth Simulation State
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [productSearchTerm, setProductSearchTerm] = useState('');

    // Product Modal State
    const [showProductModal, setShowProductModal] = useState(false);

    const [editingProduct, setEditingProduct] = useState(null);

    // Marketing State
    const [newSlide, setNewSlide] = useState({ title: '', image: '' });

    // Raffle State
    const [rafflePrize, setRafflePrize] = useState('');
    const [isSpinning, setIsSpinning] = useState(false);
    const [lastWinner, setLastWinner] = useState(null);

    // --- Actions ---
    const handleLogin = (e) => {
        e.preventDefault();
        setLoadingAuth(true);
        setTimeout(() => {
            setIsAuthenticated(true);
            setLoadingAuth(false);
        }, 800); // Fake delay
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setActiveTab('orders');
    };

    const handleUpdateStatus = (orderId, newStatus) => {
        updateOrderStatus(orderId, newStatus);
        if (selectedOrder?.id === orderId) {
            setSelectedOrder(prev => ({ ...prev, status: newStatus }));
        }
    };

    const handleToggleStock = (productId) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            updateProduct({ ...product, is_active: !product.is_active });
        }
    };

    const handleSaveProduct = (e) => {
        e.preventDefault();
        updateProduct(editingProduct);
        setShowProductModal(false);
        setEditingProduct(null);
        alert("Producto guardado (Simulación)");
    };

    const handleNewClick = () => {
        setEditingProduct({
            name: '', category: 'Almacén', price: 0, stock: 0, is_active: true, image: 'https://placehold.co/400x300/CCCCCC/666666?text=Nuevo'
        });
        setShowProductModal(true);
    };

    const handleEditClick = (p) => {
        setEditingProduct({ ...p });
        setShowProductModal(true);
    };

    const handleDeleteProduct = (id) => {
        if (confirm("¿Seguro que deseas eliminar este producto? (Demo)")) {
            deleteProduct(id);
        }
    };

    // --- Marketing Actions ---
    const handleAddSlide = () => {
        if (!newSlide.image) return alert("Ingresa una URL de imagen");
        const slide = { ...newSlide, id: Date.now() };
        updateCarousel([...carouselSlides, slide]);
        setNewSlide({ title: '', image: '' });
    };

    const handleDeleteSlide = (id) => {
        updateCarousel(carouselSlides.filter(s => s.id !== id));
    };

    // --- Raffle Actions ---
    const getParticipantsWithTickets = () => {
        // Tickets are stored in orders now
        return orders.filter(o => o.ticketNumber).map(o => ({
            id: o.ticketNumber,
            name: o.customer_name,
            phone: o.customer_phone,
            orderId: o.id
        }));
    };
    const getParticipants = () => {
        const unique = new Map();
        orders.forEach(order => {
            if (order.customer_phone && !unique.has(order.customer_phone)) {
                unique.set(order.customer_phone, order.customer_name);
            }
        });
        return Array.from(unique.entries()).map(([phone, name]) => ({ phone, name }));
    };

    const handleRunRaffle = () => {
        const participants = getParticipantsWithTickets();
        if (participants.length === 0) return alert("No hay pedidos con tickets para sortear.");
        if (!rafflePrize) return alert("Ingresa un premio para sortear.");

        setIsSpinning(true);
        setLastWinner(null);

        // Simulation logic
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * participants.length);
            const winner = participants[randomIndex];

            const winRecord = {
                id: Date.now(),
                date: new Date().toISOString(),
                prize: rafflePrize,
                winner_name: winner.name,
                winner_phone: winner.phone,
                ticket: winner.id
            };

            addRaffleWinner(winRecord);
            setLastWinner(winRecord);
            setIsSpinning(false);

            // CONFETTI EXPLOSION
            var duration = 3 * 1000;
            var animationEnd = Date.now() + duration;
            var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            var interval = setInterval(function () {
                var timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                var particleCount = 50 * (timeLeft / duration);
                // since particles fall down, start a bit higher than random
                confetti({ ...defaults, particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } });
            }, 250);

        }, 3000);
    };


    // --- Metrics Logic ---
    const getMetrics = () => {
        const salesMonth = orders.reduce((acc, o) => acc + (Number(o.total) || 0), 0);
        const pending = orders.filter(o => o.status === 'pending').length;
        const avgTicket = orders.length ? salesMonth / orders.length : 0;

        // Mock "Simulated" Sales for Top Products (since our order list is short)
        const bestSellers = products
            .map(p => ({ ...p, soldQty: Math.floor(Math.random() * 50) }))
            .sort((a, b) => b.soldQty - a.soldQty)
            .slice(0, 5);

        const lowRotation = products.filter(p => p.stock > 0 && Math.random() > 0.8); // Randomly checking some as low rotation for demo

        return { salesMonth, pending, avgTicket, bestSellers, lowRotation };
    };
    const metrics = getMetrics();

    // --- Helpers ---
    const formatCurrency = (val) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(val);

    const filterList = (list) => {
        if (!searchTerm) return list;
        return list.filter(o =>
            o.customer_name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    // Filtered Views
    const pendingOrders = orders.filter(o => o.status === 'pending');
    const historyOrders = orders.filter(o => o.status !== 'pending');
    const filteredPending = filterList(pendingOrders);
    const filteredHistory = filterList(historyOrders);
    const currentList = activeTab === 'orders' ? filteredPending : (activeTab === 'sent' ? filteredHistory : []);


    // --- RENDER ---
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-2xl max-w-sm w-full">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-[#C99A3A] rounded-full flex items-center justify-center text-slate-900 shadow-lg">
                            <Lock size={32} />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-[#F3E6D0] mb-2">Panel Administrativo</h2>
                    <p className="text-center text-slate-400 mb-6 text-sm">Demo Interactiva</p>

                    <button
                        disabled={loadingAuth}
                        type="submit"
                        className="w-full bg-[#C99A3A] hover:bg-[#b08530] text-slate-900 font-bold py-3 rounded-lg transition-colors uppercase tracking-wider flex justify-center items-center gap-2"
                    >
                        {loadingAuth ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900"></div> : 'Ingresar al Sistema'}
                    </button>
                    <p className="mt-4 text-xs text-center text-slate-500">Haz clic para simular acceso</p>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">

            {/* Header */}
            <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex flex-col md:flex-row justify-between items-center shadow-md z-10 gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="w-10 h-10 bg-[#C99A3A] rounded-lg flex items-center justify-center text-slate-900 font-bold shadow-lg">
                        <UserIcon />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-[#F3E6D0]">Admin Demo</h1>
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                            Versión de Prueba
                            <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="text-amber-400 hover:text-amber-300 ml-2 underline flex items-center gap-1" title="Borrar datos y recargar">
                                <AlertCircle size={10} /> Reset
                            </button>
                            <button onClick={handleLogout} className="text-red-400 hover:text-red-300 ml-2 underline flex items-center gap-1">
                                <LogOut size={10} /> Salir
                            </button>
                        </div>
                    </div>
                </div>

                {/* Navbar */}
                <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 w-full md:w-auto overflow-x-auto">
                    <button onClick={() => setActiveTab('orders')} className={`whitespace-nowrap px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'orders' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>
                        <ShoppingBag size={16} /> Pedidos
                    </button>
                    <button onClick={() => setActiveTab('sent')} className={`whitespace-nowrap px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'sent' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>
                        <Send size={16} /> Enviados
                    </button>
                    <button onClick={() => setActiveTab('metrics')} className={`whitespace-nowrap px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'metrics' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>
                        <TrendingUp size={16} /> Métricas
                    </button>
                    <button onClick={() => setActiveTab('products')} className={`whitespace-nowrap px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'products' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>
                        <Package size={16} /> Stock
                    </button>
                    <button onClick={() => setActiveTab('marketing')} className={`whitespace-nowrap px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'marketing' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>
                        <Megaphone size={16} /> Marketing
                    </button>
                    <button onClick={() => setActiveTab('raffle')} className={`whitespace-nowrap px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'raffle' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>
                        <Gift size={16} /> Sorteos
                    </button>
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 p-4 md:p-6 overflow-hidden flex flex-col gap-6">

                {/* KPI Cards (Always visible except when deeply focused on list) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 shrink-0">
                    <KPICard icon={<DollarSign size={32} />} label="Ventas Mensuales" value={formatCurrency(metrics.salesMonth)} />
                    <KPICard icon={<Package size={32} />} label="Pedidos Pendientes" value={metrics.pending} color={metrics.pending > 0 ? "text-amber-500" : "text-emerald-500"} />
                    <KPICard icon={<TrendingUp size={32} />} label="Ticket Promedio" value={formatCurrency(metrics.avgTicket)} />
                </div>

                {/* VIEWS */}
                {(activeTab === 'orders' || activeTab === 'sent') && (
                    <div className="flex-1 bg-slate-800 rounded-xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col md:flex-row">
                        {/* Order List */}
                        <div className={`flex-1 flex flex-col border-r border-slate-700 ${selectedOrder ? 'hidden md:flex' : 'flex'}`}>
                            <div className="p-4 border-b border-slate-700 font-bold text-slate-300 flex justify-between">
                                <span>{activeTab === 'orders' ? 'Pendientes de Envío' : 'Historial Enviados'}</span>
                                <span className="text-xs bg-slate-900 px-2 py-1 rounded text-slate-500">{currentList.length}</span>
                            </div>
                            <div className="overflow-y-auto flex-1">
                                {currentList.length === 0 ? (
                                    <div className="p-8 text-center text-slate-500">No hay pedidos</div>
                                ) : (
                                    currentList.map(order => (
                                        <div
                                            key={order.id}
                                            onClick={() => setSelectedOrder(order)}
                                            className={`p-4 border-b border-slate-700/50 cursor-pointer hover:bg-slate-700/50 transition-colors ${selectedOrder?.id === order.id ? 'bg-[#C99A3A]/10 border-l-4 border-l-[#C99A3A]' : 'border-l-4 border-l-transparent'}`}
                                        >
                                            <div className="flex justify-between mb-1">
                                                <span className="font-bold text-slate-200">{order.customer_name}</span>
                                                <span className="text-[#C99A3A] font-mono font-bold">{formatCurrency(order.total)}</span>
                                            </div>
                                            <div className="flex justify-between text-xs text-slate-400">
                                                <span>{new Date(order.created_at).toLocaleDateString()}</span>
                                                <span className={`px-1.5 py-0.5 rounded uppercase ${order.status === 'pending' ? 'bg-amber-500/20 text-amber-500' : 'bg-emerald-500/20 text-emerald-500'}`}>{order.status}</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Order Detail */}
                        <div className={`w-full md:w-[450px] bg-slate-900 flex flex-col ${selectedOrder ? 'flex' : 'hidden md:flex'}`}>
                            {selectedOrder ? (
                                <>
                                    <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                                        <h3 className="font-bold text-white">Pedido #{selectedOrder.id}</h3>
                                        <button onClick={() => setSelectedOrder(null)} className="md:hidden text-slate-400"><X /></button>
                                    </div>
                                    <div className="p-6 flex-1 overflow-y-auto space-y-6">
                                        <div className="space-y-2 text-sm">
                                            <p className="text-slate-400">Cliente: <span className="text-slate-200">{selectedOrder.customer_name}</span></p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-slate-400">Teléfono: <span className="text-slate-200">{selectedOrder.customer_phone}</span></p>
                                                {selectedOrder.customer_phone && (
                                                    <a
                                                        href={`https://wa.me/${selectedOrder.customer_phone.replace(/\D/g, '')}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="bg-green-600 hover:bg-green-500 text-white p-1.5 rounded-full transition-colors"
                                                        title="Contactar por WhatsApp"
                                                    >
                                                        <MessageCircle size={14} />
                                                    </a>
                                                )}
                                            </div>
                                            <p className="text-slate-400">Dirección: <span className="text-slate-200">{selectedOrder.delivery_address}</span></p>
                                            {selectedOrder.notes && <p className="text-slate-400 bg-slate-800 p-2 rounded italic">"{selectedOrder.notes}"</p>}
                                        </div>

                                        <div className="border-t border-slate-800 pt-4">
                                            <h4 className="font-bold text-slate-500 text-xs uppercase mb-3">Productos</h4>
                                            <ul className="space-y-2">
                                                {selectedOrder.items.map((item, idx) => (
                                                    <li key={idx} className="flex justify-between text-sm">
                                                        <span><span className="font-bold text-slate-300">{item.quantity}x</span> {item.name}</span>
                                                        <span className="text-slate-400">{formatCurrency(item.price * item.quantity)}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="border-t border-slate-800 pt-4 flex justify-between items-center text-xl font-bold text-[#C99A3A]">
                                            <span>Total</span>
                                            <span>{formatCurrency(selectedOrder.total)}</span>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-slate-950 border-t border-slate-800">
                                        {selectedOrder.status === 'pending' ? (
                                            <button onClick={() => handleUpdateStatus(selectedOrder.id, 'sent')} className="w-full bg-[#C99A3A] hover:bg-[#b08530] text-slate-900 font-bold py-3 rounded-lg flex items-center justify-center gap-2">
                                                <CheckCircle size={18} /> Marcar como Enviado
                                            </button>
                                        ) : (
                                            <div className="text-center text-emerald-500 font-bold border border-emerald-500/30 bg-emerald-500/10 py-2 rounded">
                                                ✔ Pedido Enviado
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 flex items-center justify-center text-slate-600 flex-col">
                                    <Package size={48} className="mb-4 opacity-20" />
                                    <p>Selecciona un pedido</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'metrics' && (
                    <div className="flex-1 overflow-auto space-y-6">
                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                            <h3 className="font-bold text-lg mb-4 text-emerald-400 flex items-center gap-2"><TrendingUp /> Productos Más Vendidos</h3>
                            <div className="space-y-4">
                                {metrics.bestSellers.map((p, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>{i + 1}. {p.name}</span>
                                            <span className="font-mono font-bold text-emerald-400">{p.soldQty} u.</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500" style={{ width: `${(p.soldQty / (metrics.bestSellers[0].soldQty || 1)) * 100}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                            <h3 className="font-bold text-lg mb-4 text-red-400 flex items-center gap-2"><AlertTriangle /> Alerta Stock Bajo / Sin Rotación</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {metrics.lowRotation.map((p, i) => (
                                    <div key={p.id} className="p-3 border border-red-500/20 bg-slate-900/50 rounded flex justify-between items-center">
                                        <span className="text-slate-300">{p.name}</span>
                                        <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded font-bold">Revisar</span>
                                    </div>
                                ))}
                                {metrics.lowRotation.length === 0 && <p className="text-slate-500">Todo el inventario tiene buen movimiento.</p>}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div className="flex-1 bg-slate-800 rounded-xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                <input
                                    type="text"
                                    placeholder="Buscar producto..."
                                    className="w-full bg-slate-900 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none border border-slate-700 focus:border-[#C99A3A]"
                                    value={productSearchTerm}
                                    onChange={e => setProductSearchTerm(e.target.value)}
                                />
                            </div>
                            <button onClick={handleNewClick} className="bg-[#C99A3A] text-slate-900 font-bold py-2 px-4 rounded-lg flex items-center gap-2 text-sm hover:bg-[#b08530]">
                                <Plus size={16} /> Nuevo Producto
                            </button>
                        </div>
                        <div className="overflow-y-auto p-4 content-start">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {products.filter(p => p.name.toLowerCase().includes(productSearchTerm.toLowerCase())).map(p => (
                                    <div key={p.id} className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden group hover:border-slate-500 transition-colors">
                                        <div className="h-32 bg-slate-800 relative">
                                            <img src={p.image} alt={p.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                            {!p.is_active && <div className="absolute inset-0 bg-black/60 flex items-center justify-center font-bold text-red-500 uppercase tracking-widest border-2 border-red-500 m-2">Suspendido</div>}
                                        </div>
                                        <div className="p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h4 className="font-bold text-slate-200 line-clamp-1">{p.name}</h4>
                                                    <span className="text-xs text-slate-500 uppercase">{p.category}</span>
                                                </div>
                                                <div className="flex gap-1">
                                                    <button onClick={() => handleEditClick(p)} className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"><Edit size={14} /></button>
                                                    <button onClick={() => handleDeleteProduct(p.id)} className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-red-400"><Trash2 size={14} /></button>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center mt-3">
                                                <span className="text-[#C99A3A] font-mono font-bold">{formatCurrency(p.price)}</span>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-xs font-bold ${p.stock < 10 ? 'text-red-400' : 'text-emerald-500'}`}>Stock: {p.stock}</span>
                                                    <button onClick={() => handleToggleStock(p.id)} className={`w-8 h-4 rounded-full p-0.5 flex ${p.is_active ? 'bg-emerald-500 justify-end' : 'bg-slate-700 justify-start'}`}>
                                                        <div className="w-3 h-3 bg-white rounded-full"></div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'marketing' && (
                    <div className="flex-1 bg-slate-800 rounded-xl border border-slate-700 shadow-2xl p-6 overflow-y-auto">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Megaphone className="text-pink-500" /> Gestión de Carrusel (Shop)</h3>

                        {/* Add New */}
                        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 mb-8">
                            <h4 className="font-bold text-slate-400 mb-3 text-sm uppercase">Agregar Slide</h4>
                            <div className="flex flex-col md:flex-row gap-4">
                                <input
                                    type="text"
                                    placeholder="Título (Opcional)"
                                    value={newSlide.title}
                                    onChange={e => setNewSlide({ ...newSlide, title: e.target.value })}
                                    className="bg-slate-800 border border-slate-600 rounded p-2 text-white flex-1 focus:border-[#C99A3A] outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="URL de Imagen (https://...)"
                                    value={newSlide.image}
                                    onChange={e => setNewSlide({ ...newSlide, image: e.target.value })}
                                    className="bg-slate-800 border border-slate-600 rounded p-2 text-white flex-[2] focus:border-[#C99A3A] outline-none"
                                />
                                <button onClick={handleAddSlide} className="bg-pink-600 hover:bg-pink-500 text-white font-bold px-6 py-2 rounded flex items-center gap-2">
                                    <Plus size={18} /> Agregar
                                </button>
                            </div>
                        </div>

                        {/* List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {carouselSlides.map(slide => (
                                <div key={slide.id} className="relative group rounded-xl overflow-hidden aspect-video border border-slate-700">
                                    <img src={slide.image} alt="Slide" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                                        <p className="font-bold text-white text-lg">{slide.title}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteSlide(slide.id)}
                                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform hover:scale-110"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'raffle' && (
                    <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Raffle Control */}
                        <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">

                            {/* Toggle Active */}
                            <div className="absolute top-4 right-4 z-20">
                                <button
                                    onClick={toggleRaffle}
                                    className={`px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wide transition-all ${isRaffleActive ? 'bg-emerald-500 text-slate-900 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-slate-700 text-slate-400'}`}
                                >
                                    {isRaffleActive ? 'Sorteo Activo ●' : 'Sorteo Pausado ○'}
                                </button>
                            </div>

                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

                            <Gift size={64} className={`mb-6 ${isSpinning ? 'animate-bounce text-yellow-400' : 'text-purple-500'}`} />
                            <h2 className="text-3xl font-black text-white mb-2">Sorteo de Clientes</h2>
                            <p className="text-slate-400 mb-8 max-w-sm">Participan automáticamente todos los pedidos realizados mientras el sorteo está activo. ({getParticipantsWithTickets().length} tickets generados).</p>

                            {lastWinner ? (
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="bg-gradient-to-br from-yellow-400 to-orange-500 p-1 rounded-2xl w-full max-w-md mb-6 shadow-[0_0_50px_rgba(255,200,0,0.3)]"
                                >
                                    <div className="bg-slate-900 rounded-xl p-6 border border-yellow-200/50">
                                        <h3 className="text-yellow-400 font-bold uppercase tracking-widest text-sm mb-2">¡Felicitaciones!</h3>
                                        <div className="text-6xl font-black text-white mb-2 tracking-tighter shadow-black drop-shadow-lg">#{lastWinner.ticket}</div>
                                        <div className="text-2xl font-bold text-white mb-1">{lastWinner.winner_name}</div>
                                        <div className="bg-white/10 rounded-lg p-3 text-yellow-200 font-bold mt-4">
                                            <Trophy className="inline mr-2 mb-1" size={18} />
                                            Premio: {lastWinner.prize}
                                        </div>
                                        <button onClick={() => setLastWinner(null)} className="mt-4 text-slate-500 hover:text-white text-sm underline">Nuevo Sorteo</button>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="w-full max-w-md space-y-4 relative z-10">
                                    <input
                                        type="text"
                                        placeholder="¿Qué sorteamos hoy?"
                                        value={rafflePrize}
                                        onChange={e => setRafflePrize(e.target.value)}
                                        disabled={isSpinning}
                                        className="w-full bg-slate-900 border border-slate-600 rounded-xl p-4 text-center text-xl font-bold text-white focus:border-purple-500 outline-none placeholder:font-normal placeholder:text-slate-600"
                                    />
                                    <button
                                        onClick={handleRunRaffle}
                                        disabled={isSpinning}
                                        className={`w-full py-4 rounded-xl font-black text-xl uppercase tracking-wider transition-all transform active:scale-95 shadow-lg ${isSpinning
                                            ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-purple-500/25'}`}
                                    >
                                        {isSpinning ? 'Sorteando...' : '¡Sortear!'}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* History */}
                        <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-xl p-6 flex flex-col">
                            <h3 className="font-bold text-slate-300 mb-4 flex items-center gap-2"><Trophy size={18} className="text-yellow-500" /> Historial de Ganadores</h3>
                            <div className="flex-1 overflow-y-auto space-y-3">
                                {raffleWinners.length === 0 ? (
                                    <div className="text-center text-slate-600 py-10">
                                        <Ticket size={48} className="mx-auto mb-3 opacity-20" />
                                        <p>Aún no hay sorteos realizados.</p>
                                    </div>
                                ) : (
                                    raffleWinners.map(win => (
                                        <div key={win.id} className="bg-slate-900/50 border border-slate-700 p-4 rounded-lg flex justify-between items-center">
                                            <div>
                                                <div className="font-bold text-white flex items-center gap-2">
                                                    <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded font-mono">#{win.ticket || 'ANTIGUO'}</span>
                                                    {win.winner_name}
                                                </div>
                                                <div className="text-xs text-slate-500">{new Date(win.date).toLocaleDateString()} - <span className="text-purple-400">{win.prize}</span></div>
                                            </div>
                                            <div className="text-yellow-500">
                                                <Trophy size={20} />
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Product Modal */}
            <AnimatePresence>
                {showProductModal && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                            className="bg-slate-800 w-full max-w-lg rounded-xl border border-slate-700 shadow-2xl p-6"
                        >
                            <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-2">
                                {editingProduct?.id ? 'Editar Producto' : 'Nuevo Producto'}
                            </h3>
                            <form onSubmit={handleSaveProduct} className="space-y-4">
                                <div>
                                    <label className="text-xs uppercase text-slate-500 font-bold block mb-1">Nombre</label>
                                    <input required type="text" value={editingProduct.name} onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-[#C99A3A] outline-none" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs uppercase text-slate-500 font-bold block mb-1">Precio</label>
                                        <input required type="number" value={editingProduct.price} onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-[#C99A3A] outline-none" />
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase text-slate-500 font-bold block mb-1">Stock</label>
                                        <input required type="number" value={editingProduct.stock} onChange={e => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-[#C99A3A] outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs uppercase text-slate-500 font-bold block mb-1">Categoría</label>
                                    <select value={editingProduct.category} onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-[#C99A3A] outline-none">
                                        <option value="Carnes">Carnes</option>
                                        <option value="Bebidas">Bebidas</option>
                                        <option value="Almacén">Almacén</option>
                                        <option value="Verdulería">Verdulería</option>
                                    </select>
                                </div>
                                <div className="flex justify-end gap-3 mt-6">
                                    <button type="button" onClick={() => setShowProductModal(false)} className="px-4 py-2 hover:bg-slate-700 rounded text-slate-300">Cancelar</button>
                                    <button type="submit" className="px-6 py-2 bg-[#C99A3A] text-slate-900 font-bold rounded hover:bg-[#b08530]">Guardar</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

const KPICard = ({ icon, label, value, color = "text-white" }) => (
    <div className="bg-slate-800 p-4 md:p-6 rounded-xl border border-slate-700 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-white">{icon}</div>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
        <h3 className={`text-3xl font-black ${color}`}>{value}</h3>
    </div>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);

export default AdminDashboard;
