import React, { useState, useMemo } from 'react';
import { useTurnos, ACTIONS } from '../../context/TurnosContext';
import { useAvailability } from '../../hooks/useAvailability';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CreditCard, Wallet, Smartphone, ShieldCheck, CheckCircle2 } from 'lucide-react';

// --- COMPONENTS FOR STEPS ---

const StepSpecialization = ({ onSelect }) => {
    const { state } = useTurnos();

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-neutral-900 mb-2">¿Qué estás buscando?</h2>
            <div className="grid grid-cols-2 gap-4">
                {state.specializations.map(spec => (
                    <button
                        key={spec.id}
                        onClick={() => onSelect(spec)}
                        className="flex flex-col items-center justify-center p-6 bg-white border border-neutral-200 rounded-2xl hover:border-indigo-500 hover:shadow-lg transition-all group gap-3 text-center h-32"
                    >
                        <span className="text-4xl group-hover:scale-110 transition-transform">{spec.icon}</span>
                        <span className="font-bold text-neutral-800 group-hover:text-indigo-600">{spec.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

const StepService = ({ specialization, onSelect, onBack }) => {
    const { state } = useTurnos();
    const services = state.services.filter(s => s.specializationId === specialization.id);

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <button onClick={onBack} className="text-sm text-neutral-400 hover:text-neutral-800 font-medium">← Volver</button>
            </div>
            <h2 className="text-xl font-bold mb-6">Servicios de {specialization.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map(srv => (
                    <button
                        key={srv.id}
                        onClick={() => onSelect(srv)}
                        className="flex flex-col text-left p-5 border border-neutral-200 rounded-xl hover:border-indigo-500 hover:shadow-md transition-all bg-white group relative overflow-hidden h-full"
                    >
                        <div className="flex justify-between items-start w-full mb-2 z-10">
                            <h3 className="text-lg font-bold text-neutral-800 group-hover:text-indigo-600 transition-colors">{srv.name}</h3>
                            <span className="font-bold text-indigo-900 bg-indigo-50 px-3 py-1 rounded-lg">${srv.price.toLocaleString()}</span>
                        </div>
                        <p className="text-neutral-500 text-sm mb-3 z-10">{srv.duration} min</p>

                        {srv.requiresDeposit && (
                            <div className="mt-auto pt-3 border-t border-neutral-100 w-full z-10">
                                <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded">
                                    Requiere seña del {srv.depositPercent}%
                                </span>
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

const StepPro = ({ service, onSelect, onBack }) => {
    const { state } = useTurnos();
    // Filter pros that perform this service and have the specialization
    // Simplified logic: Check if pro services list includes the service ID
    const availablePros = state.professionals.filter(p => p.services.includes(service.id));

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
                <button onClick={onBack} className="text-sm text-neutral-400 hover:text-neutral-800">← Volver</button>
                <h2 className="text-xl font-semibold">¿Con quién te querés atender?</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                    onClick={() => onSelect('any')}
                    className="flex items-center p-4 border border-dashed border-neutral-300 rounded-xl hover:bg-neutral-50 transition-all text-neutral-500 hover:text-indigo-600"
                >
                    <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mr-4 font-bold text-xl">?</div>
                    <span className="font-medium">Cualquier profesional disponible</span>
                </button>
                {availablePros.map(pro => (
                    <button
                        key={pro.id}
                        onClick={() => onSelect(pro)}
                        className="flex items-center p-4 border border-neutral-200 rounded-xl hover:border-indigo-500 hover:shadow-md transition-all bg-white"
                    >
                        <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg mr-4 border-2 border-white shadow-sm">
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
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                {nextDays.map(d => {
                    const isSelected = d.toDateString() === selectedDate.toDateString();
                    return (
                        <button
                            key={d.toISOString()}
                            onClick={() => { setSelectedDate(d); setSelectedSlot(null); }}
                            className={`flex flex-col items-center justify-center min-w-[70px] p-3 rounded-xl border transition-all ${isSelected
                                ? 'bg-indigo-600 border-indigo-600 text-white shadow-md scale-105'
                                : 'bg-white border-neutral-200 text-neutral-600 hover:border-indigo-300'
                                }`}
                        >
                            <span className="text-xs uppercase font-medium mb-1">{format(d, 'EEE', { locale: es })}</span>
                            <span className="text-xl font-bold">{format(d, 'd')}</span>
                        </button>
                    )
                })}
            </div>

            {/* Slots Grid */}
            <div className="min-h-[200px]">
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

const StepUserData = ({ data, onSubmit, onBack }) => {
    const [formData, setFormData] = useState(data || { name: '', phone: '' });

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
                        Siguiente →
                    </button>
                </div>
            </form>
        </div>
    );
};

const StepPayment = ({ service, onBack, onConfirm }) => {
    const [isProcessing, setIsProcessing] = useState(false);

    // Calculate Deposit
    const depositAmount = service.requiresDeposit
        ? Math.round(service.price * (service.depositPercent / 100))
        : 0;

    const handlePayment = () => {
        setIsProcessing(true);
        // Simulate Mercado Pago Delay
        setTimeout(() => {
            setIsProcessing(false);
            onConfirm();
        }, 2000);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
                <button onClick={onBack} className="text-sm text-neutral-400 hover:text-neutral-800">← Volver</button>
                <h2 className="text-xl font-semibold">Confirmación y Pago</h2>
            </div>

            {/* Summary Card */}
            <div className="bg-neutral-50 p-6 rounded-2xl space-y-3 border border-neutral-100">
                <div className="flex justify-between items-center text-sm font-medium text-neutral-600">
                    <span>Servicio</span>
                    <span className="text-neutral-900">{service.name}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium text-neutral-600">
                    <span>Precio Total</span>
                    <span className="text-neutral-900">${service.price.toLocaleString()}</span>
                </div>
                {service.requiresDeposit && (
                    <div className="border-t border-neutral-200 pt-3 flex justify-between items-center text-lg font-bold text-indigo-700">
                        <span>Seña a Pagar ({service.depositPercent}%)</span>
                        <span>${depositAmount.toLocaleString()}</span>
                    </div>
                )}
            </div>

            {/* Policy Alert */}
            <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex items-start gap-3">
                <span className="text-xl">⚠️</span>
                <div>
                    <h4 className="text-sm font-bold text-amber-900 mb-1">Política de Cancelación</h4>
                    <p className="text-xs text-amber-800 leading-relaxed">
                        Podés cancelar o reprogramar sin cargo hasta <strong>24 horas antes</strong> del turno.
                        Pasado ese plazo, {service.requiresDeposit ? 'la seña NO es reembolsable' : 'se cobrará el turno completo'}.
                    </p>
                </div>
            </div>

            {service.requiresDeposit ? (
                <div className="space-y-4">
                    <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm flex gap-3 items-start">
                        <ShieldCheck className="shrink-0 mt-0.5" size={18} />
                        <p>La seña reserva tu lugar. El resto (${(service.price - depositAmount).toLocaleString()}) lo pagás en el local.</p>
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className="w-full bg-[#009EE3] hover:bg-[#008ED6] text-white py-4 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-3"
                    >
                        {isProcessing ? (
                            <span>Procesando pago...</span>
                        ) : (
                            <>
                                <CreditCard size={20} />
                                Pagar ${depositAmount.toLocaleString()} con Mercado Pago
                            </>
                        )}
                    </button>
                    <div className="flex justify-center gap-4 text-neutral-400">
                        <CreditCard size={24} />
                        <Wallet size={24} />
                        <Smartphone size={24} />
                    </div>
                    <p className="text-center text-xs text-neutral-400">Pagos procesados de forma segura por Mercado Pago</p>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="bg-green-50 text-green-800 p-4 rounded-xl text-sm flex gap-3 items-start">
                        <CheckCircle2 className="shrink-0 mt-0.5" size={18} />
                        <p>Este servicio no requiere seña. Abonás el total en el local.</p>
                    </div>
                    <button
                        onClick={onConfirm}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold transition-all shadow-lg"
                    >
                        Confirmar Reserva
                    </button>
                </div>
            )}
        </div>
    );
};

// --- MAIN WIZARD COMPONENT ---

const ClientBooking = () => {
    const { dispatch } = useTurnos();
    const [step, setStep] = useState(1);

    // Flattened steps for logic:
    // 1: Spec, 2: Service, 3: Pro, 4: DateTime, 5: ClientData, 6: Payment, 7: Confirm

    const [bookingData, setBookingData] = useState({
        specialization: null, // New
        service: null,
        pro: null,
        date: null,
        slot: null,
        client: null // { name, phone }
    });
    const [isConfirmed, setIsConfirmed] = useState(false);

    // Handlers
    const handleSpecSelect = (spec) => {
        setBookingData(prev => ({ ...prev, specialization: spec }));
        setStep(2);
    };

    const handleServiceSelect = (srv) => {
        setBookingData(prev => ({ ...prev, service: srv }));
        setStep(3);
    };

    const handleProSelect = (pro) => {
        setBookingData(prev => ({ ...prev, pro: pro }));
        setStep(4);
    };

    const handleSlotSelect = (date, slot, finalProId) => {
        setBookingData(prev => ({ ...prev, date, slot, finalProId }));
        setStep(5);
    };

    const handleDataSubmit = (clientData) => {
        setBookingData(prev => ({ ...prev, client: clientData }));
        setStep(6); // Go to Payment
    };

    const handleFinalConfirm = () => {
        // Creates the appointment
        dispatch({
            type: ACTIONS.ADD_APPOINTMENT,
            payload: {
                paymentStatus: bookingData.service.requiresDeposit ? 'deposit_paid' : 'pending',
                clientId: `cli_new_${Date.now()}`,
                clientData: bookingData.client,
                proId: bookingData.finalProId,
                serviceId: bookingData.service.id,
                start: bookingData.slot.startIso,
                end: bookingData.slot.endIso,
            }
        });
        setIsConfirmed(true);
    };

    if (isConfirmed) {
        return (
            <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-2xl text-center border-t-4 border-green-500 mt-10">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
                    ✓
                </div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-2">¡Turno Confirmado!</h2>
                <p className="text-neutral-500 mb-8">
                    Te esperamos el <strong>{format(new Date(bookingData.slot.startIso), "EEEE d 'de' MMMM", { locale: es })}</strong> a las <strong>{bookingData.slot.time}hs</strong>.
                </p>

                <div className="bg-neutral-50 p-6 rounded-2xl text-left text-sm text-neutral-600 mb-8 space-y-3 border border-neutral-100">
                    <p className="flex justify-between">
                        <span className="font-bold">Servicio:</span>
                        <span>{bookingData.service.name}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-bold">Profesional:</span>
                        <span>{bookingData.pro === 'any' ? 'Asignado Auto' : bookingData.pro.name}</span>
                    </p>
                    <p className="flex justify-between border-t border-neutral-200 pt-2 mt-2">
                        <span className="font-bold">Total:</span>
                        <span>${bookingData.service.price.toLocaleString()}</span>
                    </p>
                    {bookingData.service.requiresDeposit && (
                        <p className="flex justify-between text-green-600 font-bold">
                            <span>Seña Pagada:</span>
                            <span>${Math.round(bookingData.service.price * (bookingData.service.depositPercent / 100)).toLocaleString()}</span>
                        </p>
                    )}
                </div>

                <a
                    href={`https://wa.me/5491112345678?text=Hola, tengo un turno confirmado para el ${format(new Date(bookingData.slot.startIso), "dd/MM")}`}
                    target="_blank"
                    className="block w-full py-4 px-4 bg-[#25D366] text-white rounded-xl font-bold hover:brightness-95 transition-all mb-3 shadow-lg shadow-green-200"
                >
                    Contactar por WhatsApp
                </a>

                <button
                    onClick={() => { setIsConfirmed(false); setStep(1); setBookingData({}); }}
                    className="w-full py-4 px-4 bg-transparent text-neutral-400 hover:text-neutral-600 rounded-xl font-medium transition-colors"
                >
                    Reservar otro turno
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="flex items-center gap-2 mb-8 px-2">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className={`h-1.5 rounded-full flex-1 transition-all duration-500 ${i <= step ? 'bg-indigo-600' : 'bg-neutral-200'}`} />
                ))}
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-neutral-100 min-h-[500px] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                {step === 1 && <StepSpecialization onSelect={handleSpecSelect} />}
                {step === 2 && <StepService specialization={bookingData.specialization} onSelect={handleServiceSelect} onBack={() => setStep(1)} />}
                {step === 3 && <StepPro service={bookingData.service} onSelect={handleProSelect} onBack={() => setStep(2)} />}
                {step === 4 && <StepDateTime service={bookingData.service} pro={bookingData.pro} onBack={() => setStep(3)} onConfirm={handleSlotSelect} />}
                {step === 5 && <StepUserData data={bookingData.client} onSubmit={handleDataSubmit} onBack={() => setStep(4)} />}
                {step === 6 && <StepPayment service={bookingData.service} onBack={() => setStep(5)} onConfirm={handleFinalConfirm} />}
            </div>
            <p className="text-center text-xs text-neutral-300 mt-6">Powered by NeoTurnos v2.1</p>
        </div>
    );
};

export default ClientBooking;
