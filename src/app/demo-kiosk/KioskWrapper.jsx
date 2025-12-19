"use client";

import React from 'react';
import { BrowserRouter } from "react-router-dom";
import KioskDemo from '@/components/demos/kiosk/pages/KioskDemo';

export default function KioskWrapper() {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <BrowserRouter basename="/demo-kiosk">
            <KioskDemo />
        </BrowserRouter>
    );
}
