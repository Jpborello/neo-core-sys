import React, { useState, useEffect, useRef } from 'react';
import {
    Dumbbell, Users, TrendingUp, AlertTriangle, QrCode, Smartphone,
    CheckCircle, XCircle, Send, Calendar, ArrowLeft, ArrowRight, Activity, Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ msg, type }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`fixed bottom-8 right-8 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 ${type === 'error' ? 'bg-red-500 text-white' : 'bg-slate-900 text-white'}`}
    >
        {type === 'success' ? <CheckCircle size={24} className="text-orange-400" /> : <AlertTriangle size={24} />}
        <span className="font-medium">{msg}</span>
    </motion.div>
);

const GymDemo = ({ onBack }) => {
    // --- MOCK DATA ---
    const MEMBERS = [
        { id: '1001', name: 'Juan Pérez', status: 'active', plan: 'Pase Libre', lastAccess: '2023-10-25', debt: false, photo: 'https://i.pravatar.cc/150?u=1001' },
        { id: '1002', name: 'María Gonzalez', status: 'debt', plan: '3 Días', lastAccess: '2023-10-20', debt: true, photo: 'https://i.pravatar.cc/150?u=1002' },
        { id: '1003', name: 'Carlos Ruiz', status: 'risk', plan: 'Pase Libre', lastAccess: '2023-09-15', debt: false, photo: 'https://i.pravatar.cc/150?u=1003' },
        { id: '1004', name: 'Ana Lopez', status: 'active', plan: 'Matutino', lastAccess: '2023-10-26', debt: false, photo: 'https://i.pravatar.cc/150?u=1004' },
        { id: '1005', name: 'Pedro Silva', status: 'risk', plan: 'Pase Libre', lastAccess: '2023-09-10', debt: false, photo: 'https://i.pravatar.cc/150?u=1005' },
    ];

    const HOURLY_DATA = [
        { hour: 7, count: 15 }, { hour: 8, count: 35 }, { hour: 9, count: 45 }, { hour: 10, count: 30 },
        { hour: 11, count: 20 }, { hour: 12, count: 25 }, { hour: 13, count: 15 }, { hour: 14, count: 10 },
        { hour: 15, count: 15 }, { hour: 16, count: 25 }, { hour: 17, count: 55 }, { hour: 18, count: 85 },
        { hour: 19, count: 95 }, { hour: 20, count: 70 }, { hour: 21, count: 40 }, { hour: 22, count: 20 }
    ];
    const MAX_HOUR = Math.max(...HOURLY_DATA.map(d => d.count));

    // --- STATE ---
    const [view, setView] = useState('dashboard'); // 'dashboard', 'access', 'app'
    const [atRiskUsers, setAtRiskUsers] = useState(MEMBERS.filter(m => m.status === 'risk'));
    const [scannerInput, setScannerInput] = useState('');
    const [accessResult, setAccessResult] = useState(null); // { status: 'granted'|'denied', member: {} }
    const [lastAction, setLastAction] = useState(null);
    const scannerRef = useRef(null);

    // --- LOGIC ---
    const showToast = (msg, type = 'success') => { setLastAction({ msg, type }); setTimeout(() => setLastAction(null), 3000); };

    const handleSendPromo = (id) => {
        setAtRiskUsers(prev => prev.filter(u => u.id !== id));
        showToast("Promo enviada por WhatsApp 🎁", "success");
    };

    const handleScan = (e) => {
        e.preventDefault();
        const member = MEMBERS.find(m => m.id === scannerInput || m.name.toLowerCase().includes(scannerInput.toLowerCase()));

        if (!member) {
            setAccessResult({ status: 'error', msg: 'Usuario no encontrado' });
        } else if (member.debt) {
            setAccessResult({ status: 'denied', member, msg: 'Cuota Vencida: Septiembre' });
        } else {
            setAccessResult({ status: 'granted', member, msg: 'Acceso Permitido' });
        }
        setScannerInput('');

        // Reset result after 3 seconds
        setTimeout(() => setAccessResult(null), 4000);
    };

    useEffect(() => {
        if (view === 'access' && scannerRef.current) scannerRef.current.focus();
    }, [view, accessResult]);

    // --- RENDER HELPERS ---
    return (
        <div className="h-full flex flex-col bg-slate-900 text-slate-100 rounded-xl overflow-hidden shadow-2xl border border-slate-700 font-sans">
            {/* HEADER */}
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"><ArrowLeft size={20} /></button>
                    <div className="flex flex-col">
                        <h2 className="font-bold text-white flex items-center gap-2 tracking-tight">
                            <Dumbbell size={20} className="text-orange-500" /> GymForce <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full uppercase tracking-wider">SaaS</span>
                        </h2>
                    </div>
                </div>
                <div className="flex bg-slate-800 p-1 rounded-lg">
                    {[
                        { id: 'dashboard', icon: <Activity size={14} />, label: 'Admin & IA' },
                        { id: 'access', icon: <QrCode size={14} />, label: 'Terminal QR' },
                        { id: 'app', icon: <Smartphone size={14} />, label: 'App Socio' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setView(tab.id)}
                            className={`px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-2 ${view === tab.id ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-slate-400 hover:text-white'}`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* CONTENT AREA */}
            <div className="flex-1 overflow-auto bg-slate-900 relative">

                {/* 1. DASHBOARD VIEW */}
                {view === 'dashboard' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 space-y-6">
                        {/* KPI CARDS */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700">
                                <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2">Socios Activos</div>
                                <div className="flex items-end justify-between">
                                    <div className="text-3xl font-bold text-white">842</div>
                                    <div className="text-emerald-400 text-sm font-bold flex items-center bg-emerald-400/10 px-2 py-1 rounded">+12% este mes</div>
                                </div>
                            </div>
                            <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700">
                                <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2">Ingresos (Oct)</div>
                                <div className="flex items-end justify-between">
                                    <div className="text-3xl font-bold text-white">$4.2M</div>
                                    <div className="text-orange-400 text-sm font-bold flex items-center bg-orange-400/10 px-2 py-1 rounded">Objetivo 92%</div>
                                </div>
                            </div>
                            <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700">
                                <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2">Tasa de Churn</div>
                                <div className="flex items-end justify-between">
                                    <div className="text-3xl font-bold text-white">3.2%</div>
                                    <div className="text-red-400 text-sm font-bold flex items-center bg-red-400/10 px-2 py-1 rounded flex gap-1"><AlertTriangle size={12} /> Alerta</div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* HOT HOURS CHART */}
                            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                                <h3 className="font-bold text-white mb-6 flex items-center gap-2"><Activity className="text-orange-500" /> Horarios Calientes (Afluencia)</h3>
                                <div className="h-48 flex items-end gap-1">
                                    {HOURLY_DATA.map((d, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                                            <div
                                                className="w-full bg-slate-700 group-hover:bg-orange-500 transition-colors rounded-t-sm relative"
                                                style={{ height: `${(d.count / MAX_HOUR) * 100}%` }}
                                            >
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-10">{d.count}</div>
                                            </div>
                                            <span className="text-[10px] text-slate-500 font-mono">{d.hour}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* AI RETENTION PANEL */}
                            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 flex flex-col">
                                <h3 className="font-bold text-white mb-2 flex items-center gap-2"><TrendingUp className="text-red-500" /> IA Retention <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded font-bold">BETA</span></h3>
                                <p className="text-sm text-slate-400 mb-4">La IA detectó {atRiskUsers.length} usuarios con alta probabilidad de abandono.</p>

                                <div className="flex-1 overflow-auto space-y-3 pr-2">
                                    {atRiskUsers.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
                                            <CheckCircle size={48} className="mb-2" />
                                            <p>¡Todo bajo control!</p>
                                        </div>
                                    ) : (
                                        atRiskUsers.map(u => (
                                            <div key={u.id} className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 group hover:border-red-500/30 transition-colors">
                                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                                    <img src={u.photo} alt={u.name} className="w-10 h-10 rounded-full border border-slate-700 shrink-0" />
                                                    <div className="min-w-0">
                                                        <div className="font-bold text-sm text-white truncate">{u.name}</div>
                                                        <div className="text-xs text-red-400">Ausente 20+ días</div>
                                                    </div>
                                                </div>
                                                <button onClick={() => handleSendPromo(u.id)} className="w-full sm:w-auto bg-white text-slate-900 hover:bg-orange-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-lg">
                                                    <Send size={12} /> Rescatar
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 2. ACCESS TERMINAL VIEW */}
                {view === 'access' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex flex-col">
                        {/* TERMINAL SCREEN */}
                        {!accessResult ? (
                            <div className="flex-1 flex flex-col items-center justify-center bg-slate-950 relative overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800/30 via-slate-950 to-slate-950"></div>
                                <div className="z-10 text-center space-y-8">
                                    <div className="w-32 h-32 rounded-3xl border-4 border-slate-700 flex items-center justify-center mx-auto bg-slate-900 animate-pulse-slow shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                                        <QrCode size={64} className="text-slate-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Acerque su QR</h2>
                                        <p className="text-slate-500 text-lg">o ingrese su DNI manualmente</p>
                                    </div>
                                    <form onSubmit={handleScan} className="max-w-xs mx-auto relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                        <input
                                            ref={scannerRef}
                                            value={scannerInput}
                                            onChange={(e) => setScannerInput(e.target.value)}
                                            placeholder="Escanear..."
                                            className="w-full bg-slate-900 border border-slate-700 text-white pl-12 pr-4 py-4 rounded-full text-lg outline-none focus:border-orange-500 transition-colors shadow-xl"
                                            autoFocus
                                        />
                                    </form>
                                    <div className="text-xs text-slate-600 font-mono mt-8">TERMINAL ID: T-04 • v2.1.0</div>
                                </div>
                            </div>
                        ) : (
                            <div className={`flex-1 flex flex-col items-center justify-center relative overflow-hidden ${accessResult.status === 'granted' ? 'bg-emerald-600' : 'bg-red-600'}`}>
                                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 text-center text-white">
                                    {accessResult.status === 'granted' ? (
                                        <>
                                            <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                                                <CheckCircle size={80} className="text-emerald-600" />
                                            </div>
                                            <h2 className="text-5xl font-bold mb-2">¡Bienvenido!</h2>
                                            <h3 className="text-2xl opacity-90 mb-8">{accessResult.member.name}</h3>
                                            <div className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full inline-block font-bold">
                                                TIEMPO RESTANTE: {Math.floor(Math.random() * 20) + 10} DÍAS
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                                                <XCircle size={80} className="text-red-600" />
                                            </div>
                                            <h2 className="text-5xl font-bold mb-2">ACCESO DENEGADO</h2>
                                            <p className="text-2xl opacity-90 max-w-md mx-auto">{accessResult.msg}</p>
                                            <div className="mt-8 bg-black/20 px-6 py-3 rounded-xl inline-block text-sm">
                                                Por favor diríjase a recepción
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* 3. CLIENT APP VIEW */}
                {view === 'app' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex items-center justify-center p-4 bg-slate-950">
                        {/* PHONE MOCKUP */}
                        <div className="w-[320px] h-[600px] bg-black rounded-[40px] border-[8px] border-slate-800 shadow-2xl overflow-hidden relative flex flex-col">
                            {/* STATUS BAR */}
                            <div className="h-6 bg-black text-white text-[10px] flex justify-between px-6 items-center select-none font-bold">
                                <span>14:23</span>
                                <div className="flex gap-1"><span>5G</span><span>100%</span></div>
                            </div>

                            {/* APP CONTENT */}
                            <div className="flex-1 bg-slate-900 text-white flex flex-col relative">
                                <div className="absolute top-0 right-0 p-4"><div className="w-2 h-2 bg-red-500 rounded-full"></div></div>

                                <div className="p-6 pt-10 flex flex-col items-center">
                                    <div className="relative mb-4">
                                        <img src="https://i.pravatar.cc/150?u=1001" className="w-24 h-24 rounded-full border-4 border-orange-500 shadow-lg shadow-orange-500/20" alt="Profile" />
                                        <div className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1 rounded-full border-2 border-slate-900"><CheckCircle size={14} /></div>
                                    </div>
                                    <h2 className="text-2xl font-bold">Juan Pérez</h2>
                                    <p className="text-slate-400 text-sm mb-6">Plan Pase Libre • Vence en 12 días</p>

                                    <div className="bg-white p-6 rounded-3xl shadow-xl w-full flex flex-col items-center mb-8">
                                        <QrCode size={120} className="text-slate-900 mb-2" />
                                        <p className="text-xs text-slate-400 font-mono tracking-widest">A-8492-X</p>
                                    </div>

                                    <div className="w-full space-y-3">
                                        <button className="w-full bg-slate-800 hover:bg-slate-700 py-4 rounded-2xl flex items-center justify-between px-6 transition-colors group">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-orange-500/20 p-2 rounded-lg text-orange-500"><Calendar size={20} /></div>
                                                <span className="font-bold text-sm">Reservar Clase</span>
                                            </div>
                                            <ArrowRight size={16} className="text-slate-500 group-hover:text-white" />
                                        </button>
                                        <button className="w-full bg-slate-800 hover:bg-slate-700 py-4 rounded-2xl flex items-center justify-between px-6 transition-colors group">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-500"><Activity size={20} /></div>
                                                <span className="font-bold text-sm">Mi Progreso</span>
                                            </div>
                                            <ArrowRight size={16} className="text-slate-500 group-hover:text-white" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* BOTTOM NAV */}
                            <div className="h-16 bg-slate-950 flex justify-around items-center text-slate-500 border-t border-slate-900 border-opacity-50">
                                <div className="text-orange-500"><Dumbbell size={24} /></div>
                                <div><Calendar size={24} /></div>
                                <div><Users size={24} /></div>
                            </div>

                            {/* HOME INDICATOR */}
                            <div className="h-1 w-1/3 bg-slate-800 rounded-full mx-auto mb-2"></div>
                        </div>
                    </motion.div>
                )}
            </div>

            <AnimatePresence>{lastAction && <Toast msg={lastAction.msg} type={lastAction.type} />}</AnimatePresence>
        </div>
    );
};

export default GymDemo;