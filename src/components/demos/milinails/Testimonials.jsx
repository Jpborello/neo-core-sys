import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
    {
        name: "Carla M.",
        text: "¡Increíble atención! Samanta es súper detallista y mis uñas duraron perfectas más de 20 días. El nail art que me hizo fue tal cual la foto que le llevé.",
        rating: 5
    },
    {
        name: "Sofia R.",
        text: "El mejor lugar para hacerse las manos. El ambiente es hermoso y los productos son de primera calidad. ¡Súper recomiendo el kapping!",
        rating: 5
    },
    {
        name: "Valentina L.",
        text: "Amo mis uñas esculpidas. Me las dejó súper naturales y resistentes. Además es un amor de persona. ¡Ya tengo mi turno para el mes que viene!",
        rating: 5
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 px-6 bg-black">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-serif text-center mb-16 text-gray-400"
                >
                    Lo que dicen mis <span className="text-white">clientas</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <TestimonialCard key={i} testimonial={t} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function TestimonialCard({ testimonial, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-zinc-900 p-8 rounded-2xl relative border border-white/5 hover:border-white/10 transition-colors"
        >
            <FaQuoteLeft className="text-4xl text-fuchsia-900/40 absolute top-6 left-6" />

            <div className="relative z-10 pt-6">
                <p className="text-gray-300 italic mb-6 leading-relaxed min-h-[100px]">
                    "{testimonial.text}"
                </p>

                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold text-sm shadow-lg">
                        {testimonial.name.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-sm">{testimonial.name}</h4>
                        <div className="flex text-yellow-500 text-xs mt-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <FaStar key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
