import { Outlet, NavLink } from "react-router-dom";
import { FaChartPie, FaCalendarAlt, FaCog, FaArrowLeft, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function MetricsLayout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const menuItems = [
        { icon: FaChartPie, label: "Métricas", path: "/demo-metrics/overview" },
        { icon: FaCalendarAlt, label: "Agenda", path: "/demo-metrics/schedule" },
        { icon: FaCog, label: "Configuración", path: "/demo-metrics/settings" },
    ];

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white font-sans flex relative">
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#141414] border border-white/10 rounded-lg text-white shadow-lg"
            >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Sidebar Overlay for Mobile */}
            {isMobile && isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{
                    x: isMobile ? (isMobileMenuOpen ? 0 : -300) : 0,
                    opacity: 1
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`
                    fixed lg:sticky top-0 h-screen z-40
                    w-64 bg-[#141414] border-r border-white/5 flex flex-col
                    ${isMobile ? 'shadow-2xl' : ''}
                `}
            >
                <div className="p-6 flex items-center justify-start gap-3 border-b border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex-shrink-0"></div>
                    <span className="font-bold text-xl">NeoMetrics</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => isMobile && setIsMobileMenuOpen(false)}
                            className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group
                ${isActive
                                    ? "bg-violet-600/10 text-violet-400 border border-violet-500/20"
                                    : "text-gray-500 hover:text-white hover:bg-white/5"}
              `}
                        >
                            <item.icon className="text-xl group-hover:scale-110 transition-transform" />
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <NavLink to="/" className="flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-white transition-colors">
                        <FaArrowLeft />
                        <span className="font-medium">Volver al Home</span>
                    </NavLink>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 p-4 lg:p-8 overflow-y-auto w-full pt-16 lg:pt-8">
                <Outlet />
            </main>
        </div>
    );
}
