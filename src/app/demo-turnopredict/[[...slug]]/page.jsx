"use client";
import dynamic from 'next/dynamic';

const App = dynamic(() => import('../TurnoPredictWrapper'), { ssr: false });

export default function Page() {
    return <App />;
}
