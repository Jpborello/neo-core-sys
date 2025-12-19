"use client";

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AquilesLayout from '@/pages/demos/aquiles/layout/AquilesLayout';
import AquilesHome from '@/pages/demos/aquiles/pages/Home';
import AquilesCatalog from '@/pages/demos/aquiles/pages/Catalog';

export default function AquilesWrapper() {
    if (typeof window === 'undefined') return null;

    return (
        <BrowserRouter basename="/demo-aquiles">
            <Routes>
                <Route element={<AquilesLayout />}>
                    <Route index element={<AquilesHome />} />
                    <Route path="catalogo" element={<AquilesCatalog />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
