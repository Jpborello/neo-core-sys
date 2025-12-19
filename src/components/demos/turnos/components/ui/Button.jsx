import { motion } from "framer-motion";

export default function Button({ children, onClick, variant = "primary", className = "", type = "button", disabled = false, icon: Icon }) {
    const baseStyles = "px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg hover:shadow-violet-500/30 hover:scale-[1.02]",
        secondary: "bg-white/10 text-white border border-white/10 hover:bg-white/20 backdrop-blur-md",
        danger: "bg-gradient-to-r from-red-500 to-rose-600 text-white hover:shadow-red-500/30",
        ghost: "text-gray-400 hover:text-white hover:bg-white/5"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {Icon && <Icon className="text-lg" />}
            {children}
        </motion.button>
    );
}
