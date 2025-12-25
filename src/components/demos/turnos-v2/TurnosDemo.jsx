import React, { useState } from 'react';
import { TurnosProvider } from './context/TurnosContext';
import { useTurnos } from './context/TurnosContext';

// Import Views (Placeholders for now, we will create them next)
import ClientBooking from './views/client/ClientBooking';
import AdminDashboard from './views/admin/AdminDashboard';
import ProAgenda from './views/pro/ProAgenda';

const DemoContainer = () => {
    const { state, dispatch } = useTurnos();
    const [viewMode, setViewMode] = useState('client'); // 'client', 'admin', 'pro'

    const handleModeSwitch = (mode) => {
        setViewMode(mode);
        dispatch({ type: 'SET_USER_MODE', payload: mode });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-neutral-200 text-neutral-900 font-sans">
            {/* Top Navigation Bar mimicking a browser or OS wrapper to switch roles */}
            <div className="bg-neutral-900 text-white p-4 shadow-xl sticky top-0 z-50">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <h1 className="ml-4 font-bold text-lg tracking-wide uppercase">NeoTurnos <span className="text-neutral-500 text-xs normal-case">v2.0 System Demo</span></h1>
                    </div>

                    <div className="flex bg-neutral-800 rounded-lg p-1">
                        <button
                            onClick={() => handleModeSwitch('client')}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'client' ? 'bg-indigo-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'}`}
                        >
                            Cliente
                        </button>
                        <button
                            onClick={() => handleModeSwitch('pro')}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'pro' ? 'bg-indigo-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'}`}
                        >
                            Profesional
                        </button>
                        <button
                            onClick={() => handleModeSwitch('admin')}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'admin' ? 'bg-indigo-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'}`}
                        >
                            Admin
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="max-w-5xl mx-auto p-4 md:p-8">
                {viewMode === 'client' && <ClientBooking />}
                {viewMode === 'pro' && <ProAgenda />}
                {viewMode === 'admin' && <AdminDashboard />}
            </main>
        </div>
    );
};

const TurnosDemo = () => {
    return (
        <TurnosProvider>
            <DemoContainer />
        </TurnosProvider>
    );
};

export default TurnosDemo;
