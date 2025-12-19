"use client";

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GinexMotorsLayout from '@/components/demos/ginex-motors/layout/GinexMotorsLayout';
import GinexHome from '@/pages/demos/ginex-motors/Home';
import GinexCatalog from '@/pages/demos/ginex-motors/Catalog';

export default function GinexMotorsWrapper() {
    if (typeof window === 'undefined') return null;

    return (
        <BrowserRouter basename="/ginex-motors">
            <Routes>
                <Route element={<GinexMotorsLayout />}>
                    <Route index element={<GinexHome />} />
                    <Route path="catalogo" element={<GinexCatalog />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
