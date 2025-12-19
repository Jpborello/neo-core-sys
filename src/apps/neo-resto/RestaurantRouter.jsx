import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { RestaurantProvider, useRestaurant } from '@/context/RestaurantContext';

import Landing from './pages/Landing';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import { supabase } from '@/lib/supabase';
import Kitchen from './pages/Kitchen';
import Admin from './pages/Admin';
import Waiter from './pages/Waiter';
import Bar from './pages/Bar';

const TableRedirect = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setTable } = useRestaurant();

    useEffect(() => {
        if (id) {
            setTable(id);
            navigate('/demo-restaurant/');
        }
    }, [id, setTable, navigate]);

    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Conectando a Mesa {id}...</div>;
}

const RestaurantRouter = () => {
    return (
        <RestaurantProvider>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/cocina" element={<Kitchen />} />
                <Route path="/mozo" element={<Waiter />} />
                <Route path="/barra" element={<Bar />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/mesa/:id" element={<TableRedirect />} />
            </Routes>
        </RestaurantProvider>
    );
};

export default RestaurantRouter;
