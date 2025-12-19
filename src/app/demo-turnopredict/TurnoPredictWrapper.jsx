"use client";

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TurnoPredict from '@/pages/demos/turnopredict';

export default function TurnoPredictWrapper() {
    if (typeof window === 'undefined') return null;

    return (
        <BrowserRouter basename="/demo-turnopredict">
            {/* TurnoPredict likely bundles its own Routes or is a single component */}
            {/* Checking App.jsx: <Route path="/demo-turnopredict/*" element={<TurnoPredict />} /> */}
            <TurnoPredict />
        </BrowserRouter>
    );
}
