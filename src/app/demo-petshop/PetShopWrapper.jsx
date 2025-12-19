"use client";

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShopProvider } from '@/pages/demos/pet-shop/context/ShopContext';
import PetShopLayout from '@/pages/demos/pet-shop/layout/PetShopLayout';
import Home from '@/pages/demos/pet-shop/pages/Home';
import ProductDetail from '@/pages/demos/pet-shop/pages/ProductDetail';

export default function PetShopWrapper() {
    if (typeof window === 'undefined') return null;

    return (
        <BrowserRouter basename="/demo-petshop">
            <ShopProvider>
                <Routes>
                    <Route element={<PetShopLayout />}>
                        <Route index element={<Home />} />
                        <Route path="product/:id" element={<ProductDetail />} />
                        <Route path="catalog" element={<div className="p-10 text-center">Catalog Coming Soon</div>} />
                        <Route path="about" element={<div className="p-10 text-center">About Page Coming Soon</div>} />
                        <Route path="contact" element={<div className="p-10 text-center">Contact Page Coming Soon</div>} />
                        <Route path="checkout" element={<div className="p-10 text-center">Checkout Coming Soon</div>} />
                    </Route>
                </Routes>
            </ShopProvider>
        </BrowserRouter>
    );
}
