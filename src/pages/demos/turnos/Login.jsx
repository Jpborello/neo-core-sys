import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { useTurnos } from "../../../components/demos/turnos/context/TurnosContext";
import Button from "../../../components/demos/turnos/components/ui/Button";
import Input from "../../../components/demos/turnos/components/ui/Input";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useTurnos();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(email, password)) {
            navigate("/demo-turnos/dashboard");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl relative z-10"
            >
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-white mb-2">Bienvenido</h1>
                    <p className="text-gray-400">Ingresa a tu panel de control</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="admin@demo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon={FaEnvelope}
                    />
                    <Input
                        label="Contraseña"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        icon={FaLock}
                    />

                    <Button type="submit" className="w-full" icon={FaArrowRight}>
                        Ingresar
                    </Button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        ¿No tienes cuenta? <span className="text-violet-400 cursor-pointer hover:underline">Regístrate</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
