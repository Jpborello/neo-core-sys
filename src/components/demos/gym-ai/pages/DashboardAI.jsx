import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import { FaUsers, FaChartLine, FaBrain, FaExclamationTriangle } from "react-icons/fa";
import { useGymData } from "../hooks/useGymData";
import { useAIEngine } from "../hooks/useAIEngine";
import KPICard from "../components/KPICard";
import InsightCard from "../components/InsightCard";

export default function DashboardAI() {
    const { users, attendance, quotas } = useGymData();
    const { usersWithRisk, peakHours, insights, projectedRevenue } = useAIEngine(users, attendance, quotas);

    const highRiskCount = usersWithRisk.filter(u => u.churnRisk > 0.7).length;
    const activeUsers = users.filter(u => u.status === "Active").length;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard Inteligente</h1>
                <p className="text-gray-400">Análisis en tiempo real impulsado por NeoCore AI</p>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                    title="Usuarios Activos"
                    value={activeUsers}
                    trend={12}
                    icon={FaUsers}
                    color="blue"
                />
                <KPICard
                    title="Riesgo de Abandono"
                    value={highRiskCount}
                    trend={-5}
                    icon={FaExclamationTriangle}
                    color="rose"
                />
                <KPICard
                    title="Ingresos Proyectados"
                    value={`$${projectedRevenue.toLocaleString()}`}
                    trend={8.5}
                    icon={FaChartLine}
                    color="emerald"
                />
                <KPICard
                    title="Eficiencia AI"
                    value="98%"
                    icon={FaBrain}
                    color="purple"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <div className="lg:col-span-2 bg-[#111827] p-6 rounded-2xl border border-gray-800">
                    <h3 className="text-lg font-bold text-white mb-6">Predicción de Horarios Pico</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={peakHours}>
                                <defs>
                                    <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1F2937" />
                                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="traffic" stroke="#10B981" fillOpacity={1} fill="url(#colorTraffic)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Smart Insights Panel */}
                <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800 flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                        <FaBrain className="text-purple-400" />
                        <h3 className="text-lg font-bold text-white">Smart Insights</h3>
                    </div>

                    <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        {insights.map((insight, index) => (
                            <InsightCard key={index} type={insight.type} text={insight.text} delay={index * 0.1} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
