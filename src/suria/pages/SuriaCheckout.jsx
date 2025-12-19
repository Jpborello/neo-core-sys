import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';

const SuriaCheckout = () => {
    const { cartItems, total, clearCart } = useCart();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here we would send the data to n8n/backend
        setSubmitted(true);
        clearCart();
    };

    if (submitted) {
        return (
            <div className="container mx-auto px-4 py-20 text-center max-w-lg">
                <div className="bg-green-50 text-green-800 p-8 rounded-lg mb-6">
                    <h2 className="font-serif text-3xl mb-4">¡Pedido Enviado!</h2>
                    <p className="mb-4">Gracias por tu compra. Hemos recibido tu pedido correctamente.</p>
                    <p className="font-bold">Te contactaremos por WhatsApp para coordinar el pago y el retiro.</p>
                </div>
                <Link to="/suria" className="text-[#C40024] hover:underline font-bold">Volver al Inicio</Link>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="font-serif text-2xl mb-4">Tu pedido está vacío</h2>
                <Link to="/suria/catalogo" className="bg-black text-white px-6 py-3 font-bold tracking-widest hover:bg-gray-800 transition">
                    IR AL CATÁLOGO
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="font-serif text-3xl mb-8 text-center">Finalizar Pedido</h1>

            <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                {/* Order Summary */}
                <div className="flex-grow lg:w-2/3">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h2 className="font-serif text-xl mb-4 border-b pb-2">Resumen del Pedido</h2>
                        <ul className="divide-y divide-gray-100">
                            {cartItems.map(item => (
                                <li key={item.id} className="py-4 flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                        <div>
                                            <p className="font-bold text-gray-900">{item.name}</p>
                                            <p className="text-sm text-gray-500">{item.code} x {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-bold text-gray-900">${(item.price * item.quantity).toLocaleString()}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
                            <span className="text-xl font-serif">Total a Pagar</span>
                            <span className="text-2xl font-bold text-[#C40024]">${total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Checkout Form */}
                <div className="lg:w-1/3">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 sticky top-24">
                        <h3 className="font-serif text-lg mb-4">Datos de Contacto</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Nombre Completo</label>
                                <input required type="text" className="w-full border border-gray-300 p-2 rounded focus:ring-1 focus:ring-[#C40024] outline-none" placeholder="Tu nombre" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                                <input required type="email" className="w-full border border-gray-300 p-2 rounded focus:ring-1 focus:ring-[#C40024] outline-none" placeholder="tu@email.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Teléfono / WhatsApp</label>
                                <input required type="tel" className="w-full border border-gray-300 p-2 rounded focus:ring-1 focus:ring-[#C40024] outline-none" placeholder="+54 9 ..." />
                            </div>
                            <button type="submit" className="w-full bg-[#C40024] text-white py-3 font-bold tracking-widest hover:bg-red-700 transition mt-4 shadow-lg">
                                CONFIRMAR PEDIDO
                            </button>
                            <p className="text-xs text-center text-gray-500 mt-2">
                                Al confirmar, recibirás un correo con el detalle. El pago se realiza en el local.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuriaCheckout;
