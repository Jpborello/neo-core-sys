"use client";
import dynamic from 'next/dynamic';

const App = dynamic(() => import('../DistributorWrapper'), { ssr: false });

export default function Page() {
    return <App />;
}
