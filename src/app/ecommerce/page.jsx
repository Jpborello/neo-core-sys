"use client";

import dynamic from 'next/dynamic';

const EcommercePage = dynamic(() => import('../../components/pages/EcommercePage'), { ssr: false });

export default function Page() {
    return <EcommercePage />;
}
