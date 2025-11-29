import React from 'react';
import { useCart } from './CartContext.jsx';

const ProductCard = ({ product }) => {
    const { addToCart, removeFromCart, getItemQuantity } = useCart();
    const quantity = getItemQuantity(product.id);

    return (
        <div className="group">
            <div className="relative overflow-hidden bg-gray-100 aspect-[3/4] mb-4">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Quantity Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-3 translate-y-full group-hover:translate-y-0 transition duration-300 flex items-center justify-between border-t border-gray-200">
                    {quantity === 0 ? (
                        <button
                            onClick={() => addToCart(product)}
                            className="w-full bg-black text-white py-2 font-sans text-sm tracking-wide hover:bg-gray-800 transition"
                        >
                            AGREGAR
                        </button>
                    ) : (
                        <div className="flex items-center justify-between w-full">
                            <button
                                onClick={() => removeFromCart(product.id)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition"
                            >
                                -
                            </button>
                            <span className="font-bold text-lg">{quantity}</span>
                            <button
                                onClick={() => addToCart(product)}
                                className="w-8 h-8 flex items-center justify-center bg-black text-white hover:bg-gray-800 rounded-full transition"
                            >
                                +
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-serif text-lg text-gray-900 leading-tight">{product.name}</h3>
                    <p className="text-gray-500 text-sm font-sans">{product.code}</p>
                </div>
                <p className="font-bold text-[#C40024] font-sans">${product.price.toLocaleString()}</p>
            </div>
        </div>
    );
};

export default ProductCard;
