"use client";

import { scraperAdminApi } from '@/lib/scraperAdminApi';

export default function AdminScraperPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-12">
                    <h1 className="text-5xl font-black mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Scraper Admin Panel
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Manage clients, API keys, and monitor usage
                    </p>
                </header>

                {/* Coming Soon */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-12 text-center">
                    <div className="text-6xl mb-4">🚧</div>
                    <h2 className="text-3xl font-bold mb-4">Under Construction</h2>
                    <p className="text-slate-400 mb-8">
                        Admin panel is being built. Check back soon!
                    </p>

                    {/* Quick Links */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                            <h3 className="font-bold mb-2">📊 Dashboard</h3>
                            <p className="text-sm text-slate-400">View metrics and stats</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                            <h3 className="font-bold mb-2">👥 Clients</h3>
                            <p className="text-sm text-slate-400">Manage client accounts</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                            <h3 className="font-bold mb-2">🔑 API Keys</h3>
                            <p className="text-sm text-slate-400">Generate and manage keys</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
