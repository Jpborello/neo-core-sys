import { motion, AnimatePresence } from "framer-motion";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function MobileLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === "/demo-turnos-mobile" || location.pathname === "/demo-turnos-mobile/";

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md bg-white h-[800px] max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden relative border-8 border-gray-900 flex flex-col">
                {/* Status Bar Mock */}
                <div className="h-8 bg-gray-900 w-full flex items-center justify-between px-6">
                    <div className="text-white text-xs font-medium">9:41</div>
                    <div className="flex gap-1">
                        <div className="w-4 h-4 bg-white rounded-full opacity-20"></div>
                        <div className="w-4 h-4 bg-white rounded-full opacity-20"></div>
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                </div>

                {/* Header */}
                {!isHome && (
                    <div className="p-4 flex items-center gap-4 border-b border-gray-100">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            <FaArrowLeft />
                        </button>
                        <h1 className="font-bold text-lg text-gray-800">
                            {location.pathname.includes("booking") ? "Reservar Turno" : "Mis Turnos"}
                        </h1>
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 overflow-y-auto relative bg-white">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="h-full"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Home Indicator */}
                <div className="h-6 w-full flex items-center justify-center pb-2 bg-white">
                    <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}
