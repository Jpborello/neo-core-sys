import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useTurnos } from "../context/TurnosContext";

export default function Sidebar() {
    const { logout } = useTurnos();

    const menuItems = [
        { icon: FaHome, label: "Dashboard", path: "/demo-turnos/dashboard" },
        { icon: FaCalendarAlt, label: "Calendario", path: "/demo-turnos/calendar" },
        { icon: FaUsers, label: "Clientes", path: "/demo-turnos/clients" },
        { icon: FaCog, label: "Configuración", path: "/demo-turnos/settings" },
    ];

    return (
        <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="fixed left-0 top-0 bottom-0 w-64 bg-[#121212] border-r border-white/5 z-40 hidden md:flex flex-col"
        >
            {/* Logo */}
            <div className="p-8 border-b border-white/5">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
                    Turnos<span className="text-white">Pro</span>
                </h1>
            </div>

            {/* Menu */}
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
              ${isActive
                                ? "bg-violet-600/10 text-violet-400 border border-violet-500/20 shadow-[0_0_20px_rgba(139,92,246,0.1)]"
                                : "text-gray-400 hover:text-white hover:bg-white/5"}
            `}
                    >
                        <item.icon className="text-lg" />
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-white/5">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                >
                    <FaSignOutAlt />
                    <span className="font-medium">Cerrar Sesión</span>
                </button>
            </div>
        </motion.aside>
    );
}
