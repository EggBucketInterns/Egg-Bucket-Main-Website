import React, { useState, useEffect } from "react";
import {
  FaShoppingCart,
  FaUser,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import profile from "../assets/Images/profile.png";
import Orders from "./OrderStatus";
import Profile from "./Profile";
import Addresses from "./Address";
import { useSelector, useDispatch } from "react-redux";

import { fetchUserData } from "../redux/userSlice";

import { auth } from "../firebase.config";

import { useNavigate } from "react-router-dom";

function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { userData, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    const currentUser = auth.currentUser;
    console.log("Current Authenticated User:", currentUser);

    if (currentUser && currentUser.phoneNumber) {
      const phoneNumber = currentUser.phoneNumber;
      dispatch(fetchUserData(phoneNumber));
    } else {
      console.log(
        "No user is currently authenticated or no phoneNumber number found."
      );
      navigate("/login"); // Redirect to login page if user is not authenticated
    }
  }, [dispatch, navigate]);

  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState("orders");
  const [currentPageName, setCurrentPageName] = useState("Orders");

  const handleMenuClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setCurrentPageName(menuItem.charAt(0).toUpperCase() + menuItem.slice(1));
    if (window.innerWidth < 1024) {
      setSidebarVisible(false);
    }
  };
  
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        // Clear specific items from local storage
        // localStorage.clear();
        localStorage.removeItem("token"); // Remove token
        localStorage.removeItem("customerName"); // Remove customer name if stored
        localStorage.removeItem("outletId"); // Remove outlet ID if stored
        localStorage.removeItem("deliveryPartnerId"); // Remove delivery partner ID if stored
        localStorage.removeItem("selectedAddress"); // Remove delivery partner ID if stored

        // Navigate to login page
        navigate("/order/login");
        window.location.reload(); 
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case "orders":
        return <Orders />;
      case "profile":
        return <Profile />;
      case "addresses":
        return <Addresses />;
      default:
        return null;
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="account">
      {userData ? (
        <div className="flex min-h-screen mt-16 lg:mt-20 bg-gray-100">
          {/* Sidebar */}
          <div
            className={`w-full lg:w-1/4 bg-white p-6 shadow-lg lg:block ${
              isSidebarVisible ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col items-center space-x-4">
              <img
                src={profile}
                alt="Profile"
                className="bg-gray-200 rounded-full w-24 h-24 object-cover"
              />
              <div className="flex flex-col items-start">
                <h2 className="text-xl mt-4 font-bold text-center">
                  Welcome, {userData.name}
                </h2>
                <p className="text-gray-600 text-center">+{userData.phoneNumber}</p>
              </div>
            </div>

            {/* Menu Options */}
            <div className="mt-6 border-gray-300">
              <div
                className={`menu-item p-3 cursor-pointer flex justify-between border-2 border-gray-300 bg-gray-100 items-center ${
                  selectedMenuItem === "orders"
                    ? "bg-orange-400 text-white"
                    : ""
                }`}
                onClick={() => handleMenuClick("orders")}
              >
                <span className="flex items-center">
                  <FaShoppingCart className="mr-2" />
                  Orders
                </span>
                <MdKeyboardArrowRight />
              </div>
              <div
                className={`menu-item p-3 cursor-pointer flex justify-between items-center border-2 border-gray-300 bg-gray-100 ${
                  selectedMenuItem === "profile"
                    ? "bg-orange-400 text-white"
                    : ""
                }`}
                onClick={() => handleMenuClick("profile")}
              >
                <span className="flex items-center">
                  <FaUser className="mr-2" />
                  Profile
                </span>
                <MdKeyboardArrowRight />
              </div>
              <div
                className={`menu-item p-3 cursor-pointer flex justify-between items-center border-2 border-gray-300 bg-gray-100 ${
                  selectedMenuItem === "addresses"
                    ? "bg-orange-400 text-white"
                    : ""
                }`}
                onClick={() => handleMenuClick("addresses")}
              >
                <span className="flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  Addresses
                </span>
                <MdKeyboardArrowRight />
              </div>
              <div
                className="menu-item p-3 cursor-pointer flex justify-between items-center border-2 border-gray-300 bg-gray-100"
                onClick={handleLogout}
              >
                <span className="flex items-center">
                  <FaSignOutAlt className="mr-2" />
                  Log Out
                </span>
                <MdKeyboardArrowRight />
              </div>
            </div>
          </div>

          <div
            className={`w-full lg:w-3/4 bg-white p-8 overflow-y-auto ${
              isSidebarVisible ? "hidden lg:block" : "block"
            }`}
          >
            {/* Small screens only */}
            <div className="lg:hidden mb-4 flex items-center bg-orange-400 p-3 rounded-lg text-white">
              <FaArrowLeft
                className="mr-2"
                onClick={() => setSidebarVisible(true)}
              />
              {currentPageName}
            </div>

            {/* Render the selected menu content */}
            {renderContent()}
          </div>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}

export default Account;
