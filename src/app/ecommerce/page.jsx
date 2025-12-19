"use client";

import dynamic from 'next/dynamic';

const EcommercePage = dynamic(() => import('../../pages/EcommercePage'), { ssr: false });

export default function Page() {
    return <EcommercePage />;
}
