import dynamic from 'next/dynamic';

const App = dynamic(() => import('../TurnoPredictWrapper'));

export function generateStaticParams() {
    return [{ slug: [] }];
}

export default function Page() {
    return <App />;
}
