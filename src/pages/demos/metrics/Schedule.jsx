import { useState } from "react";
import { useDashboard } from "../../../components/demos/metrics/context/DashboardContext";
import { motion } from "framer-motion";
import Card from "../../../components/demos/turnos/components/ui/Card"; // Reusing Card
import Button from "../../turnos/components/ui/Button"; // Reusing Button
import { FaPlus, FaCalendarAlt } from "react-icons/fa";

export default function Schedule() {
    // Simplified schedule for demo purposes
    const appointments = [
        { time: "09:00", client: "Ana García", service: "Kapping Gel", status: "confirmed" },
        { time: "10:30", client: "Lucía Perez", service: "Semipermanente", status: "pending" },
        { time: "12:00", client: "Sofía Lopez", service: "Esculpidas", status: "confirmed" },
        { time: "14:00", client: "Martina Diaz", service: "Nail Art", status: "cancelled" },
        { time: "15:30", client: "Valentina Ruiz", service: "Service", status: "confirmed" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-1">Agenda</h2>
                    <p className="text-gray-400">Gestión rápida de turnos</p>
                </div>
                <Button icon={FaPlus}>Nuevo Turno</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar Widget Placeholder */}
                <Card className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                        <FaCalendarAlt className="text-3xl text-violet-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Calendario Interactivo</h3>
                    <p className="text-gray-400 text-sm">
                        Aquí iría el componente de calendario completo (reutilizable del sistema de turnos anterior).
                    </p>
                </Card>

                {/* Daily Agenda */}
                <Card className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-white mb-6">Turnos de Hoy</h3>
                    <div className="space-y-4">
                        {appointments.map((app, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors group"
                            >
                                <div className="flex items-center gap-6">
                                    <span className="text-lg font-bold text-white font-mono">{app.time}</span>
                                    <div>
                                        <h4 className="font-bold text-white group-hover:text-violet-400 transition-colors">{app.client}</h4>
                                        <p className="text-xs text-gray-400">{app.service}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${app.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                                    app.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                        'bg-red-500/20 text-red-400'
                                    }`}>
                                    {app.status === 'confirmed' ? 'Confirmado' : app.status === 'pending' ? 'Pendiente' : 'Cancelado'}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
