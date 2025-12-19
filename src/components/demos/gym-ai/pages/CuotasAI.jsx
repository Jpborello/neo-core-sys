import { FaMoneyBillWave, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import { useGymData } from "../hooks/useGymData";

export default function CuotasAI() {
    const { quotas, users } = useGymData();

    // Enrich quotas with user names
    const enrichedQuotas = quotas.map(q => {
        const user = users.find(u => u.id === q.userId);
        return { ...q, userName: user ? user.name : "Desconocido" };
    });

    const totalRevenue = quotas
        .filter(q => q.status === "Paid")
        .reduce((acc, curr) => acc + curr.amount, 0);

    const pendingRevenue = quotas
        .filter(q => q.status === "Pending" || q.status === "Overdue")
        .reduce((acc, curr) => acc + curr.amount, 0);

    const getStatusBadge = (status) => {
        const styles = {
            Paid: "bg-emerald-500/10 text-emerald-400",
            Pending: "bg-amber-500/10 text-amber-400",
            Overdue: "bg-rose-500/10 text-rose-400",
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[status]}`}>
                {status === "Paid" ? "PAGADO" : status === "Pending" ? "PENDIENTE" : "VENCIDO"}
            </span>
        );
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Gestión de Cuotas</h1>
                <p className="text-gray-400">Control financiero y proyección de ingresos</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800 flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-sm mb-1">Ingresos Cobrados</p>
                        <p className="text-3xl font-bold text-emerald-400">${totalRevenue.toLocaleString()}</p>
                    </div>
                    <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-400">
                        <FaCheckCircle className="text-2xl" />
                    </div>
                </div>

                <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800 flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-sm mb-1">Pendiente de Cobro</p>
                        <p className="text-3xl font-bold text-amber-400">${pendingRevenue.toLocaleString()}</p>
                    </div>
                    <div className="p-4 rounded-full bg-amber-500/10 text-amber-400">
                        <FaExclamationCircle className="text-2xl" />
                    </div>
                </div>
            </div>

            <div className="bg-[#111827] rounded-2xl border border-gray-800 overflow-hidden">
                <div className="p-6 border-b border-gray-800">
                    <h3 className="font-bold text-white">Últimos Movimientos</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-800/50 text-gray-400 text-sm uppercase">
                                <th className="p-4 font-medium">Usuario</th>
                                <th className="p-4 font-medium">Monto</th>
                                <th className="p-4 font-medium">Vencimiento</th>
                                <th className="p-4 font-medium">Estado</th>
                                <th className="p-4 font-medium">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {enrichedQuotas.map((quota) => (
                                <tr key={quota.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-bold text-white">{quota.userName}</td>
                                    <td className="p-4 text-gray-300">${quota.amount.toLocaleString()}</td>
                                    <td className="p-4 text-gray-300">{quota.dueDate}</td>
                                    <td className="p-4">{getStatusBadge(quota.status)}</td>
                                    <td className="p-4">
                                        <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">
                                            Ver Detalle
                                        </button>
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
