import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/demos/turnos-mobile/components/Button";
import Input from "../../../components/demos/turnos-mobile/components/Input";
import { useLocalStorage } from "../../../components/demos/turnos-mobile/hooks/useLocalStorage";
import { useAppointments } from "../../../components/demos/turnos-mobile/hooks/useAppointments";
import { FaCheckCircle, FaClock, FaCalendarAlt } from "react-icons/fa";

const services = [
    { id: 1, name: "Kapping Gel", duration: "1h 30m", price: "$4500" },
    { id: 2, name: "Semipermanente", duration: "1h", price: "$3500" },
    { id: 3, name: "Esculpidas", duration: "2h", price: "$5500" },
    { id: 4, name: "Nail Art", duration: "30m", price: "$1500" },
];

const timeSlots = ["09:00", "10:30", "12:00", "14:30", "16:00", "17:30"];

export default function Booking() {
    const navigate = useNavigate();
    const { addAppointment } = useAppointments();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        service: null,
        date: "",
        time: "",
        name: "",
        phone: ""
    });

    const handleServiceSelect = (service) => {
        setFormData({ ...formData, service });
        setStep(2);
    };

    const handleTimeSelect = (time) => {
        setFormData({ ...formData, time });
        setStep(3);
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.phone) return;
        addAppointment({
            ...formData,
            date: formData.date || new Date().toISOString().split('T')[0] // Default to today for demo
        });
        navigate("/demo-turnos-mobile/my-appointments");
    };

    return (
        <div className="p-6 pb-24">
            {/* Step 1: Services */}
            {step === 1 && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Elegí un servicio</h2>
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => handleServiceSelect(service)}
                            className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#7b3fe4] transition-all cursor-pointer flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-bold text-gray-800">{service.name}</h3>
                                <p className="text-sm text-gray-500">{service.duration}</p>
                            </div>
                            <span className="font-bold text-[#7b3fe4]">{service.price}</span>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">Fecha y Hora</h2>

                    {/* Mock Calendar */}
                    <div className="bg-gray-50 p-4 rounded-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-bold text-gray-700">Noviembre 2023</span>
                            <div className="flex gap-2">
                                <button className="p-2 bg-white rounded-lg shadow-sm text-gray-400">&lt;</button>
                                <button className="p-2 bg-white rounded-lg shadow-sm text-gray-400">&gt;</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-2 text-center text-sm">
                            {["D", "L", "M", "M", "J", "V", "S"].map(d => <span key={d} className="text-gray-400 font-medium">{d}</span>)}
                            {Array.from({ length: 30 }).map((_, i) => (
                                <button
                                    key={i}
                                    className={`p-2 rounded-full hover:bg-[#7b3fe4] hover:text-white transition-colors ${i === 14 ? 'bg-[#7b3fe4] text-white shadow-lg shadow-violet-500/30' : 'text-gray-600'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {timeSlots.map((time) => (
                            <button
                                key={time}
                                onClick={() => handleTimeSelect(time)}
                                className="py-3 rounded-xl bg-white border border-gray-100 text-gray-600 font-medium hover:border-[#7b3fe4] hover:text-[#7b3fe4] transition-all"
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Step 3: Confirm */}
            {step === 3 && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">Confirmar Turno</h2>

                    <div className="bg-[#7b3fe4]/5 p-6 rounded-2xl border border-[#7b3fe4]/10 space-y-4">
                        <div className="flex items-center gap-3 text-gray-700">
                            <FaCheckCircle className="text-[#7b3fe4]" />
                            <span className="font-medium">{formData.service?.name}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                            <FaCalendarAlt className="text-[#7b3fe4]" />
                            <span className="font-medium">15 Noviembre, 2023</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                            <FaClock className="text-[#7b3fe4]" />
                            <span className="font-medium">{formData.time}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Input
                            label="Nombre Completo"
                            placeholder="Ej: María Perez"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <Input
                            label="Teléfono"
                            placeholder="Ej: 11 1234 5678"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>

                    <Button onClick={handleSubmit} className="mt-8">
                        Confirmar Reserva
                    </Button>
                </div>
            )}
        </div>
    );
}
