import { useState } from "react";
import { FaSearch, FaUserPlus, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { useGymData } from "../../../components/demos/gym-ai/hooks/useGymData";
import { useAIEngine } from "../../../components/demos/gym-ai/hooks/useAIEngine";

export default function UsuariosAIList() {
    const { users, attendance, quotas } = useGymData();
    const { usersWithRisk } = useAIEngine(users, attendance, quotas);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = usersWithRisk.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getRiskBadge = (score) => {
        if (score > 0.7) return <span className="px-2 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400">ALTO ({Math.round(score * 100)}%)</span>;
        if (score > 0.4) return <span className="px-2 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400">MEDIO ({Math.round(score * 100)}%)</span>;
        return <span className="px-2 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400">BAJO ({Math.round(score * 100)}%)</span>;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Gestión de Usuarios</h1>
                    <p className="text-gray-400">Monitoreo de actividad y riesgo de abandono</p>
                </div>
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors">
                    <FaUserPlus /> Nuevo Usuario
                </button>
            </div>

            {/* Search Bar */}
            <div className="bg-[#111827] p-4 rounded-xl border border-gray-800 flex items-center gap-3">
                <FaSearch className="text-gray-500" />
                <input
                    type="text"
                    placeholder="Buscar por nombre o email..."
                    className="bg-transparent border-none outline-none text-white w-full placeholder-gray-600"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="bg-[#111827] rounded-2xl border border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-800/50 text-gray-400 text-sm uppercase">
                                <th className="p-4 font-medium">Usuario</th>
                                <th className="p-4 font-medium">Plan</th>
                                <th className="p-4 font-medium">Última Visita</th>
                                <th className="p-4 font-medium">Visitas (Mes)</th>
                                <th className="p-4 font-medium">Riesgo Churn (IA)</th>
                                <th className="p-4 font-medium">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div>
                                            <p className="font-bold text-white">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-300">{user.plan}</td>
                                    <td className="p-4 text-gray-300">{user.lastVisit}</td>
                                    <td className="p-4 text-gray-300">{user.visitsThisMonth}</td>
                                    <td className="p-4">{getRiskBadge(user.churnRisk)}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors" title="Enviar Email">
                                                <FaEnvelope />
                                            </button>
                                            <button className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors" title="Contactar WhatsApp">
                                                <FaWhatsapp />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
