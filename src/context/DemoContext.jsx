"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const DemoContext = createContext();

// --- INITIAL MOCK DATA ---
const INITIAL_PRODUCTS = [
    // Carnes
    { id: 1, name: "Asado de Tira", category: "Carnes", price: 8500, stock: 15, is_active: true, image: "https://loremflickr.com/800/600/ribs,barbecue,meat?lock=1" }, // Asado
    { id: 2, name: "Vacío Premium", category: "Carnes", price: 9200, stock: 8, is_active: true, image: "https://loremflickr.com/800/600/steak,beef?lock=2" }, // Vacío
    { id: 3, name: "Chorizo Puro Cerdo", category: "Carnes", price: 4500, stock: 50, is_active: true, image: "https://loremflickr.com/800/600/chorizo,sausage?lock=3" }, // Chorizo
    { id: 4, name: "Morcilla Bombón", category: "Carnes", price: 4200, stock: 30, is_active: true, image: "https://loremflickr.com/800/600/blackpudding,sausage?lock=4" }, // Morcilla
    { id: 5, name: "Pollo Entero de Campo", category: "Carnes", price: 3800, stock: 20, is_active: true, image: "https://loremflickr.com/800/600/roastedchicken?lock=5" }, // Chicken

    // Bebidas
    { id: 6, name: "Coca Cola 2.25L", category: "Bebidas", price: 2800, stock: 100, is_active: true, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800" }, // Coca Cola
    { id: 7, name: "Fernet Branca 750ml", category: "Bebidas", price: 9500, stock: 25, is_active: true, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800" }, // Herbal Liqueur (Generic close enough)
    { id: 8, name: "Cerveza Patagonia Amber", category: "Bebidas", price: 3200, stock: 48, is_active: true, image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&q=80&w=800" }, // Beer
    { id: 9, name: "Vino Malbec Reserva", category: "Bebidas", price: 6500, stock: 12, is_active: true, image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800" }, // Red Wine
    { id: 10, name: "Agua Mineral 2L", category: "Bebidas", price: 1200, stock: 60, is_active: true, image: "https://images.unsplash.com/photo-1616118132534-381148898bb4?auto=format&fit=crop&q=80&w=800" }, // Water bottle

    // Almacén
    { id: 11, name: "Arroz Doble Carolina", category: "Almacén", price: 1800, stock: 0, is_active: true, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800" }, // Rice
    { id: 12, name: "Fideos Tallarines", category: "Almacén", price: 1500, stock: 40, is_active: true, image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=800" }, // Noodles
    { id: 13, name: "Harina 0000", category: "Almacén", price: 1100, stock: 35, is_active: true, image: "https://images.unsplash.com/photo-1627485937980-221c88ac04f9?auto=format&fit=crop&q=80&w=800" }, // Flour
    { id: 14, name: "Aceite Girasol 1.5L", category: "Almacén", price: 2400, stock: 18, is_active: true, image: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?auto=format&fit=crop&q=80&w=800" }, // Oil
    { id: 15, name: "Yerba Mate 1kg", category: "Almacén", price: 3800, stock: 22, is_active: true, image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&q=80&w=800" }, // Yerba Mate / Tea (Dried Herbs)

    // Verdulería
    { id: 16, name: "Papa Negra (kg)", category: "Verdulería", price: 900, stock: 200, is_active: true, image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=800" }, // Potatoes
    { id: 17, name: "Cebolla (kg)", category: "Verdulería", price: 800, stock: 150, is_active: true, image: "https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?auto=format&fit=crop&q=80&w=800" }, // Onions
    { id: 18, name: "Tomate Perita (kg)", category: "Verdulería", price: 2500, stock: 40, is_active: true, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800" }, // Tomatoes
    { id: 19, name: "Lechuga Mantecosa", category: "Verdulería", price: 3000, stock: 15, is_active: true, image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&q=80&w=800" }, // Lettuce
    { id: 20, name: "Zanahoria (kg)", category: "Verdulería", price: 1100, stock: 60, is_active: true, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=800" }, // Carrots
];

const INITIAL_ORDERS = [
    {
        id: 'PED-001',
        customer_name: 'Juan Pérez',
        customer_phone: '3415551234',
        delivery_address: 'Av. Pellegrini 1500, Rosario',
        status: 'pending',
        created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        total: 28500,
        items: [
            { name: "Asado de Tira", quantity: 2, price: 8500 },
            { name: "Fernet Branca 750ml", quantity: 1, price: 9500 },
            { name: "Coca Cola 2.25L", quantity: 1, price: 2000 }
        ],
        notes: "Timbre 4B"
    },
    {
        id: 'PED-002',
        customer_name: 'María García',
        customer_phone: '3415559876',
        delivery_address: 'Bv. Oroño 450, Rosario',
        status: 'pending',
        created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        total: 12400,
        items: [
            { name: "Vino Malbec Reserva", quantity: 1, price: 6500 },
            { name: "Chorizo Puro Cerdo", quantity: 1, price: 4500 },
            { name: "Pan Casero", quantity: 1, price: 1400 }
        ],
        notes: ""
    }
];

const INITIAL_SLIDES = [
    { id: 1, title: 'Ofertas en Carnes', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1920' },
    { id: 2, title: 'Bebidas Refrescantes', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=1920' },
    { id: 3, title: 'Verduras de Estación', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=1920' }
];

const INITIAL_WINNERS = []; // For Raffle history

const DATA_VERSION = 'v9-raffle-tickets'; // Increment this to force reset user data

export const DemoProvider = ({ children }) => {
    const [products, setProducts] = useState(INITIAL_PRODUCTS);
    const [orders, setOrders] = useState(INITIAL_ORDERS);
    const [carouselSlides, setCarouselSlides] = useState(INITIAL_SLIDES);
    const [raffleWinners, setRaffleWinners] = useState(INITIAL_WINNERS);
    const [isRaffleActive, setIsRaffleActive] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Initial Load from LocalStorage
    useEffect(() => {
        const savedVersion = localStorage.getItem('demo_version');
        const savedProducts = localStorage.getItem('demo_products');
        const savedOrders = localStorage.getItem('demo_orders');
        const savedSlides = localStorage.getItem('demo_slides');
        const savedWinners = localStorage.getItem('demo_winners');
        const savedRaffleActive = localStorage.getItem('demo_raffle_active');

        // Only load from storage if version matches
        if (savedVersion === DATA_VERSION && savedProducts && savedOrders) {
            setProducts(JSON.parse(savedProducts));
            setOrders(JSON.parse(savedOrders));
            setCarouselSlides(savedSlides ? JSON.parse(savedSlides) : INITIAL_SLIDES);
            setRaffleWinners(savedWinners ? JSON.parse(savedWinners) : INITIAL_WINNERS);
            setIsRaffleActive(savedRaffleActive === 'true');
        } else {
            // Force reset if version mismatch (or first load)
            console.log("Migrating demo data to version:", DATA_VERSION);
            localStorage.setItem('demo_version', DATA_VERSION);
            localStorage.setItem('demo_products', JSON.stringify(INITIAL_PRODUCTS));
            localStorage.setItem('demo_orders', JSON.stringify(INITIAL_ORDERS));
            localStorage.setItem('demo_slides', JSON.stringify(INITIAL_SLIDES));
            localStorage.setItem('demo_winners', JSON.stringify(INITIAL_WINNERS));
            localStorage.setItem('demo_raffle_active', 'false');
        }

        setIsLoaded(true);
    }, []);

    // Persist Changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('demo_products', JSON.stringify(products));
        }
    }, [products, isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('demo_orders', JSON.stringify(orders));
        }
    }, [orders, isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('demo_slides', JSON.stringify(carouselSlides));
        }
    }, [carouselSlides, isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('demo_winners', JSON.stringify(raffleWinners));
        }
    }, [raffleWinners, isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('demo_raffle_active', isRaffleActive);
        }
    }, [isRaffleActive, isLoaded]);

    // Actions
    const addOrder = (newOrder) => {
        const order = {
            ...newOrder,
            id: `PED-${Math.floor(Math.random() * 10000)}`,
            status: 'pending',
            created_at: new Date().toISOString(),
            ticketNumber: isRaffleActive ? Math.floor(1000 + Math.random() * 9000) : null // 4-digit ID
        };

        // Add order
        setOrders(prev => [order, ...prev]);

        // Reduce stock
        setProducts(prev => prev.map(p => {
            const itemInOrder = newOrder.items.find(i => i.id === p.id);
            if (itemInOrder) {
                return { ...p, stock: Math.max(0, p.stock - itemInOrder.quantity) };
            }
            return p;
        }));

        return order.ticketNumber;
    };

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    };

    const updateProduct = (product) => {
        if (product.id) {
            setProducts(prev => prev.map(p => p.id === product.id ? product : p));
        } else {
            const newProduct = { ...product, id: Date.now() };
            setProducts(prev => [...prev, newProduct]);
        }
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    const updateCarousel = (slides) => {
        setCarouselSlides(slides);
    };

    const addRaffleWinner = (winner) => {
        setRaffleWinners(prev => [winner, ...prev]);
    };

    const toggleRaffle = () => {
        setIsRaffleActive(prev => !prev);
    };

    return (
        <DemoContext.Provider value={{
            products,
            orders,
            addOrder,
            updateOrderStatus,
            updateProduct,
            deleteProduct,
            carouselSlides,
            updateCarousel,
            updateCarousel,
            raffleWinners,
            addRaffleWinner,
            isRaffleActive,
            toggleRaffle
        }}>
            {children}
        </DemoContext.Provider>
    );
};

export const useDemo = () => useContext(DemoContext);
