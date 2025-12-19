import { motion } from "framer-motion";
import { FaWhatsapp, FaInstagram, FaCalendarCheck, FaStar, FaQuoteLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

// Assets
import logo from "../../assets/milinails_logo.png";

// Gallery Images
import img1 from "../../assets/milinails_gallery/571755296_18405628063141258_6293387730718516622_n.jpg";
import img2 from "../../assets/milinails_gallery/573784776_18406262713141258_3763569287313892057_n.jpg";
import img3 from "../../assets/milinails_gallery/573810205_18406731754141258_429043636705921679_n.jpg";
import img4 from "../../assets/milinails_gallery/574648984_18406731652141258_6371759511643176455_n.jpg";
import img5 from "../../assets/milinails_gallery/584160237_18409556755141258_7272328860586625606_n.jpg";
import img6 from "../../assets/milinails_gallery/584180623_18409557043141258_4079004623399829127_n.jpg";
import img7 from "../../assets/milinails_gallery/584396432_18409557901141258_4382440215725663460_n.jpg";

const heroImage = img7; // Using one of the real images for Hero
const aboutPhoto = img2; // Using another real image for About

const bookingLink = "https://docs.google.com/forms/d/e/1FAIpQLSe1ThadDmbO3fhglFWV2-hOqOTr2u90QDt3gjU0KANbT0qsQg/viewform";
const whatsappNumber = "543413022674";
const instagramLink = "https://www.instagram.com/las_manitosde_mili/";

export default function MiliNails() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-fuchsia-500 selection:text-white overflow-x-hidden">
            {/* FLOATING BOOKING BUTTON */}
            <a
                href={bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-3 px-6 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.5)] hover:scale-110 transition-transform flex items-center gap-2 animate-pulse"
            >
                <FaCalendarCheck /> Reservar Turno
            </a>

            {/* NAVBAR */}
            <nav className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 max-w-7xl mx-auto">
                <Link to="/" className="text-2xl font-serif italic text-yellow-500 tracking-widest">
                    <img src={logo} alt="MiliNails Logo" className="h-16 w-auto object-contain" />
                </Link>
                <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-gray-300">
                    <a href="#about" className="hover:text-yellow-400 transition-colors">Sobre Mí</a>
                    <a href="#services" className="hover:text-yellow-400 transition-colors">Servicios</a>
                    <a href="#gallery" className="hover:text-yellow-400 transition-colors">Galería</a>
                    <a href="#contact" className="hover:text-yellow-400 transition-colors">Contacto</a>
                </div>
            </nav>

            {/* HERO SECTION */}
            <header className="relative min-h-screen flex items-center justify-center text-center px-6 py-20">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img src={heroImage} alt="Luxury Nails" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black"></div>
                </div>

                <div className="relative z-10 max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-4xl md:text-7xl font-serif text-white mb-6 leading-tight"
                    >
                        Tus manos dicen más <br /> de lo que <span className="text-yellow-400 italic">imaginás</span>.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-xl md:text-2xl text-gray-200 mb-10 font-light"
                    >
                        Yo me ocupo de que hablen bien de vos 💅✨
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center"
                    >
                        <a
                            href={bookingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-fuchsia-700 hover:bg-fuchsia-600 text-white rounded-none border border-fuchsia-500 font-bold uppercase tracking-widest transition-all hover:shadow-[0_0_30px_rgba(192,38,211,0.4)]"
                        >
                            Reservar Turno
                        </a>
                        <a
                            href="#gallery"
                            className="px-8 py-4 bg-transparent border border-white/30 hover:border-yellow-400 hover:text-yellow-400 text-white rounded-none font-bold uppercase tracking-widest transition-all backdrop-blur-sm"
                        >
                            Ver Trabajos
                        </a>
                    </motion.div>
                </div>
            </header>

            {/* ABOUT SECTION */}
            <section id="about" className="py-24 px-6 bg-zinc-900">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/2"
                    >
                        <div className="relative">
                            <div className="absolute -inset-4 border-2 border-yellow-500/30 rounded-full"></div>
                            <img src={aboutPhoto} alt="Samanta Manicura" className="w-full max-w-md mx-auto rounded-full shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/2 text-center md:text-left"
                    >
                        <h2 className="text-4xl font-serif text-yellow-400 mb-6">Hola! Soy Samanta</h2>
                        <p className="text-xl text-gray-300 leading-relaxed mb-6">
                            Manicura profesional apasionada por el detalle. Mi objetivo es crear diseños únicos que no solo embellezcan tus manos, sino que reflejen tu personalidad.
                        </p>
                        <p className="text-gray-400">
                            Me especializo en Nail Art personalizado y cuidado integral de la uña. Cada sesión es un momento para vos, para relajarte y salir brillando.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* SERVICES SECTION */}
            <section id="services" className="py-24 px-6 bg-black relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-fuchsia-900/20 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-600/10 blur-[100px] rounded-full"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <h2 className="text-4xl md:text-5xl font-serif text-center mb-16">
                        Mis <span className="text-fuchsia-500">Servicios</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ServiceItem title="Kapping" price="Consultar" desc="Fortalecimiento de tu uña natural con una fina capa de gel o acrílico." />
                        <ServiceItem title="Semipermanente" price="Consultar" desc="Esmaltado de larga duración con brillo intenso y secado inmediato." />
                        <ServiceItem title="Esculpidas" price="Consultar" desc="Extensiones de uñas con acrílico o gel para lograr el largo y forma deseados." />
                        <ServiceItem title="Nail Art" price="Variable" desc="Diseños a mano alzada, cristales, efectos y decoraciones personalizadas." />
                        <ServiceItem title="Spa de Manos" price="Consultar" desc="Exfoliación, hidratación profunda y masajes para unas manos de seda." />
                        <ServiceItem title="Service / Mantenimiento" price="Consultar" desc="Relleno y corrección para mantener tus uñas impecables." />
                    </div>
                </div>
            </section>

            {/* GALLERY SECTION */}
            <section id="gallery" className="py-24 px-6 bg-zinc-900">
                <h2 className="text-4xl md:text-5xl font-serif text-center mb-16 text-white">
                    Galería de <span className="text-yellow-400">Trabajos</span>
                </h2>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                    <GalleryImage src={img1} />
                    <GalleryImage src={img2} />
                    <GalleryImage src={img3} />
                    <GalleryImage src={img4} />
                    <GalleryImage src={img5} />
                    <GalleryImage src={img6} />
                    <GalleryImage src={img7} />
                </div>

                <div className="text-center mt-12">
                    <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="inline-block border-b border-yellow-400 text-yellow-400 pb-1 hover:text-white hover:border-white transition-colors">
                        Ver más en Instagram
                    </a>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="py-24 px-6 bg-black">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-serif text-center mb-16 text-gray-400">Lo que dicen mis clientas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Testimonial
                            name="Carla M."
                            text="¡Increíble atención! Samanta es súper detallista y mis uñas duraron perfectas más de 20 días. El nail art que me hizo fue tal cual la foto que le llevé."
                        />
                        <Testimonial
                            name="Sofia R."
                            text="El mejor lugar para hacerse las manos. El ambiente es hermoso y los productos son de primera calidad. ¡Súper recomiendo el kapping!"
                        />
                        <Testimonial
                            name="Valentina L."
                            text="Amo mis uñas esculpidas. Me las dejó súper naturales y resistentes. Además es un amor de persona. ¡Ya tengo mi turno para el mes que viene!"
                        />
                    </div>
                </div>
            </section>

            {/* BOOKING CTA */}
            <section className="py-32 px-6 bg-gradient-to-r from-fuchsia-900 to-purple-900 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10">
                    <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">¿Lista para brillar?</h2>
                    <p className="text-xl text-fuchsia-200 mb-12 max-w-2xl mx-auto">
                        Los turnos vuelan. Asegurá tu lugar hoy mismo y regalate ese mimo que te merecés.
                    </p>
                    <a
                        href={bookingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-12 py-5 bg-white text-fuchsia-900 font-bold text-xl rounded-full shadow-2xl hover:scale-105 transition-transform"
                    >
                        RESERVAR AHORA
                    </a>
                </div>
            </section>

            {/* CONTACT & FOOTER */}
            <footer id="contact" className="bg-zinc-950 py-16 px-6 border-t border-white/10">
                <div className="max-w-4xl mx-auto text-center">
                    <img src={logo} alt="Logo" className="h-20 w-auto mx-auto mb-8 opacity-80" />

                    <div className="flex justify-center gap-8 mb-12">
                        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-4xl text-green-500 hover:text-green-400 transition-colors">
                            <FaWhatsapp />
                        </a>
                        <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="text-4xl text-fuchsia-500 hover:text-fuchsia-400 transition-colors">
                            <FaInstagram />
                        </a>
                    </div>

                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Las Manitos de Mili. Todos los derechos reservados. <br />
                        Diseñado por <span className="text-white">Neo-Core-Sys</span>.
                    </p>
                </div>
            </footer>
        </div>
    );
}

function ServiceItem({ title, price, desc }) {
    return (
        <div className="p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group">
            <div className="flex justify-between items-baseline mb-4">
                <h3 className="text-2xl font-serif text-yellow-400 group-hover:text-white transition-colors">{title}</h3>
                {/* <span className="text-sm text-gray-400">{price}</span> */}
            </div>
            <p className="text-gray-400 leading-relaxed">{desc}</p>
        </div>
    )
}

function GalleryImage({ src }) {
    return (
        <div className="overflow-hidden h-80 group relative cursor-pointer">
            <img src={src} alt="Nail Art" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-serif italic text-lg tracking-widest border-b border-yellow-400 pb-1">Ver Detalle</span>
            </div>
        </div>
    )
}

function Testimonial({ name, text }) {
    return (
        <div className="bg-zinc-900 p-8 rounded-2xl relative">
            <FaQuoteLeft className="text-4xl text-fuchsia-900/50 absolute top-6 left-6" />
            <p className="text-gray-300 italic mb-6 relative z-10 leading-relaxed">"{text}"</p>
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {name.charAt(0)}
                </div>
                <div>
                    <h4 className="font-bold text-white">{name}</h4>
                    <div className="flex text-yellow-500 text-xs">
                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                    </div>
                </div>
            </div>
        </div>
    )
}
