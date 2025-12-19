import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingBag, FaBars, FaTimes, FaPaw, FaSearch, FaUser } from 'react-icons/fa';
import { useShop } from '@/context/ShopContext';

export default function PetShopLayout() {
    const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useShop();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const location = useLocation();

    // Scroll to top on route change
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className="font-sans text-gray-800 bg-white min-h-screen flex flex-col">
            {/* Announcement Bar */}
            <div className="bg-amber-500 text-white text-xs font-bold text-center py-2 tracking-wide">
                ENVÍO GRATIS EN PEDIDOS SUPERIORES A $50.000 🚚
            </div>

            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Mobile Menu Button */}
                        <div className="flex items-center md:hidden">
                            <button onClick={() => setIsMobileMenuOpen(true)} className="text-gray-600 hover:text-amber-500 p-2">
                                <FaBars className="text-xl" />
                            </button>
                        </div>

                        {/* Logo */}
                        <Link to="/demo-petshop" className="flex items-center gap-2 group">
                            <div className="bg-amber-100 p-2 rounded-full group-hover:bg-amber-200 transition-colors">
                                <FaPaw className="text-amber-500 text-2xl" />
                            </div>
                            <span className="text-2xl font-extrabold tracking-tight text-gray-900">
                                Pet<span className="text-amber-500">Store</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link to="/demo-petshop" className="text-sm font-bold text-gray-600 hover:text-amber-500 uppercase tracking-wide transition-colors">Home</Link>
                            <Link to="/demo-petshop/catalog" className="text-sm font-bold text-gray-600 hover:text-amber-500 uppercase tracking-wide transition-colors">Catálogo</Link>
                            <Link to="/demo-petshop/about" className="text-sm font-bold text-gray-600 hover:text-amber-500 uppercase tracking-wide transition-colors">Nosotros</Link>
                            <Link to="/demo-petshop/contact" className="text-sm font-bold text-gray-600 hover:text-amber-500 uppercase tracking-wide transition-colors">Contacto</Link>
                        </div>

                        {/* Icons */}
                        <div className="flex items-center gap-4">
                            <button className="text-gray-400 hover:text-amber-500 transition-colors p-2 hidden sm:block">
                                <FaSearch className="text-lg" />
                            </button>
                            <button className="text-gray-400 hover:text-amber-500 transition-colors p-2 hidden sm:block">
                                <FaUser className="text-lg" />
                            </button>
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative text-gray-600 hover:text-amber-500 transition-colors p-2"
                            >
                                <FaShoppingBag className="text-xl" />
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 z-50 md:hidden"
                        />
                        <motion.div
                            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                            transition={{ type: 'tween' }}
                            className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white z-50 shadow-xl md:hidden flex flex-col"
                        >
                            <div className="p-4 flex justify-between items-center border-b">
                                <span className="font-bold text-lg">Menú</span>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2"><FaTimes /></button>
                            </div>
                            <div className="flex flex-col p-4 space-y-4">
                                <Link to="/demo-petshop" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-800">Home</Link>
                                <Link to="/demo-petshop/catalog" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-800">Catálogo</Link>
                                <Link to="/demo-petshop/about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-800">Nosotros</Link>
                                <Link to="/demo-petshop/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-800">Contacto</Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Cart Sidebar */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="fixed inset-0 bg-black/50 z-[60]"
                        />
                        <motion.div
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-[60] shadow-2xl flex flex-col"
                        >
                            <div className="p-5 flex justify-between items-center border-b bg-gray-50">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <FaShoppingBag className="text-amber-500" /> Tu Carrito
                                </h2>
                                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-5 space-y-6">
                                {cart.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                                        <FaShoppingBag className="text-6xl mb-4 opacity-20" />
                                        <p className="text-lg font-medium">Tu carrito está vacío</p>
                                        <button
                                            onClick={() => setIsCartOpen(false)}
                                            className="mt-4 text-amber-500 font-bold hover:underline"
                                        >
                                            Seguir comprando
                                        </button>
                                    </div>
                                ) : (
                                    cart.map((item, index) => (
                                        <div key={`${item.id}-${index}`} className="flex gap-4">
                                            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-800 line-clamp-1">{item.name}</h3>
                                                {item.variant && <p className="text-sm text-gray-500">{item.variant}</p>}
                                                <div className="flex justify-between items-center mt-2">
                                                    <div className="flex items-center border rounded-lg">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                                                            className="px-2 py-1 hover:bg-gray-100 text-gray-600"
                                                        >-</button>
                                                        <span className="px-2 text-sm font-medium">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                                                            className="px-2 py-1 hover:bg-gray-100 text-gray-600"
                                                        >+</button>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-amber-600">${(item.price * item.quantity).toFixed(2)}</p>
                                                        <button
                                                            onClick={() => removeFromCart(item.id, item.variant)}
                                                            className="text-xs text-red-400 hover:text-red-600 underline mt-1"
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {cart.length > 0 && (
                                <div className="p-5 border-t bg-gray-50">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="text-2xl font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-4 text-center">Impuestos y envío calculados en el checkout.</p>
                                    <Link
                                        to="/demo-petshop/checkout"
                                        onClick={() => setIsCartOpen(false)}
                                        className="block w-full py-4 bg-amber-500 text-white text-center font-bold rounded-xl hover:bg-amber-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                                    >
                                        FINALIZAR COMPRA
                                    </Link>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <FaPaw className="text-amber-500 text-2xl" />
                                <span className="text-2xl font-bold">PetStore</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Tu tienda de confianza para consentir a tus mascotas. Productos premium, envíos rápidos y amor incondicional.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-6">Enlaces Rápidos</h4>
                            <ul className="space-y-3 text-gray-400 text-sm">
                                <li><Link to="/demo-petshop/catalog" className="hover:text-amber-500 transition-colors">Catálogo Completo</Link></li>
                                <li><Link to="/demo-petshop/about" className="hover:text-amber-500 transition-colors">Sobre Nosotros</Link></li>
                                <li><Link to="/demo-petshop/contact" className="hover:text-amber-500 transition-colors">Contacto</Link></li>
                                <li><Link to="/demo-petshop/faq" className="hover:text-amber-500 transition-colors">Preguntas Frecuentes</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-6">Políticas</h4>
                            <ul className="space-y-3 text-gray-400 text-sm">
                                <li><Link to="#" className="hover:text-amber-500 transition-colors">Envíos y Devoluciones</Link></li>
                                <li><Link to="#" className="hover:text-amber-500 transition-colors">Términos del Servicio</Link></li>
                                <li><Link to="#" className="hover:text-amber-500 transition-colors">Política de Privacidad</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-6">Newsletter</h4>
                            <p className="text-gray-400 text-sm mb-4">Suscribite para recibir ofertas exclusivas.</p>
                            <div className="flex">
                                <input type="email" placeholder="Tu email" className="bg-gray-800 text-white px-4 py-2 rounded-l-lg w-full focus:outline-none focus:ring-1 focus:ring-amber-500" />
                                <button className="bg-amber-500 px-4 py-2 rounded-r-lg font-bold hover:bg-amber-600 transition-colors">OK</button>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                        <p>&copy; 2025 PetStore Demo. Created by Neo-Core-Sys.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
