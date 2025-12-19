"use client";

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GinexMotorsLayout from '@/components/demos/ginex-motors/layout/GinexMotorsLayout';
import GinexHome from '@/components/demos/ginex-motors/pages/Home';
import GinexCatalog from '@/components/demos/ginex-motors/pages/Catalog';

export default function GinexMotorsWrapper() {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

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
