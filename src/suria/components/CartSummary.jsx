import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

const CartSummary = () => {
    const { cartItems, total } = useCart();
    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    if (itemCount === 0) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 z-40">
            <div className="container mx-auto flex justify-between items-center max-w-4xl">
                <div>
                    <p className="text-gray-600 text-sm font-sans">Total Estimado ({itemCount} ítems)</p>
                    <p className="text-[#C40024] text-2xl font-bold font-sans">${total.toLocaleString()}</p>
                </div>
                <Link
                    to="/suria/checkout"
                    className="bg-black text-white px-8 py-3 font-bold tracking-widest hover:bg-gray-800 transition uppercase text-sm md:text-base"
                >
                    Finalizar Pedido
                </Link>
            </div>
        </div>
    );
};

export default CartSummary;
