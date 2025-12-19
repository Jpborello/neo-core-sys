import { FaWhatsapp, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
    const whatsappNumber = "543413022674";
    const instagramLink = "https://www.instagram.com/las_manitosde_mili/";

    return (
        <section id="contact" className="py-24 px-6 bg-zinc-950 border-t border-white/5">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-serif text-white mb-8">Contacto</h2>
                <p className="text-gray-400 mb-12">
                    ¿Tenés dudas o querés consultar por un diseño especial? <br />
                    Escribime, te respondo lo antes posible.
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-8 mb-16">
                    <a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 px-8 py-4 bg-zinc-900 rounded-xl border border-white/10 hover:border-green-500/50 hover:text-green-400 transition-all group"
                    >
                        <FaWhatsapp className="text-2xl text-green-500 group-hover:scale-110 transition-transform" />
                        <span className="font-bold tracking-wide">WhatsApp</span>
                    </a>

                    <a
                        href={instagramLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 px-8 py-4 bg-zinc-900 rounded-xl border border-white/10 hover:border-fuchsia-500/50 hover:text-fuchsia-400 transition-all group"
                    >
                        <FaInstagram className="text-2xl text-fuchsia-500 group-hover:scale-110 transition-transform" />
                        <span className="font-bold tracking-wide">Instagram</span>
                    </a>
                </div>

                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm uppercase tracking-widest">
                    <FaMapMarkerAlt /> Rosario, Santa Fe
                </div>
            </div>
        </section>
    );
}
