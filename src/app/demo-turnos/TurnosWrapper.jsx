"use client";

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Adjust imports to valid relative paths from src/app/demo-turnos/
// Demos are in src/pages/demos/turnos/
import { TurnosProvider } from "@/components/demos/turnos/context/TurnosContext";
import MainLayout from "@/components/demos/turnos/layout/MainLayout";
import Login from "@/pages/demos/turnos/Login";
import Dashboard from "@/pages/demos/turnos/Dashboard";
import Calendar from "@/pages/demos/turnos/Calendar";
import Clients from "@/pages/demos/turnos/Clients";
import Settings from "@/pages/demos/turnos/Settings";

export default function TurnosWrapper() {
    if (typeof window === 'undefined') return null;

    return (
        <BrowserRouter basename="/demo-turnos">
            <TurnosProvider>
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route element={<MainLayout />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="calendar" element={<Calendar />} />
                        <Route path="clients" element={<Clients />} />
                        <Route path="settings" element={<Settings />} />
                        <Route index element={<Navigate to="dashboard" replace />} />
                    </Route>
                </Routes>
            </TurnosProvider>
        </BrowserRouter>
    );
}
