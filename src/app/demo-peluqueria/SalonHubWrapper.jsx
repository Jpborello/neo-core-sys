"use client";

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider as SalonAuthProvider } from '@/context/AuthContext';
import { BookingProvider as SalonBookingProvider } from '@/context/BookingContext';
import SalonLayout from '@/components/demos/salon-hub/SalonLayout';
import SalonHome from '@/components/demos/salon-hub/pages/public/SalonHome';
import SalonAuth from '@/components/demos/salon-hub/pages/public/SalonAuth';
import SalonServices from '@/components/demos/salon-hub/pages/public/SalonServices';
import MyAppointments from '@/components/demos/salon-hub/pages/client/MyAppointments';
import AdminDashboard from '@/components/demos/salon-hub/pages/admin/AdminDashboard';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function SalonHubWrapper() {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <BrowserRouter basename="/demo-peluqueria">
            <ErrorBoundary>
                <SalonAuthProvider>
                    <SalonBookingProvider>
                        <Routes>
                            <Route path="auth" element={<SalonAuth />} />
                            <Route element={<SalonLayout />}>
                                <Route index element={<SalonHome />} />
                                <Route path="servicios" element={<SalonServices />} />
                                <Route path="mis-turnos" element={<MyAppointments />} />
                                <Route path="admin" element={<AdminDashboard />} />
                            </Route>
                        </Routes>
                    </SalonBookingProvider>
                </SalonAuthProvider>
            </ErrorBoundary>
        </BrowserRouter>
    );
}
