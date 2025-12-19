"use client";

import dynamic from 'next/dynamic';

const DemoCorporate = dynamic(() => import('../../components/demos/corporate/pages/DemoCorporate'), { ssr: false });

export default function Page() {
    return <DemoCorporate />;
}
