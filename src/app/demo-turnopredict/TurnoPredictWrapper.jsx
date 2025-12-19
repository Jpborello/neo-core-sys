"use client";

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TurnoPredict from '@/components/demos/turnopredict/pages';

export default function TurnoPredictWrapper() {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <BrowserRouter basename="/demo-turnopredict">
            {/* TurnoPredict likely bundles its own Routes or is a single component */}
            {/* Checking App.jsx: <Route path="/demo-turnopredict/*" element={<TurnoPredict />} /> */}
            <TurnoPredict />
        </BrowserRouter>
    );
}
