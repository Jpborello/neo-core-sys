import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import { useTurnos } from "../context/TurnosContext";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";

export default function Calendar() {
    const { appointments, addAppointment, services } = useTurnos();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTurno, setNewTurno] = useState({ clientName: "", service: "", date: "", time: "" });

    const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const hours = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

    const handleCreate = (e) => {
        e.preventDefault();
        addAppointment({
            ...newTurno,
            price: services.find(s => s.name === newTurno.service)?.price || 0,
            avatar: `https://i.pravatar.cc/150?u=${Math.random()}`
        });
        setIsModalOpen(false);
        setNewTurno({ clientName: "", service: "", date: "", time: "" });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-1">Calendario</h2>
                    <p className="text-gray-400">Gestiona tus turnos de la semana</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} icon={FaPlus}>
                    Nuevo Turno
                </Button>
            </div>

            <Card className="overflow-hidden">
                {/* Calendar Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/5">
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors"><FaChevronLeft /></button>
                        <h3 className="text-xl font-bold text-white">Noviembre 2023</h3>
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors"><FaChevronRight /></button>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white/10 rounded-lg text-sm font-bold text-white">Semana</button>
                        <button className="px-4 py-2 hover:bg-white/5 rounded-lg text-sm font-bold text-gray-400">Mes</button>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-8 border-b border-white/5">
                    <div className="p-4 border-r border-white/5"></div>
                    {days.map(day => (
                        <div key={day} className="p-4 text-center border-r border-white/5 last:border-r-0">
                            <span className="text-sm font-bold text-gray-400 uppercase">{day}</span>
                        </div>
                    ))}
                </div>

                <div className="h-[600px] overflow-y-auto custom-scrollbar">
                    {hours.map(hour => (
                        <div key={hour} className="grid grid-cols-8 min-h-[100px] border-b border-white/5">
                            <div className="p-4 border-r border-white/5 text-xs text-gray-500 font-bold text-right">
                                {hour}
                            </div>
                            {days.map((day, i) => (
                                <div key={i} className="border-r border-white/5 last:border-r-0 relative group hover:bg-white/[0.02] transition-colors">
                                    {/* Mock rendering of appointments */}
                                    {appointments.filter(app => app.time === hour && i === 2).map(app => ( // Mocking Tuesday for demo
                                        <motion.div
                                            key={app.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="absolute inset-1 p-2 rounded-lg bg-violet-600/20 border border-violet-500/30 cursor-pointer hover:bg-violet-600/30 transition-colors"
                                        >
                                            <p className="text-xs font-bold text-violet-300 truncate">{app.clientName}</p>
                                            <p className="text-[10px] text-violet-400 truncate">{app.service}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </Card>

            {/* Create Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nuevo Turno">
                <form onSubmit={handleCreate} className="space-y-4">
                    <Input
                        label="Cliente"
                        placeholder="Nombre del cliente"
                        value={newTurno.clientName}
                        onChange={e => setNewTurno({ ...newTurno, clientName: e.target.value })}
                    />
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 font-medium ml-1">Servicio</label>
                        <select
                            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-violet-500/50"
                            value={newTurno.service}
                            onChange={e => setNewTurno({ ...newTurno, service: e.target.value })}
                        >
                            <option value="">Seleccionar servicio...</option>
                            {services.map(s => (
                                <option key={s.id} value={s.name}>{s.name} - ${s.price}</option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Fecha"
                            type="date"
                            value={newTurno.date}
                            onChange={e => setNewTurno({ ...newTurno, date: e.target.value })}
                        />
                        <Input
                            label="Hora"
                            type="time"
                            value={newTurno.time}
                            onChange={e => setNewTurno({ ...newTurno, time: e.target.value })}
                        />
                    </div>
                    <Button type="submit" className="w-full mt-6">Confirmar Turno</Button>
                </form>
            </Modal>
        </div>
    );
}
