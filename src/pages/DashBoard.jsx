import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


export default function DashBoard() {
    return (

        <Routes>
            <Route root path="homeorders/*" element={HomeOrders} />
            {/*  */}
        </Routes>
  
    );

}