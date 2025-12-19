import { motion } from "framer-motion";

export default function KPICard({ title, value, trend, icon: Icon, color = "emerald" }) {
    const colors = {
        emerald: "text-emerald-400 bg-emerald-400/10",
        blue: "text-blue-400 bg-blue-400/10",
        purple: "text-purple-400 bg-purple-400/10",
        rose: "text-rose-400 bg-rose-400/10",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#111827] p-6 rounded-2xl border border-gray-800"
        >
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${colors[color]}`}>
                    <Icon className="text-xl" />
                </div>
                {trend && (
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend > 0 ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'}`}>
                        {trend > 0 ? "+" : ""}{trend}%
                    </span>
                )}
            </div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
            <p className="text-2xl font-bold text-white">{value}</p>
        </motion.div>
    );
}
