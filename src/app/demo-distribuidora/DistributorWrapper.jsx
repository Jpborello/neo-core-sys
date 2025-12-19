"use client";

import React from 'react';
import { BrowserRouter } from "react-router-dom";
import DistributorOrdersDemo from '@/components/demos/distributor/pages/DemoLoaderWrapper';

export default function DistributorWrapper() {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <BrowserRouter basename="/demo-distribuidora">
            <DistributorOrdersDemo />
        </BrowserRouter>
    );
}
