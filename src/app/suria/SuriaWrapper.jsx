"use client";

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from '@/suria/components/CartContext';
import SuriaLayout from '@/suria/components/SuriaLayout';
import SuriaHome from '@/suria/pages/SuriaHome';
import SuriaCatalog from '@/suria/pages/SuriaCatalog';
import SuriaCheckout from '@/suria/pages/SuriaCheckout';
import SuriaAdmin from '@/suria/pages/SuriaAdmin';

export default function SuriaWrapper() {
    if (typeof window === 'undefined') return null;

    return (
        <BrowserRouter basename="/suria">
            <CartProvider>
                <Routes>
                    <Route element={<SuriaLayout />}>
                        <Route index element={<SuriaHome />} />
                        <Route path="catalogo" element={<SuriaCatalog />} />
                        <Route path="checkout" element={<SuriaCheckout />} />
                        <Route path="admin" element={<SuriaAdmin />} />
                    </Route>
                </Routes>
            </CartProvider>
        </BrowserRouter>
    );
}
