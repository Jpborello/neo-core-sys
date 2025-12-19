"use client";

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MotosLayout from '@/components/demos/motos/layout/MotosLayout';
import MotosHome from '@/pages/demos/motos/Home';
import DebugGallery from '@/pages/demos/motos/DebugGallery';

export default function MotosWrapper() {
    if (typeof window === 'undefined') return null;

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
