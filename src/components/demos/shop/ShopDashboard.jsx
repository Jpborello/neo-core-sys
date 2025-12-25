"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useDemo } from '../../../context/DemoContext';
import { ShoppingCart, User, MapPin, Phone, CheckCircle, Search, Menu, X, Trash2, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ShopDashboard = () => {
    const { products, addOrder, carouselSlides } = useDemo();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');
    const [checkoutStep, setCheckoutStep] = useState('cart'); // cart, checkout, success
    const [lastOrderTicket, setLastOrderTicket] = useState(null);

    // Checkout Form State
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        notes: ''
    });

    // --- LOGIC ---
    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                // Check stock limit (simple check)
                const product = products.find(p => p.id === id);
                if (newQty > product.stock) return item;
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    const handleCheckout = (e) => {
        e.preventDefault();

        const newOrder = {
            customer_name: formData.name,
            customer_phone: formData.phone,
            delivery_address: formData.address,
            notes: formData.notes,
            total: cartTotal,
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            }))
        };

        const ticket = addOrder(newOrder); // Update addOrder to return the generated ticket or order object
        setLastOrderTicket(ticket);
        setCheckoutStep('success');
        setCart([]);
    };

    const categories = ['Todos', ...new Set(products.map(p => p.category))];
    const filteredProducts = products.filter(p => {
        const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch && p.is_active; // Only show active products
    });

    const formatCurrency = (val) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(val);



    // --- Carousel Logic ---
    React.useEffect(() => {
        if (carouselSlides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % carouselSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [carouselSlides.length]);

    const nextSlide = () => setCurrentSlide(prev => (prev + 1) % carouselSlides.length);
    const prevSlide = () => setCurrentSlide(prev => (prev - 1 + carouselSlides.length) % carouselSlides.length);

    // --- RENDER ---
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20 md:pb-0">

            {/* Navbar */}
            <nav className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 shadow-sm flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="bg-emerald-600 text-white p-2 rounded-lg">
                        <ShoppingBagIcon />
                    </div>
                    <h1 className="text-xl font-bold text-slate-800">Tienda Demo</h1>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/demo-admin" className="hidden md:flex bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-4 rounded-lg text-sm transition-colors items-center gap-2">
                        <User size={16} /> Admin Panel
                    </Link>
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <ShoppingCart size={24} className="text-slate-700" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </nav>

            {/* Main Layout */}
            <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-6">

                {/* Product Grid */}
                {/* Product Grid */}
                <div className="flex-1">

                    {/* API Hero Carousel */}
                    {carouselSlides.length > 0 && (
                        <div className="mb-8 rounded-2xl overflow-hidden relative aspect-[21/9] shadow-lg group">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0"
                                >
                                    <img src={carouselSlides[currentSlide].image} alt={carouselSlides[currentSlide].title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-6 md:p-10">
                                        <motion.h2
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-2xl md:text-4xl font-black text-white text-shadow-lg"
                                        >
                                            {carouselSlides[currentSlide].title}
                                        </motion.h2>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Controls */}
                            {carouselSlides.length > 1 && (
                                <>
                                    <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ChevronRight size={24} />
                                    </button>
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                        {carouselSlides.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentSlide(idx)}
                                                className={`w-2 h-2 rounded-full transition-all ${currentSlide === idx ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* Filters */}
                    <div className="mb-6 space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-500'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <AnimatePresence>
                            {filteredProducts.map(product => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    key={product.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
                                >
                                    <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        {product.stock <= 0 && (
                                            <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center font-bold text-slate-500 text-sm uppercase border-2 border-slate-200 m-2 rounded-lg">Sin Stock</div>
                                        )}
                                    </div>
                                    <div className="p-3 flex-1 flex flex-col">
                                        <h3 className="font-bold text-slate-800 text-sm leading-tight mb-1 line-clamp-2">{product.name}</h3>
                                        <p className="text-xs text-slate-500 mb-auto">{product.category}</p>
                                        <div className="mt-3 flex items-center justify-between">
                                            <span className="font-bold text-emerald-600 text-lg">{formatCurrency(product.price)}</span>
                                            <button
                                                disabled={product.stock <= 0}
                                                onClick={() => addToCart(product)}
                                                className="bg-slate-900 text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-600 transition-colors"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Desktop Cart Sidebar (Hidden on mobile, slides in) */}
            </div>

            {/* Floating Cart / Checkout Drawer */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                        />
                        <motion.div
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-white shadow-2xl z-50 flex flex-col"
                        >
                            {/* Drawer Header */}
                            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <h2 className="font-bold text-lg text-slate-800">
                                    {checkoutStep === 'cart' && 'Tu Carrito'}
                                    {checkoutStep === 'checkout' && 'Finalizar Compra'}
                                    {checkoutStep === 'success' && '¡Pedido Enviado!'}
                                </h2>
                                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={20} /></button>
                            </div>

                            {/* Drawer Content */}
                            <div className="flex-1 overflow-y-auto p-6">

                                {checkoutStep === 'cart' && (
                                    <>
                                        {cart.length === 0 ? (
                                            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
                                                <ShoppingCart size={64} className="mb-4 opacity-20" />
                                                <p>Tu carrito está vacío</p>
                                                <button onClick={() => setIsCartOpen(false)} className="mt-4 text-emerald-600 font-bold hover:underline">Seguir mirando</button>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {cart.map(item => (
                                                    <motion.div layout key={item.id} className="flex gap-4 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                                                        <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{item.name}</h4>
                                                            <p className="text-emerald-600 font-bold text-sm">{formatCurrency(item.price * item.quantity)}</p>
                                                            <div className="flex items-center gap-3 mt-2">
                                                                <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"><Minus size={12} /></button>
                                                                <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                                                <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"><Plus size={12} /></button>
                                                                <button onClick={() => removeFromCart(item.id)} className="ml-auto text-red-300 hover:text-red-500"><Trash2 size={16} /></button>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}

                                {checkoutStep === 'checkout' && (
                                    <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800 mb-4 flex gap-2">
                                            <CheckCircle size={16} className="shrink-0 mt-0.5" />
                                            <p>Estás comprando en modo DEMO. No se te cobrará nada.</p>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nombre Completo</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500" placeholder="Ej: Juan Perez" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Teléfono (WhatsApp)</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                <input required type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500" placeholder="Ej: 341 555 5555" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Dirección de Entrega</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                <input required type="text" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500" placeholder="Ej: Av. Pellegrini 1500, PB" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Notas (Opcional)</label>
                                            <textarea rows="3" value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 text-sm" placeholder="Ej: Tocar timbre 4B..." />
                                        </div>
                                    </form>
                                )}

                                {checkoutStep === 'success' && (
                                    <div className="h-full flex flex-col items-center justify-center text-center">
                                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6 animate-bounce">
                                            <CheckCircle size={40} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-2">¡Pedido Enviado!</h3>
                                        <p className="text-slate-500 max-w-xs mx-auto mb-8">Tu pedido ha sido recibido correctamente.</p>

                                        {lastOrderTicket && (
                                            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-2xl shadow-xl w-full max-w-[280px] mx-auto mb-8 relative overflow-hidden group">
                                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                                                <div className="relative z-10">
                                                    <div className="text-xs font-bold uppercase tracking-widest text-purple-200 mb-2">Tu número para el sorteo</div>
                                                    <div className="text-5xl font-black tracking-tighter shadow-black drop-shadow-md">
                                                        #{lastOrderTicket}
                                                    </div>
                                                    <div className="mt-3 text-xs bg-white/20 inline-block px-3 py-1 rounded-full font-bold">
                                                        ¡Mucha Suerte! 🍀
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <button onClick={() => { setCheckoutStep('cart'); setIsCartOpen(false); }} className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
                                            Volver a la Tienda
                                        </button>
                                        <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100 text-xs text-amber-800">
                                            <strong>Tip:</strong> Abre otra pestaña con <code>/demo-admin</code> para ver tu pedido en tiempo real.
                                        </div>
                                    </div>
                                )}

                            </div>

                            {/* Drawer Footer */}
                            {checkoutStep !== 'success' && cart.length > 0 && (
                                <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-slate-500 text-sm">Total a pagar</span>
                                        <span className="text-2xl font-black text-slate-900">{formatCurrency(cartTotal)}</span>
                                    </div>
                                    {checkoutStep === 'cart' ? (
                                        <button onClick={() => setCheckoutStep('checkout')} className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                                            Iniciar Compra <ArrowRightIcon />
                                        </button>
                                    ) : (
                                        <div className="grid grid-cols-3 gap-3">
                                            <button onClick={() => setCheckoutStep('cart')} className="col-span-1 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-100">
                                                Volver
                                            </button>
                                            <button form="checkout-form" type="submit" className="col-span-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">
                                                Confirmar Pedido
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </div>
    );
};

const ShoppingBagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
);

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);

export default ShopDashboard;
