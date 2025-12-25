import React from 'react';
import { DemoProvider } from '../../context/DemoContext';
import ShopDashboard from '../../components/demos/shop/ShopDashboard';

export const metadata = {
    title: 'Demo Tienda Online | NeoStudios',
    description: 'Demostración de experiencia de compra moderna e integrada.',
};

export default function Page() {
    return (
        <DemoProvider>
            <ShopDashboard />
        </DemoProvider>
    );
}
