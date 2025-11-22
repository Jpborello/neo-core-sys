import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import EcommercePage from "./pages/EcommercePage";
import DemoLanding from "./pages/demos/DemoLanding";
import DemoCorporate from "./pages/demos/DemoCorporate";
import DemoRestaurant from "./pages/demos/DemoRestaurant";
import MiliNailsPage from "./pages/milinails/MiliNailsPage";
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
      </Routes>
    </Router>
  );
}
