import React, { useState, useMemo } from 'react';
import { useTurnos, ACTIONS } from '../../context/TurnosContext';
import { useAvailability } from '../../hooks/useAvailability';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
// Note: Assuming framer-motion is available. If not, I'll remove it. 
// neo-core-sys usually has it. If not, standard conditional rendering works.

const StepService = ({ onSelect }) => {
    const { state } = useTurnos();
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-6">Seleccioná un Servicio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {state.services.map(srv => (
                    <button
                        key={srv.id}
                        onClick={() => onSelect(srv)}
                        className="flex flex-col text-left p-6 border border-neutral-200 rounded-xl hover:border-indigo-500 hover:shadow-md transition-all bg-white group"
                    >
                        <div className="flex justify-between items-start w-full mb-2">
                            <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{srv.category}</span>
                            <span className="font-bold text-neutral-900">${srv.price}</span>
                        </div>
                        <h3 className="text-lg font-bold text-neutral-800 group-hover:text-indigo-600 transition-colors">{srv.name}</h3>
                        <p className="text-neutral-500 text-sm mt-1">{srv.duration} min • Con buffer de {srv.buffer_after} min</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

const StepPro = ({ service, onSelect, onBack }) => {
    const { state } = useTurnos();
    // Filter pros that perform this service
    const availablePros = state.professionals.filter(p => p.services.includes(service.id));

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
                <button onClick={onBack} className="text-sm text-neutral-400 hover:text-neutral-800">← Volver</button>
                <h2 className="text-xl font-semibold">¿Con quién te querés atender?</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                    onClick={() => onSelect('any')}
                    className="flex items-center p-4 border border-dashed border-neutral-300 rounded-xl hover:bg-neutral-50 transition-all text-neutral-500 hover:text-indigo-600"
                >
                    <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mr-4">?</div>
                    <span className="font-medium">Cualquier profesional disponible</span>
                </button>
                {availablePros.map(pro => (
                    <button
                        key={pro.id}
                        onClick={() => onSelect(pro)}
                        className="flex items-center p-4 border border-neutral-200 rounded-xl hover:border-indigo-500 hover:shadow-md transition-all bg-white"
                    >
                        <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg mr-4">
                            {pro.name.charAt(0)}
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-neutral-800">{pro.name}</h3>
                            <p className="text-xs text-neutral-500">{pro.role}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

const StepDateTime = ({ service, pro, onBack, onConfirm }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const { getSlotsForDate } = useAvailability();

    // Generate next 7 days
    const nextDays = useMemo(() => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() + i);
            days.push(d);
        }
        return days;
    }, []);

    // Get slots
    // If 'pro' is 'any', we should ideally aggregate slots from all pros. 
    // For MVP, if 'any', let's just pick the first available pro or force selection.
    // Let's assume user picked a specific pro for simplicity in this step, or handle 'any' later.
    const activeProId = pro === 'any' ? 'pro_1' : pro.id; // Fallback for demo
    const activeProName = pro === 'any' ? 'Cualquier Profesional' : pro.name;

    const slots = useMemo(() => {
        return getSlotsForDate(selectedDate, activeProId, service.id);
    }, [selectedDate, activeProId, service.id, getSlotsForDate]);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
                <button onClick={onBack} className="text-sm text-neutral-400 hover:text-neutral-800">← Volver</button>
                <h2 className="text-xl font-semibold">Elegí el horario</h2>
            </div>

            <p className="text-sm text-neutral-500 -mt-4 mb-4">
                Turno de <strong>{service.name}</strong> con <strong>{activeProName}</strong>
            </p>

            {/* Date Strip */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {nextDays.map(d => {
                    const isSelected = d.toDateString() === selectedDate.toDateString();
                    return (
                        <button
                            key={d.toISOString()}
                            onClick={() => { setSelectedDate(d); setSelectedSlot(null); }}
                            className={`flex flex-col items-center justify-center min-w-[70px] p-2 rounded-xl border transition-all ${isSelected
                                ? 'bg-indigo-600 border-indigo-600 text-white shadow-md scale-105'
                                : 'bg-white border-neutral-200 text-neutral-600 hover:border-indigo-300'
                                }`}
                        >
                            <span className="text-xs uppercase font-medium">{format(d, 'EEE', { locale: es })}</span>
                            <span className="text-xl font-bold">{format(d, 'd')}</span>
                        </button>
                    )
                })}
            </div>

            {/* Slots Grid */}
            <div className="mt-6">
                <h3 className="text-sm font-medium text-neutral-400 mb-3 uppercase tracking-wider">Horarios Disponibles</h3>
                {slots.length === 0 ? (
                    <div className="p-8 text-center bg-neutral-50 rounded-xl border border-dashed border-neutral-200 text-neutral-500">
                        No hay turnos disponibles para esta fecha.
                    </div>
                ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                        {slots.map(slot => (
                            <button
                                key={slot.startIso}
                                onClick={() => setSelectedSlot(slot)}
                                className={`py-2 px-1 rounded-lg text-sm font-medium border transition-all ${selectedSlot?.startIso === slot.startIso
                                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-indigo-400'
                                    }`}
                            >
                                {slot.time}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer Action */}
            <div className="border-t border-neutral-100 pt-4 flex justify-end">
                <button
                    disabled={!selectedSlot}
                    onClick={() => onConfirm(selectedDate, selectedSlot, activeProId)}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${selectedSlot
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg'
                        : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                        }`}
                >
                    Continuar →
                </button>
            </div>
        </div>
    );
};

// ... imports remain the same

const StepUserData = ({ onSubmit, onBack }) => {
    const [formData, setFormData] = useState({ name: '', phone: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.phone) {
            onSubmit(formData);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
                <button onClick={onBack} type="button" className="text-sm text-neutral-400 hover:text-neutral-800">← Volver</button>
                <h2 className="text-xl font-semibold">Tus Datos</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Nombre Completo</label>
                    <input
                        type="text"
                        required
                        className="w-full p-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Ej: Juan Perez"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">WhatsApp / Teléfono</label>
                    <input
                        type="tel"
                        required
                        className="w-full p-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Ej: 341 555 0000"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <p className="text-xs text-neutral-400 mt-1">Te enviaremos la confirmación a este número.</p>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg"
                    >
                        Confirmar Reserva
                    </button>
                </div>
            </form>
        </div>
    );
};

const ClientBooking = () => {
    const { dispatch } = useTurnos();
    const [step, setStep] = useState(1);
    const [bookingData, setBookingData] = useState({
        service: null,
        pro: null,
        date: null,
        slot: null,
        client: null // New field
    });
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleServiceSelect = (srv) => {
        setBookingData(prev => ({ ...prev, service: srv }));
        setStep(2);
    };

    const handleProSelect = (pro) => {
        setBookingData(prev => ({ ...prev, pro: pro }));
        setStep(3);
    };

    const handleSlotSelect = (date, slot, finalProId) => {
        // Move to Data Step instead of confirming
        setBookingData(prev => ({ ...prev, date, slot, finalProId }));
        setStep(4);
    };

    const handleUserDataSubmit = (clientData) => {
        const finalData = { ...bookingData, client: clientData };
        setBookingData(finalData);

        // Submit to Context
        dispatch({
            type: ACTIONS.ADD_APPOINTMENT,
            payload: {
                // Mock Client ID generation or usage
                clientId: `cli_new_${Date.now()}`,
                clientData: clientData, // Store pure data for display
                proId: finalData.finalProId,
                serviceId: finalData.service.id,
                start: finalData.slot.startIso,
                end: finalData.slot.endIso,
            }
        });
        setIsConfirmed(true);
    };

    if (isConfirmed) {
        return (
            <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl text-center border-t-4 border-green-500">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                    ✓
                </div>
                <h2 className="text-2xl font-bold text-neutral-800 mb-2">¡Turno Confirmado!</h2>
                <p className="text-neutral-600 mb-6">
                    Te esperamos el <strong>{format(new Date(bookingData.slot.startIso), "EEEE d 'de' MMMM", { locale: es })}</strong> a las <strong>{bookingData.slot.time}hs</strong>.
                </p>
                <div className="bg-neutral-50 p-4 rounded-xl text-left text-sm text-neutral-500 mb-6 space-y-2">
                    <p><strong>Servicio:</strong> {bookingData.service.name}</p>
                    <p><strong>Profesional:</strong> {bookingData.pro === 'any' ? 'Asignado Automáticamente' : bookingData.pro.name}</p>
                    <p><strong>A nombre de:</strong> {bookingData.client.name}</p>
                </div>
                <button
                    onClick={() => { setIsConfirmed(false); setStep(1); setBookingData({}); }}
                    className="w-full py-3 px-4 bg-neutral-900 text-white rounded-xl font-medium hover:bg-neutral-800 transition-colors"
                >
                    Reservar otro turno
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`h-1.5 rounded-full flex-1 transition-all ${i <= step ? 'bg-indigo-600' : 'bg-neutral-200'}`} />
                ))}
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-neutral-100 min-h-[400px]">
                {step === 1 && <StepService onSelect={handleServiceSelect} />}
                {step === 2 && <StepPro service={bookingData.service} onSelect={handleProSelect} onBack={() => setStep(1)} />}
                {step === 3 && <StepDateTime service={bookingData.service} pro={bookingData.pro} onBack={() => setStep(2)} onConfirm={handleSlotSelect} />}
                {step === 4 && <StepUserData onSubmit={handleUserDataSubmit} onBack={() => setStep(3)} />}
            </div>
        </div>
    );
};

export default ClientBooking;
