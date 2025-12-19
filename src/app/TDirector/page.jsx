"use client";

import dynamic from 'next/dynamic';

// Single component page, no wrapper needed.
// App.jsx: <Route path="/TDirector" element={<DirectorPage />} />
const DirectorPage = dynamic(() => import('../../pages/DirectorPage'), { ssr: false });

export default function Page() {
    return <DirectorPage />;
}
