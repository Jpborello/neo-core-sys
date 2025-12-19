import { motion } from "framer-motion";
import { FaLightbulb, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

export default function InsightCard({ type, text, delay = 0 }) {
    const styles = {
        info: { icon: FaLightbulb, color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/5" },
        warning: { icon: FaExclamationTriangle, color: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/5" },
        success: { icon: FaCheckCircle, color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/5" },
    };

    const style = styles[type] || styles.info;
    const Icon = style.icon;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            className={`flex items-start gap-4 p-4 rounded-xl border ${style.border} ${style.bg}`}
        >
            <div className={`mt-1 ${style.color}`}>
                <Icon />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{text}</p>
        </motion.div>
    );
}
