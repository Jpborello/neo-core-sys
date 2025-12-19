"use client";

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MobileLayout from '@/pages/demos/turnos-mobile/components/MobileLayout';
import HomeMobile from '@/pages/demos/turnos-mobile/pages/Home';
import BookingMobile from '@/pages/demos/turnos-mobile/pages/Booking';
import MyAppointmentsMobile from '@/pages/demos/turnos-mobile/pages/MyAppointments';

export default function TurnosMobileWrapper() {
    if (typeof window === 'undefined') return null;

    return (
        <BrowserRouter basename="/demo-turnos-mobile">
            <Routes>
                <Route element={<MobileLayout />}>
                    <Route index element={<HomeMobile />} />
                    <Route path="booking" element={<BookingMobile />} />
                    <Route path="my-appointments" element={<MyAppointmentsMobile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
