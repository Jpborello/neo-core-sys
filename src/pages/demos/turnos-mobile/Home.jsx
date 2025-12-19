import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/demos/turnos-mobile/components/Button";
import { FaCalendarPlus, FaListUl } from "react-icons/fa";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="h-full flex flex-col p-8 relative overflow-hidden bg-white">
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-br from-[#7b3fe4] to-[#e470da] rounded-b-[60px] z-0"></div>

            <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center pt-20">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center mb-8"
                >
                    <span className="text-4xl">💅</span>
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold text-white mb-2"
                >
                    MiliNails App
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-white/80 text-lg mb-12"
                >
                    Gestioná tus turnos sin complicaciones
                </motion.p>
            </div>

            <div className="relative z-10 space-y-4 pb-8">
                <Button onClick={() => navigate("booking")} icon={FaCalendarPlus}>
                    Reservar Turno
                </Button>
                <Button variant="ghost" onClick={() => navigate("my-appointments")} icon={FaListUl}>
                    Mis Turnos
                </Button>
            </div>
        </div>
    );
}
