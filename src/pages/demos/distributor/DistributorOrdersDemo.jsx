import React, { useState, useEffect } from 'react';
import {
    FiPackage,
    FiShoppingCart,
    FiUser,
    FiTruck,
    FiCheck,
    FiPlus,
    FiTrash2,
    FiDollarSign,
    FiBox,
    FiActivity,
    FiTrendingUp,
    FiAlertCircle,
    FiLayers,
    FiEdit2,
    FiArrowLeft
} from 'react-icons/fi';

import sodaColaImg from '../../../assets/demo-distribuidora/soda_cola.png';
import waterBottleImg from '../../../assets/demo-distribuidora/water_bottle.png';
import beerCanImg from '../../../assets/demo-distribuidora/beer_can.png';
import chipsBagImg from '../../../assets/demo-distribuidora/chips_bag.png';
import cookiesImg from '../../../assets/demo-distribuidora/chocolate_cookies.png';
import yerbaImg from '../../../assets/demo-distribuidora/yerba_mate.png';
import sugarImg from '../../../assets/demo-distribuidora/sugar_pack.png';

// --- MOCK DATA ---
const INITIAL_PRODUCTS = [
    { id: 1, name: "Gaseosa Cola 1.5L", price: 1250, category: "Bebidas", stock: 120, image: sodaColaImg },
    { id: 2, name: "Agua Mineral 500ml", price: 650, category: "Bebidas", stock: 240, image: waterBottleImg },
    { id: 3, name: "Cerveza Lata 473ml", price: 1400, category: "Bebidas (Alcohol)", stock: 96, image: beerCanImg },
    { id: 4, name: "Snack Papas Fritas 140g", price: 1800, category: "Snacks", stock: 50, image: chipsBagImg },
    { id: 5, name: "Galletitas Chocolate", price: 950, category: "Comestibles", stock: 85, image: cookiesImg },
    { id: 6, name: "Yerba Mate 500g", price: 2100, category: "Almacén", stock: 40, image: yerbaImg },
    { id: 7, name: "Azúcar Tipo A 1kg", price: 980, category: "Almacén", stock: 100, image: sugarImg },
];

const USERS = [
    { id: 'usr_vendor_01', name: 'Martín (Vendedor)', role: 'vendor' },
    { id: 'usr_client_01', name: 'Kiosco "El Paso" (Cliente)', role: 'client', assignedVendorId: 'usr_vendor_01' },
    { id: 'usr_admin_01', name: 'Carlos (Dueño/Admin)', role: 'admin' },
];

// --- COMPONENTS ---

// 1. Product Card (Used in Client View & Vendor Order Form)
const ProductCard = ({ product, onAdd, CompactMode = false }) => {
    const [quantity, setQuantity] = useState(1);

    const handleAdd = () => {
        onAdd(product, quantity);
        setQuantity(1);
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between h-full">
            <div className="flex-1">
                <div className="relative mb-3 h-32 w-full flex items-center justify-center bg-gray-50 rounded-lg p-2">
                    <img src={product.image} alt={product.name} className="h-full object-contain mix-blend-multiply" />
                    <span className="absolute top-2 right-2 text-xs font-bold text-blue-600 bg-white/90 px-2 py-1 rounded-full shadow-sm">{product.category}</span>
                </div>
                {/* Removed top category tag as it is now integrated in image area */}
                <div className="flex justify-between items-start mb-1">
                    <span className="text-xs text-gray-400">Stock: {product.stock}</span>
                </div>
                <h3 className="font-bold text-gray-800 text-lg leading-tight mb-1">{product.name}</h3>
                <div className="text-2xl font-bold text-emerald-600 mb-4">${product.price}</div>
            </div>

            <div className="flex items-center gap-2 mt-auto">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-24">
                    <button
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="px-2 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 w-8 flex items-center justify-center transition-colors"
                    >
                        -
                    </button>
                    <div className="flex-1 text-center font-medium bg-white text-sm">{quantity}</div>
                    <button
                        onClick={() => setQuantity(q => q + 1)}
                        className="px-2 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 w-8 flex items-center justify-center transition-colors"
                    >
                        +
                    </button>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg text-sm flex items-center justify-center gap-1 transition-colors shadow-sm"
                >
                    <FiPlus /> Agregar
                </button>
            </div>
        </div>
    );
};

// 2. Client View
const ClientView = ({ products, onPlaceOrder, currentUser }) => {
    const [cart, setCart] = useState([]);
    const [activeCategory, setActiveCategory] = useState("Todos");

    const categories = ["Todos", ...new Set(products.map(p => p.category))];

    const addToCart = (product, quantity) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
            }
            return [...prev, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleCheckout = () => {
        if (cart.length === 0) return;
        onPlaceOrder({
            items: cart,
            total: cartTotal,
            clientId: currentUser.id,
            clientName: currentUser.name,
            vendorId: currentUser.assignedVendorId
        });
        setCart([]);
        alert("¡Pedido enviado con éxito!");
    };

    const filteredProducts = activeCategory === "Todos"
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-full">
            {/* Catalog */}
            <div className="flex-1 overflow-y-auto pr-2">
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProducts.map(p => (
                        <ProductCard key={p.id} product={p} onAdd={addToCart} />
                    ))}
                </div>
            </div>

            {/* Cart Panel */}
            <div className="w-full lg:w-96 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col h-[600px] lg:h-auto sticky top-4">
                <div className="p-4 border-b border-gray-100 bg-gray-50 rounded-t-xl">
                    <h2 className="font-bold text-gray-800 flex items-center gap-2">
                        <FiShoppingCart className="text-blue-600" /> Tu Pedido
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cart.length === 0 ? (
                        <div className="text-center text-gray-400 py-10 flex flex-col items-center">
                            <FiBox className="text-4xl mb-2 opacity-30" />
                            <p>Tu carrito está vacío</p>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <div>
                                    <div className="font-semibold text-gray-800 text-sm">{item.name}</div>
                                    <div className="text-xs text-gray-500">{item.quantity} x ${item.price}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="font-bold text-emerald-600 text-sm">${item.price * item.quantity}</div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-400 hover:text-red-600 p-1 rounded-md hover:bg-red-50 transition-colors"
                                    >
                                        <FiTrash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600 font-medium">Total</span>
                        <span className="text-2xl font-bold text-gray-900">${cartTotal}</span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        disabled={cart.length === 0}
                        className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transition-all ${cart.length === 0
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 transform hover:scale-[1.02]'
                            }`}
                    >
                        Confirmar Pedido
                    </button>
                </div>
            </div>
        </div>
    );
};

// 3. Vendor View
const VendorView = ({ products, orders, onStatusChange, onVendorPlaceOrder, clients }) => {
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'new'
    const [selectedClient, setSelectedClient] = useState(clients[0]?.id);

    // Re-use logic for new order
    const handleNewOrder = (orderData) => {
        onVendorPlaceOrder({ ...orderData, clientId: selectedClient, clientName: clients.find(c => c.id === selectedClient)?.name });
        setViewMode('list');
        alert("Pedido cargado exitosamente.");
    };

    return (
        <div className="flex flex-col h-full">
            {/* Vendor Stats / Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                        <FiActivity size={24} />
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Pendientes</div>
                        <div className="text-2xl font-bold text-gray-800">
                            {orders.filter(o => o.status === 'Pending').length}
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                        <FiCheck size={24} />
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Completados</div>
                        <div className="text-2xl font-bold text-gray-800">
                            {orders.filter(o => o.status === 'Processing' || o.status === 'Delivered').length}
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => setViewMode(viewMode === 'list' ? 'new' : 'list')}
                    className="bg-gray-900 text-white rounded-xl shadow-md hover:bg-black transition-colors flex items-center justify-center gap-2 font-semibold"
                >
                    {viewMode === 'list' ? <><FiPlus /> Nuevo Pedido</> : <><FiPackage /> Ver Lista</>}
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                {viewMode === 'list' ? (
                    <div className="flex-1 overflow-auto">
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 sticky top-0 bg-white z-10">Pedidos Recientes</h3>
                            {orders.length === 0 ? (
                                <div className="text-center text-gray-400 py-12">No hay pedidos registrados.</div>
                            ) : (
                                <div className="space-y-4">
                                    {orders.slice().reverse().map(order => (
                                        <div key={order.id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-3">
                                                <div className="flex items-center gap-3">
                                                    <span className={`w-2 h-2 rounded-full ${order.status === 'Pending' ? 'bg-orange-500 animate-pulse' : 'bg-green-500'}`}></span>
                                                    <span className="font-bold text-gray-800">#{order.id.slice(-4)}</span>
                                                    <span className="text-gray-500 text-sm">• {order.clientName}</span>
                                                    <span className="text-gray-400 text-xs bg-gray-100 px-2 py-1 rounded-full">{new Date(order.date).toLocaleTimeString()}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="text-lg font-bold text-gray-900">${order.total}</div>
                                                    {order.status === 'Pending' && (
                                                        <button
                                                            onClick={() => onStatusChange(order.id, 'Processing')}
                                                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-200 transition-colors"
                                                        >
                                                            Preparar
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="pl-5 border-l-2 border-gray-100 ml-1">
                                                <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Items</div>
                                                <div className="flex flex-wrap gap-2">
                                                    {order.items.map((item, idx) => (
                                                        <span key={idx} className="text-sm bg-white border border-gray-200 px-2 py-1 rounded-md text-gray-600">
                                                            {item.quantity}x {item.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 overflow-hidden flex flex-col p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Cargar Nuevo Pedido</h3>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar Cliente</label>
                            <select
                                value={selectedClient}
                                onChange={(e) => setSelectedClient(e.target.value)}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                {clients.map(client => (
                                    <option key={client.id} value={client.id}>{client.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Full Client View for Vendor (Sales Rep Mode) */}
                        <div className="mt-4 border-t border-gray-100 pt-6">
                            <ClientView
                                products={products}
                                onPlaceOrder={handleNewOrder}
                                currentUser={{
                                    id: selectedClient,
                                    name: clients.find(c => c.id === selectedClient)?.name + ' (Vía Vendedor)',
                                    role: 'client'
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const AdminDashboard = ({ products, orders, onUpdateStock, onReset }) => {
    const [activeTab, setActiveTab] = useState('stock'); // 'stock', 'logistics', 'pricing'

    // --- SHARED DATA ---
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter(o => o.status === 'Pending');
    const totalStockValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
    const lowStockCount = products.filter(p => p.stock < 15).length;

    // --- LOGISTICS AI STATE ---
    const [isOptimizingRoutes, setIsOptimizingRoutes] = useState(false);
    const [routeResult, setRouteResult] = useState(null);

    // --- PRICING AI STATE ---
    const [isAnalyzingPricing, setIsAnalyzingPricing] = useState(false);
    const [pricingSuggestions, setPricingSuggestions] = useState(null);

    // --- STOCK MANAGEMENT STATE ---
    const [editStockId, setEditStockId] = useState(null);
    const [addAmount, setAddAmount] = useState(0);

    const handleAddStock = (productId) => {
        if (addAmount > 0) {
            onUpdateStock(productId, addAmount);
            setEditStockId(null);
            setAddAmount(0);
        }
    };

    const handleOptimizeRoutes = () => {
        setIsOptimizingRoutes(true);
        setTimeout(() => {
            setIsOptimizingRoutes(false);
            setRouteResult({
                savings: "18%",
                message: "Ruta optimizada: Ahorro estimado de combustible y tiempo.",
                optimizedOrder: pendingOrders.sort((a, b) => a.id.localeCompare(b.id))
            });
        }, 2000);
    };

    const handleAnalyzePricing = () => {
        setIsAnalyzingPricing(true);
        setTimeout(() => {
            const suggestions = products.map(p => {
                let suggestedPrice = p.price;
                let reason = "Precio competitivo actual.";
                let changeType = "neutral";

                if (p.price < 1000) {
                    suggestedPrice = Math.round(p.price * 1.15);
                    reason = "Bajo margen. Oportunidad de subida.";
                    changeType = "increase";
                } else if (p.price > 1800) {
                    suggestedPrice = Math.round(p.price * 0.95);
                    reason = "Alto vs competencia. Sugiero descuento.";
                    changeType = "decrease";
                }

                return { ...p, suggestedPrice, reason, changeType };
            });
            setPricingSuggestions(suggestions);
            setIsAnalyzingPricing(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-full space-y-6">

            <div className="flex justify-between items-center">
                {/* TABS NAVIGATION */}
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl w-fit">
                    <button
                        onClick={() => setActiveTab('stock')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'stock' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Dashboard / Stock
                    </button>
                    <button
                        onClick={() => setActiveTab('logistics')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'logistics' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Logística / Rutas
                    </button>
                    <button
                        onClick={() => setActiveTab('pricing')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'pricing' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Pricing / Sugerencias
                    </button>
                </div>

                <button
                    onClick={() => {
                        if (confirm('¿Reiniciar toda la demo a estado original? Se borrarán pedidos y stock guardado.')) {
                            onReset();
                        }
                    }}
                    className="text-xs text-red-500 hover:text-red-700 font-semibold underline decoration-dotted"
                >
                    Reset Demo (Limpiar Data)
                </button>
            </div>


            {/* --- TAB CONTENT: STOCK (Original Dashboard) --- */}
            {activeTab === 'stock' && (
                <>
                    {/* Top Cards - Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Revenue */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Ingresos Totales</p>
                                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
                            </div>
                            <div className="p-3 bg-green-100 text-green-600 rounded-lg"><FiDollarSign size={24} /></div>
                        </div>

                        {/* Pending Orders */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Pedidos Pendientes</p>
                                <p className="text-2xl font-bold text-gray-900">{pendingOrders.length}</p>
                            </div>
                            <div className="p-3 bg-orange-100 text-orange-600 rounded-lg"><FiActivity size={24} /></div>
                        </div>

                        {/* Stock Value */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Valor Stock</p>
                                <p className="text-2xl font-bold text-gray-900">${totalStockValue.toLocaleString()}</p>
                            </div>
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><FiTrendingUp size={24} /></div>
                        </div>

                        {/* Low Stock Alert */}
                        <div className={`p-4 rounded-xl shadow-sm border flex items-center justify-between ${lowStockCount > 0 ? 'bg-red-50 border-red-100' : 'bg-white border-gray-100'}`}>
                            <div>
                                <p className={`text-xs font-bold uppercase tracking-wider ${lowStockCount > 0 ? 'text-red-600' : 'text-gray-500'}`}>Alerta Stock Bajo</p>
                                <p className={`text-2xl font-bold ${lowStockCount > 0 ? 'text-red-700' : 'text-gray-900'}`}>{lowStockCount}</p>
                            </div>
                            <div className={`p-3 rounded-lg ${lowStockCount > 0 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400'}`}><FiAlertCircle size={24} /></div>
                        </div>
                    </div>

                    {/* Stock Management Panel */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex-1 flex flex-col">
                        <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <FiLayers className="text-blue-600" /> Gestión de Inventario
                            </h3>
                        </div>

                        <div className="overflow-auto flex-1">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 sticky top-0 z-10">
                                    <tr>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Producto</th>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Precio Unit.</th>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Stock Actual</th>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Acción</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {products.map(product => (
                                        <tr key={product.id} className={`hover:bg-gray-50 transition-colors ${product.stock < 15 ? 'bg-red-50/50' : ''}`}>
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 p-1 flex-shrink-0">
                                                        <img src={product.image} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900 text-sm">{product.name}</div>
                                                        <div className="text-xs text-gray-500">{product.category}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-center text-sm font-medium text-gray-600">${product.price}</td>
                                            <td className="p-4 text-center">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock < 15 ? 'bg-red-100 text-red-700' :
                                                    product.stock < 50 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                                                    }`}>
                                                    {product.stock} Unid.
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                {editStockId === product.id ? (
                                                    <div className="flex items-center justify-end gap-2">
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            placeholder="+Cant"
                                                            className="w-20 p-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                                            onChange={(e) => setAddAmount(parseInt(e.target.value) || 0)}
                                                            autoFocus
                                                        />
                                                        <button
                                                            onClick={() => handleAddStock(product.id)}
                                                            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs font-bold"
                                                        >
                                                            <FiCheck />
                                                        </button>
                                                        <button
                                                            onClick={() => setEditStockId(null)}
                                                            className="px-2 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-xs font-bold"
                                                        >
                                                            X
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => setEditStockId(product.id)}
                                                        className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors flex items-center gap-1 ml-auto"
                                                    >
                                                        <FiPlus /> Reponer
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {/* --- TAB CONTENT: LOGISTICS AI --- */}
            {activeTab === 'logistics' && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <FiTruck className="text-blue-600" /> Optimización de Rutas IA
                            </h3>
                            <p className="text-sm text-gray-500">Motor inteligente para reducir costos logísticos.</p>
                        </div>
                        <button
                            onClick={handleOptimizeRoutes}
                            disabled={isOptimizingRoutes || pendingOrders.length === 0}
                            className={`px-6 py-2 rounded-lg font-bold text-white transition-all flex items-center gap-2 ${isOptimizingRoutes ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                                }`}
                        >
                            {isOptimizingRoutes ? (
                                <>Generando Rutas...</>
                            ) : (
                                <><FiActivity /> Optimizar con IA</>
                            )}
                        </button>
                    </div>

                    {/* Result Area */}
                    <div className="flex-1 bg-gray-50 rounded-xl p-6 border border-gray-200 overflow-y-auto">
                        {isOptimizingRoutes ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                                <p>Analizando tráfico y direcciones...</p>
                            </div>
                        ) : routeResult ? (
                            <div className="space-y-6">
                                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-lg flex items-center gap-4 animate-fade-in-up">
                                    <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                                        <FiTrendingUp size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-emerald-800 text-lg">Ahorro Estimado: {routeResult.savings}</h4>
                                        <p className="text-sm text-emerald-600">{routeResult.message}</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-bold text-gray-700 mb-3">Secuencia de Entrega Optimizada</h4>
                                    <div className="space-y-3">
                                        {routeResult.optimizedOrder.map((order, idx) => (
                                            <div key={order.id} className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between shadow-sm">
                                                <div className="flex items-center gap-3">
                                                    <span className="bg-blue-100 text-blue-700 font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm">
                                                        {idx + 1}
                                                    </span>
                                                    <div>
                                                        <div className="font-bold text-gray-800">Pedido {order.id.slice(-6)}</div>
                                                        <div className="text-xs text-gray-500">Cliente ID: {order.clientId}</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-gray-700">${order.total}</div>
                                                    <div className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">{order.items.length} ítems</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                                <FiTruck size={48} className="mb-2" />
                                <p>No hay optimización activa. Haz clic en "Optimizar" para iniciar.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* --- TAB CONTENT: PRICING AI --- */}
            {activeTab === 'pricing' && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <FiDollarSign className="text-purple-600" /> Sugerencia de Precios IA
                            </h3>
                            <p className="text-sm text-gray-500">Análisis de mercado para maximizar márgenes.</p>
                        </div>
                        <button
                            onClick={handleAnalyzePricing}
                            disabled={isAnalyzingPricing}
                            className={`px-6 py-2 rounded-lg font-bold text-white transition-all flex items-center gap-2 ${isAnalyzingPricing ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 hover:shadow-lg'
                                }`}
                        >
                            {isAnalyzingPricing ? (
                                <>Analizando Mercado...</>
                            ) : (
                                <><FiActivity /> Analizar Competencia</>
                            )}
                        </button>
                    </div>

                    <div className="overflow-auto flex-1 bg-gray-50 rounded-xl border border-gray-200">
                        {isAnalyzingPricing ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                <div className="animate-pulse flex space-x-2">
                                    <div className="h-3 w-3 bg-purple-600 rounded-full"></div>
                                    <div className="h-3 w-3 bg-purple-600 rounded-full"></div>
                                    <div className="h-3 w-3 bg-purple-600 rounded-full"></div>
                                </div>
                                <p className="mt-4">Scrapeando precios de competencia...</p>
                            </div>
                        ) : pricingSuggestions ? (
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-100 sticky top-0 z-10">
                                    <tr>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase">Producto</th>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase text-center">Precio Actual</th>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase text-center">Precio Sugerido (IA)</th>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase">Razón / Estrategia</th>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Acción</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {pricingSuggestions.map(p => (
                                        <tr key={p.id} className="bg-white hover:bg-purple-50 transition-colors">
                                            <td className="p-4 font-semibold text-gray-700">{p.name}</td>
                                            <td className="p-4 text-center text-gray-500">${p.price}</td>
                                            <td className="p-4 text-center">
                                                <div className={`font-bold px-2 py-1 rounded inline-block ${p.changeType === 'increase' ? 'bg-green-100 text-green-700' :
                                                    p.changeType === 'decrease' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    ${p.suggestedPrice}
                                                    {p.changeType === 'increase' && <FiTrendingUp className="inline ml-1" />}
                                                    {p.changeType === 'decrease' && <FiActivity className="inline ml-1 rotate-180" />}
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600 italic">"{p.reason}"</td>
                                            <td className="p-4 text-right">
                                                {p.changeType !== 'neutral' && (
                                                    <button className="text-xs bg-gray-900 text-white px-3 py-1.5 rounded hover:bg-gray-800 transition-colors">
                                                        Aplicar
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                                <FiDollarSign size={48} className="mb-2" />
                                <p>Ejecuta el análisis para ver oportunidades de precio.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};


// --- MAIN APP COMPONENT ---
export default function DistributorOrdersDemo({ onBack }) {
    const [currentUser, setCurrentUser] = useState(USERS[0]); // Default to Vendor

    // PERSISTENCE INIT
    const [products, setProducts] = useState(() => {
        try {
            const saved = localStorage.getItem('demo_products');
            return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
        } catch (e) {
            return INITIAL_PRODUCTS;
        }
    });

    const [orders, setOrders] = useState(() => {
        try {
            const saved = localStorage.getItem('demo_orders');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    });

    // AUTO-SAVE EFFECTS
    useEffect(() => {
        localStorage.setItem('demo_products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem('demo_orders', JSON.stringify(orders));
    }, [orders]);

    // RESET FUNCTION
    const handleReset = () => {
        localStorage.removeItem('demo_products');
        localStorage.removeItem('demo_orders');
        setProducts(INITIAL_PRODUCTS);
        setOrders([]);
        window.location.reload();
    };

    const toggleUser = () => {
        // Updated Toggle: Vendor -> Client -> Admin -> Vendor
        setCurrentUser(curr => {
            if (curr.role === 'vendor') return USERS[1];
            if (curr.role === 'client') return USERS[2]; // Admin
            return USERS[0];
        });
    };

    const handlePlaceOrder = (orderData) => {
        const newOrder = {
            id: `ord_${Date.now()}`,
            status: 'Pending',
            date: new Date().toISOString(),
            ...orderData
        };

        // LÓGICA DE DEDUCCIÓN DE STOCK (MEJORA CLAVE)
        setProducts(prevProducts =>
            prevProducts.map(product => {
                // Buscamos si este producto está en el pedido que se acaba de hacer
                const orderedItem = orderData.items.find(item => item.id === product.id);

                if (orderedItem) {
                    // Si está, descontamos la cantidad ordenada del stock
                    const newStock = product.stock - orderedItem.quantity;
                    return { ...product, stock: newStock };
                }

                // Si no está, devolvemos el producto sin cambios
                return product;
            })
        );
        // FIN LÓGICA DE DEDUCCIÓN DE STOCK

        setOrders(prev => [...prev, newOrder]);
        alert(`¡Pedido # ${newOrder.id.slice(-4)} enviado con éxito! El stock ha sido actualizado.`);
    };

    const handleStatusChange = (orderId, newStatus) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    };

    const handleUpdateStock = (productId, amountToAdd) => {
        setProducts(prev => prev.map(p =>
            p.id === productId ? { ...p, stock: p.stock + amountToAdd } : p
        ));
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-blue-100">
            {/* HEADER */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {onBack && (
                            <button onClick={onBack} className="p-2 mr-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                                <FiArrowLeft size={20} />
                            </button>
                        )}
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 shrink-0">
                            <FiBox size={20} />
                        </div>
                        <div className="hidden md:block">
                            <h1 className="font-bold text-lg leading-none">DistribuidoraDemo</h1>
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">System Simulator</span>
                        </div>
                    </div>

                    <div className="flex bg-gray-100 p-1 rounded-full gap-1 overflow-x-auto max-w-[200px] md:max-w-none scrollbar-hide">
                        {USERS.map(user => (
                            <button
                                key={user.id}
                                onClick={() => setCurrentUser(user)}
                                className={`
                                    flex items-center gap-2 px-3 md:px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap flex-shrink-0
                                    ${currentUser.id === user.id
                                        ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                                    }
                                `}
                            >
                                {user.role === 'vendor' && <FiUser />}
                                {user.role === 'client' && <FiShoppingCart />}
                                {user.role === 'admin' && <FiLayers />}
                                <span>{user.name.split(' ')[0]}</span>
                            </button>
                        ))}
                    </div>
                </div >
            </div >

            {/* Main View Area */}
            < main className="max-w-7xl mx-auto px-4 md:px-6 py-8" >
                {
                    currentUser.role === 'client' ? (
                        <ClientView
                            products={products}
                            currentUser={currentUser}
                            onPlaceOrder={handlePlaceOrder}
                        />
                    ) : currentUser.role === 'admin' ? (
                        <AdminDashboard
                            products={products}
                            orders={orders}
                            onUpdateStock={handleUpdateStock}
                            onReset={handleReset}
                        />
                    ) : (
                        <VendorView
                            products={products}
                            orders={orders}
                            onStatusChange={handleStatusChange}
                            onVendorPlaceOrder={handlePlaceOrder}
                            clients={[USERS[1]]} // Pass mock clients
                        />
                    )
                }
            </main >

            {/* Footer Info */}
            < div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-full shadow-lg text-xs flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity" >
                <FiBox /> Mockup v1.0
            </div >
        </div >
    );
}
