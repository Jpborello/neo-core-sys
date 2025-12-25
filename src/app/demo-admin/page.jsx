import React from 'react';
import AdminDashboard from '../../components/demos/admin/AdminDashboard';
import { DemoProvider } from '../../context/DemoContext';

export const metadata = {
    title: 'Demo Admin Panel | NeoStudios',
    description: 'Demostración interactiva de panel de administración para logística y e-commerce.',
};

export default function Page() {
    return (
        <DemoProvider>
            <AdminDashboard />
        </DemoProvider>
    );
}
