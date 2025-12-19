"use client";

import React from 'react';
import { BrowserRouter } from "react-router-dom";
import KioskDemo from '@/pages/demos/kiosk/KioskDemo';

export default function KioskWrapper() {
    if (typeof window === 'undefined') return null;

    return (
        <BrowserRouter basename="/demo-kiosk">
            <KioskDemo />
        </BrowserRouter>
    );
}
