"use client";

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Adjust imports for Gym Demo
import GymLayout from "@/pages/demos/gym-ai/components/layout/GymLayout";
import DashboardAI from "@/pages/demos/gym-ai/pages/DashboardAI";
import UsuariosAIList from "@/pages/demos/gym-ai/pages/UsuariosAIList";
import AsistenciasAI from "@/pages/demos/gym-ai/pages/AsistenciasAI";
import CuotasAI from "@/pages/demos/gym-ai/pages/CuotasAI";

export default function GymWrapper() {
    if (typeof window === 'undefined') return null;

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
