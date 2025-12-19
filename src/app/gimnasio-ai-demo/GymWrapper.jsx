"use client";

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Adjust imports for Gym Demo
import GymLayout from "../../components/demos/gym-ai/components/layout/GymLayout";
import DashboardAI from "../../components/demos/gym-ai/pages/DashboardAI";
import UsuariosAIList from "../../components/demos/gym-ai/pages/UsuariosAIList";
import AsistenciasAI from "../../components/demos/gym-ai/pages/AsistenciasAI";
import CuotasAI from "../../components/demos/gym-ai/pages/CuotasAI";

export default function GymWrapper() {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <BrowserRouter basename="/gimnasio-ai-demo">
            <Routes>
                <Route element={<GymLayout />}>
                    <Route path="dashboard" element={<DashboardAI />} />
                    <Route path="usuarios" element={<UsuariosAIList />} />
                    <Route path="asistencias" element={<AsistenciasAI />} />
                    <Route path="cuotas" element={<CuotasAI />} />
                    <Route index element={<Navigate to="dashboard" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
