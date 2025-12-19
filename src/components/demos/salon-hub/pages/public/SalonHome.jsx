import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCut, FaStar, FaClock, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';
import { mockServices } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

export default function SalonHome() {
    const { isAuthenticated } = useAuth();
    const featuredServices = mockServices.slice(0, 3);

    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="relative h-[600px] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=2000"
                        alt="SalonHub"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl text-white"
                    >
                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                            Tu Belleza,<br /> Nuestra <span className="text-yellow-500">Pasión</span>
                        </h1>
                        <p className="text-xl mb-8 text-gray-200">
                            Sistema profesional de gestión de turnos online. Reservá en segundos.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to={isAuthenticated ? "/demo-peluqueria/reservar" : "/demo-peluqueria/auth"}
                                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg text-center"
                            >
                                RESERVAR TURNO
                            </Link>
                            <Link
                                to="/demo-peluqueria/servicios"
                                className="bg-white/10 backdrop-blur-md border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg transition-all text-center"
                            >
                                VER SERVICIOS
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <div className="bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm">
                            <div className="bg-yellow-100 p-4 rounded-full text-yellow-600 text-3xl flex-shrink-0">
                                <FaCalendarAlt />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Turnos Online</h3>
                                <p className="text-gray-600 text-sm">Reservá 24/7 desde cualquier dispositivo</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm">
                            <div className="bg-yellow-100 p-4 rounded-full text-yellow-600 text-3xl flex-shrink-0">
                                <FaStar />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Profesionales Expertos</h3>
                                <p className="text-gray-600 text-sm">Equipo capacitado constantemente</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm">
                            <div className="bg-yellow-100 p-4 rounded-full text-yellow-600 text-3xl flex-shrink-0">
                                <FaClock />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Confirmación Inmediata</h3>
                                <p className="text-gray-600 text-sm">Tu turno confirmado al instante</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Services */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 mb-4">Servicios Destacados</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Descubrí nuestros servicios más populares
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredServices.map((service) => (
                            <div key={service.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all">
                                <div className="relative aspect-square overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-xl text-gray-900 mb-2">{service.name}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-black text-gray-900">${(service.price / 1000).toFixed(0)}k</span>
                                        <span className="text-sm text-gray-500">{service.duration} min</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to="/demo-peluqueria/servicios"
                            className="inline-block border-2 border-gray-900 text-gray-900 px-10 py-3 rounded-full font-bold hover:bg-gray-900 hover:text-white transition-colors"
                        >
                            Ver Todos los Servicios
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-br from-gray-900 to-black text-white py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <FaCut className="text-6xl text-yellow-500 mx-auto mb-6" />
                    <h2 className="text-4xl font-black mb-4">¿Listo para tu Transformación?</h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Reservá tu turno online en menos de 2 minutos
                    </p>
                    <Link
                        to={isAuthenticated ? "/demo-peluqueria/reservar" : "/demo-peluqueria/auth"}
                        className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-12 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
                    >
                        RESERVAR AHORA
                    </Link>
                </div>
            </section>
        </div>
    );
}
