"use client";

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardProvider } from '@/context/DashboardContext';
import MetricsLayout from '@/components/demos/metrics/layout/MetricsLayout';
import Overview from '@/components/demos/metrics/pages/Overview';
import Schedule from '@/components/demos/metrics/pages/Schedule';
import Settings from '@/components/demos/metrics/pages/Settings';

export default function MetricsWrapper() {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

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
