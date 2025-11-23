import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import EcommercePage from "./pages/EcommercePage";
import DemoLanding from "./pages/demos/DemoLanding";
import DemoCorporate from "./pages/demos/DemoCorporate";
import DemoRestaurant from "./pages/demos/DemoRestaurant";
import MiliNailsPage from "./pages/milinails/MiliNailsPage";
import { TurnosProvider } from "./pages/demos/turnos/context/TurnosContext";
import MainLayout from "./pages/demos/turnos/layout/MainLayout";
import Login from "./pages/demos/turnos/pages/Login";
import Dashboard from "./pages/demos/turnos/pages/Dashboard";
import Calendar from "./pages/demos/turnos/pages/Calendar";
import Clients from "./pages/demos/turnos/pages/Clients";
import Settings from "./pages/demos/turnos/pages/Settings";
import { DashboardProvider } from "./pages/demos/metrics/context/DashboardContext";
import MetricsLayout from "./pages/demos/metrics/layout/MetricsLayout";
import Overview from "./pages/demos/metrics/pages/Overview";
import Schedule from "./pages/demos/metrics/pages/Schedule";
import { Navigate } from "react-router-dom";
import "./index.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><LandingPage /></Layout>} />
        <Route path="/ecommerce" element={<Layout><EcommercePage /></Layout>} />

        {/* Demos */}
        <Route path="/demo-landing" element={<DemoLanding />} />
        <Route path="/demo-corporate" element={<DemoCorporate />} />
        <Route path="/demo-restaurant" element={<DemoRestaurant />} />

        {/* MiliNails Subweb */}
        <Route path="/milinails" element={<MiliNailsPage />} />

        {/* Premium Appointment System Demo */}
        <Route path="/demo-turnos/*" element={
          <TurnosProvider>
            <Routes>
              <Route path="login" element={<Login />} />
              <Route element={<MainLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="clients" element={<Clients />} />
                <Route path="settings" element={<Settings />} />
                <Route index element={<Navigate to="dashboard" replace />} />
              </Route>
            </Routes>
          </TurnosProvider>
        } />
        <Route path="/demo-metrics/*" element={
          <DashboardProvider>
            <Routes>
              <Route element={<MetricsLayout />}>
                <Route path="overview" element={<Overview />} />
                <Route path="schedule" element={<Schedule />} />
                <Route path="settings" element={<Settings />} />
                <Route index element={<Navigate to="overview" replace />} />
              </Route>
            </Routes>
          </DashboardProvider>
        } />
      </Routes>
    </Router>
  );
}
