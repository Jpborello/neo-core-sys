import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";

export default function GymLayout() {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Auto-collapse on small screens
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsCollapsed(true);
            }
        };

        // Check on mount
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Redirect root to dashboard
    if (location.pathname === "/gimnasio-ai-demo" || location.pathname === "/gimnasio-ai-demo/") {
        return <Navigate to="/gimnasio-ai-demo/dashboard" replace />;
    }

    return (
        <div className="flex min-h-screen bg-[#0B0F19] text-white font-sans relative">
            <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />

            <main className="flex-1 overflow-y-auto h-screen relative w-full">
                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="md:hidden absolute top-4 left-4 z-40 p-2 bg-gray-800 text-white rounded-lg shadow-lg"
                >
                    <FaBars />
                </button>

                <div className="p-4 md:p-8 max-w-7xl mx-auto pt-16 md:pt-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
