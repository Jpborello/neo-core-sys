import dynamic from 'next/dynamic';

const App = dynamic(() => import('../MotosWrapper'));

export function generateStaticParams() {
    return [{ slug: [] }];
}

export default function Page() {
    return <App />;
}
