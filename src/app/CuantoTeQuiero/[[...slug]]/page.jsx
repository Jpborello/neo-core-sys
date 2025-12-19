import dynamic from 'next/dynamic';

const App = dynamic(() => import('../CuantoTeQuieroWrapper'), {
    loading: () => <div className="min-h-screen flex items-center justify-center">Cargando Cuanto Te Quiero...</div>
});

export function generateStaticParams() {
    return [{ slug: [] }];
}

export default function Page() {
    return <App />;
}
