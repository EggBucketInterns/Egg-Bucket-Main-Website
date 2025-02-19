// src/pages/Home.jsx
import React from "react";
import Banner from "../components/Banner";
import AboutUs from "../components/About-Us";
import Services from "../components/Services";
import Partners from "../components/Partners";
import FAQSection from "../components/Faq";
import HowItWorks from "../components/HowItWorks";

const Home = () => {
  return (
    <div>
      <Banner />
      <AboutUs />
      <HowItWorks />
      <Services />
      <Partners />
      {/* <FAQSection /> */}
    </div>
  );
};

export default Home;
