"use client";

import dynamic from 'next/dynamic';

// Checking App.jsx: <Route path="/milinails" element={<MiliNailsPage />} />
// Likely single page.
const MiliNailsPage = dynamic(() => import('../../pages/milinails/MiliNailsPage'), { ssr: false });

export default function Page() {
    return <MiliNailsPage />;
}
