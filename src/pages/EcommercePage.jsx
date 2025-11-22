import { motion } from "framer-motion";
import { FaShoppingCart, FaStar } from "react-icons/fa";

const PRODUCTS = [
    {
        id: 1,
        name: "Neon Cyber Deck",
        price: "$299",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=500&q=80",
        category: "Hardware"
    },
    {
        id: 2,
        name: "Holo-Visor V2",
        price: "$149",
        image: "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?auto=format&fit=crop&w=500&q=80",
        category: "Wearable"
    },
    {
        id: 3,
        name: "Quantum Chipset",
        price: "$599",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80",
        category: "Components"
    },
    {
        id: 4,
        name: "Neural Interface",
        price: "$899",
        image: "https://images.unsplash.com/photo-1592478411213-61535fdd861d?auto=format&fit=crop&w=500&q=80",
        category: "Implants"
    },
    {
        id: 5,
        name: "Cyberpunk Jacket",
        price: "$199",
        image: "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=500&q=80",
        category: "Apparel"
    },
    {
        id: 6,
        name: "Plasma Katana",
        price: "$450",
        image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=500&q=80",
        category: "Collectibles"
    }
];

export default function EcommercePage() {
    return (
        <div className="container mx-auto px-6 py-12">
            <header className="mb-16 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-bold mb-4"
                >
                    Neo <span className="text-purple-500">Store</span>
                </motion.h1>
                <p className="text-gray-400 text-xl">Equipamiento para el futuro digital.</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {PRODUCTS.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                ))}
            </div>
        </div>
    );
}

function ProductCard({ product, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="glass-panel rounded-2xl overflow-hidden group"
        >
            <div className="relative h-64 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="px-6 py-3 bg-white text-black rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        Ver Detalles
                    </button>
                </div>
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {product.category}
                </div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{product.name}</h3>
                    <span className="text-purple-400 font-bold text-xl">{product.price}</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-400 text-sm mb-6">
                    <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                    <span className="text-gray-500 ml-2">(4.9)</span>
                </div>
                <button className="w-full py-3 bg-white/10 hover:bg-purple-600 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                    <FaShoppingCart /> Agregar al Carrito
                </button>
            </div>
        </motion.div>
    );
}
