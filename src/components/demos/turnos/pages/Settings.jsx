import { useState } from "react";
import { FaPalette, FaClock, FaConciergeBell, FaSave } from "react-icons/fa";
import { useTurnos } from "@/context/TurnosContext";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function Settings() {
    const { services } = useTurnos();
    const [activeTab, setActiveTab] = useState("services");

    const tabs = [
        { id: "services", label: "Servicios", icon: FaConciergeBell },
        { id: "hours", label: "Horarios", icon: FaClock },
        { id: "appearance", label: "Apariencia", icon: FaPalette },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-white mb-1">Configuración</h2>
                <p className="text-gray-400">Personaliza tu sistema</p>
            </div>

            <div className="flex gap-4 border-b border-white/10 pb-1">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-bold transition-colors relative ${activeTab === tab.id ? "text-violet-400 bg-white/5" : "text-gray-500 hover:text-white"
                            }`}
                    >
                        <tab.icon /> {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500" />
                        )}
                    </button>
                ))}
            </div>

            <Card>
                {activeTab === "services" && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white">Lista de Servicios</h3>
                            <Button variant="secondary" className="text-sm py-2">Agregar Servicio</Button>
                        </div>
                        <div className="grid gap-4">
                            {services.map(service => (
                                <div key={service.id} className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-3 h-12 rounded-full ${service.color}`}></div>
                                        <div>
                                            <h4 className="font-bold text-white">{service.name}</h4>
                                            <p className="text-xs text-gray-400">{service.duration} min</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold text-white">${service.price}</span>
                                        <Button variant="ghost" className="text-xs py-1 px-3">Editar</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "hours" && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white">Horarios de Atención</h3>
                        <p className="text-gray-400">Configuración de disponibilidad semanal (Mock)</p>
                        {/* Mock content for hours */}
                        <div className="space-y-2">
                            {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map(day => (
                                <div key={day} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                    <span className="text-white font-medium">{day}</span>
                                    <span className="text-gray-400 text-sm">09:00 - 18:00</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "appearance" && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white">Personalización</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Nombre del Negocio" value="Mili Nails" />
                            <Input label="Color Principal" type="color" value="#8b5cf6" className="h-12" />
                        </div>
                        <Button icon={FaSave}>Guardar Cambios</Button>
                    </div>
                )}
            </Card>
        </div>
    );
}
