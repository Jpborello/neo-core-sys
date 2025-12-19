import dynamic from 'next/dynamic';

const App = dynamic(() => import('../TurnosWrapper'), {
    loading: () => <div className="min-h-screen flex items-center justify-center">Cargando Turnos...</div>
});

export function generateStaticParams() {
    return [{ slug: [] }];
}

export default function Page() {
    return <App />;
}
