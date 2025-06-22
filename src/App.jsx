import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

// Importing Pages
import Careers from "./pages/Careers";
import ContactUsPage from "./pages/ContactUs";
import FAQ from "./pages/FAQ";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Ourfounders from "./pages/OurFounders";
import Privacy from "./pages/Policies/Privacy.jsx";
import Refund from "./pages/Policies/Refund.jsx";
import Return from "./pages/Policies/Return.jsx";
import Shipping from "./pages/Policies/Shipping.jsx";
import Time from "./pages/Time";

// import { SiDotenv } from "react-icons/si";
// import { GrConfigure } from "react-icons/gr";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import { useDispatch } from "react-redux";
import FCMToken from "./components/FCMToken";
import Login from "./components/Login";
import { auth } from "./firebase.config";
import CareerDreamJob from "./pages/CareerDreamJob";
import EngineeringOpportunities from "./pages/EngineeringOpportunities";
import MBAOpportunities from "./pages/MBAOpportunities";
import { fetchUserData } from "./redux/userSlice";


const App = () => {
  const location = useLocation();
  const isB2CPage = location.pathname.startsWith("/order");
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Firebase listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && token) {
        const phoneNumber = user.phoneNumber;
        dispatch(fetchUserData(phoneNumber));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div>
      <Toaster position="top-center" />
      {!isB2CPage && <Navbar />}
      <ScrollToTop />
      
      <Routes>

        <Route path="/fcmtoken" element={<FCMToken/>} />
        <Route path="/" element={<Home />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/return" element={<Return />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/privacy" element={<Privacy />} />

        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/dreamjob" element={<CareerDreamJob />} />
        <Route path="/careers/dreamjob/EngineeringOpportunities" element={<EngineeringOpportunities />} />
        <Route path="/careers/dreamjob/MBAOpportunities" element={<MBAOpportunities />} />
        <Route path="/timeline" element={<Time />} />
        <Route path="/ourfounders" element={<Ourfounders />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/order/*" element={<Order />} />
        <Route path="/login" element={<Login />} />

        
      </Routes>

       {!isB2CPage && <Footer />} 
    </div>
  );
};

export default App;


