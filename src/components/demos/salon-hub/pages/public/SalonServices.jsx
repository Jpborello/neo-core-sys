import React from 'react';
import { mockServices } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
export default function SalonServices() {
    return (
        <div className="min-h-screen bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-black text-gray-900 mb-8">Nuestros Servicios</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockServices.map(service => (
                        <div key={service.id} className="bg-white border rounded-xl overflow-hidden hover:shadow-xl transition-all">
                            <img src={service.image} alt={service.name} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                                <p className="text-gray-600 mb-4">{service.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-black text-yellow-600">${(service.price / 1000).toFixed(0)}k</span>
                                    <span className="text-sm text-gray-500">{service.duration} min</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
