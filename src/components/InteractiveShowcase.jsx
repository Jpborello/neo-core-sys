import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    ShoppingCart, Package, Search, Plus, Minus, Trash2, Box, ArrowRight,
    CheckCircle2, AlertCircle, BarChart3, TrendingUp, Receipt, DollarSign,
    RefreshCw, Store, Truck, BrainCircuit, ArrowLeft, History, Users, Dumbbell,
    UtensilsCrossed
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GymDemo from './GymDemo';
import DistributorOrdersDemo from './demos/distributor/pages/DistributorOrdersDemo';

// ==========================================
// SHARED COMPONENTS
// ==========================================
const Toast = ({ msg, type }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`fixed bottom-8 right-8 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 ${type === 'error' ? 'bg-red-500 text-white' : 'bg-slate-900 text-white'}`}
    >
        {type === 'success' ? <CheckCircle2 size={24} className="text-emerald-400" /> : <AlertCircle size={24} />}
        <span className="font-medium">{msg}</span>
    </motion.div>
);

// ==========================================
// APP 1: KIOSK (RETAIL)
// ==========================================
const KioskApp = ({ onBack }) => {
    // --- MOCK DATA ---
    const INITIAL_INVENTORY = [
        { id: 1, name: "Coca Cola 500ml", sku: "CC500", price: 1500, stock: 50, category: "Bebidas" },
        { id: 2, name: "Caramelo Sugus Suelto", sku: "SUG001", price: 50, stock: 15, category: "Golosinas" },
        { id: 3, name: "Bolsa Caramelos Sugus x3000", sku: "SUG-PACK-3000", price: 12000, stock: 5, category: "Golosinas", isPack: true, unpackCreatesId: 2, unpackQty: 3000 },
        { id: 4, name: "Alfajor Jorgito", sku: "JORG01", price: 800, stock: 24, category: "Golosinas" },
        { id: 5, name: "Agua Mineral 1L", sku: "H2O-1L", price: 1000, stock: 30, category: "Bebidas" }
    ];

    const generateMockSales = () => {
        return Array(15).fill(0).map((_, idx) => ({
            id: `mock-${idx}`, total: Math.floor(Math.random() * 5000) + 500,
            itemsCount: Math.floor(Math.random() * 5) + 1,
            timestamp: new Date(new Date().setHours([9, 10, 11, 13, 14, 18, 19, 20][Math.floor(Math.random() * 8)], Math.floor(Math.random() * 59)))
        }));
    };

    // --- STATE ---
    const [activeTab, setActiveTab] = useState('pos');
    const [inventory, setInventory] = useState(INITIAL_INVENTORY);
    const [cart, setCart] = useState([]);
    const [salesHistory, setSalesHistory] = useState(generateMockSales());
    const [lastAction, setLastAction] = useState(null);
    const [showUnpackModal, setShowUnpackModal] = useState(null);

    // --- LOGIC ---
    const showToast = (msg, type = 'success') => { setLastAction({ msg, type }); setTimeout(() => setLastAction(null), 3000); };

    const addToCart = (p) => {
        if (p.stock <= 0) return showToast("Sin stock", "error");
        setCart(prev => {
            const ex = prev.find(i => i.id === p.id);
            return ex ? prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { ...p, qty: 1 }];
        });
        setInventory(prev => prev.map(i => i.id === p.id ? { ...i, stock: i.stock - 1 } : i));
    };

    const checkout = () => {
        const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
        setSalesHistory(prev => [...prev, { id: `sale-${Date.now()}`, total, itemsCount: cart.length, timestamp: new Date() }]);
        setCart([]);
        showToast("Venta registrada", "success");
    };

    const handleUnpack = () => {
        const pack = showUnpackModal;
        const target = inventory.find(p => p.id === pack.unpackCreatesId);
        setInventory(prev => prev.map(i => {
            if (i.id === pack.id) return { ...i, stock: i.stock - 1 };
            if (i.id === target.id) return { ...i, stock: i.stock + pack.unpackQty };
            return i;
        }));
        setShowUnpackModal(null);
        showToast(`Despiece: +${pack.unpackQty} unidades`, "success");
    };

    // --- RENDER HELPERS ---
    const stats = {
        total: salesHistory.reduce((acc, s) => acc + s.total, 0),
        count: salesHistory.length,
        avg: salesHistory.length ? salesHistory.reduce((acc, s) => acc + s.total, 0) / salesHistory.length : 0
    };

    const hourlyData = Array(15).fill(0).map((_, i) => ({
        hour: i + 8,
        count: salesHistory.filter(s => s.timestamp.getHours() === (i + 8)).length
    }));
    const maxHour = Math.max(...hourlyData.map(d => d.count), 1);

    return (
        <div className="h-full flex flex-col bg-slate-50 text-slate-800 rounded-xl overflow-hidden shadow-2xl border border-slate-200">
            {/* APP HEADER */}
            <div className="bg-white p-4 border-b border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"><ArrowLeft size={20} /></button>
                    <div className="flex flex-col">
                        <h2 className="font-bold text-slate-800 flex items-center gap-2"><Store size={18} className="text-indigo-600" /> KioskMaster <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">Retail</span></h2>
                    </div>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                    {['pos', 'stock', 'reports'].map(t => (
                        <button key={t} onClick={() => setActiveTab(t)} className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${activeTab === t ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}>
                            {t.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-auto p-4 bg-slate-50/50">
                {activeTab === 'pos' && (
                    <div className="grid grid-cols-3 gap-4 h-full">
                        <div className="col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col">
                            <div className="mb-4 flex gap-2"><Search className="text-slate-400" size={20} /> <input placeholder="Buscar producto..." className="flex-1 outline-none font-medium" /></div>
                            <div className="flex-1 overflow-auto">
                                {inventory.map(p => (
                                    <div key={p.id} className="flex justify-between items-center p-3 border-b hover:bg-slate-50">
                                        <div><div className="font-bold">{p.name}</div><div className="text-xs text-slate-400">Stock: {p.stock}</div></div>
                                        <button onClick={() => addToCart(p)} disabled={p.stock <= 0} className="bg-indigo-600 text-white px-3 py-1 rounded text-xs">Agregar</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col">
                            <h3 className="font-bold mb-4 flex items-center gap-2"><ShoppingCart size={16} /> Ticket</h3>
                            <div className="flex-1 overflow-auto space-y-2">
                                {cart.map(i => (
                                    <div key={i.id} className="flex justify-between text-sm bg-slate-50 p-2 rounded">
                                        <span>{i.qty} x {i.name}</span>
                                        <span className="font-mono">${i.price * i.qty}</span>
                                    </div>
                                ))}
                            </div>
                            <button onClick={checkout} disabled={!cart.length} className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-colors">Cobrar ${cart.reduce((a, i) => a + (i.price * i.qty), 0)}</button>
                        </div>
                    </div>
                )}

                {activeTab === 'stock' && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Package className="text-amber-500" /> Inventario & Despiece</h3>
                        <p className="text-sm text-slate-500 mb-6">Prueba la función de despiece con la "Bolsa de Caramelos".</p>
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-400 uppercase text-xs"><tr><th className="p-3">Producto</th><th className="p-3">Stock</th><th className="p-3 text-right">Acción</th></tr></thead>
                            <tbody>
                                {inventory.map(p => (
                                    <tr key={p.id} className="border-b">
                                        <td className="p-3">{p.name} {p.isPack && <span className="bg-amber-100 text-amber-700 px-2 rounded-full text-[10px] font-bold">PACK</span>}</td>
                                        <td className="p-3 font-mono">{p.stock}</td>
                                        <td className="p-3 text-right">
                                            {p.isPack ? <button onClick={() => setShowUnpackModal(p)} className="text-amber-600 hover:bg-amber-50 px-2 py-1 rounded border border-amber-200 text-xs font-bold">Desarmar</button> : <span className="text-slate-300">-</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'reports' && (
                    <div className="h-full flex flex-col gap-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded-xl border border-slate-200 text-center"><DollarSign size={20} className="mx-auto text-emerald-500 mb-1" /><div className="text-2xl font-bold">${stats.total.toLocaleString()}</div><div className="text-xs text-slate-500">Ventas Hoy</div></div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 text-center"><Receipt size={20} className="mx-auto text-blue-500 mb-1" /><div className="text-2xl font-bold">{stats.count}</div><div className="text-xs text-slate-500">Tickets</div></div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 text-center"><TrendingUp size={20} className="mx-auto text-purple-500 mb-1" /><div className="text-2xl font-bold">${stats.avg.toFixed(0)}</div><div className="text-xs text-slate-500">Promedio</div></div>
                        </div>
                        <div className="flex-1 bg-white p-6 rounded-xl border border-slate-200 flex flex-col">
                            <div className="flex justify-between items-center mb-6"><h3 className="font-bold">Horarios Calientes</h3><button onClick={() => { setSalesHistory([]); showToast("Caja Cerrada", "success") }} className="bg-slate-900 text-white px-3 py-1 rounded text-xs flex items-center gap-1"><RefreshCw size={12} /> Cerrar Caja</button></div>
                            <div className="flex-1 flex items-end gap-2">
                                {hourlyData.map((d, i) => (
                                    <div key={i} className="flex-1 bg-indigo-100 rounded-t relative group" style={{ height: `${(d.count / maxHour) * 100}%` }}>
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">{d.count}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between text-xs text-slate-400 mt-2"><span>08:00</span><span>22:00</span></div>
                        </div>
                    </div>
                )}
            </div>

            {/* UNPACK MODAL */}
            {showUnpackModal && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-40">
                    <div className="bg-white p-6 rounded-xl shadow-2xl max-w-xs w-full animate-scale-in">
                        <h3 className="font-bold text-lg mb-2">¿Desarmar Pack?</h3>
                        <p className="text-sm text-slate-500 mb-4">Convertir 1 {showUnpackModal.name} en {showUnpackModal.unpackQty} unidades.</p>
                        <div className="flex gap-2">
                            <button onClick={() => setShowUnpackModal(null)} className="flex-1 py-2 border rounded">Cancelar</button>
                            <button onClick={handleUnpack} className="flex-1 py-2 bg-amber-500 text-white rounded font-bold">Confirmar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// ==========================================
const InteractiveShowcase = () => {
    const router = useRouter();
    const [viewMode, setViewMode] = useState('menu'); // 'menu', 'kiosk', 'wholesale', 'gym'

    return (
        <section className="py-24 px-6 w-full max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Soluciones a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Tu Medida</span></h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                    No solo hacemos webs bonitas. Construimos sistemas potentes. <br />
                    <span className="text-white">Selecciona una experiencia para probarla ahora mismo:</span>
                </p>
            </motion.div>

            <div className="w-full min-h-[700px] h-auto bg-slate-900/50 rounded-3xl border border-slate-700 p-4 md:p-8 backdrop-blur-sm relative overflow-hidden flex flex-col">
                <AnimatePresence mode='wait'>
                    {viewMode === 'menu' && (
                        <motion.div
                            key="menu"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 py-12 md:py-0"
                        >
                            {/* RETAIL CARD */}
                            <div className="group relative bg-slate-800 hover:bg-slate-700 p-8 rounded-2xl border border-slate-600 hover:border-indigo-500 transition-all cursor-pointer w-full max-w-sm" onClick={() => setViewMode('kiosk')}>
                                <div className="absolute top-0 right-0 p-4 opacity-50"><Store size={64} className="text-slate-600 group-hover:text-indigo-500 transition-colors" /></div>
                                <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-lg w-fit mb-6"><Store size={32} /></div>
                                <h3 className="text-2xl font-bold text-white mb-2">Comercio / Kiosco</h3>
                                <p className="text-slate-400 mb-6 min-h-[48px]">Sistema de punto de venta (POS) rápido, control de stock y despiece de productos.</p>
                                <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">Probar Demo <ArrowRight size={18} /></button>
                            </div>

                            {/* WHOLESALE CARD */}
                            <div className="group relative bg-slate-800 hover:bg-slate-700 p-8 rounded-2xl border border-slate-600 hover:border-blue-500 transition-all cursor-pointer w-full max-w-sm" onClick={() => setViewMode('wholesale')}>
                                <div className="absolute top-0 right-0 p-4 opacity-50"><Truck size={64} className="text-slate-600 group-hover:text-blue-500 transition-colors" /></div>
                                <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg w-fit mb-6"><Truck size={32} /></div>
                                <h3 className="text-2xl font-bold mb-3 text-white">Distribuidora B2B</h3>
                                <p className="text-slate-400 mb-6 group-hover:text-slate-300 transition-colors">
                                    Sistema integral B2B: App Preventista, Portal Clientes y Dashboard Admin con IA Logística.
                                </p>
                                <div className="w-full py-3 bg-blue-600 rounded-xl text-white font-bold flex items-center justify-center gap-2 group-hover:bg-blue-500 transition-colors">
                                    Probar Demo <ArrowRight size={18} />
                                </div>
                            </div>

                            {/* GYM CARD */}
                            <div className="group relative bg-slate-800 hover:bg-slate-700 p-8 rounded-2xl border border-slate-600 hover:border-orange-500 transition-all cursor-pointer w-full max-w-sm" onClick={() => setViewMode('gym')}>
                                <div className="absolute top-0 right-0 p-4 opacity-50"><Dumbbell size={64} className="text-slate-600 group-hover:text-orange-500 transition-colors" /></div>
                                <div className="p-3 bg-orange-500/20 text-orange-400 rounded-lg w-fit mb-6"><Dumbbell size={32} /></div>
                                <h3 className="text-2xl font-bold text-white mb-2">Gimnasio / Club</h3>
                                <p className="text-slate-400 mb-6 min-h-[48px]">Control de acceso QR, retención de socios con IA y App de cliente final.</p>
                                <button className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">Probar Demo <ArrowRight size={18} /></button>
                            </div>

                            {/* RESTAURANT CARD (NEW) */}
                            <div className="group relative bg-slate-800 hover:bg-slate-700 p-8 rounded-2xl border border-slate-600 hover:border-amber-500 transition-all cursor-pointer w-full max-w-sm" onClick={() => router.push('/demo-restaurant')}>
                                <div className="absolute top-0 right-0 p-4 opacity-50"><UtensilsCrossed size={64} className="text-slate-600 group-hover:text-amber-500 transition-colors" /></div>
                                <div className="p-3 bg-amber-500/20 text-amber-500 rounded-lg w-fit mb-6"><UtensilsCrossed size={32} /></div>
                                <h3 className="text-2xl font-bold text-white mb-2">Restaurante / Bar</h3>
                                <p className="text-slate-400 mb-6 min-h-[48px]">Menú digital QR, Comanda Móvil y KDS para cocina en tiempo real.</p>
                                <button className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">Probar Demo <ArrowRight size={18} /></button>
                            </div>
                        </motion.div>
                    )}

                    {viewMode === 'kiosk' && (
                        <motion.div key="kiosk" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="h-full w-full">
                            <KioskApp onBack={() => setViewMode('menu')} />
                        </motion.div>
                    )}

                    {viewMode === 'wholesale' && (
                        <motion.div key="wholesale" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="h-full w-full">
                            <DistributorOrdersDemo onBack={() => setViewMode('menu')} />
                        </motion.div>
                    )}

                    {viewMode === 'gym' && (
                        <motion.div key="gym" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="h-full w-full">
                            <GymDemo onBack={() => setViewMode('menu')} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default InteractiveShowcase;
