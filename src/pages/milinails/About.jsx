import { motion } from "framer-motion";
import Image from "next/image";

// Placeholder image for About section. Ideally this should be a photo of Mili.
// Using one of the gallery images as a placeholder for now.
import aboutImg from "../../assets/milinails_gallery/573784776_18406262713141258_3763569287313892057_n.jpg";

export default function About() {
    return (
        <section id="about" className="py-24 px-6 bg-zinc-950 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fuchsia-900/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-600/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
                {/* Image Side */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2"
                >
                    <div className="relative group w-full max-w-md mx-auto aspect-square">
                        <div className="absolute -inset-4 border border-yellow-500/30 rounded-full scale-95 group-hover:scale-100 transition-transform duration-700"></div>
                        <div className="absolute -inset-1 bg-gradient-to-tr from-yellow-400 to-fuchsia-600 rounded-full opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-700"></div>
                        <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
                            <Image
                                src={aboutImg}
                                alt="Samanta - MiliNails"
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Text Side */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full md:w-1/2 text-center md:text-left"
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">
                        Hola, soy <span className="text-yellow-400 italic">Samanta</span>
                    </h2>

                    <div className="space-y-6 text-lg text-gray-300 font-light leading-relaxed">
                        <p>
                            Soy manicura profesional apasionada por el arte y el detalle. Mi filosofía es simple:
                            <strong className="text-white font-normal"> cada uña es un lienzo y cada clienta es única.</strong>
                        </p>
                        <p>
                            En mi estudio, no solo vas a encontrar un servicio de excelencia, sino una experiencia de relajación y belleza pensada para vos.
                            Utilizo productos de primera calidad y técnicas de vanguardia para asegurar que tus manos luzcan impecables y saludables.
                        </p>
                        <p>
                            Mi objetivo es crear diseños que no solo embellezcan tus manos, sino que reflejen tu personalidad y estilo.
                        </p>
                    </div>

                    <div className="mt-10">
                        <p className="font-serif italic text-4xl text-yellow-500/60 rotate-[-5deg] mx-auto md:mx-0 font-light tracking-wide" style={{ fontFamily: 'cursive' }}>
                            Samanta
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
