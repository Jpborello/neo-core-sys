import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import MobileLayout from "./pages/demos/turnos-mobile/components/MobileLayout";
import HomeMobile from "./pages/demos/turnos-mobile/pages/Home";
import BookingMobile from "./pages/demos/turnos-mobile/pages/Booking";
import MyAppointmentsMobile from "./pages/demos/turnos-mobile/pages/MyAppointments";
import TurnoPredict from "./pages/demos/turnopredict";
import GymLayout from "./pages/demos/gym-ai/components/layout/GymLayout";
import DashboardAI from "./pages/demos/gym-ai/pages/DashboardAI";
import UsuariosAIList from "./pages/demos/gym-ai/pages/UsuariosAIList";
import AsistenciasAI from "./pages/demos/gym-ai/pages/AsistenciasAI";
import CuotasAI from "./pages/demos/gym-ai/pages/CuotasAI";
import "./index.css";
import { ShopProvider } from './pages/demos/pet-shop/context/ShopContext';
import PetShopLayout from './pages/demos/pet-shop/layout/PetShopLayout';
import Home from './pages/demos/pet-shop/pages/Home';
import ProductDetail from './pages/demos/pet-shop/pages/ProductDetail';
import { AuthProvider as SalonAuthProvider } from './pages/demos/salon-hub/context/AuthContext';
import { BookingProvider as SalonBookingProvider } from './pages/demos/salon-hub/context/BookingContext';
import SalonLayout from './pages/demos/salon-hub/SalonLayout';
import SalonHome from './pages/demos/salon-hub/pages/public/SalonHome';
import SalonAuth from './pages/demos/salon-hub/pages/public/SalonAuth';
import SalonServices from './pages/demos/salon-hub/pages/public/SalonServices';
import MyAppointments from './pages/demos/salon-hub/pages/client/MyAppointments';
import AdminDashboard from './pages/demos/salon-hub/pages/admin/AdminDashboard';
import ErrorBoundary from "./components/ErrorBoundary";
import AllInclusiveLayout from './pages/demos/all-inclusive/layout/Layout';
import AllInclusiveHome from './pages/demos/all-inclusive/pages/Home';
import AllInclusiveCatalog from './pages/demos/all-inclusive/pages/Catalog';
import { About as AllInclusiveAbout, Contact as AllInclusiveContact } from './pages/demos/all-inclusive/pages/Pages';
import WebFramerPage from "./pages/demos/web-framer/WebFramerPage";

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
        <Route path="/web-framer" element={<WebFramerPage />} />

        {/* MiliNails Subweb */}
        <Route path="/milinails" element={<MiliNailsPage />} />

        {/* Pet Shop Demo Route */}
        <Route path="/demo-petshop/*" element={
          <ShopProvider>
            <Routes>
              <Route element={<PetShopLayout />}>
                <Route index element={<Home />} />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="catalog" element={<div className="p-10 text-center">Catalog Coming Soon</div>} />
                <Route path="about" element={<div className="p-10 text-center">About Page Coming Soon</div>} />
                <Route path="contact" element={<div className="p-10 text-center">Contact Page Coming Soon</div>} />
                <Route path="checkout" element={<div className="p-10 text-center">Checkout Coming Soon</div>} />
              </Route>
            </Routes>
          </ShopProvider>
        } />

        {/* SalonHub Demo Route */}
        <Route path="/demo-peluqueria/*" element={
          <ErrorBoundary>
            <SalonAuthProvider>
              <SalonBookingProvider>
                <Routes>
                  <Route path="auth" element={<SalonAuth />} />
                  <Route element={<SalonLayout />}>
                    <Route index element={<SalonHome />} />
                    <Route path="servicios" element={<SalonServices />} />
                    <Route path="mis-turnos" element={<MyAppointments />} />
                    <Route path="admin" element={<AdminDashboard />} />
                  </Route>
                </Routes>
              </SalonBookingProvider>
            </SalonAuthProvider>
          </ErrorBoundary>
        } />

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

        {/* Mobile-First Appointment System Demo */}
        <Route path="/demo-turnos-mobile/*" element={
          <Routes>
            <Route element={<MobileLayout />}>
              <Route index element={<HomeMobile />} />
              <Route path="booking" element={<BookingMobile />} />
              <Route path="my-appointments" element={<MyAppointmentsMobile />} />
            </Route>
          </Routes>
        } />

        {/* TurnoPredict Demo (AI Powered) */}
        <Route path="/demo-turnopredict/*" element={<TurnoPredict />} />

        {/* NeoGym AI Manager Demo */}
        <Route path="/gimnasio-ai-demo/*" element={
          <Routes>
            <Route element={<GymLayout />}>
              <Route path="dashboard" element={<DashboardAI />} />
              <Route path="usuarios" element={<UsuariosAIList />} />
              <Route path="asistencias" element={<AsistenciasAI />} />
              <Route path="cuotas" element={<CuotasAI />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>
          </Routes>
        } />

        {/* All Inclusive Men Demo */}
        <Route path="/demo-all-inclusive/*" element={
          <Routes>
            <Route element={<AllInclusiveLayout />}>
              <Route index element={<AllInclusiveHome />} />
              <Route path="catalogo" element={<AllInclusiveCatalog />} />
              <Route path="nosotros" element={<AllInclusiveAbout />} />
              <Route path="contacto" element={<AllInclusiveContact />} />
            </Route>
          </Routes>
        } />
      </Routes>
    </Router>
  );
}
