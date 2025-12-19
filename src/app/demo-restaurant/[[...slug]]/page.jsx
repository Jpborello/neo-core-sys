import dynamic from 'next/dynamic';

// Disable SSR for the SPA wrapper to avoid hydration errors with React Router
const App = dynamic(() => import('../RestaurantWrapper'), {
    loading: () => <div className="min-h-screen flex items-center justify-center">Cargando Restaurante...</div>
});

export function generateStaticParams() {
    return [{ slug: [] }];
}

export default function Page() {
    return <App />;
}
