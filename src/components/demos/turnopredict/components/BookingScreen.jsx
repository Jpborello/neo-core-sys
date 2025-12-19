import { useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaCheckCircle, FaMagic } from "react-icons/fa";
import { useAIAnalysis } from "@/hooks/useAIAnalysis";

export default function BookingScreen() {
    const { prediction } = useAIAnalysis();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const timeSlots = [9, 10, 11, 14, 15, 16, 17, 18];

    return (
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl overflow-hidden relative">
            {/* Header */}
            <div className="bg-[#0A0A0A] p-6 text-white rounded-b-[40px] shadow-lg relative z-10">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">Reservar Turno</h1>
                    <div className="w-8 h-8 rounded-full bg-[#FF007A] flex items-center justify-center text-xs font-bold">TP</div>
                </div>
                <p className="text-gray-400 text-sm">Selecciona tu horario ideal. Nuestra IA te recomienda los mejores momentos.</p>
            </div>

            <div className="p-6 space-y-8">
                {/* Calendar Mock */}
                <div>
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <FaCalendarAlt className="text-[#FF007A]" />
                        Selecciona Fecha
                    </h3>
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedDate(i)}
                                className={`flex-shrink-0 w-14 h-20 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${selectedDate === i
                                    ? "bg-[#0A0A0A] text-white shadow-lg scale-105"
                                    : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                                    }`}
                            >
                                <span className="text-xs font-medium">NOV</span>
                                <span className="text-xl font-bold">{15 + i}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Time Slots with AI Recommendation */}
                <div>
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <FaClock className="text-[#FF007A]" />
                        Horarios Disponibles
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                        {timeSlots.map((time) => {
                            const isRecommended = time === prediction.recommendedSlot;
                            return (
                                <button
                                    key={time}
                                    onClick={() => setSelectedTime(time)}
                                    className={`relative py-3 rounded-xl border transition-all ${selectedTime === time
                                        ? "border-[#FF007A] bg-[#FF007A]/5 text-[#FF007A]"
                                        : "border-gray-100 text-gray-600 hover:border-gray-300"
                                        }`}
                                >
                                    <span className="font-medium">{time}:00</span>
                                    {isRecommended && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-2 -right-2 bg-[#FF007A] text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm"
                                        >
                                            <FaMagic /> IA
                                        </motion.div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Confirm Button */}
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    disabled={!selectedDate || !selectedTime}
                    className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${selectedDate !== null && selectedTime !== null
                        ? "bg-[#0A0A0A] shadow-black/20"
                        : "bg-gray-300 cursor-not-allowed"
                        }`}
                >
                    <FaCheckCircle />
                    Confirmar Reserva
                </motion.button>
            </div>
        </div>
    );
}
