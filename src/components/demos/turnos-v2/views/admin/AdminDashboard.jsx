import React, { useState } from 'react';
import { useTurnos } from '../../context/TurnosContext';
import AdminSettings from './AdminSettings';
import { Settings } from 'lucide-react';

const KPICard = ({ title, value, subtext, trend }) => (
    <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
        <h3 className="text-neutral-500 text-sm font-medium mb-1">{title}</h3>
        <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-neutral-900">{value}</span>
            {trend && (
                <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full mb-1 ${trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {trend === 'up' ? '↑ +12%' : '↓ -5%'}
                </span>
            )}
        </div>
        {subtext && <p className="text-xs text-neutral-400 mt-2">{subtext}</p>}
    </div>
);

const AdminDashboard = () => {
    const { state } = useTurnos();
    const [showSettings, setShowSettings] = useState(false);

    if (showSettings) {
        return <AdminSettings onBack={() => setShowSettings(false)} />;
    }

    // Calculate Metrics
    const totalAppts = state.appointments.length;
    const confirmedAppts = state.appointments.filter(a => a.status === 'confirmed').length;
    const cancelledAppts = state.appointments.filter(a => a.status === 'cancelled').length;

    // Revenue Estimate (Mock)
    const revenue = state.appointments.reduce((acc, appt) => {
        if (appt.status !== 'confirmed') return acc;
        const srv = state.services.find(s => s.id === appt.serviceId);
        return acc + (srv ? srv.price : 0);
    }, 0);

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Panel de Control</h1>
                    <p className="text-neutral-500">Resumen de operaciones del día</p>
                </div>
                <button
                    onClick={() => setShowSettings(true)}
                    className="p-3 bg-white border border-neutral-200 rounded-xl hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-sm group"
                    title="Configuración"
                >
                    <Settings className="text-neutral-500 group-hover:text-indigo-600 transition-colors" size={24} />
                </button>
            </header>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard title="Turnos Totales" value={totalAppts} trend="up" subtext="Últimos 30 días" />
                <KPICard title="Confirmados" value={confirmedAppts} subtext="Tasa de conversión 85%" />
                <KPICard title="Cancelaciones" value={cancelledAppts} trend="down" subtext="Bajo control (<5%)" />
                <KPICard title="Ingresos Estimados" value={`$${revenue}`} trend="up" subtext="Proyectado mes actual" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-neutral-900 mb-4">Últimos Movimientos</h3>
                    <div className="space-y-4">
                        {state.appointments.length === 0 ? (
                            <p className="text-neutral-400 text-sm">No hay actividad reciente.</p>
                        ) : (
                            state.appointments.slice().reverse().map(appt => {
                                const srv = state.services.find(s => s.id === appt.serviceId);
                                const pro = state.professionals.find(p => p.id === appt.proId);
                                const date = new Date(appt.start);
                                return (
                                    <div key={appt.id} className="flex items-center justify-between p-3 hover:bg-neutral-50 rounded-lg transition-colors border-b border-neutral-50 last:border-0">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${appt.status === 'confirmed' ? 'bg-green-500' : 'bg-red-500'}`} />
                                            <div>
                                                <p className="font-medium text-neutral-800 flex items-center gap-2">
                                                    {srv?.name || 'Servicio'}
                                                    {appt.paymentStatus === 'deposit_paid' && (
                                                        <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold border border-green-200">
                                                            SEÑA OK
                                                        </span>
                                                    )}
                                                    {appt.paymentStatus === 'pending' && (
                                                        <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded font-bold border border-yellow-200">
                                                            PAGO PEND
                                                        </span>
                                                    )}
                                                </p>
                                                <p className="text-xs text-neutral-400">
                                                    {appt.clientData ? appt.clientData.name : 'Cliente #1'}
                                                    <span className="mx-1">•</span>
                                                    {pro?.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right hidden sm:block">
                                                <p className="text-sm font-bold text-neutral-700">{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                <p className="text-xs text-neutral-400">{date.toLocaleDateString()}</p>
                                            </div>
                                            {appt.clientData?.phone && (
                                                <a
                                                    href={`https://wa.me/${appt.clientData.phone.replace(/[^0-9]/g, '')}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                                                    title="Contactar por WhatsApp"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Risk Alerts & Tools */}
                <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 flex flex-col gap-6">
                    <div>
                        <h3 className="text-lg font-bold text-neutral-900 mb-4">Alertas de Negocio</h3>
                        <div className="space-y-3">
                            <div className="p-3 bg-yellow-50 text-yellow-800 rounded-lg text-sm border border-yellow-100">
                                <strong>Ana Garcia</strong> ha cancelado 2 turnos consecutivos.
                            </div>
                            <div className="p-3 bg-neutral-50 text-neutral-600 rounded-lg text-sm">
                                El servicio <strong>Limpieza Facial</strong> tiene horarios saturados los viernes.
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-neutral-900 mb-4">Herramientas Rápidas</h3>
                        <button
                            onClick={() => alert("Simulación: Mensajes de recordatorio (24hs antes) enviados a 5 clientes por WhatsApp.")}
                            className="w-full py-3 px-4 bg-neutral-900 text-white rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                        >
                            <span>📢</span> Disparar Recordatorios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
