import React from 'react';
import { FaCalendar, FaUsers, FaDollarSign, FaStar, FaClock } from 'react-icons/fa';
import { useBooking } from '../../../../components/demos/salon-hub/context/BookingContext';

export default function AdminDashboard() {
    const { getTodayAppointments, getUpcomingAppointments, getMetrics, appointments } = useBooking();
    const metrics = getMetrics();
    const todayAppointments = getTodayAppointments();
    const upcomingAppointments = getUpcomingAppointments().slice(0, 5);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-black text-gray-900 mb-8">Dashboard Administrativo</h1>

                {/* Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <FaCalendar className="text-blue-600 text-2xl" />
                            </div>
                            <span className="text-3xl font-black">{metrics.todayAppointments}</span>
                        </div>
                        <h3 className="text-sm font-bold text-gray-600">Turnos Hoy</h3>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-green-100 p-3 rounded-lg">
                                <FaDollarSign className="text-green-600 text-2xl" />
                            </div>
                            <span className="text-3xl font-black">${(metrics.totalRevenue / 1000).toFixed(0)}k</span>
                        </div>
                        <h3 className="text-sm font-bold text-gray-600">Ingresos del Mes</h3>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-yellow-100 p-3 rounded-lg">
                                <FaStar className="text-yellow-600 text-2xl" />
                            </div>
                            <span className="text-sm font-black truncate">{metrics.mostBookedService}</span>
                        </div>
                        <h3 className="text-sm font-bold text-gray-600">Servicio Más Pedido</h3>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-purple-100 p-3 rounded-lg">
                                <FaUsers className="text-purple-600 text-2xl" />
                            </div>
                            <span className="text-3xl font-black">{metrics.totalAppointments}</span>
                        </div>
                        <h3 className="text-sm font-bold text-gray-600">Total del Mes</h3>
                    </div>
                </div>

                {/* Today's Appointments */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-6">Turnos de Hoy</h2>
                    {todayAppointments.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No hay turnos para hoy</p>
                    ) : (
                        <div className="space-y-4">
                            {todayAppointments.map(apt => (
                                <div key={apt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h3 className="font-bold text-lg">{apt.clientName}</h3>
                                        <p className="text-sm text-gray-600">{apt.serviceName} - {apt.stylistName}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-yellow-600">{apt.time}</p>
                                        <p className="text-sm text-gray-500">${(apt.servicePrice / 1000).toFixed(0)}k</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Upcoming Appointments */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold mb-6">Próximos Turnos</h2>
                    {upcomingAppointments.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No hay turnos próximos</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-4 font-bold text-sm text-gray-600">Cliente</th>
                                        <th className="text-left py-3 px-4 font-bold text-sm text-gray-600">Servicio</th>
                                        <th className="text-left py-3 px-4 font-bold text-sm text-gray-600">Fecha</th>
                                        <th className="text-left py-3 px-4 font-bold text-sm text-gray-600">Hora</th>
                                        <th className="text-left py-3 px-4 font-bold text-sm text-gray-600">Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {upcomingAppointments.map(apt => (
                                        <tr key={apt.id} className="border-b hover:bg-gray-50">
                                            <td className="py-3 px-4 font-medium">{apt.clientName}</td>
                                            <td className="py-3 px-4">{apt.serviceName}</td>
                                            <td className="py-3 px-4">{new Date(apt.date).toLocaleDateString('es-AR')}</td>
                                            <td className="py-3 px-4 font-bold">{apt.time}</td>
                                            <td className="py-3 px-4">
                                                <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                                    {apt.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
