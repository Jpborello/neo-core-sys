import { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaEllipsisV, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { useTurnos } from "@/context/TurnosContext";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";

export default function Clients() {
    const { clients } = useTurnos();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-1">Clientes</h2>
                    <p className="text-gray-400">Base de datos de tus clientes</p>
                </div>
                <div className="w-64">
                    <Input
                        placeholder="Buscar cliente..."
                        icon={FaSearch}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <Card className="overflow-hidden p-0">
                <table className="w-full">
                    <thead className="bg-white/5 border-b border-white/5">
                        <tr>
                            <th className="text-left p-6 text-sm font-bold text-gray-400 uppercase tracking-wider">Cliente</th>
                            <th className="text-left p-6 text-sm font-bold text-gray-400 uppercase tracking-wider">Contacto</th>
                            <th className="text-left p-6 text-sm font-bold text-gray-400 uppercase tracking-wider">Última Visita</th>
                            <th className="text-left p-6 text-sm font-bold text-gray-400 uppercase tracking-wider">Total Gastado</th>
                            <th className="p-6"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredClients.map((client, index) => (
                            <motion.tr
                                key={client.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="hover:bg-white/[0.02] transition-colors group"
                            >
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold">
                                            {client.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white">{client.name}</p>
                                            <p className="text-xs text-gray-500">ID: #{client.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <div className="flex gap-3">
                                        <button className="p-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors">
                                            <FaWhatsapp />
                                        </button>
                                        <button className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors">
                                            <FaEnvelope />
                                        </button>
                                    </div>
                                </td>
                                <td className="p-6 text-gray-400">{client.lastVisit}</td>
                                <td className="p-6 font-bold text-white">${client.totalSpent.toLocaleString()}</td>
                                <td className="p-6 text-right">
                                    <button className="text-gray-500 hover:text-white transition-colors">
                                        <FaEllipsisV />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
