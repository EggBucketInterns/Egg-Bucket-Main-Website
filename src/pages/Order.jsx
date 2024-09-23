import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/OrderHeader.jsx"
// import DashBoard from "./";
import LandingPage from "../components/LandingPage.jsx";
import DashBoard from "./DashBoard.jsx";


export default function Order() {
    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<LandingPage />} />
                {/* <Route path="dashboard/*" element={DashBoard} /> */}
                <Route path="/account/*" element={<DashBoard />} />
            </Routes>
            {/*  <Footer /> */}
        </>

    );

}
