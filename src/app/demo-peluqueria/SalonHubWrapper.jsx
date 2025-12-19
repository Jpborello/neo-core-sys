"use client";

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider as SalonAuthProvider } from '@/pages/demos/salon-hub/context/AuthContext';
import { BookingProvider as SalonBookingProvider } from '@/pages/demos/salon-hub/context/BookingContext';
import SalonLayout from '@/pages/demos/salon-hub/SalonLayout';
import SalonHome from '@/pages/demos/salon-hub/pages/public/SalonHome';
import SalonAuth from '@/pages/demos/salon-hub/pages/public/SalonAuth';
import SalonServices from '@/pages/demos/salon-hub/pages/public/SalonServices';
import MyAppointments from '@/pages/demos/salon-hub/pages/client/MyAppointments';
import AdminDashboard from '@/pages/demos/salon-hub/pages/admin/AdminDashboard';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function SalonHubWrapper() {
    if (typeof window === 'undefined') return null;

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
