import { Outlet, NavLink } from "react-router-dom";
import { FaChartPie, FaCalendarAlt, FaCog, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

export default function MetricsLayout() {
    const menuItems = [
        { icon: FaChartPie, label: "Métricas", path: "/demo-metrics/overview" },
        { icon: FaCalendarAlt, label: "Agenda", path: "/demo-metrics/schedule" },
        { icon: FaCog, label: "Configuración", path: "/demo-metrics/settings" },
    ];

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white font-sans flex">
            {/* Sidebar */}
            <motion.aside
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-20 lg:w-64 bg-[#141414] border-r border-white/5 flex flex-col sticky top-0 h-screen z-40"
            >
                <div className="p-6 flex items-center justify-center lg:justify-start gap-3 border-b border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex-shrink-0"></div>
                    <span className="font-bold text-xl hidden lg:block">NeoMetrics</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group
                ${isActive
                                    ? "bg-violet-600/10 text-violet-400 border border-violet-500/20"
                                    : "text-gray-500 hover:text-white hover:bg-white/5"}
              `}
                        >
                            <item.icon className="text-xl group-hover:scale-110 transition-transform" />
                            <span className="font-medium hidden lg:block">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <NavLink to="/" className="flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-white transition-colors">
                        <FaArrowLeft />
                        <span className="font-medium hidden lg:block">Volver al Home</span>
                    </NavLink>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
