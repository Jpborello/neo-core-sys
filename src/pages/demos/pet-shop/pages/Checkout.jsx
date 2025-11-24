import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaCreditCard, FaPaypal, FaCheckCircle } from 'react-icons/fa';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';

export default function Checkout() {
    const { cart, cartTotal, clearCart } = useShop();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (step < 3) {
            setStep(step + 1);
        } else {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setSuccess(true);
                clearCart();
            }, 2000);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaCheckCircle className="text-green-500 text-4xl" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">¡Gracias por tu compra!</h2>
                    <p className="text-gray-500 mb-8">
                        Tu pedido #PET-2025 ha sido confirmado. Te enviamos un email con los detalles de seguimiento.
                    </p>
                    <Link
                        to="/demo-petshop"
                        className="block w-full bg-amber-500 text-white py-3 rounded-xl font-bold hover:bg-amber-600 transition-colors"
                    >
                        Volver a la Tienda
                    </Link>
                </div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h2>
                    <Link to="/demo-petshop" className="text-amber-500 font-bold hover:underline">
                        Volver a comprar
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Checkout Form */}
                    <div>
                        <div className="flex items-center gap-2 mb-8">
                            <span className="text-2xl font-extrabold text-gray-900">
                                Pet<span className="text-amber-500">Store</span>
                            </span>
                            <span className="text-gray-400">|</span>
                            <span className="text-gray-500 font-medium">Checkout Seguro <FaLock className="inline ml-1 text-xs" /></span>
                        </div>

                        {/* Steps */}
                        <div className="flex items-center mb-8 text-sm font-medium text-gray-500">
                            <span className={step >= 1 ? "text-amber-500" : ""}>Información</span>
                            <span className="mx-2">›</span>
                            <span className={step >= 2 ? "text-amber-500" : ""}>Envío</span>
                            <span className="mx-2">›</span>
                            <span className={step >= 3 ? "text-amber-500" : ""}>Pago</span>
                        </div>

                        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            {step === 1 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                    <h3 className="text-xl font-bold mb-6">Información de Contacto</h3>
                                    <div className="space-y-4">
                                        <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" required />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="text" placeholder="Nombre" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" required />
                                            <input type="text" placeholder="Apellido" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" required />
                                        </div>
                                        <input type="text" placeholder="Dirección" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" required />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="text" placeholder="Ciudad" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" required />
                                            <input type="text" placeholder="Código Postal" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" required />
                                        </div>
                                        <input type="tel" placeholder="Teléfono" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" required />
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                    <h3 className="text-xl font-bold mb-6">Método de Envío</h3>
                                    <div className="space-y-4">
                                        <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:border-amber-500 bg-gray-50">
                                            <div className="flex items-center gap-3">
                                                <input type="radio" name="shipping" defaultChecked className="text-amber-500 focus:ring-amber-500" />
                                                <div>
                                                    <p className="font-bold">Envío Estándar</p>
                                                    <p className="text-sm text-gray-500">3-5 días hábiles</p>
                                                </div>
                                            </div>
                                            <span className="font-bold">Gratis</span>
                                        </label>
                                        <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:border-amber-500">
                                            <div className="flex items-center gap-3">
                                                <input type="radio" name="shipping" className="text-amber-500 focus:ring-amber-500" />
                                                <div>
                                                    <p className="font-bold">Envío Express</p>
                                                    <p className="text-sm text-gray-500">1-2 días hábiles</p>
                                                </div>
                                            </div>
                                            <span className="font-bold">$5.00</span>
                                        </label>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                    <h3 className="text-xl font-bold mb-6">Pago</h3>
                                    <div className="space-y-4 mb-6">
                                        <div className="p-4 border rounded-lg bg-gray-50 text-center text-sm text-gray-500">
                                            <FaLock className="inline mb-1 mr-2" />
                                            Todas las transacciones son seguras y encriptadas.
                                        </div>
                                        <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-amber-500">
                                            <input type="radio" name="payment" defaultChecked className="text-amber-500 focus:ring-amber-500" />
                                            <span className="font-bold flex items-center gap-2"><FaCreditCard /> Tarjeta de Crédito / Débito</span>
                                        </label>
                                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 ml-8 space-y-3">
                                            <input type="text" placeholder="Número de tarjeta" className="w-full p-2 border rounded" />
                                            <div className="grid grid-cols-2 gap-3">
                                                <input type="text" placeholder="MM / AA" className="w-full p-2 border rounded" />
                                                <input type="text" placeholder="CVC" className="w-full p-2 border rounded" />
                                            </div>
                                        </div>
                                        <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-amber-500">
                                            <input type="radio" name="payment" className="text-amber-500 focus:ring-amber-500" />
                                            <span className="font-bold flex items-center gap-2"><FaPaypal /> PayPal</span>
                                        </label>
                                    </div>
                                </motion.div>
                            )}

                            <div className="mt-8 flex justify-between items-center">
                                {step > 1 ? (
                                    <button type="button" onClick={() => setStep(step - 1)} className="text-gray-500 hover:text-gray-800">
                                        Volver
                                    </button>
                                ) : (
                                    <Link to="/demo-petshop" className="text-gray-500 hover:text-gray-800">
                                        Volver a la tienda
                                    </Link>
                                )}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-amber-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {loading ? 'Procesando...' : step === 3 ? 'Pagar Ahora' : 'Continuar'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24">
                        <h3 className="text-xl font-bold mb-6">Resumen del Pedido</h3>
                        <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
                            {cart.map((item, index) => (
                                <div key={`${item.id}-${index}`} className="flex gap-4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden relative">
                                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                        <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-sm text-gray-900 line-clamp-2">{item.name}</h4>
                                        {item.variant && <p className="text-xs text-gray-500">{item.variant}</p>}
                                    </div>
                                    <p className="font-bold text-sm text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Envío</span>
                                <span className="text-green-600 font-medium">Gratis</span>
                            </div>
                        </div>

                        <div className="border-t mt-4 pt-4 flex justify-between items-center">
                            <span className="text-lg font-bold text-gray-900">Total</span>
                            <span className="text-2xl font-extrabold text-gray-900">${cartTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
