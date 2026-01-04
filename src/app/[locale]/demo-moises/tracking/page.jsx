'use client';

import { useEffect } from 'react';

export default function MoisesTracking() {
    useEffect(() => {
        window.location.href = '/demo/moises/tracking.html';
    }, []);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            fontFamily: 'Inter, sans-serif'
        }}>
            <p>Redirigiendo al rastreo de envío...</p>
        </div>
    );
}
