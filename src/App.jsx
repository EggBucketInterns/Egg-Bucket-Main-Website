import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";


// Importing Pages
import Home from "./pages/Home";
import ContactUsPage from "./pages/ContactUs";
import Careers from "./pages/Careers";
import Time from "./pages/Time";
import Ourfounders from "./pages/OurFounders";
import FAQ from "./pages/FAQ";
import Order from "./pages/Order"

const App = () => {
  const location = useLocation();
  const isB2CPage = location.pathname === "/order";

  return (
    <div>
      {!isB2CPage && <Navbar />}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/timeline" element={<Time />} />
        <Route path="/ourfounders" element={<Ourfounders />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/order/*" element={<Order />} />
        {/* Add more routes as needed */}
      </Routes>

      {!isB2CPage && <Footer />}
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
