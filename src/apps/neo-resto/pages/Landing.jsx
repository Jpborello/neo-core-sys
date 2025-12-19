import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/client';
import { UtensilsCrossed, ArrowRight, CalendarDays, Clock, Users, X, CheckCircle, Bell } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

const Landing = () => {
    const navigate = useNavigate();
    const { setTable, loginUser, tableNumber } = useRestaurant();
    const [name, setName] = useState('');
    const [tableInput, setTableInput] = useState(tableNumber || '');
    const [showStaffMenu, setShowStaffMenu] = useState(false);

    // Reservation State
    const [showReservation, setShowReservation] = useState(false);
    const [reservationId, setReservationId] = useState(null);
    const [resName, setResName] = useState('');
    const [resPax, setResPax] = useState(2);
    const [resDate, setResDate] = useState(''); // Empty = Now
    const [resPhone, setResPhone] = useState('');
    const [resStatus, setResStatus] = useState(null); // 'success', 'waitlist', 'error', 'success_future'
    const [showNotification, setShowNotification] = useState(false);
    const [assignedTable, setAssignedTable] = useState(null);
    const [resType, setResType] = useState('now'); // 'now', 'future'

    const audioRef = useRef(null);

    // Listen for Notification Update
    useEffect(() => {
        if (!reservationId) return;

        const channel = supabase
            .channel(`res-${reservationId}`)
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'reservations',
                filter: `id=eq.${reservationId}`
            }, (payload) => {
                if (payload.new.notification_status === 'notified') {
                    setAssignedTable(payload.new.assigned_table_number);
                    setShowNotification(true);
                    if (audioRef.current) {
                        audioRef.current.play().catch(console.error);
                    }
                }
            })
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, [reservationId]);


    const handleStart = async (e) => {
        e.preventDefault();
        if (!name || !tableInput) return;

        setTable(tableInput);
        loginUser({ name, phone: '555-0000' });

        // Update Table State to 'occupied'
        await supabase
            .from('table_states')
            .update({
                status: 'occupied',
                customer_name: name,
                occupied_since: new Date().toISOString(),
                needs_assistance: false,
                request_bill: false
            })
            .eq('table_number', tableInput);

        navigate('/demo-restaurant/menu');
    };

    const handleReservation = async (e) => {
        e.preventDefault();

        const payload = {
            customer_name: resName,
            party_size: resPax,
            customer_phone: resPhone,
            restaurant_id: 'd3b07384-d9a9-4152-87c9-7d8e1327f31c', // CRITICAL: Isolate data
            notes: ''
        };

        if (resType === 'now') {
            // WALK-IN WAITLIST
            payload.status = 'waiting';
            payload.reservation_time = new Date().toISOString();
            payload.notes = 'Lista de Espera (Walk-in) - Cliente en local';
        } else {
            // FUTURE BOOKING
            if (!resDate) {
                alert('Por favor selecciona una fecha y hora.');
                return;
            }
            payload.status = 'pending'; // Requires confirmation
            payload.reservation_time = new Date(resDate).toISOString();
            payload.notes = 'Reserva Web (Futura)';
        }

        const { data, error } = await supabase.from('reservations').insert([payload]).select();

        if (error) {
            console.error(error);
            setResStatus('error');
        } else {
            if (resType === 'now') {
                setResStatus('waitlist');
                if (data && data[0]) setReservationId(data[0].id); // Track ID
            } else {
                setResStatus('success_future');
            }
        }
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-neutral-900 to-neutral-900 z-0" />

            {/* Audio Element */}
            <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" preload="auto" />

            <div className="relative z-10 w-full max-w-md space-y-8 animate-fade-in-up">
                <div className="text-center">
                    <div className="inline-flex p-4 rounded-full bg-amber-500/10 text-amber-500 mb-6 border border-amber-500/20">
                        <UtensilsCrossed size={48} />
                    </div>
                    <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-500">Neo-Menu</h1>
                    <p className="text-neutral-400">La experiencia gastronómica del futuro.</p>
                </div>

                {!showReservation ? (
                    <div className="space-y-4">
                        <form onSubmit={handleStart} className="bg-neutral-800/50 backdrop-blur-sm p-8 rounded-2xl border border-neutral-700 space-y-6 shadow-xl">
                            <div>
                                <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Tu Nombre</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Ej: Juan Pérez"
                                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Número de Mesa</label>
                                <input
                                    type="number"
                                    value={tableInput}
                                    onChange={(e) => setTableInput(e.target.value)}
                                    placeholder="Ej: 5"
                                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
                            >
                                Ver Menú <ArrowRight size={20} />
                            </button>
                        </form>

                        <button
                            onClick={() => setShowReservation(true)}
                            className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold py-4 rounded-xl flex items-center justify-center gap-2 border border-neutral-700 transition-colors"
                        >
                            <CalendarDays size={20} /> Reservar / Lista de Espera
                        </button>
                    </div>
                ) : (
                    <div className="bg-neutral-800/90 backdrop-blur-md p-6 rounded-2xl border border-neutral-700 shadow-xl relative animate-in fade-in zoom-in-95">
                        <button onClick={() => { setShowReservation(false); setResStatus(null); }} className="absolute right-4 top-4 text-neutral-500 hover:text-white"><X /></button>

                        {!resStatus ? (
                            <div className="space-y-6">
                                {/* TABS */}
                                <div className="flex bg-neutral-900 p-1 rounded-xl">
                                    <button
                                        onClick={() => setResType('now')}
                                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${resType === 'now' ? 'bg-amber-500 text-black shadow' : 'text-neutral-500 hover:text-neutral-300'}`}
                                    >
                                        <Bell size={16} /> Estoy Aquí
                                    </button>
                                    <button
                                        onClick={() => setResType('future')}
                                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${resType === 'future' ? 'bg-amber-500 text-black shadow' : 'text-neutral-500 hover:text-neutral-300'}`}
                                    >
                                        <CalendarDays size={16} /> Futuro
                                    </button>
                                </div>

                                <form onSubmit={handleReservation} className="space-y-4">
                                    <div className="text-center mb-4">
                                        <h2 className="text-xl font-bold text-white">
                                            {resType === 'now' ? 'Unirse a Lista de Espera' : 'Planificar Visita'}
                                        </h2>
                                        <p className="text-xs text-neutral-400">
                                            {resType === 'now'
                                                ? 'Te avisaremos cuando se libere un lugar ahora mismo.'
                                                : 'Reserva tu mesa con anticipación.'}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Nombre Completo</label>
                                        <input required value={resName} onChange={e => setResName(e.target.value)} className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-white focus:border-amber-500 outline-none" placeholder="Tu nombre" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Personas</label>
                                            <div className="relative">
                                                <Users size={16} className="absolute left-3 top-3.5 text-neutral-500" />
                                                <input type="number" min="1" required value={resPax} onChange={e => setResPax(e.target.value)} className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 pl-10 text-white focus:border-amber-500 outline-none" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Teléfono</label>
                                            <input type="tel" required value={resPhone} onChange={e => setResPhone(e.target.value)} className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-white focus:border-amber-500 outline-none" placeholder="WhatsApp" />
                                        </div>
                                    </div>

                                    {/* Date Picker Only for Future */}
                                    {resType === 'future' && (
                                        <div className="animate-in fade-in slide-in-from-top-2">
                                            <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Fecha y Hora</label>
                                            <input
                                                type="datetime-local"
                                                required={resType === 'future'}
                                                value={resDate}
                                                onChange={e => setResDate(e.target.value)}
                                                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-sm text-white focus:border-amber-500 outline-none"
                                            />
                                        </div>
                                    )}

                                    <button type="submit" className={`w-full font-bold py-3 rounded-xl mt-4 flex items-center justify-center gap-2 ${resType === 'now' ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
                                        {resType === 'now' ? <><Bell size={18} /> Avísenme</> : <><CheckCircle size={18} /> Confirmar Reserva</>}
                                    </button>
                                </form>
                            </div>
                        ) : resStatus === 'success_future' ? (
                            <div className="text-center py-6">
                                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500">
                                    <CalendarDays size={40} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">¡Solicitud Enviada!</h3>
                                <p className="text-neutral-400 text-sm mb-6">Hemos recibido tu solicitud.</p>
                                <div className="bg-neutral-900 p-4 rounded-xl text-xs text-neutral-400 mb-6">
                                    <p>Si hay disponibilidad, te confirmaremos por WhatsApp.</p>
                                    <p className="mt-2">Si no hay lugar, te avisaremos si se libera una mesa.</p>
                                </div>
                                <button onClick={() => setShowReservation(false)} className="bg-neutral-700 hover:bg-neutral-600 px-6 py-2 rounded-lg text-sm font-bold">Volver al Inicio</button>
                            </div>
                        ) : resStatus === 'waitlist' ? (
                            <div className="text-center py-6">
                                <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-500">
                                    <Clock size={40} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Estás en Espera</h3>
                                <p className="text-neutral-400 text-sm mb-6">No cierres esta pantalla. Sonará una alarma cuando tu mesa esté lista.</p>
                                <div className="animate-pulse text-amber-500 text-xs font-bold uppercase tracking-widest">Esperando mesa...</div>
                                <button onClick={() => setShowReservation(false)} className="mt-8 text-neutral-600 hover:text-white text-xs underline">Cerrar (Me avisarán por WhatsApp)</button>
                            </div>
                        ) : (
                            <div className="text-center py-6">
                                <p className="text-red-500">Ocurrió un error. Intenta nuevamente.</p>
                                <button onClick={() => setResStatus(null)} className="mt-4 underline text-sm">Volver</button>
                            </div>
                        )}
                    </div>
                )}

                {/* Staff Access */}
                <div className="text-center">
                    <button
                        onClick={() => setShowStaffMenu(!showStaffMenu)}
                        className="text-xs text-neutral-600 hover:text-neutral-400 font-bold uppercase tracking-wider transition-colors"
                    >
                        Acceso Personal
                    </button>
                </div>

                {/* Staff Menu Modal */}
                {showStaffMenu && (
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full pt-4 animate-in slide-in-from-top-4 fade-in duration-200">
                        <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-2 grid grid-cols-4 gap-2 shadow-2xl">
                            <button onClick={() => navigate('/demo-restaurant/cocina')} className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-neutral-700 transition-colors">
                                <span className="text-2xl">👨‍🍳</span>
                                <span className="text-xs font-bold text-neutral-400">Cocina</span>
                            </button>
                            <button onClick={() => navigate('/demo-restaurant/mozo')} className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-neutral-700 transition-colors">
                                <span className="text-2xl">🤵</span>
                                <span className="text-xs font-bold text-neutral-400">Mozo</span>
                            </button>
                            <button onClick={() => navigate('/demo-restaurant/barra')} className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-neutral-700 transition-colors">
                                <span className="text-2xl">🍷</span>
                                <span className="text-xs font-bold text-neutral-400">Barra</span>
                            </button>
                            <button onClick={() => navigate('/demo-restaurant/admin')} className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-neutral-700 transition-colors">
                                <span className="text-2xl">🛠️</span>
                                <span className="text-xs font-bold text-neutral-400">Admin</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Notification Popup */}
                {showNotification && (
                    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6 animate-in fade-in zoom-in">
                        <div className="bg-neutral-900 border-2 border-emerald-500 rounded-3xl p-8 max-w-sm w-full text-center relative overflow-hidden shadow-2xl shadow-emerald-500/20">
                            <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500 animate-pulse"></div>

                            <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500 animate-bounce">
                                <CheckCircle size={48} />
                            </div>

                            <h2 className="text-3xl font-black text-white mb-2">¡TU MESA ESTÁ LISTA!</h2>
                            <p className="text-neutral-400 text-lg mb-8">Por favor acércate a la <strong>Mesa {assignedTable}</strong>.</p>

                            <button
                                onClick={() => { setShowNotification(false); setTableInput(assignedTable); }}
                                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-xl text-xl transition-transform active:scale-95"
                            >
                                ¡Voy para allá! 🚀
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};

export default Landing;
