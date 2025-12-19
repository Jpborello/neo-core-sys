import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase/client';

const RestaurantContext = createContext();

export const useRestaurant = () => {
    return useContext(RestaurantContext);
};

export const RestaurantProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('neo-menu-cart');
        return saved ? JSON.parse(saved) : [];
    });

    const [session, setSession] = useState(() => {
        const saved = localStorage.getItem('neo-menu-session');
        return saved ? JSON.parse(saved) : null;
    });

    const [tableNumber, setTableNumber] = useState(() => {
        return localStorage.getItem('neo-menu-table') || null;
    });

    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);

    useEffect(() => {
        localStorage.setItem('neo-menu-cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        if (session) {
            localStorage.setItem('neo-menu-session', JSON.stringify(session));
        }
    }, [session]);

    useEffect(() => {
        if (tableNumber) {
            localStorage.setItem('neo-menu-table', tableNumber);
        }
    }, [tableNumber]);

    // Fetch Products
    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('is_available', true)
                .eq('restaurant_id', 'd3b07384-d9a9-4152-87c9-7d8e1327f31c');

            if (data) {
                // Normalize data just in case
                const normalized = data.map(p => ({
                    ...p,
                    image: p.image_url || p.image, // Handle both potential column names
                    desc: p.description || p.desc
                }));
                setProducts(normalized);
            }
            setLoadingProducts(false);
        };
        fetchProducts();
    }, []);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1, comments: '' }];
        });
    };

    const addComment = (productId, comment) => {
        setCart(prev => prev.map(item =>
            item.id === productId ? { ...item, comments: comment } : item
        ));
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : item;
            }
            return item;
        }));
    };

    const clearCart = () => setCart([]);

    const setTable = (num) => setTableNumber(num);

    const loginUser = (userData) => setSession(userData);

    const submitOrder = async ({ status = 'pending', payment_status = 'paid' } = {}) => {
        if (!session) {
            console.error("Submit Order Failed: No Session");
            return { success: false, error: "No user session" };
        }
        if (cart.length === 0) {
            console.error("Submit Order Failed: Empty Cart");
            return { success: false, error: "Cart is empty" };
        }
        if (!tableNumber) {
            console.error("Submit Order Failed: No Table Number");
            return { success: false, error: "No table selected" };
        }

        try {
            // Sanitize items
            const sanitizedItems = cart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                comments: item.comments || ''
            }));

            const orderData = {
                table_number: parseInt(tableNumber),
                customer_name: session.name,
                customer_phone: session.phone,
                items: sanitizedItems,
                total: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
                status: status,
                payment_status: payment_status,
                restaurant_id: 'd3b07384-d9a9-4152-87c9-7d8e1327f31c',
                created_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('orders')
                .insert([orderData])
                .select();

            if (error) {
                console.error('Supabase Error submitOrder:', error);
                return { success: false, error: error.message };
            };

            // Update Table State to Occupied + Name
            await supabase
                .from('table_states')
                .update({
                    status: 'occupied',
                    customer_name: session.name,
                    occupied_since: new Date().toISOString()
                })
                .eq('table_number', tableNumber);

            clearCart();
            return { success: true, data };
        } catch (error) {
            console.error("Exception submitOrder:", error);
            return { success: false, error: error.message };
        }
    };

    // Table State Logic
    const [tableState, setTableState] = useState(null);

    useEffect(() => {
        if (!tableNumber) return;

        // Initial fetch
        const fetchState = async () => {
            const { data } = await supabase
                .from('table_states')
                .select('*')
                .eq('table_number', tableNumber)
                .single();
            if (data) setTableState(data);
        };
        fetchState();

        // Real-time subscription
        const channel = supabase
            .channel(`table_states:${tableNumber}`)
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'table_states',
                filter: `table_number=eq.${tableNumber}`
            }, (payload) => {
                setTableState(payload.new);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [tableNumber]);

    const requestAssistance = async (needsHelp) => {
        if (!tableNumber) return;
        await supabase
            .from('table_states')
            .update({ needs_assistance: needsHelp })
            .eq('table_number', tableNumber);
        // Optimistic update
        setTableState(prev => ({ ...prev, needs_assistance: needsHelp }));
    };

    const requestBill = async () => {
        if (!tableNumber) return;
        await supabase
            .from('table_states')
            .update({ request_bill: true })
            .eq('table_number', tableNumber);
        // Optimistic update
        setTableState(prev => ({ ...prev, request_bill: true }));
    };

    const resolveAssistance = async () => {
        if (!tableNumber) return;
        await supabase
            .from('table_states')
            .update({ needs_assistance: false })
            .eq('table_number', tableNumber);
        setTableState(prev => ({ ...prev, needs_assistance: false }));
    };

    const requestPayCash = async () => {
        if (!tableNumber) return;
        await supabase
            .from('table_states')
            .update({ status: 'paying_cash' }) // Special status for Waiter attention
            .eq('table_number', tableNumber);
        setTableState(prev => ({ ...prev, status: 'paying_cash' }));
    };

    const value = {
        cart,
        session,
        tableNumber,
        products,
        loadingProducts,
        tableState,
        requestAssistance,
        resolveAssistance, // New
        requestBill,
        requestPayCash,    // New     
        addToCart,
        addComment,
        removeFromCart,
        updateQuantity,
        clearCart,
        setTable,
        loginUser,
        submitOrder,
        fetchTableOrders: async () => {
            if (!tableNumber) return [];
            const { data } = await supabase
                .from('orders')
                .select('*')
                .eq('table_number', tableNumber)
                .eq('restaurant_id', 'd3b07384-d9a9-4152-87c9-7d8e1327f31c')
                .neq('status', 'cancelled')
                .neq('payment_status', 'paid'); // Only fetch unpaid items for the bill
            return data || [];
        },
        cartTotal: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    };

    return (
        <RestaurantContext.Provider value={value}>
            {children}
        </RestaurantContext.Provider>
    );
};
