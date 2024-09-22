
import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaUser, FaMapMarkerAlt, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';
import profile from "../assets/Images/profile.png";
import Orders from './OrderStatus';
import Profile from './Profile';
import Addresses from './Address';

const Account = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true); 
  const [selectedMenuItem, setSelectedMenuItem] = useState('orders');
  const [currentPageName, setCurrentPageName] = useState('Orders');

  const handleMenuClick = (menuItem) => {
    setSelectedMenuItem(menuItem); 
    setCurrentPageName(menuItem.charAt(0).toUpperCase() + menuItem.slice(1));
    if (window.innerWidth < 1024) {
      setSidebarVisible(false); 
    }
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'orders':
        return <Orders/>;
      case 'profile':
        return <Profile/>;
      case 'addresses':
        return <Addresses/>;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen mt-16 lg:mt-20 bg-gray-100">
      {/* Sidebar */}
      <div className={`w-full lg:w-1/4 bg-white p-6 shadow-lg lg:block ${isSidebarVisible ? 'block' : 'hidden'}`}>
        <div className="flex flex-col items-center space-x-4">
          <img src={profile} alt="Profile" className="bg-gray-200 rounded-full w-24 h-24 object-cover" />
          <div className="flex flex-col items-start">
            <h2 className="text-xl mt-4 font-bold text-center">Welcome, Name</h2>
            <p className="text-gray-600 text-center">+91 9999999999</p>
          </div>
        </div>

        {/* Menu Options */}
        <div className="mt-6 border-gray-300">
          <div
            className={`menu-item p-3 cursor-pointer flex justify-between border-2 border-gray-300 bg-gray-100 items-center ${selectedMenuItem === 'orders' ? 'bg-orange-400 text-white' : ''}`}
            onClick={() => handleMenuClick('orders')}
          >
            <span className="flex items-center">
              <FaShoppingCart className="mr-2" />
              Orders
            </span>
            <MdKeyboardArrowRight />
          </div>
          <div
            className={`menu-item p-3 cursor-pointer flex justify-between items-center border-2 border-gray-300 bg-gray-100 ${selectedMenuItem === 'profile' ? 'bg-orange-400 text-white' : ''}`}
            onClick={() => handleMenuClick('profile')}
          >
            <span className="flex items-center">
              <FaUser className="mr-2" />
              Profile
            </span>
            <MdKeyboardArrowRight />
          </div>
          <div
            className={`menu-item p-3 cursor-pointer flex justify-between items-center border-2 border-gray-300 bg-gray-100 ${selectedMenuItem === 'addresses' ? 'bg-orange-400 text-white' : ''}`}
            onClick={() => handleMenuClick('addresses')}
          >
            <span className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              Addresses
            </span>
            <MdKeyboardArrowRight />
          </div>
          <div
            className="menu-item p-3 cursor-pointer flex justify-between items-center border-2 border-gray-300 bg-gray-100"
            onClick={() => console.log('Navigating to logout')} 
          >
            <span className="flex items-center">
              <FaSignOutAlt className="mr-2" />
              Log Out
            </span>
            <MdKeyboardArrowRight />
          </div>
        </div>
      </div>

      <div className={`w-full lg:w-3/4 bg-white p-8 overflow-y-auto ${isSidebarVisible ? 'hidden lg:block' : 'block'}`}>
        {/* Small screens only */}
        <div className="lg:hidden mb-4 flex items-center bg-orange-400 p-3 rounded-lg text-white">
          <FaArrowLeft className="mr-2" onClick={() => setSidebarVisible(true)} />
          {currentPageName}
        </div>

        {/* Render the selected menu content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Account;

