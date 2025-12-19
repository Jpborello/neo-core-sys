import { motion } from "framer-motion";

export default function Button({ children, onClick, variant = "primary", className = "", icon: Icon, ...props }) {
    const variants = {
        primary: "bg-[#7b3fe4] text-white shadow-lg shadow-violet-500/30",
        secondary: "bg-[#e470da] text-white shadow-lg shadow-pink-500/30",
        outline: "border-2 border-[#7b3fe4] text-[#7b3fe4] bg-transparent",
        ghost: "bg-gray-100 text-gray-600",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
            {...props}
        >
            {Icon && <Icon className="text-xl" />}
            {children}
        </motion.button>
    );
}
