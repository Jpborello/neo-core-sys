"use client";

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MotosLayout from '@/components/demos/motos/layout/MotosLayout';
import MotosHome from '@/components/demos/motos/pages/Home';
import DebugGallery from '@/components/demos/motos/pages/DebugGallery';

export default function MotosWrapper() {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <BrowserRouter basename="/motos">
            <Routes>
                <Route element={<MotosLayout />}>
                    <Route index element={<MotosHome />} />
                    <Route path="debug" element={<DebugGallery />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
