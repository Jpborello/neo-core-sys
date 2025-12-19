import { motion } from "framer-motion";
import { FaGem, FaPaintBrush, FaHandSparkles, FaMagic, FaTools, FaHeart } from "react-icons/fa";

const services = [
    {
        icon: <FaHandSparkles />,
        title: "Kapping Gel",
        desc: "Fortalecimiento sobre tu uña natural. Ideal para crecimiento y protección sin perder naturalidad.",
        price: "Consultar"
    },
    {
        icon: <FaPaintBrush />,
        title: "Semipermanente",
        desc: "Esmaltado de larga duración (15-21 días) con brillo espejo y secado inmediato.",
        price: "Consultar"
    },
    {
        icon: <FaMagic />,
        title: "Esculpidas",
        desc: "Extensiones en acrílico o gel para lograr el largo y la forma perfecta que siempre soñaste.",
        price: "Consultar"
    },
    {
        icon: <FaGem />,
        title: "Nail Art Premium",
        desc: "Diseños a mano alzada, cristales Swarovski, efectos y decoraciones exclusivas.",
        price: "Variable"
    },
    {
        icon: <FaHeart />,
        title: "Spa de Manos",
        desc: "Exfoliación, hidratación profunda y masajes relajantes para unas manos de seda.",
        price: "Consultar"
    },
    {
        icon: <FaTools />,
        title: "Service / Mantenimiento",
        desc: "Relleno y corrección para mantener tus uñas impecables mes a mes.",
        price: "Consultar"
    }
];

export default function Services() {
    return (
        <section id="services" className="py-24 px-6 bg-black relative z-10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
                        Mis <span className="text-fuchsia-500">Servicios</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Calidad, higiene y las últimas tendencias para el cuidado de tus manos.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ServiceCard({ service, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -10 }}
            className="group p-8 rounded-2xl bg-zinc-900 border border-white/5 hover:border-fuchsia-500/50 hover:bg-zinc-800 transition-all duration-300 shadow-lg hover:shadow-fuchsia-900/20"
        >
            <div className="mb-6 text-4xl text-yellow-500 group-hover:text-fuchsia-400 transition-colors duration-300">
                {service.icon}
            </div>
            <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-yellow-400 transition-colors">
                {service.title}
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300">
                {service.desc}
            </p>
            {/* <div className="text-sm font-bold text-fuchsia-500 uppercase tracking-widest">
        {service.price}
      </div> */}
        </motion.div>
    );
}
