import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Trash2, Plus, Minus, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { motion } from 'framer-motion';

const Cart = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity, cartTotal, submitOrder } = useRestaurant();
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const handlePayment = async () => {
        setIsProcessing(true);
        // Send order to Waiter for approval
        setTimeout(async () => {
            const result = await submitOrder({ status: 'waiting_waiter', payment_status: 'pending' });
            setIsProcessing(false);
            if (result && result.success) {
                setOrderSuccess(true);
            } else {
                alert("Error al procesar el pedido: " + (result?.error || "Error desconocido"));
            }
        }, 1000); // Reduced delay since it's just a submission
    };

    if (orderSuccess) {
        return (
            <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-8 text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6"
                >
                    <CheckCircle2 size={48} className="text-black" />
                </motion.div>
                <h1 className="text-3xl font-bold mb-4">¡Pedido Recibido!</h1>
                <p className="text-neutral-400 mb-8">La cocina ya está preparando tu orden. Te avisaremos cuando esté lista.</p>
                <button
                    onClick={() => { setOrderSuccess(false); navigate('/demo-restaurant/menu'); }}
                    className="w-full bg-neutral-800 text-white py-3 rounded-xl font-bold"
                >
                    Volver al Menú
                </button>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-8 text-center">
                <h2 className="text-2xl font-bold text-neutral-500 mb-4">Tu carrito está vacío</h2>
                <button onClick={() => navigate('/demo-restaurant/menu')} className="text-amber-500 font-bold">Volver al Menú</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-900 text-white pb-32">
            {/* Header */}
            <div className="flex items-center gap-4 p-4 border-b border-neutral-800 sticky top-0 bg-neutral-900/90 backdrop-blur-md z-30">
                <button onClick={() => navigate(-1)}><ChevronLeft /></button>
                <h1 className="font-bold text-lg">Mi Pedido</h1>
            </div>

            {/* Items */}
            <div className="p-4 space-y-4">
                {cart.map(item => (
                    <div key={item.id} className="flex gap-4 bg-neutral-800/50 p-4 rounded-2xl border border-neutral-800">
                        <div className="w-16 h-16 rounded-lg bg-neutral-700 overflow-hidden shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between mb-1">
                                <h3 className="font-bold">{item.name}</h3>
                                <button onClick={() => removeFromCart(item.id)} className="text-neutral-500 hover:text-red-400"><Trash2 size={16} /></button>
                            </div>
                            <div className="text-amber-500 font-bold mb-2">${(item.price * item.quantity).toLocaleString()}</div>
                            <div className="flex items-center gap-3">
                                <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 flex items-center justify-center bg-neutral-700 rounded-full"><Minus size={14} /></button>
                                <span className="font-mono">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 flex items-center justify-center bg-neutral-700 rounded-full"><Plus size={14} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800 p-6 z-40">
                <div className="flex justify-between items-end mb-6">
                    <span className="text-neutral-400 text-sm">Total Estimado</span>
                    <span className="text-2xl font-bold text-white">${cartTotal.toLocaleString()}</span>
                </div>

                <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isProcessing ? 'Enviando...' : (
                        <>
                            <CheckCircle2 size={20} /> Confirmar Pedido
                        </>
                    )}
                </button>
                <div className="text-center mt-3 text-xs text-neutral-500">
                    El pago se realizará al cerrar la mesa
                </div>
            </div>
        </div>
    );
};

export default Cart;
