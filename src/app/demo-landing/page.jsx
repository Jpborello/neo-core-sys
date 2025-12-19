"use client";

import dynamic from 'next/dynamic';

const DemoLanding = dynamic(() => import('../../pages/demos/DemoLanding'), { ssr: false });

export default function Page() {
    return <DemoLanding />;
}
