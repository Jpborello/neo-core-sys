import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('petShopCart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('petShopCart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantity = 1, variant = null) => {
        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(item => item.id === product.id && item.variant === variant);
            if (existingItemIndex > -1) {
                const newCart = [...prevCart];
                newCart[existingItemIndex].quantity += quantity;
                return newCart;
            } else {
                return [...prevCart, { ...product, quantity, variant }];
            }
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId, variant = null) => {
        setCart(prevCart => prevCart.filter(item => !(item.id === productId && item.variant === variant)));
    };

    const updateQuantity = (productId, quantity, variant = null) => {
        if (quantity < 1) return;
        setCart(prevCart => prevCart.map(item =>
            (item.id === productId && item.variant === variant) ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <ShopContext.Provider value={{
            cart,
            isCartOpen,
            setIsCartOpen,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount
        }}>
            {children}
        </ShopContext.Provider>
    );
};
