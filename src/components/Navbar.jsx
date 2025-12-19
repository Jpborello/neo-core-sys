import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="header-glass fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-black/50 backdrop-blur-md border-b border-white/10"
        >
            <Link href="/" className="text-2xl font-bold text-white tracking-tighter">
                Neo<span className="text-purple-500">Core</span>Sys
            </Link>
            <div className="flex gap-6">
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                    Home
                </Link>
            </div>
        </motion.nav>
    );
}
