import { FaDollarSign, FaCalendarCheck, FaUserFriends, FaChartLine } from "react-icons/fa";
import { useDashboard } from "@/context/DashboardContext";
import KPICard from "../components/ui/KPICard";
import RevenueChart from "../components/charts/RevenueChart";
import OccupancyChart from "../components/charts/OccupancyChart";
import ServiceDistribution from "../components/charts/ServiceDistribution";
import Heatmap from "../components/charts/Heatmap";
import Card from "../../turnos/components/ui/Card"; // Reusing Card from previous demo

export default function Overview() {
    const { kpiData } = useDashboard();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-white mb-1">Resumen General</h2>
                <p className="text-gray-400">Métricas clave de tu negocio en tiempo real</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                    title="Ingresos Totales"
                    value={`$${kpiData.totalRevenue.toLocaleString()}`}
                    trend={12.5}
                    icon={FaDollarSign}
                    color="bg-violet-500"
                    delay={0}
                />
                <KPICard
                    title="Turnos Realizados"
                    value={kpiData.totalAppointments}
                    trend={8.2}
                    icon={FaCalendarCheck}
                    color="bg-pink-500"
                    delay={0.1}
                />
                <KPICard
                    title="Ticket Promedio"
                    value={`$${kpiData.avgTicket}`}
                    trend={-2.4}
                    icon={FaChartLine}
                    color="bg-blue-500"
                    delay={0.2}
                />
                <KPICard
                    title="Nuevos Clientes"
                    value="+45"
                    trend={15.3}
                    icon={FaUserFriends}
                    color="bg-indigo-500"
                    delay={0.3}
                />
            </div>

            {/* Main Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 min-h-[400px]">
                    <h3 className="text-xl font-bold text-white mb-6">Evolución de Ingresos</h3>
                    <RevenueChart />
                </Card>
                <Card>
                    <h3 className="text-xl font-bold text-white mb-6">Distribución de Servicios</h3>
                    <ServiceDistribution />
                </Card>
            </div>

            {/* Secondary Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h3 className="text-xl font-bold text-white mb-6">Ocupación Semanal</h3>
                    <OccupancyChart />
                </Card>
                <Card>
                    <h3 className="text-xl font-bold text-white mb-6">Mapa de Calor (Horarios Pico)</h3>
                    <div className="flex items-center justify-center h-full pb-6">
                        <Heatmap />
                    </div>
                </Card>
            </div>
        </div>
    );
}
