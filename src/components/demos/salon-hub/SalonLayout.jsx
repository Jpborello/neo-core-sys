import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCut, FaUser, FaSignOutAlt, FaHome, FaCalendar, FaTachometerAlt } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

export default function SalonLayout() {
    const { currentUser, logout, isAdmin } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    console.log("SalonLayout mounting, currentUser:", currentUser);

    const handleLogout = () => {
        logout();
        navigate('/demo-peluqueria');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/demo-peluqueria" className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-2 rounded-lg">
                                <FaCut className="text-white text-xl" />
                            </div>
                            <span className="text-2xl font-black">Salon<span className="text-yellow-600">Hub</span></span>
                        </Link>

                        <nav className="hidden md:flex items-center gap-6">
                            <Link to="/demo-peluqueria" className="text-gray-600 hover:text-yellow-600 font-medium">Inicio</Link>
                            <Link to="/demo-peluqueria/servicios" className="text-gray-600 hover:text-yellow-600 font-medium">Servicios</Link>
                            {currentUser && (
                                <>
                                    <Link to="/demo-peluqueria/mis-turnos" className="text-gray-600 hover:text-yellow-600 font-medium">Mis Turnos</Link>
                                    {isAdmin && (
                                        <Link to="/demo-peluqueria/admin" className="text-gray-600 hover:text-yellow-600 font-medium">Admin</Link>
                                    )}
                                </>
                            )}
                        </nav>

                        <div className="flex items-center gap-4">
                            {currentUser ? (
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2">
                                        <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full" />
                                        <span className="hidden sm:inline text-sm font-medium">{currentUser.name}</span>
                                    </div>
                                    <button onClick={handleLogout} className="text-gray-600 hover:text-red-600">
                                        <FaSignOutAlt />
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/demo-peluqueria/auth"
                                    className="bg-yellow-500 text-white px-6 py-2 rounded-full font-bold hover:bg-yellow-600 transition-colors"
                                >
                                    Iniciar Sesión
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main>
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-400">&copy; 2025 SalonHub Demo. Created by Neo-Core-Sys.</p>
                </div>
            </footer>
        </div>
    );
}
