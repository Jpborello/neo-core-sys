import { Outlet, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function GymLayout() {
    const location = useLocation();

    // Redirect root to dashboard
    if (location.pathname === "/gimnasio-ai-demo" || location.pathname === "/gimnasio-ai-demo/") {
        return <Navigate to="/gimnasio-ai-demo/dashboard" replace />;
    }

    return (
        <div className="flex min-h-screen bg-[#0B0F19] text-white font-sans">
            <Sidebar />
            <main className="flex-1 overflow-y-auto h-screen">
                <div className="p-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
