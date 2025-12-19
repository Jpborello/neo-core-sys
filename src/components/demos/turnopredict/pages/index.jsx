import { Routes, Route, Link, useLocation } from "react-router-dom";
import BookingScreen from "../components/BookingScreen";
import AdminPanel from "../components/AdminPanel";
import { FaMobileAlt, FaChartBar } from "react-icons/fa";

export default function TurnoPredict() {
    const location = useLocation();
    const isMobileView = location.pathname === "/demo-turnopredict" || location.pathname === "/demo-turnopredict/";

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            {/* Navigation Switcher for Demo Purposes */}
            <div className="fixed bottom-6 right-6 z-50 flex gap-2 bg-white p-2 rounded-full shadow-xl border border-gray-200">
                <Link
                    to="/demo-turnopredict"
                    className={`p-3 rounded-full transition-all ${isMobileView ? 'bg-[#0A0A0A] text-white' : 'text-gray-400 hover:bg-gray-100'}`}
                    title="Vista Cliente (Mobile)"
                >
                    <FaMobileAlt />
                </Link>
                <Link
                    to="/demo-turnopredict/admin"
                    className={`p-3 rounded-full transition-all ${!isMobileView ? 'bg-[#0A0A0A] text-white' : 'text-gray-400 hover:bg-gray-100'}`}
                    title="Vista Admin (Dashboard)"
                >
                    <FaChartBar />
                </Link>
            </div>

            <Routes>
                <Route index element={<BookingScreen />} />
                <Route path="admin" element={<AdminPanel />} />
            </Routes>
        </div>
    );
}
