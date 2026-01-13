'use client';

import { useEffect } from 'react';

export default function MoisesAdmin() {
    useEffect(() => {
        window.location.href = '/demo/moises/admin.html';
    }, []);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            fontFamily: 'Inter, sans-serif'
        }}>
            <p>Redirigiendo al panel de administración...</p>
        </div>
    );
}
