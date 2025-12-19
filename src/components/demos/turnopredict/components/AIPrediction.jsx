import { motion } from "framer-motion";
import { FaRobot, FaBolt, FaChartLine } from "react-icons/fa";
import { useAIAnalysis } from "@/hooks/useAIAnalysis";

export default function AIPrediction() {
    const { prediction, topServices, peakHours } = useAIAnalysis();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-3xl border border-white/10 text-white relative overflow-hidden"
        >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF007A] opacity-10 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-full bg-[#FF007A]/20 flex items-center justify-center text-[#FF007A]">
                    <FaRobot className="text-xl" />
                </div>
                <div>
                    <h3 className="font-bold text-lg">AI Insights</h3>
                    <p className="text-xs text-gray-400">Análisis en tiempo real</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                        <FaBolt className="text-yellow-400" />
                        <span>Próximo Pico</span>
                    </div>
                    <p className="text-2xl font-bold">{prediction.nextBusyDay}</p>
                    <p className="text-xs text-green-400">+{prediction.traffic}% demanda esperada</p>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                        <FaChartLine className="text-blue-400" />
                        <span>Servicio Top</span>
                    </div>
                    <p className="text-2xl font-bold">{topServices[0].name}</p>
                    <p className="text-xs text-gray-400">{topServices[0].count} reservas</p>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                        <FaRobot className="text-[#FF007A]" />
                        <span>Horas Pico</span>
                    </div>
                    <div className="flex gap-2 mt-1">
                        {peakHours.map(h => (
                            <span key={h} className="px-2 py-1 bg-[#FF007A]/20 text-[#FF007A] rounded-lg text-xs font-bold">
                                {h}:00
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
