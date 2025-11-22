import { motion } from "framer-motion";

export default function DemoRestaurant() {
    return (
        <div className="min-h-screen bg-[#1a1a1a] text-[#e5e5e5] font-serif">
            {/* HERO */}
            <header className="relative h-screen flex flex-col items-center justify-center text-center px-6">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1920&q=80"
                        alt="Bar Background"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="relative z-20 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <p className="text-amber-500 text-lg tracking-[0.3em] uppercase mb-6">Desde 1985</p>
                        <h1 className="text-6xl md:text-8xl font-medium mb-8 font-serif italic">
                            La Bella Vita
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light">
                            Cocina de autor & Coctelería clásica
                        </p>
                        <button className="px-10 py-4 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black transition-all duration-300 uppercase tracking-widest text-sm">
                            Reservar Mesa
                        </button>
                    </motion.div>
                </div>
            </header>

            {/* MENU HIGHLIGHT */}
            <section className="py-24 px-6 bg-[#1a1a1a]">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-serif italic mb-4 text-amber-500">Nuestros Platos</h2>
                        <div className="w-24 h-1 bg-amber-500 mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <MenuItem
                            title="Risotto al Tartufo"
                            price="$24"
                            desc="Arroz arborio, trufa negra fresca, parmesano reggiano de 24 meses."
                        />
                        <MenuItem
                            title="Bife de Chorizo"
                            price="$32"
                            desc="Corte premium madurado 45 días, acompañado de papas rústicas."
                        />
                        <MenuItem
                            title="Salmón Rosado"
                            price="$28"
                            desc="A la parrilla con salsa de cítricos y espárragos grillados."
                        />
                        <MenuItem
                            title="Tiramisú Clásico"
                            price="$12"
                            desc="La receta original de la nonna con mascarpone importado."
                        />
                    </div>

                    <div className="text-center mt-16">
                        <a href="#" className="text-amber-500 hover:text-amber-400 border-b border-amber-500 pb-1 transition-colors">Ver Menú Completo</a>
                    </div>
                </div>
            </section>

            {/* GALLERY / AMBIANCE */}
            <section className="grid grid-cols-1 md:grid-cols-3 h-[60vh]">
                <div className="relative group overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Drink" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors" />
                </div>
                <div className="relative group overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Food" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors" />
                </div>
                <div className="relative group overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Place" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors" />
                </div>
            </section>
        </div>
    );
}

function MenuItem({ title, price, desc }) {
    return (
        <div className="flex justify-between items-start border-b border-white/10 pb-6">
            <div className="pr-4">
                <h3 className="text-2xl font-serif mb-2">{title}</h3>
                <p className="text-gray-400 font-sans text-sm">{desc}</p>
            </div>
            <span className="text-xl font-serif text-amber-500">{price}</span>
        </div>
    );
}
