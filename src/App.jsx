import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import EcommercePage from "./pages/EcommercePage";
import DemoLanding from "./pages/demos/DemoLanding";
import DemoCorporate from "./pages/demos/DemoCorporate";
import DemoRestaurant from "./pages/demos/DemoRestaurant";
import MiliNails from "./pages/demos/MiliNails";
import "./index.css";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/ecommerce" element={<EcommercePage />} />
          <Route path="/demo-landing" element={<DemoLanding />} />
          <Route path="/demo-corporate" element={<DemoCorporate />} />
          <Route path="/demo-restaurant" element={<DemoRestaurant />} />
          <Route path="/milinails" element={<MiliNails />} />
        </Routes>
      </Layout>
    </Router>
  );
}
