"use client";

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Adjust imports to valid relative paths from src/app/demo-turnos/
// Demos are in src/pages/demos/turnos/
import { TurnosProvider } from "@/context/TurnosContext";
import MainLayout from "@/components/demos/turnos/layout/MainLayout";
import Login from "@/components/demos/turnos/pages/Login";
import Dashboard from "@/components/demos/turnos/pages/Dashboard";
import Calendar from "@/components/demos/turnos/pages/Calendar";
import Clients from "@/components/demos/turnos/pages/Clients";
import Settings from "@/components/demos/turnos/pages/Settings";

export default function TurnosWrapper() {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

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
