import GeometricHeroBackground from "./GeometricHeroBackground";
import { RiSmartphoneLine, RiLayoutGridLine, RiGlobalLine } from "react-icons/ri";
import { RiLightbulbLine, RiShieldCheckLine, RiRocketLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Portfolio from "./Portfolio";

export default function Home() {
    return (
        <div className="relative min-h-screen text-white bg-black overflow-x-hidden">
            {/* 3D BACKGROUND */}
            <GeometricHeroBackground />

            {/* HERO */}
            <main className="relative z-10 flex flex-col items-center justify-center text-center py-20 px-6 min-h-screen">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                >
                    Neo-Core-Sys
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="text-xl md:text-3xl text-gray-200 font-light max-w-3xl mb-8"
                >
                    Transformamos ideas en experiencias digitales de alto impacto.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-gray-400 text-sm md:text-lg tracking-widest uppercase mb-12"
                >
                    Apps Mobile • Sistemas Web • Automatización Inteligente
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 1 }}
                    className="flex flex-col md:flex-row gap-6"
                >
                    <a
                        href="#contacto"
                        className="px-8 py-4 bg-white text-black text-lg rounded-full font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                        Cotizar mi Proyecto
                    </a>
                    <a
                        href="#portfolio"
                        className="px-8 py-4 bg-white/10 text-white text-lg rounded-full font-bold border border-white/20 hover:bg-white/20 backdrop-blur-md transition-all hover:scale-105"
                    >
                        Ver Casos de Éxito
                    </a>
                </motion.div>
            </main>

            {/* SERVICIOS */}
            <section id="services" className="relative z-10 py-24 flex flex-col">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-12 text-white"
                >
                    Nuestros Servicios
                </motion.h2>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-x-24 gap-y-32 max-w-7xl w-full"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
                >
                    {/* Tarjetas */}
                    <ServiceCard
                        icon={<RiSmartphoneLine className="text-4xl text-purple-400" />}
                        title="Apps Mobile"
                        text="Desarrollo de aplicaciones móviles Android/iOS con Flutter o React Native."
                    />

                    <ServiceCard
                        icon={<RiLayoutGridLine className="text-4xl text-blue-400" />}
                        title="Sistemas Web"
                        text="Paneles administrativos, sistemas de turnos, plataformas y dashboards."
                    />

                    <ServiceCard
                        icon={<RiGlobalLine className="text-4xl text-teal-400" />}
                        title="Páginas Web"
                        text="Sitios corporativos elegantes, rápidos y hechos a medida."
                    />
                </motion.div>
            </section>

            {/* POR QUÉ ELEGIRNOS */}
            <section id="why-us" className="relative z-10 py-24 flex flex-col">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-16 text-center"
                >
                    ¿Por qué elegirnos?
                </motion.h2>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-x-24 gap-y-32 max-w-7xl w-full"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
                >

                    <WhyCard
                        icon={<RiLightbulbLine className="text-purple-400 text-4xl" />}
                        title="Innovación"
                        text="Soluciones modernas y creativas para que tu proyecto destaque."
                    />

                    <WhyCard
                        icon={<RiShieldCheckLine className="text-blue-400 text-4xl" />}
                        title="Seguridad"
                        text="Protección total de tus datos con mejores prácticas."
                    />

                    <WhyCard
                        icon={<RiRocketLine className="text-teal-400 text-4xl" />}
                        title="Rapidez"
                        text="Entrega optimizada sin sacrificar calidad ni diseño."
                    />
                </motion.div>
            </section>
            {/* PORTFOLIO */}
            <Portfolio />
            {/* CONTACTO */}
            <ContactForm />
        </div>
    );
}
/* COMPONENTES REUTILIZADOS */
function ServiceCard({ icon, title, text }) {
    return (
        <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ scale: 1.05, rotateY: 10 }}
            className="p-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 transition-all relative overflow-hidden"
        >
            <div className="flex items-center justify-center mb-4">{icon}</div>
            <h3 className="text-2xl font-semibold mb-4 text-white">{title}</h3>
            <p className="text-gray-300">{text}</p>
        </motion.div>
    );
}
function WhyCard({ icon, title, text }) {
    return (
        <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ scale: 1.05, rotateY: 10 }}
            className="p-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 transition-all relative overflow-hidden max-w-xs mx-auto"
        >
            <div className="flex items-center justify-center mb-4">{icon}</div>
            <h3 className="text-2xl font-semibold mb-3 text-white text-center">{title}</h3>
            <p className="text-gray-300 text-center">{text}</p>
        </motion.div>
    );
}

function ContactForm() {
    return (
        <section id="contacto" className="relative z-10 py-24 flex flex-col">
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-10 text-center"
            >
                Contacto
            </motion.h2>

            <p className="text-gray-300 max-w-xl text-center mb-8">
                Si tenés una idea o querés que trabajemos juntos, escribime.
            </p>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const f = e.target;

                    fetch("https://formspree.io/f/xeovzyyw", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            nombre: f.nombre.value,
                            email: f.email.value,
                            mensaje: f.mensaje.value,
                        }),
                    }).then((r) => {
                        alert(r.ok ? "Mensaje enviado!" : "Error al enviar el mensaje");
                        if (r.ok) f.reset();
                    });
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full"
            >
                <input className="p-4 rounded-xl bg-white/10 text-white" name="nombre" placeholder="Tu nombre" required />
                <input className="p-4 rounded-xl bg-white/10 text-white" name="email" placeholder="Tu email" required />
                <textarea className="p-4 rounded-xl bg-white/10 text-white md:col-span-2" name="mensaje" rows="4" placeholder="Mensaje..." required />
                <button type="submit" className="md:col-span-2 bg-purple-600 hover:bg-purple-700 transition p-4 rounded-xl font-semibold">
                    Enviar mensaje
                </button>
            </form>

            <div className="mt-10 flex gap-6">
                <a href="https://wa.me/+5493417981212" className="text-purple-400 hover:text-purple-200 text-xl">WhatsApp</a>
                <a href="https://instagram.com/juamp11" className="text-purple-400 hover:text-purple-200 text-xl">Instagram</a>
                <a href="mailto:contacto@neo-core-sys.com" className="text-purple-400 hover:text-purple-200 text-xl">Email</a>
            </div>
        </section>
    );
}
