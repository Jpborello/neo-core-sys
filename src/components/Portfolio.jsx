import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

export default function Portfolio() {
    const projects = [
        {
            name: "StepUp – App Fitness",
            description: "App de entrenamientos, comunidad, rutinas, pagos y beneficios. Disponible en PlayStore.",
            image:
                "https://play-lh.googleusercontent.com/5g5SsTG2LQ2JBBbTzeQuv8ngWUX4jzPMQLVXdvWDHNs7kNzNLePb_8w2e2vOtBL3j0neguQIHH31Ke2fTCSlH1I=w480-h960-rw",
            link: "https://play.google.com/store/apps/details?id=com.jpborello.stepupapp",
        },
        {
            name: "Sistema de Turnos",
            description: "Sistema simple y efectivo para reserva de turnos — ideal para pequeños negocios.",
            image:
                "https://www.gstatic.com/images/branding/product/1x/forms_2020q4_48dp.png", // ícono temporal de Google Forms
            link: "https://docs.google.com/forms/d/e/1FAIpQLSe1ThadDmbO3fhglFWV2-hOqOTr2u90QDt3gjU0KANbT0qsQg/viewform",
        },
    ];

    return (
        <section className="w-full py-20 bg-black text-white" id="portfolio">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-4xl font-bold mb-12">Portfolio</h2>

                <div className="grid md:grid-cols-2 gap-10">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.4 }}
                            viewport={{ once: true }}
                            className="rounded-2xl overflow-hidden bg-neutral-900 shadow-lg border border-neutral-700"
                        >
                            <img
                                src={project.image}
                                alt={project.name}
                                className="w-full h-56 object-cover"
                            />

                            <div className="p-6">
                                <h3 className="text-2xl font-semibold mb-2">{project.name}</h3>
                                <p className="text-neutral-400 mb-4">{project.description}</p>

                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
                                >
                                    Ver proyecto <FaArrowRight />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
