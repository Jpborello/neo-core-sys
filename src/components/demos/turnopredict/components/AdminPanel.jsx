import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import AIPrediction from "./AIPrediction";
import { useAIAnalysis } from "../hooks/useAIAnalysis";

export default function AdminPanel() {
    const { topServices } = useAIAnalysis();

    // Transform data for chart
    const chartData = topServices.map(s => ({
        name: s.name,
        reservas: s.count
    }));

    return (
        <div className="p-4 md:p-8 bg-[#F9F9F9] min-h-screen">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-[#0A0A0A]">Panel de Control</h1>
                        <p className="text-gray-500">Vista general y predicciones de IA</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium text-gray-600">
                        Admin Mode
                    </div>
                </div>

                {/* AI Module */}
                <AIPrediction />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Chart Section */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg mb-6 text-[#0A0A0A]">Demanda por Servicio</h3>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#666' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#666' }} />
                                    <Tooltip
                                        cursor={{ fill: '#f9f9f9' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="reservas" fill="#0A0A0A" radius={[6, 6, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Recent Activity Mock */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg mb-6 text-[#0A0A0A]">Actividad Reciente</h3>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                        JD
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">Juan Doe</p>
                                        <p className="text-xs text-gray-500">Reservó Corte - 15:00</p>
                                    </div>
                                    <span className="ml-auto text-xs text-gray-400">2m</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
