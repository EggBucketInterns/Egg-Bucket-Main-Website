import React, { useEffect } from "react";
import { Routes, Route,Navigate, useNavigate } from "react-router-dom";
import Account from "../components/Account";
import Orders from "../components/OrderStatus";
import Profile from "../components/Profile";
import Addresses from "../components/Address";

export default function DashBoard() {
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/order/login");
      
    }
  }, [navigate]);

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
