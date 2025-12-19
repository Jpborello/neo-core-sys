import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useGymData } from "@/hooks/useGymData";
import { FaCalendarCheck, FaClock } from "react-icons/fa";

export default function AsistenciasAI() {
    const { attendance } = useGymData();

    // Find busiest day
    const busiestDay = attendance.reduce((prev, current) => (prev.count > current.count) ? prev : current);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Control de Asistencias</h1>
                <p className="text-gray-400">Análisis de flujo y ocupación del gimnasio</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                            <FaCalendarCheck className="text-xl" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Día Más Concurrido</p>
                            <p className="text-2xl font-bold text-white">{busiestDay.day}</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500">
                        Se recomienda reforzar el personal de recepción los {busiestDay.day}s debido al alto volumen de ingresos.
                    </p>
                </div>

                <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                            <FaClock className="text-xl" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Promedio Diario</p>
                            <p className="text-2xl font-bold text-white">43 Personas</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500">
                        La ocupación se mantiene estable con un ligero incremento del 5% respecto a la semana anterior.
                    </p>
                </div>
            </div>

            <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">
                <h3 className="text-lg font-bold text-white mb-6">Asistencia Semanal</h3>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={attendance}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1F2937" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                            <Tooltip
                                cursor={{ fill: '#1F2937' }}
                                contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }}
                            />
                            <Bar dataKey="count" fill="#3B82F6" radius={[6, 6, 0, 0]} barSize={50} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
