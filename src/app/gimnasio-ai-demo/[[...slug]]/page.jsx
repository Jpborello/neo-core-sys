import dynamic from 'next/dynamic';

const App = dynamic(() => import('../GymWrapper'), {
    loading: () => <div className="min-h-screen flex items-center justify-center">Cargando Gym AI...</div>
});

export function generateStaticParams() {
    return [{ slug: [] }];
}

export default function Page() {
    return <App />;
}
