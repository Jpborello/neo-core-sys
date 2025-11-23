import { NavLink } from "react-router-dom";
import { FaChartLine, FaUsers, FaClipboardList, FaMoneyBillWave, FaDumbbell, FaBars, FaChevronLeft } from "react-icons/fa";

export default function Sidebar({ isCollapsed, onToggle }) {
    const menuItems = [
        { icon: FaChartLine, label: "Dashboard AI", path: "/gimnasio-ai-demo/dashboard" },
        { icon: FaUsers, label: "Usuarios & Riesgo", path: "/gimnasio-ai-demo/usuarios" },
        { icon: FaClipboardList, label: "Asistencias", path: "/gimnasio-ai-demo/asistencias" },
        { icon: FaMoneyBillWave, label: "Cuotas & Revenue", path: "/gimnasio-ai-demo/cuotas" },
    ];

    return (
        <aside className={`
            fixed md:sticky top-0 z-50 h-screen bg-[#111827] border-r border-gray-800 flex flex-col transition-all duration-300 ease-in-out
            ${isCollapsed ? '-translate-x-full md:translate-x-0 md:w-20' : 'translate-x-0 w-64'}
        `}>
            <div className={`${isCollapsed ? 'p-4' : 'p-6'} flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} border-b border-gray-800 transition-all duration-300`}>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-black flex-shrink-0">
                        <FaDumbbell />
                    </div>
                    {!isCollapsed && <span className="font-bold text-white text-lg whitespace-nowrap">NeoGym AI</span>}
                </div>
                {!isCollapsed && (
                    <button
                        onClick={onToggle}
                        className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/5 rounded"
                        aria-label="Collapse sidebar"
                    >
                        <FaChevronLeft />
                    </button>
                )}
            </div>

            {isCollapsed && (
                <button
                    onClick={onToggle}
                    className="hidden md:block mx-auto mt-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded"
                    aria-label="Expand sidebar"
                >
                    <FaBars />
                </button>
            )}

            <nav className={`flex-1 ${isCollapsed ? 'p-2' : 'p-4'} space-y-2 transition-all duration-300`}>
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
              flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} ${isCollapsed ? 'px-3 py-3' : 'px-4 py-3'} rounded-xl transition-all
              ${isActive
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "text-gray-400 hover:text-white hover:bg-white/5"}
            `}
                        title={isCollapsed ? item.label : undefined}
                    >
                        <item.icon className={isCollapsed ? 'text-xl' : ''} />
                        {!isCollapsed && <span className="font-medium whitespace-nowrap">{item.label}</span>}
                    </NavLink>
                ))}
            </nav>

            <div className={`${isCollapsed ? 'p-2' : 'p-4'} border-t border-gray-800 transition-all duration-300`}>
                <div className={`bg-gray-800/50 ${isCollapsed ? 'p-2' : 'p-3'} rounded-lg flex ${isCollapsed ? 'justify-center' : 'flex-col'}`}>
                    {!isCollapsed && <p className="text-xs text-gray-400 mb-1">AI Engine Status</p>}
                    <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2'}`}>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        {!isCollapsed && <span className="text-xs text-emerald-400 font-bold">ONLINE</span>}
                    </div>
                </div>
            </div>
        </aside>
    );
}
