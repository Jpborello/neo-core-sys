import dynamic from 'next/dynamic';

const App = dynamic(() => import('../TurnosMobileWrapper'));

export function generateStaticParams() {
    return [{ slug: [] }];
}

export default function Page() {
    return <App />;
}
