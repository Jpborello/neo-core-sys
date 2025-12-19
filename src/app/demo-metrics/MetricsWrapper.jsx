"use client";

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardProvider } from '@/components/demos/metrics/context/DashboardContext';
import MetricsLayout from '@/components/demos/metrics/layout/MetricsLayout';
import Overview from '@/pages/demos/metrics/Overview';
import Schedule from '@/pages/demos/metrics/Schedule';
import Settings from '@/pages/demos/metrics/Settings';

export default function MetricsWrapper() {
    if (typeof window === 'undefined') return null;

    return (
        <BrowserRouter basename="/demo-metrics">
            <DashboardProvider>
                <Routes>
                    <Route element={<MetricsLayout />}>
                        <Route path="overview" element={<Overview />} />
                        <Route path="schedule" element={<Schedule />} />
                        <Route path="settings" element={<Settings />} />
                        <Route index element={<Navigate to="overview" replace />} />
                    </Route>
                </Routes>
            </DashboardProvider>
        </BrowserRouter>
    );
}
