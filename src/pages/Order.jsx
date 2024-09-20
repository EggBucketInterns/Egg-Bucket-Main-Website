import React from "react";
import {Routes, Route } from "react-router-dom";
// import DashBoard from "./";
import LandingPage from "../components/LandingPage.jsx";

export default function Order() {
    return (
        // <Header/>
    
        <Routes>
             <Route path="/" element={<LandingPage />} />
            {/* <Route path="dashboard/*" element={DashBoard} /> */}
        </Routes>
    // <Footer/>
);

}