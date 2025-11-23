import { motion } from "framer-motion";
import { RiBuilding4Line, RiTeamLine, RiShakeHandsLine } from "react-icons/ri";

export default function DemoCorporate() {
    return (
        <div className="min-h-screen bg-white text-slate-800 font-sans">
            {/* NAVBAR SIMULATION */}
            <nav className="flex justify-between items-center px-6 md:px-10 py-6 border-b border-slate-100">
                <div className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                    CorpTech
                </div>
                <div className="hidden md:flex gap-8 font-medium text-slate-600">
                    <a href="#" className="hover:text-blue-600">Soluciones</a>
                    <a href="#" className="hover:text-blue-600">Nosotros</a>
                    <a href="#" className="hover:text-blue-600">Clientes</a>
                </div>
                <button className="px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors">
                    Contactar
                </button>
            </nav>

            {/* HERO */}
            <header className="py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-16 bg-slate-50">
                <div className="md:w-1/2">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-4 block"
                    >
                        Líderes en Consultoría
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-bold leading-tight text-slate-900 mb-6"
                    >
                        Impulsamos el futuro de su empresa.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-slate-600 mb-10 leading-relaxed"
                    >
                        Ofrecemos soluciones estratégicas integrales para optimizar procesos y maximizar la rentabilidad de su negocio en la era digital.
                    </motion.p>
                    <div className="flex gap-4">
                        <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                            Nuestros Servicios
                        </button>
                        <button className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                            Ver Portfolio
                        </button>
                    </div>
                </div>
                <div className="mt-8 md:mt-0 md:w-1/2 relative">
                    <div className="absolute -inset-4 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                        alt="Office"
                        className="rounded-2xl shadow-2xl"
                    />
                </div>
            </header>

            {/* STATS */}
            <section className="py-16 bg-white border-y border-slate-100">
                <div className="container mx-auto px-6 flex flex-wrap justify-center gap-16 text-center">
                    <div>
                        <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
                        <div className="text-slate-500 font-medium">Años de Experiencia</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                        <div className="text-slate-500 font-medium">Proyectos Exitosos</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
                        <div className="text-slate-500 font-medium">Clientes Satisfechos</div>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section className="py-24 px-6 md:px-20 bg-slate-50">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Soluciones Corporativas</h2>
                    <p className="text-slate-600">Adaptamos nuestra metodología a las necesidades específicas de su industria.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ServiceCard
                        icon={<RiBuilding4Line className="text-4xl text-blue-600" />}
                        title="Infraestructura"
                        desc="Diseño y mantenimiento de redes escalables y seguras."
                    />
                    <ServiceCard
                        icon={<RiTeamLine className="text-4xl text-blue-600" />}
                        title="Recursos Humanos"
                        desc="Plataformas de gestión de talento y capacitación interna."
                    />
                    <ServiceCard
                        icon={<RiShakeHandsLine className="text-4xl text-blue-600" />}
                        title="Consultoría IT"
                        desc="Asesoramiento experto para la transformación digital."
                    />
                </div>
            </section>
        </div>
    );
}

function ServiceCard({ icon, title, desc }) {
    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
            <p className="text-slate-600 leading-relaxed">{desc}</p>
        </div>
    );
}
