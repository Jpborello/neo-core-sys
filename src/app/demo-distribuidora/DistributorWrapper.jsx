"use client";

import React from 'react';
import { BrowserRouter } from "react-router-dom";
import DistributorOrdersDemo from '@/pages/demos/distributor/DemoLoaderWrapper';

export default function DistributorWrapper() {
    if (typeof window === 'undefined') return null;

    return (
        <BrowserRouter basename="/demo-distribuidora">
            <DistributorOrdersDemo />
        </BrowserRouter>
    );
}
