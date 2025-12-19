"use client";
import dynamic from 'next/dynamic';

const App = dynamic(() => import('../AquilesWrapper'), { ssr: false });

export default function Page() {
    return <App />;
}
