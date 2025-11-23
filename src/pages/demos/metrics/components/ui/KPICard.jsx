import { motion } from "framer-motion";
import Card from "../../../turnos/components/ui/Card";

export default function KPICard({ title, value, trend, icon: Icon, color, delay = 0 }) {
    return (
        <Card delay={delay} className="relative overflow-hidden group">
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${color} opacity-10 group-hover:scale-150 transition-transform duration-500`}></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${color} bg-opacity-20 text-white`}>
                        <Icon className="text-xl" />
                    </div>
                    {trend && (
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {trend > 0 ? '+' : ''}{trend}%
                        </span>
                    )}
                </div>

                <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
                <p className="text-gray-400 text-sm font-medium">{title}</p>
            </div>
        </Card>
    );
}
