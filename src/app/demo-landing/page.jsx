"use client";

import dynamic from 'next/dynamic';

const DemoLanding = dynamic(() => import('../../components/demos/landing/pages/DemoLanding'), { ssr: false });

export default function Page() {
    return <DemoLanding />;
}
