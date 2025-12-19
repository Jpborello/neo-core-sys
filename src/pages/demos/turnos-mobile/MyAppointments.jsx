import { motion } from "framer-motion";
import { useAppointments } from "../../../components/demos/turnos-mobile/hooks/useAppointments";
import { FaCalendarCheck, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/demos/turnos-mobile/components/Button";

export default function MyAppointments() {
    const { appointments, cancelAppointment } = useAppointments();
    const navigate = useNavigate();

    return (
        <div className="p-6 pb-24">
            {appointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-3xl">
                        📅
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">No tenés turnos</h3>
                    <p className="text-gray-500 max-w-[200px]">
                        Aún no has reservado ningún turno. ¡Agendá el primero ahora!
                    </p>
                    <Button onClick={() => navigate("/demo-turnos-mobile/booking")} className="mt-4">
                        Reservar Ahora
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {appointments.map((app, index) => (
                        <motion.div
                            key={app.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-5 rounded-2xl border shadow-sm relative overflow-hidden ${app.status === 'cancelled' ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-gray-100'
                                }`}
                        >
                            {app.status === 'confirmed' && (
                                <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                                    CONFIRMADO
                                </div>
                            )}

                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg">{app.service?.name}</h3>
                                    <p className="text-[#7b3fe4] font-medium">{app.date} - {app.time}</p>
                                </div>
                                {app.status !== 'cancelled' && (
                                    <button
                                        onClick={() => cancelAppointment(app.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                    >
                                        <FaTimes />
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-500 pt-4 border-t border-gray-50">
                                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                                    <span className="text-xs">👤</span>
                                </div>
                                <span>{app.name}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
