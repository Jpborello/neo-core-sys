import React, { useState, useEffect } from 'react';
import {
    ShoppingCart,
    Package,
    Search,
    Plus,
    Minus,
    Trash2,
    Box,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    BarChart3,
    TrendingUp,
    Receipt,
    DollarSign,
    RefreshCw
} from 'lucide-react';

const INITIAL_INVENTORY = [
    { id: 1, name: "Coca Cola 500ml", sku: "CC500", price: 1500, stock: 50, category: "Bebidas" },
    { id: 2, name: "Caramelo Sugus Suelto", sku: "SUG001", price: 50, stock: 15, category: "Golosinas" },
    {
        id: 3,
        name: "Bolsa Caramelos Sugus x3000",
        sku: "SUG-PACK-3000",
        price: 12000,
        stock: 5,
        category: "Golosinas",
        isPack: true,
        unpackCreatesId: 2,
        unpackQty: 3000
    },
    { id: 4, name: "Alfajor Jorgito", sku: "JORG01", price: 800, stock: 24, category: "Golosinas" },
    { id: 5, name: "Agua Mineral 1L", sku: "H2O-1L", price: 1000, stock: 30, category: "Bebidas" }
];

// --- MOCK DATA GENERATOR ---
const generateMockSales = () => {
    const sales = [];
    const today = new Date();
    // Generate ~15 sales across varying hours
    const hours = [9, 9, 10, 11, 13, 13, 13, 14, 16, 17, 18, 18, 18, 19, 19];

    hours.forEach((h, idx) => {
        const total = Math.floor(Math.random() * 5000) + 500;
        sales.push({
            id: `mock-${idx}`,
            total: total,
            itemsCount: Math.floor(Math.random() * 5) + 1,
            timestamp: new Date(today.setHours(h, Math.floor(Math.random() * 59)))
        });
    });
    return sales;
};

const KioskDemo = () => {
    const [activeTab, setActiveTab] = useState('pos'); // 'pos' | 'stock' | 'reports'
    const [inventory, setInventory] = useState(INITIAL_INVENTORY);
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showUnpackModal, setShowUnpackModal] = useState(null);
    const [lastAction, setLastAction] = useState(null);

    // V2 STATE
    const [salesHistory, setSalesHistory] = useState([]);

    // Load Mock Data on Mount
    useEffect(() => {
        setSalesHistory(generateMockSales());
    }, []);

    // --- LOGIC: POS ---
    const addToCart = (product) => {
        if (product.stock <= 0) {
            showToast("Sin stock disponible", "error");
            return;
        }

        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, qty: item.qty + 1 } : item
                );
            }
            return [...prev, { ...product, qty: 1 }];
        });

        setInventory(prev => prev.map(item =>
            item.id === product.id ? { ...item, stock: item.stock - 1 } : item
        ));
    };

    const removeFromCart = (productId) => {
        const itemInCart = cart.find(item => item.id === productId);
        if (!itemInCart) return;

        setInventory(prev => prev.map(item =>
            item.id === productId ? { ...item, stock: item.stock + itemInCart.qty } : item
        ));

        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const updateCartQty = (productId, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId) {
                const newQty = item.qty + delta;
                if (newQty <= 0) return item;

                if (delta > 0) {
                    const currentStock = inventory.find(p => p.id === productId).stock;
                    if (currentStock <= 0) {
                        showToast("No hay más stock", "error");
                        return item;
                    }
                    setInventory(inv => inv.map(p => p.id === productId ? { ...p, stock: p.stock - 1 } : p));
                } else {
                    setInventory(inv => inv.map(p => p.id === productId ? { ...p, stock: p.stock + 1 } : p));
                }

                return { ...item, qty: newQty };
            }
            return item;
        }));
    };

    const checkout = () => {
        const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
        const itemsCount = cart.reduce((acc, item) => acc + item.qty, 0);

        // Add to history
        const newSale = {
            id: `sale-${Date.now()}`,
            total: total,
            itemsCount: itemsCount,
            timestamp: new Date()
        };

        setSalesHistory(prev => [...prev, newSale]);
        setCart([]);
        showToast("¡Venta registrada con éxito!", "success");
    };

    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

    // --- LOGIC: INVENTORY / DESPIECE ---
    const handleUnpack = () => {
        if (!showUnpackModal) return;

        const packProduct = showUnpackModal;
        const targetProductCorrect = inventory.find(p => p.id === packProduct.unpackCreatesId);

        if (!targetProductCorrect) {
            console.error("Target product not found");
            return;
        }

        setInventory(prev => prev.map(item => {
            if (item.id === packProduct.id) {
                return { ...item, stock: item.stock - 1 };
            }
            if (item.id === targetProductCorrect.id) {
                return { ...item, stock: item.stock + packProduct.unpackQty };
            }
            return item;
        }));

        setShowUnpackModal(null);
        showToast(`Despiece exitoso: +${packProduct.unpackQty} unidades generadas`, "success");
    };

    // --- LOGIC: REPORTS ---
    const getDailyStats = () => {
        const totalSales = salesHistory.reduce((acc, s) => acc + s.total, 0);
        const totalTickets = salesHistory.length;
        const avgTicket = totalTickets > 0 ? totalSales / totalTickets : 0;
        return { totalSales, totalTickets, avgTicket };
    };

    const getHourlySales = () => {
        const hours = Array(15).fill(0).map((_, i) => i + 8); // 08:00 to 22:00
        const data = hours.map(h => {
            const salesInHour = salesHistory.filter(s => s.timestamp.getHours() === h);
            return { hour: h, count: salesInHour.length };
        });
        // Find max for scaling
        const maxCount = Math.max(...data.map(d => d.count), 1);
        return { data, maxCount };
    };

    const closeRegister = () => {
        if (confirm("¿Seguro que deseas cerrar la caja del día? Se enviará el reporte y reiniciará el historial.")) {
            setSalesHistory([]);
            showToast("Caja cerrada correctamente. Reporte enviado.", "success");
        }
    };


    // --- HELPERS ---
    const showToast = (msg, type = 'success') => {
        setLastAction({ msg, type });
        setTimeout(() => setLastAction(null), 3000);
    };

    const filteredInventory = inventory.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = getDailyStats();
    const hourlyData = getHourlySales();

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 md:p-8">

            {/* HEADER */}
            <div className="max-w-6xl mx-auto mb-6 flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200 gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="bg-indigo-600 p-2 rounded-lg text-white">
                        <Box size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">KioskMaster SaaS</h1>
                        <p className="text-xs text-slate-500">Demo Interactiva v2.0</p>
                    </div>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-lg w-full md:w-auto overflow-x-auto">
                    {[
                        { id: 'pos', label: 'Venta (POS)', icon: ShoppingCart },
                        { id: 'stock', label: 'Stock & Ingreso', icon: Package },
                        { id: 'reports', label: 'Caja & Reportes', icon: BarChart3 }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === tab.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-6xl mx-auto h-[600px]">

                {activeTab === 'reports' ? (
                    // --- REPORTS VIEW ---
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                        {/* METRICS COLUMN */}
                        <div className="flex flex-col gap-4">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex-1 flex flex-col justify-center items-center text-center">
                                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full mb-3">
                                    <DollarSign size={24} />
                                </div>
                                <span className="text-slate-500 text-sm font-medium">Total Vendido Hoy</span>
                                <span className="text-3xl font-bold text-slate-900 mt-1">${stats.totalSales.toLocaleString()}</span>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex-1 flex flex-col justify-center items-center text-center">
                                <div className="p-3 bg-blue-100 text-blue-600 rounded-full mb-3">
                                    <Receipt size={24} />
                                </div>
                                <span className="text-slate-500 text-sm font-medium">Tickets Emitidos</span>
                                <span className="text-3xl font-bold text-slate-900 mt-1">{stats.totalTickets}</span>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex-1 flex flex-col justify-center items-center text-center">
                                <div className="p-3 bg-amber-100 text-amber-600 rounded-full mb-3">
                                    <TrendingUp size={24} />
                                </div>
                                <span className="text-slate-500 text-sm font-medium">Ticket Promedio</span>
                                <span className="text-3xl font-bold text-slate-900 mt-1">${stats.avgTicket.toFixed(0)}</span>
                            </div>
                        </div>

                        {/* CHART COLUMN */}
                        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900">Horarios Calientes</h2>
                                    <p className="text-sm text-slate-500">Distribución de ventas por hora</p>
                                </div>
                                <button
                                    onClick={closeRegister}
                                    className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2"
                                >
                                    <RefreshCw size={16} /> Cerrar Caja
                                </button>
                            </div>

                            <div className="flex-1 flex items-end gap-2 md:gap-4 pb-2 border-b border-slate-100">
                                {hourlyData.data.map((d, i) => {
                                    const heightPct = (d.count / hourlyData.maxCount) * 100;
                                    const isPeak = d.count === hourlyData.maxCount && d.count > 0;
                                    return (
                                        <div key={i} className="flex-1 flex flex-col justify-end items-center group relative h-full">
                                            <div
                                                className={`w-full rounded-t-md transition-all duration-500 relative ${isPeak ? 'bg-indigo-600' : 'bg-indigo-200 hover:bg-indigo-300'}`}
                                                style={{ height: `${heightPct}%`, minHeight: '4px' }}
                                            >
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                                    {d.count} ventas
                                                </div>
                                            </div>
                                            <span className="text-[10px] text-slate-400 mt-2 font-mono">{d.hour}:00</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                ) : (
                    // --- MAIN INTERFACE (POS & STOCK) ---
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">

                        {/* LEFT COLUMN: Main Interaction Area */}
                        <div className="lg:col-span-2 flex flex-col gap-4">

                            {/* SEARCH BAR */}
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
                                <Search className="text-slate-400" />
                                <input
                                    type="text"
                                    placeholder={activeTab === 'pos' ? "Buscar producto o escanear código de barras..." : "Buscar en inventario..."}
                                    className="flex-1 outline-none text-slate-700 placeholder:text-slate-400"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    autoFocus
                                />
                            </div>

                            {/* PRODUCT GRID / LIST */}
                            <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                                <div className="p-4 border-b border-slate-100 bg-slate-50 font-medium text-slate-500 text-sm flex justify-between">
                                    <span>Productos Disponibles</span>
                                    <span>{filteredInventory.length} items</span>
                                </div>

                                <div className="overflow-y-auto p-2">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="text-xs text-slate-400 uppercase bg-slate-50 sticky top-0">
                                            <tr>
                                                <th className="p-3">Producto</th>
                                                <th className="p-3">Precio</th>
                                                <th className="p-3 text-center">Stock</th>
                                                <th className="p-3 text-right">Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            {filteredInventory.map(product => (
                                                <tr key={product.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                                                    <td className="p-3">
                                                        <div className="font-medium text-slate-900">{product.name}</div>
                                                        <div className="text-xs text-slate-400">{product.sku}</div>
                                                        {product.isPack && (
                                                            <span className="inline-block mt-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] rounded-full font-bold">
                                                                PACK x{product.unpackQty}
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="p-3 text-emerald-600 font-semibold">
                                                        ${product.price.toLocaleString()}
                                                    </td>
                                                    <td className="p-3 text-center">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'}`}>
                                                            {product.stock}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 text-right">
                                                        {activeTab === 'pos' ? (
                                                            <button
                                                                onClick={() => addToCart(product)}
                                                                disabled={product.stock <= 0}
                                                                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-md text-xs font-medium transition-colors"
                                                            >
                                                                Agregar
                                                            </button>
                                                        ) : (
                                                            product.isPack ? (
                                                                <button
                                                                    onClick={() => setShowUnpackModal(product)}
                                                                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-md text-xs font-medium transition-colors flex items-center gap-1 ml-auto"
                                                                >
                                                                    <Package size={12} /> Desarmar
                                                                </button>
                                                            ) : (
                                                                <span className="text-slate-300 text-xs italic">Unidad simple</span>
                                                            )
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Contextual Sidebar */}
                        <div className="h-full flex flex-col">
                            {activeTab === 'pos' ? (
                                // --- POS CART ---
                                <div className="bg-white rounded-xl shadow-lg border border-slate-200 h-full flex flex-col overflow-hidden">
                                    <div className="p-4 bg-indigo-600 text-white flex justify-between items-center">
                                        <h2 className="font-bold flex items-center gap-2">
                                            <ShoppingCart size={20} /> Ticket Actual
                                        </h2>
                                        <span className="bg-indigo-500 px-2 py-1 rounded text-xs">{cart.length} items</span>
                                    </div>

                                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                                        {cart.length === 0 ? (
                                            <div className="flex-1 flex flex-col items-center justify-center text-slate-300 gap-2">
                                                <ShoppingCart size={48} className="opacity-20" />
                                                <p>El carrito está vacío</p>
                                                <p className="text-xs text-center px-8">Escanea un producto o seleccionalo de la lista para comenzar.</p>
                                            </div>
                                        ) : (
                                            cart.map(item => (
                                                <div key={item.id} className="flex justify-between items-center text-sm p-2 bg-slate-50 rounded-lg border border-slate-100">
                                                    <div className="flex-1">
                                                        <div className="font-medium text-slate-900 line-clamp-1">{item.name}</div>
                                                        <div className="text-emerald-600 text-xs">${item.price * item.qty}</div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => updateCartQty(item.id, -1)} className="p-1 hover:bg-slate-200 rounded text-slate-500"><Minus size={14} /></button>
                                                        <span className="w-6 text-center font-medium font-mono">{item.qty}</span>
                                                        <button onClick={() => updateCartQty(item.id, 1)} className="p-1 hover:bg-slate-200 rounded text-slate-500"><Plus size={14} /></button>
                                                        <button onClick={() => removeFromCart(item.id)} className="p-1 hover:bg-red-100 rounded text-red-500 ml-1"><Trash2 size={14} /></button>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    <div className="p-6 bg-slate-50 border-t border-slate-200">
                                        <div className="flex justify-between items-end mb-4">
                                            <span className="text-slate-500 text-sm">Total a Pagar</span>
                                            <span className="text-3xl font-bold text-slate-900">${cartTotal.toLocaleString()}</span>
                                        </div>
                                        <button
                                            onClick={checkout}
                                            disabled={cart.length === 0}
                                            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-xl font-bold text-lg shadow-lg shadow-emerald-200 disabled:shadow-none transition-all flex items-center justify-center gap-2"
                                        >
                                            Confirmar Venta <ArrowRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // --- STOCK INFO PANEL ---
                                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-full flex flex-col gap-6">
                                    <div>
                                        <h2 className="font-bold text-slate-900 text-lg mb-2">Gestión de Inventario</h2>
                                        <p className="text-sm text-slate-500">
                                            Aquí puedes gestionar el stock y realizar el despiece de productos compuestos.
                                        </p>
                                    </div>

                                    <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg">
                                        <h3 className="text-amber-800 font-bold text-sm mb-2 flex items-center gap-2">
                                            <Package size={16} /> Función Despiece
                                        </h3>
                                        <p className="text-amber-700 text-xs leading-relaxed">
                                            Selecciona un producto tipo "PACK" en la lista de la izquierda y haz clic en "Desarmar" para convertirlo en unidades sueltas automáticamente.
                                        </p>
                                    </div>

                                    <div className="mt-auto">
                                        <div className="text-xs font-bold text-slate-400 uppercase mb-2">Resumen de Stock</div>
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600">Total Items</span>
                                                <span className="font-medium">{inventory.length}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600">Valor Inventario</span>
                                                <span className="font-medium">${inventory.reduce((acc, i) => acc + (i.price * i.stock), 0).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* TOAST NOTIFICATION */}
                {lastAction && (
                    <div className={`fixed bottom-8 right-8 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-up z-50 ${lastAction.type === 'error' ? 'bg-red-500 text-white' : 'bg-slate-900 text-white'}`}>
                        {lastAction.type === 'success' ? <CheckCircle2 size={24} className="text-emerald-400" /> : <AlertCircle size={24} />}
                        <span className="font-medium">{lastAction.msg}</span>
                    </div>
                )}

                {/* UNPACK CONFIRMATION MODAL */}
                {showUnpackModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-scale-in">
                            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <Box size={24} />
                            </div>
                            <h3 className="text-center text-xl font-bold text-slate-900 mb-2">¿Desarmar Pack?</h3>
                            <p className="text-center text-slate-500 text-sm mb-6">
                                Vas a convertir <strong className="text-slate-800">1 {showUnpackModal.name}</strong> en <strong className="text-emerald-600">{showUnpackModal.unpackQty} unidades</strong> de venta individual.
                            </p>

                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-6 text-sm">
                                <div className="flex justify-between mb-1">
                                    <span>Stock Pack:</span>
                                    <span className="font-mono">{showUnpackModal.stock} → <span className="text-red-500">{showUnpackModal.stock - 1}</span></span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Stock Unitario:</span>
                                    <span className="font-mono">{inventory.find(i => i.id === showUnpackModal.unpackCreatesId)?.stock} → <span className="text-emerald-500">{inventory.find(i => i.id === showUnpackModal.unpackCreatesId)?.stock + showUnpackModal.unpackQty}</span></span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowUnpackModal(null)}
                                    className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleUnpack}
                                    className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-600 shadow-lg shadow-amber-200"
                                >
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default KioskDemo;
