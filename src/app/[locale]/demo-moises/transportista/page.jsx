'use client';

import { useEffect } from 'react';

export default function MoisesTransportista() {
    useEffect(() => {
        window.location.href = '/demo/moises/transportista.html';
    }, []);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            fontFamily: 'Inter, sans-serif'
        }}>
            <p>Redirigiendo al panel del transportista...</p>
        </div>
    );
}
