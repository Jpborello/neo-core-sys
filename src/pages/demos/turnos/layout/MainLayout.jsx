import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useTurnos } from "../context/TurnosContext";

export default function MainLayout() {
    const { user } = useTurnos();

    if (!user) {
        return <Navigate to="/demo-turnos/login" replace />;
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex">
            <Sidebar />

            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                <Topbar />

                <main className="flex-1 p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
