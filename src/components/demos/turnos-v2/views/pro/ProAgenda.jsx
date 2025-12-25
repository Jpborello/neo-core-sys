import React from 'react';
import { useTurnos } from '../../context/TurnosContext';

const ProAgenda = () => {
    const { state } = useTurnos();
    // Simulate logged in pro or selected pro
    const currentProId = 'pro_1';
    const currentPro = state.professionals.find(p => p.id === currentProId);

    const keyMetrics = {
        today: state.appointments.filter(a => a.proId === currentProId && a.status === 'confirmed').length,
        pending: 0
    };

    return (
        <div>
            <header className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Hola, {currentPro?.name.split(' ')[0]} 👋</h1>
                    <p className="text-neutral-500">Tu agenda para hoy</p>
                </div>
                <div className="text-right">
                    <p className="text-3xl font-bold text-indigo-600">{keyMetrics.today}</p>
                    <p className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Turnos Hoy</p>
                </div>
            </header>

            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 divide-y divide-neutral-100">
                    {/* Time Slots Mockup for a Day */}
                    {['09:00', '10:00', '11:00', '12:00', '13:00'].map(time => {
                        // Find appointment at this time (approximate for demo)
                        const appt = state.appointments.find(a => {
                            const d = new Date(a.start);
                            const h = d.getHours();
                            return a.proId === currentProId && h === parseInt(time) && a.status === 'confirmed';
                        });

                        return (
                            <div key={time} className="flex group min-h-[100px]">
                                <div className="w-20 py-4 text-center border-r border-neutral-100 bg-neutral-50 text-neutral-400 text-sm font-medium">
                                    {time}
                                </div>
                                <div className="flex-1 p-2 relative">
                                    {appt ? (
                                        <div className="absolute inset-2 bg-indigo-50 border-l-4 border-indigo-500 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                            <div className="flex justify-between">
                                                <span className="font-bold text-indigo-900">Consulta Nutricional</span>
                                                <span className="text-xs bg-white/50 px-2 py-0.5 rounded text-indigo-700 font-bold">Confirmado</span>
                                            </div>
                                            <p className="text-indigo-700/80 text-sm mt-1">Juan Perez</p>
                                        </div>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-600 px-3 py-1 rounded-full">
                                                + Bloquear
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProAgenda;
