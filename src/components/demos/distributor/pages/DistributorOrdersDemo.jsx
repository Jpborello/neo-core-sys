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
    FiArrowLeft,
    FiMessageCircle, // WhatsApp Icon
    FiSend,
    FiX
} from 'react-icons/fi';

// Mantenemos tus importaciones de imágenes (asegúrate de que las rutas sigan existiendo)
import sodaColaImg from '../../../../assets/demo-distribuidora/soda_cola.png';
import waterBottleImg from '../../../../assets/demo-distribuidora/water_bottle.png';
import beerCanImg from '../../../../assets/demo-distribuidora/beer_can.png';
import chipsBagImg from '../../../../assets/demo-distribuidora/chips_bag.png';
import cookiesImg from '../../../../assets/demo-distribuidora/chocolate_cookies.png';
import yerbaImg from '../../../../assets/demo-distribuidora/yerba_mate.png';
import sugarImg from '../../../../assets/demo-distribuidora/sugar_pack.png';

// --- UTILS ---
const formatCurrency = (value) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(value);

// --- MOCK DATA ---
const INITIAL_PRODUCTS = [
    { id: 1, name: "Gaseosa Cola 1.5L", price: 1250, category: "Bebidas", stock: 120, image: sodaColaImg },
    { id: 2, name: "Agua Mineral 500ml", price: 650, category: "Bebidas", stock: 240, image: waterBottleImg },
    { id: 3, name: "Cerveza Lata 473ml", price: 1800, category: "Bebidas", stock: 300, image: beerCanImg },
    { id: 4, name: "Galletitas Chocolate", price: 950, category: "Almacén", stock: 150, image: cookiesImg },
    { id: 5, name: "Yerba Mate 1kg", price: 3200, category: "Almacén", stock: 80, image: yerbaImg },
    { id: 6, name: "Azúcar Común 1kg", price: 850, category: "Almacén", stock: 200, image: sugarImg },
];

const USERS = [
    { id: 'usr_vendor_01', name: 'Martín (Vendedor)', role: 'vendor', phone: '5491100000000' },
    { id: 'usr_client_01', name: 'Kiosco "El Paso"', role: 'client', assignedVendorId: 'usr_vendor_01', phone: '5491112345678' }, // Added phone
    { id: 'usr_admin_01', name: 'Carlos (Dueño)', role: 'admin', phone: '5491199999999' },
];

// --- COMPONENTS ---

// 1. Product Card
const ProductCard = ({ product, onAdd }) => {
    const [quantity, setQuantity] = useState(1);

    const handleAdd = () => {
        onAdd(product, quantity);
        setQuantity(1);
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between h-full group">
            <div className="flex-1">
                <div className="relative mb-3 h-32 w-full flex items-center justify-center bg-gray-50 rounded-lg p-2 group-hover:bg-blue-50/50 transition-colors">
                    <img src={product.image} alt={product.name} className="h-full object-contain mix-blend-multiply" />
                    <span className="absolute top-2 right-2 text-[10px] font-bold text-blue-600 bg-white/90 px-2 py-1 rounded-full shadow-sm uppercase tracking-wider">{product.category}</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${product.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                        Stock: {product.stock}
                    </span>
                </div>
                <h3 className="font-bold text-gray-800 text-base leading-tight mb-1">{product.name}</h3>
                <div className="text-xl font-bold text-emerald-600 mb-4">{formatCurrency(product.price)}</div>
            </div>

            <div className="flex items-center gap-2 mt-auto">
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-9">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-2 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors">-</button>
                    <div className="px-2 text-center font-medium bg-white text-sm min-w-[30px]">{quantity}</div>
                    <button onClick={() => setQuantity(q => q + 1)} className="px-2 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors">+</button>
                </div>
                <button
                    onClick={handleAdd}
                    disabled={product.stock === 0}
                    className={`flex-1 font-semibold py-2 px-3 rounded-lg text-sm flex items-center justify-center gap-1 transition-all h-9
                        ${product.stock === 0
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow'}`}
                >
                    {product.stock === 0 ? 'Sin Stock' : <><FiPlus /> Agregar</>}
                </button>
            </div>
        </div>
    );
};

// 1.5 Checkout Form Component
const CheckoutForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        businessName: '',
        address: '',
        phone: '',
        cuit: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (!formData.businessName || !formData.address || !formData.phone) {
            alert("Por favor complete Razón Social, Dirección y Teléfono.");
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 animate-fade-in-up mx-4">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Finalizar Pedido</h3>
                    <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
                        <FiX size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <input
                            type="text"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                            placeholder="Razón Social *"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                            placeholder="Dirección *"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                            placeholder="Teléfono *"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="cuit"
                            value={formData.cuit}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                            placeholder="CUIT (Opcional)"
                        />
                    </div>

                    <div className="pt-2 flex gap-2">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 text-sm"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-200 text-sm"
                        >
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// 1.7 New Client Form
const NewClientForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        businessName: '',
        address: '',
        crossStreets: '',
        phone: '',
        cuit: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.businessName || !formData.address || !formData.phone) {
            alert("Completa los campos obligatorios (*)");
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 animate-fade-in-up mx-4">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <FiUser /> Nuevo Cliente
                    </h3>
                    <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
                        <FiX size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <input
                            type="text"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                            placeholder="Razón Social *"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                            placeholder="Dirección Exacta *"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="crossStreets"
                            value={formData.crossStreets}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                            placeholder="Entre Calles"
                        />
                    </div>
                    <div>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                            placeholder="Teléfono *"
                            required
                        />
                    </div>

                    {/* Simulated Photo Upload */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-3 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                        <div className="text-gray-400 group-hover:text-blue-500 mb-1">
                            <FiBox size={24} className="mx-auto" />
                        </div>
                        <p className="text-xs text-gray-500 font-medium">Subir Foto Fachada</p>
                    </div>

                    <div className="pt-2 flex gap-2">
                        <button type="button" onClick={onCancel} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 text-sm">Cancelar</button>
                        <button type="submit" className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 text-sm">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// 1.8 Vendor Dashboard
const VendorDashboard = ({ clients, onSelectClient, onAddClient }) => {
    const [showNewClientForm, setShowNewClientForm] = useState(false);

    const handleCreateClient = (data) => {
        onAddClient(data);
        setShowNewClientForm(false);
    };

    return (
        <div className="h-full flex flex-col">
            {showNewClientForm && <NewClientForm onSubmit={handleCreateClient} onCancel={() => setShowNewClientForm(false)} />}

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Mis Clientes</h2>
                    <p className="text-gray-500">Selecciona un cliente para tomar pedido o agrega uno nuevo.</p>
                </div>
                <button
                    onClick={() => setShowNewClientForm(true)}
                    className="flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-xl font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    <FiPlus /> Nuevo Cliente
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {clients.map(client => (
                    <div
                        key={client.id}
                        onClick={() => onSelectClient(client)}
                        className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 group-hover:bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="flex items-start justify-between mb-2">
                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
                                {client.name.charAt(0)}
                            </div>
                            <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">ID: {client.id.slice(-4)}</span>
                        </div>

                        <h3 className="font-bold text-gray-900 text-lg mb-1">{client.name}</h3>
                        <div className="text-sm text-gray-500 space-y-1">
                            {client.address && <p className="flex items-center gap-1"><span className="text-xs">📍</span> {client.address}</p>}
                            {client.crossStreets && <p className="text-xs text-gray-400 pl-4 italic">Entre: {client.crossStreets}</p>}
                            {client.phone && <p className="flex items-center gap-1"><span className="text-xs">📞</span> {client.phone}</p>}
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-50 flex justify-end">
                            <span className="text-sm font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                Tomar Pedido <FiArrowLeft className="rotate-180" />
                            </span>
                        </div>
                    </div>
                ))}

                {/* Empty State Helper */}
                {clients.length === 0 && (
                    <div className="text-center py-10 text-gray-400 col-span-full border-2 border-dashed border-gray-200 rounded-xl">
                        No tienes clientes asignados. ¡Crea uno nuevo!
                    </div>
                )}
            </div>
        </div>
    );
};

// 2. Client View
const ClientView = ({ products, onPlaceOrder, currentUser }) => {
    const [cart, setCart] = useState([]);
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [showCheckout, setShowCheckout] = useState(false);

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

    const handleCheckoutClick = () => {
        if (cart.length === 0) return;
        setShowCheckout(true);
    };

    const handleConfirmOrder = (clientDetails) => {
        onPlaceOrder({
            items: cart,
            total: cartTotal,
            clientId: currentUser.id,
            clientName: currentUser.name, // Will be overwritten or augmented by details
            clientDetails: clientDetails, // Add the specific form details
            vendorId: currentUser.assignedVendorId
        });
        setCart([]);
        setShowCheckout(false);
    };

    const filteredProducts = activeCategory === "Todos"
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-full items-start relative">
            {/* Checkout Modal */}
            {showCheckout && (
                <CheckoutForm
                    onSubmit={handleConfirmOrder}
                    onCancel={() => setShowCheckout(false)}
                />
            )}

            {/* Catalog */}
            <div className="flex-1 w-full">
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat
                                ? 'bg-gray-900 text-white shadow-lg transform scale-105'
                                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-4 pb-20">
                    {filteredProducts.map(p => (
                        <ProductCard key={p.id} product={p} onAdd={addToCart} />
                    ))}
                </div>
            </div>

            {/* Cart Panel - Floating Button on Mobile / Sidebar on Desktop */}
            {/* Logic: On Mobile/Sim, show a floating bar. On Large screens, show sidebar IF viewport allows, but in simulator it is small so... 
                We should just use the Floating Bar approach for the Small View, effectively.
            */}

            {/* Desktop/Admin Sidebar Cart (Only visible on huge screens) */}
            <div className="hidden xl:flex w-96 bg-white rounded-xl shadow-xl border border-gray-100 flex-col sticky top-24 max-h-[calc(100vh-8rem)]">
                <div className="p-4 border-b border-gray-100 bg-gray-50 rounded-t-xl flex justify-between items-center">
                    <h2 className="font-bold text-gray-800 flex items-center gap-2">
                        <FiShoppingCart className="text-blue-600" /> Tu Pedido
                    </h2>
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">{cart.length} items</span>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                    {cart.length === 0 ? (
                        <div className="text-center text-gray-400 py-10 flex flex-col items-center">
                            <FiBox className="text-4xl mb-2 opacity-20" />
                            <p className="text-sm">Tu carrito está vacío</p>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="flex justify-between items-center bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                                <div className="flex-1">
                                    <div className="font-semibold text-gray-800 text-sm line-clamp-1">{item.name}</div>
                                    <div className="text-xs text-gray-500">{item.quantity} x {formatCurrency(item.price)}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="font-bold text-gray-900 text-sm">{formatCurrency(item.price * item.quantity)}</div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                                    >
                                        <FiTrash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Total Estimado</span>
                        <span className="text-2xl font-bold text-gray-900">{formatCurrency(cartTotal)}</span>
                    </div>
                    <button
                        onClick={handleCheckoutClick}
                        disabled={cart.length === 0}
                        className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${cart.length === 0
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-emerald-600 hover:bg-emerald-700 transform hover:-translate-y-1'
                            }`}
                    >
                        Confirmar Pedido <FiSend />
                    </button>
                </div>
            </div>

            {/* Mobile/Simulator Sticky Bottom Bar */}
            <div className="xl:hidden fixed bottom-0 inset-x-0 p-4 bg-white border-t border-gray-200 z-40 shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                            <FiShoppingCart size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Total</p>
                            <p className="font-bold text-lg leading-none">{formatCurrency(cartTotal)}</p>
                        </div>
                    </div>
                    <div className="text-xs text-gray-400 font-medium">{cart.length} items</div>
                </div>
                <button
                    onClick={handleCheckoutClick}
                    disabled={cart.length === 0}
                    className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${cart.length === 0
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-700 active:scale-95'
                        }`}
                >
                    Confirmar Pedido <FiSend />
                </button>
            </div>

        </div>
    );
};

// 3. Admin / Vendor Dashboard
const AdminDashboard = ({ products, orders, onStatusChange, onReset }) => {

    // --- METRICS CALCULATION ---
    const totalRevenue = orders.filter(o => o.status !== 'Cancelled').reduce((sum, order) => sum + order.total, 0);
    const pendingCount = orders.filter(o => o.status === 'Pending').length;
    const processingCount = orders.filter(o => o.status === 'Processing').length;

    // Top Products Calculation for Dashboard
    const topProducts = products.map(p => {
        const sold = orders
            .filter(o => o.status !== 'Cancelled')
            .reduce((acc, order) => {
                const item = order.items.find(i => i.id === p.id);
                return acc + (item ? item.quantity : 0);
            }, 0);
        return { ...p, sold };
    }).sort((a, b) => b.sold - a.sold).slice(0, 3);

    // --- WHATSAPP LOGIC ---
    const handleWhatsAppClick = (order) => {
        const itemsList = order.items.map(i => `- ${i.quantity}x ${i.name}`).join('%0A');
        const message = `*Hola ${order.clientDetails?.businessName || order.clientName}!*%0A%0ASu pedido *#${order.id.slice(-4)}* ha sido actualizado a: _${order.status === 'Pending' ? 'Recibido' : order.status === 'Processing' ? 'En Preparación' : 'Entregado'}_.%0A%0A*Detalle del Pedido:*%0A${itemsList}%0A%0A*Total: ${formatCurrency(order.total)}*%0A%0AMuchas gracias!`;

        // Use client phone or fallback
        const phone = order.clientDetails?.phone || order.clientPhone || '5491112345678';
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    };

    return (
        <div className="flex flex-col h-full space-y-8">

            {/* 1. KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Ingresos</p>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
                    </div>
                    <div className="p-3 bg-green-50 text-green-600 rounded-lg"><FiDollarSign size={24} /></div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between relative overflow-hidden">
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Pendientes</p>
                        <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
                    </div>
                    <div className="p-3 bg-orange-50 text-orange-600 rounded-lg"><FiAlertCircle size={24} /></div>
                    {pendingCount > 0 && <span className="absolute top-0 right-0 w-3 h-3 bg-orange-500 rounded-full animate-ping"></span>}
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">En Preparación</p>
                        <p className="text-2xl font-bold text-blue-600">{processingCount}</p>
                    </div>
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><FiPackage size={24} /></div>
                </div>

                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-xl shadow-sm border border-gray-800 flex items-center justify-between text-white">
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Top Venta</p>
                        <p className="text-sm font-semibold truncate w-32">{topProducts[0]?.name || 'N/A'}</p>
                    </div>
                    <div className="p-3 bg-white/10 text-white rounded-lg"><FiTrendingUp size={24} /></div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 2. ORDER MANAGEMENT TABLE */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
                    <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <FiLayers className="text-blue-600" /> Gestión de Pedidos
                        </h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-bold">
                                <tr>
                                    <th className="p-4">ID / Cliente / Datos</th>
                                    <th className="p-4">Estado</th>
                                    <th className="p-4 text-right">Total</th>
                                    <th className="p-4 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {orders.slice().reverse().map(order => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <div className="font-bold text-gray-900">#{order.id.slice(-4)}</div>
                                            <div className="text-sm font-semibold text-gray-800">{order.clientDetails?.businessName || order.clientName}</div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {order.clientDetails?.address && <span>📍 {order.clientDetails.address}<br /></span>}
                                                {order.clientDetails?.phone && <span>📞 {order.clientDetails.phone}</span>}
                                            </div>
                                            <div className="text-xs text-gray-400 mt-1">{new Date(order.date).toLocaleTimeString()}</div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${order.status === 'Pending' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                order.status === 'Processing' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                    'bg-green-50 text-green-600 border-green-100'
                                                }`}>
                                                {order.status === 'Pending' ? 'Pendiente' :
                                                    order.status === 'Processing' ? 'Preparando' : 'Entregado'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right font-bold text-gray-700">
                                            {formatCurrency(order.total)}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-center gap-2">
                                                {/* STATUS FLOW ACTIONS */}
                                                {order.status === 'Pending' && (
                                                    <button
                                                        onClick={() => onStatusChange(order.id, 'Processing', order.items)}
                                                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 tooltip"
                                                        title="Aceptar y Descontar Stock"
                                                    >
                                                        <FiCheck />
                                                    </button>
                                                )}
                                                {order.status === 'Processing' && (
                                                    <button
                                                        onClick={() => onStatusChange(order.id, 'Delivered')}
                                                        className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                                                        title="Marcar Entregado"
                                                    >
                                                        <FiTruck />
                                                    </button>
                                                )}

                                                {/* WHATSAPP ACTION */}
                                                <button
                                                    onClick={() => handleWhatsAppClick(order)}
                                                    className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200"
                                                    title="Enviar detalle por WhatsApp"
                                                >
                                                    <FiMessageCircle />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {orders.length === 0 && (
                                    <tr><td colSpan="4" className="p-8 text-center text-gray-400">No hay pedidos registrados</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 3. STOCK & METRICS SIDEBAR */}
                <div className="space-y-6">
                    {/* Top Products Chart (Visual) */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <FiTrendingUp className="text-purple-600" /> Productos Top
                        </h4>
                        <div className="space-y-4">
                            {topProducts.map((p, idx) => (
                                <div key={p.id}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="font-medium text-gray-700">{idx + 1}. {p.name}</span>
                                        <span className="text-gray-500">{p.sold} u. vendidas</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div
                                            className="bg-purple-600 h-2 rounded-full"
                                            style={{ width: `${(p.sold / (topProducts[0]?.sold || 1)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                            {topProducts.length === 0 && <p className="text-sm text-gray-400 italic">Esperando ventas...</p>}
                        </div>
                    </div>

                    {/* Low Stock Alert List */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700 text-sm">
                            Control de Stock Actual
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                            {products.map(p => (
                                <div key={p.id} className="flex justify-between items-center p-3 border-b border-gray-50 last:border-0 hover:bg-gray-50">
                                    <div className="text-sm text-gray-600 truncate w-32">{p.name}</div>
                                    <div className={`text-xs font-bold px-2 py-1 rounded-full ${p.stock < 15 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                                        }`}>
                                        {p.stock} u.
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => { if (confirm('¿Reiniciar Demo?')) onReset(); }}
                        className="w-full py-2 border border-dashed border-red-300 text-red-400 text-xs rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                        Reset Demo Data
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- MOBILE SIMULATOR WRAPPER ---
const MobileSimulatorWrapper = ({ children, role }) => {
    // If Admin, full screen always.
    if (role === 'admin') return <>{children}</>;

    return (
        <div className="min-h-screen bg-white md:bg-gray-900 flex flex-col items-center justify-center md:py-8 transition-colors duration-500">
            {/* Desktop Context Message */}
            <div className="hidden md:flex flex-col items-center mb-6 text-white animate-fade-in">
                <div className="flex items-center gap-2 mb-2 opacity-80">
                    <FiActivity /> <span>Modo Simulador</span>
                </div>
                <h2 className="text-2xl font-bold">Vista de {role === 'vendor' ? 'Preventista' : 'Cliente'}</h2>
                <p className="text-gray-400 text-sm">Así se ve tu app en un dispositivo móvil</p>
            </div>

            {/* Phone Frame */}
            <div className="w-full h-full md:max-w-[400px] md:h-[800px] md:max-h-[90vh] bg-white md:rounded-[2.5rem] shadow-none md:shadow-2xl md:border-[10px] md:border-gray-800 relative overflow-hidden flex flex-col">

                {/* Notch (Visual only on desktop) */}
                <div className="hidden md:block absolute top-0 inset-x-0 h-7 bg-gray-800 z-50 rounded-b-3xl w-40 mx-auto"></div>

                {/* Content Area */}
                <div className="flex-1 w-full h-full relative overflow-y-auto bg-gray-50 custom-scrollbar scrollbar-hide">
                    {children}
                </div>

                {/* iOS Home Indicator (Visual) */}
                <div className="hidden md:block absolute bottom-2 inset-x-0 flex justify-center pointer-events-none z-50">
                    <div className="w-32 h-1.5 bg-black/10 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---
export default function DistributorOrdersDemo({ onBack }) {
    const [currentUser, setCurrentUser] = useState(USERS[0]); // Default Vendor
    const [selectedClientForOrder, setSelectedClientForOrder] = useState(null);

    // PERSISTENCE
    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('demo_products_v2');
        return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    });

    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem('demo_orders_v2');
        return saved ? JSON.parse(saved) : [];
    });

    // Client Persistence (Vendor Portfolio)
    const [clients, setClients] = useState(() => {
        const saved = localStorage.getItem('demo_clients_v2');
        return saved ? JSON.parse(saved) : [USERS[1]]; // Start with default Kiosco
    });

    useEffect(() => { localStorage.setItem('demo_products_v2', JSON.stringify(products)); }, [products]);
    useEffect(() => { localStorage.setItem('demo_orders_v2', JSON.stringify(orders)); }, [orders]);
    useEffect(() => { localStorage.setItem('demo_clients_v2', JSON.stringify(clients)); }, [clients]);

    const handleReset = () => {
        localStorage.removeItem('demo_products_v2');
        localStorage.removeItem('demo_orders_v2');
        localStorage.removeItem('demo_clients_v2');
        window.location.reload();
    };

    const handleAddClient = (clientData) => {
        const newClient = {
            id: `cli_${Date.now()}`,
            role: 'client',
            name: clientData.businessName,
            ...clientData
        };
        setClients(prev => [...prev, newClient]);
        // Auto-select to take order immediately
        setSelectedClientForOrder(newClient);
    };

    const handlePlaceOrder = (orderData) => {
        const newOrder = {
            id: `ord_${Date.now()}`,
            status: 'Pending',
            date: new Date().toISOString(),
            ...orderData
        };
        setOrders(prev => [...prev, newOrder]);

        // Exact SUCCESS MESSAGE
        alert("Su pedido fue enviado ya esta en produccion pronto recibira un mensaje para coordinar la entrega");

        // Return to Dashboard if Vendor
        if (currentUser.role === 'vendor') {
            setSelectedClientForOrder(null);
        }
    };

    // LOGICA CORE: Gestión de Estados y Stock
    const handleStatusChange = (orderId, newStatus, orderItems = []) => {
        if (newStatus === 'Processing') {
            setProducts(prevProducts =>
                prevProducts.map(product => {
                    const itemInOrder = orderItems.find(i => i.id === product.id);
                    if (itemInOrder) {
                        return { ...product, stock: Math.max(0, product.stock - itemInOrder.quantity) };
                    }
                    return product;
                })
            );
        }
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    };

    // --- RENDER CONTENT ---
    return (
        <MobileSimulatorWrapper role={currentUser.role}>
            <div className={`min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-blue-100 flex flex-col ${currentUser.role !== 'admin' ? 'pb-24' : ''}`}> {/* Padding bottom for sticky bar */}

                {/* Header Navbar */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm shrink-0">
                    <div className={`${currentUser.role === 'admin' ? 'max-w-7xl px-6' : 'px-4'} mx-auto h-14 md:h-16 flex items-center justify-between`}>
                        <div className="flex items-center gap-2 md:gap-3">
                            {onBack && currentUser.role === 'admin' && <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg"><FiArrowLeft /></button>}
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md">
                                <FiBox size={18} />
                            </div>
                            <div>
                                <h1 className="font-bold text-base md:text-lg leading-none tracking-tight">
                                    {currentUser.role !== 'admin' ? 'DistribuidoraApp' : <>Distribuidora<span className="text-blue-600">SaaS</span></>}
                                </h1>
                            </div>
                        </div>

                        {/* User Switcher - Compact on Mobile */}
                        <div className="flex bg-gray-100 p-1 rounded-lg gap-1 overflow-x-auto max-w-[150px] md:max-w-none scrollbar-hide">
                            {USERS.map(user => (
                                <button
                                    key={user.id}
                                    onClick={() => {
                                        setCurrentUser(user);
                                        setSelectedClientForOrder(null);
                                    }}
                                    className={`px-2 md:px-3 py-1.5 rounded-md text-[10px] md:text-xs font-bold transition-all whitespace-nowrap ${currentUser.id === user.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {user.role === 'admin' ? 'Admin' : user.role === 'vendor' ? 'Vend' : 'Cli'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <main className={`${currentUser.role === 'admin' ? 'max-w-7xl px-6' : 'px-4'} mx-auto py-6 flex-1 w-full`}>
                    {currentUser.role === 'client' || selectedClientForOrder ? (
                        <ClientView
                            products={products}
                            currentUser={selectedClientForOrder || currentUser} // Act as selected client
                            onPlaceOrder={handlePlaceOrder}
                        />
                    ) : currentUser.role === 'vendor' ? (
                        <VendorDashboard
                            clients={clients}
                            onSelectClient={setSelectedClientForOrder}
                            onAddClient={handleAddClient}
                        />
                    ) : (
                        <AdminDashboard products={products} orders={orders} onStatusChange={handleStatusChange} onReset={handleReset} />
                    )}
                </main>
            </div>
        </MobileSimulatorWrapper>
    );
}
