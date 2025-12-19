"use client";

import dynamic from 'next/dynamic';

// WebFramer is simple enough it might not need a Router wrapper if it has no sub-routes.
// Checking App.jsx: <Route path="/web-framer" element={<WebFramerPage />} />
// It likely doesn't have internal routing. Importing directly.
const WebFramerPage = dynamic(() => import('../../pages/demos/web-framer/WebFramerPage'), { ssr: false });

export default function Page() {
    return <WebFramerPage />;
}
