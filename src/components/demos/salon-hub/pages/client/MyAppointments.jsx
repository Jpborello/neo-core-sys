import React from 'react';
import { useBooking } from "../../context/BookingContext";
import { useAuth } from "../../context/AuthContext";

export default function MyAppointments() {
    const { currentUser } = useAuth();
    const { getClientAppointments } = useBooking();
    const myAppointments = currentUser ? getClientAppointments(currentUser.id) : [];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-black text-gray-900 mb-8">Mis Turnos</h1>
                {myAppointments.length === 0 ? (
                    <div className="bg-white p-12 rounded-xl text-center">
                        <p className="text-gray-500">No tenés turnos agendados</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {myAppointments.map(apt => (
                            <div key={apt.id} className="bg-white p-6 rounded-xl shadow-sm">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">{apt.serviceName}</h3>
                                        <p className="text-gray-600">Con: {apt.stylistName}</p>
                                        <p className="text-gray-600">{new Date(apt.date).toLocaleDateString('es-AR')} - {apt.time}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${apt.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {apt.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
