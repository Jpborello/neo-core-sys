export function HeroSkeleton() {
    return (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 animate-pulse">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        </div>
    );
}

export function SectionSkeleton() {
    return (
        <div className="py-24 px-6 w-full max-w-7xl mx-auto">
            <div className="animate-pulse space-y-8">
                <div className="h-12 bg-white/5 rounded-lg w-3/4 mx-auto" />
                <div className="h-6 bg-white/5 rounded-lg w-1/2 mx-auto" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-64 bg-white/5 rounded-2xl" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export function CardGridSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-4">
                    <div className="h-48 bg-white/5 rounded-xl" />
                    <div className="h-4 bg-white/5 rounded w-3/4" />
                    <div className="h-4 bg-white/5 rounded w-1/2" />
                </div>
            ))}
        </div>
    );
}
