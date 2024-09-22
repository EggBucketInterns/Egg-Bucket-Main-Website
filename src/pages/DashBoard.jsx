
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Account from "../components/Account";  
import Orders from "../components/OrderStatus";
import Profile from "../components/Profile";
import Addresses from "../components/Address";

export default function DashBoard() {
    return (
        <Account>  
        <Routes>
           

                <Route path="/" element={<Navigate to="orders" />} />
                <Route path="orders" element={<Orders />} />
                <Route path="profile" element={<Profile />} />
                <Route path="addresses" element={<Addresses />} />
           
        </Routes>
     </Account> 
  );
}
