"use client";

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// Adjust import path based on actual location. Wrapper will be in src/app/demo-restaurant/
// Apps are in src/apps/neo-resto/
import RestaurantRouter from '@/apps/neo-resto/RestaurantRouter';

export default function RestaurantWrapper() {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Ensure we are in the browser
    if (!mounted) return null;

    return (
        <BrowserRouter basename="/demo-restaurant">
            <RestaurantRouter />
        </BrowserRouter>
    );
}
