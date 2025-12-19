"use client";
import dynamic from 'next/dynamic';

const App = dynamic(() => import('../PetShopWrapper'), { ssr: false });

export default function Page() {
    return <App />;
}
