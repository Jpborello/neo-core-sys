'use client';

import { useEffect } from 'react';

export default function MoisesLanding() {
    useEffect(() => {
        window.location.href = '/demo/moises/index.html';
    }, []);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            fontFamily: 'Inter, sans-serif'
        }}>
            <p>Redirigiendo a MOISES...</p>
        </div>
    );
}
