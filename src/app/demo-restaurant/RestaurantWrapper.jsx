"use client";

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// Adjust import path based on actual location. Wrapper will be in src/app/demo-restaurant/
// Apps are in src/apps/neo-resto/
import RestaurantRouter from '@/apps/neo-resto/RestaurantRouter';

export default function RestaurantWrapper() {
    // Ensure we are in the browser
    if (typeof window === 'undefined') return null;

    return (
        <BrowserRouter basename="/demo-restaurant">
            <RestaurantRouter />
        </BrowserRouter>
    );
}
