import { FaBell, FaSearch } from "react-icons/fa";
import { useTurnos } from "../context/TurnosContext";

export default function Topbar() {
    const { user } = useTurnos();

    return (
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#0a0a0a]/50 backdrop-blur-md sticky top-0 z-30">
            {/* Search */}
            <div className="relative w-96 hidden md:block">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                    type="text"
                    placeholder="Buscar turnos, clientes..."
                    className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 transition-colors"
                />
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-6">
                <button className="relative text-gray-400 hover:text-white transition-colors">
                    <FaBell className="text-xl" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0a0a0a]"></span>
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-white">{user?.name || "Usuario"}</p>
                        <p className="text-xs text-gray-500">{user?.email || "admin@demo.com"}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 p-0.5">
                        <img
                            src={user?.avatar || "https://i.pravatar.cc/150?u=admin"}
                            alt="User"
                            className="w-full h-full rounded-full object-cover border-2 border-[#0a0a0a]"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
