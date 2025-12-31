import React from 'react';
import AdminDashboard from '../../../components/demos/admin/AdminDashboard';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'admin' });

    return {
        title: `${t('title')} | NeoStudios`,
        description: t('login.subtitle'),
    };
}

export default function Page() {
    return <AdminDashboard />;
}
