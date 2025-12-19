"use client";

import dynamic from 'next/dynamic';

const DemoCorporate = dynamic(() => import('../../pages/demos/DemoCorporate'), { ssr: false });

export default function Page() {
    return <DemoCorporate />;
}
