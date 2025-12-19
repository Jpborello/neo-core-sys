import { motion } from "framer-motion";
import { FaCalendarCheck, FaMoneyBillWave, FaUserPlus, FaChartLine } from "react-icons/fa";
import { useTurnos } from "../context/TurnosContext";
import Card from "../components/ui/Card";

export default function Dashboard() {
    const { stats, appointments } = useTurnos();

    const statCards = [
        { title: "Turnos Totales", value: stats.totalTurnos, icon: FaCalendarCheck, color: "text-violet-400", bg: "bg-violet-500/10" },
        { title: "Ingresos del Mes", value: `$${stats.ingresos.toLocaleString()}`, icon: FaMoneyBillWave, color: "text-green-400", bg: "bg-green-500/10" },
        { title: "Nuevos Clientes", value: stats.nuevosClientes, icon: FaUserPlus, color: "text-blue-400", bg: "bg-blue-500/10" },
        { title: "Ocupación", value: `${stats.ocupacion}%`, icon: FaChartLine, color: "text-pink-400", bg: "bg-pink-500/10" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
                <p className="text-gray-400">Resumen general de tu negocio</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <Card key={index} delay={index * 0.1} className="flex items-center gap-4">
                        <div className={`p-4 rounded-xl ${stat.bg}`}>
                            <stat.icon className={`text-2xl ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Recent Appointments & Chart Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Appointments */}
                <Card className="lg:col-span-2" delay={0.4}>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white">Próximos Turnos</h3>
                        <button className="text-sm text-violet-400 hover:text-violet-300 transition-colors">Ver todos</button>
                    </div>

                    <div className="space-y-4">
                        {appointments.slice(0, 5).map((app) => (
                            <div key={app.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <img src={app.avatar} alt={app.clientName} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <h4 className="font-bold text-white">{app.clientName}</h4>
                                        <p className="text-xs text-gray-400">{app.service} • {app.time}hs</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${app.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                                    app.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                        'bg-red-500/20 text-red-400'
                                    }`}>
                                    {app.status === 'confirmed' ? 'Confirmado' : app.status === 'pending' ? 'Pendiente' : 'Cancelado'}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Quick Actions / Mini Calendar Placeholder */}
                <Card delay={0.5} className="flex flex-col justify-center items-center text-center p-8">
                    <div className="w-full h-48 bg-gradient-to-br from-violet-600/20 to-indigo-600/20 rounded-2xl flex items-center justify-center mb-6 border border-white/5">
                        <FaChartLine className="text-6xl text-white/20" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Rendimiento Semanal</h3>
                    <p className="text-gray-400 text-sm mb-6">Tu negocio creció un 15% esta semana.</p>
                    <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-colors">
                        Ver Reporte Completo
                    </button>
                </Card>
            </div>
        </div>
    );
}
