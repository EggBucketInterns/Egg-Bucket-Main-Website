import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import bglogo from "../assets/Images/logo.png";
import {
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineDown,
  AiOutlinePlus,
  AiOutlineUser,
} from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";

import Cart from "./Cart";
import AddAddress from "./AddAddress";
import { useSelector } from "react-redux";

const Header = ({ addToCart, removeFromCart }) => {
  const { userData } = useSelector((state) => state.user);
  const [nav, setNav] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [temporaryAddress, setTemporaryAddress] = useState(null);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const cartItems = useSelector((state) => state.localStorage.items);
  
  // Add ref for the address popup
  const addressPopupRef = useRef(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addressPopupRef.current && !addressPopupRef.current.contains(event.target)) {
        // Check if the click wasn't on the toggle button
        const toggleButton = document.querySelector('[data-address-toggle]');
        if (!toggleButton?.contains(event.target)) {
          setShowAddressPopup(false);
        }
      }
    };

    // Add event listener when popup is open
    if (showAddressPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAddressPopup]);

  // Load address from localStorage if available
  useEffect(() => {
    try {
      const storedAddress = localStorage.getItem("selectedAddress");
      if (storedAddress) {
        setSelectedAddress(JSON.parse(storedAddress));
      } else if (userData?.addresses?.length > 0) {
        const firstAddress = userData.addresses[0];
        const firstAddressDetails = {
          fullAddress: firstAddress.fullAddress || {},
          coordinates: {
            lat: firstAddress.coordinates?.lat || 0,
            long: firstAddress.coordinates?.long || 0,
          },
        };
        setSelectedAddress(firstAddressDetails);
        localStorage.setItem(
          "selectedAddress",
          JSON.stringify(firstAddressDetails)
        );
      }
    } catch (error) {
      console.error("Error parsing stored address:", error);
    }
  }, [userData]);

  const handleNav = () => setNav(!nav);
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleAddressPopup = () => setShowAddressPopup(!showAddressPopup);
  const toggleAddAddressPopup = () => setShowAddAddress(!showAddAddress);

  const handleAddressSelect = (address) => {
    if (address?.fullAddress && address?.coordinates) {
      const selected = {
        fullAddress: address.fullAddress,
        coordinates: {
          lat: address.coordinates.lat,
          long: address.coordinates.long,
        },
      };
      setTemporaryAddress(selected);
    }
  };

  const saveSelectedAddress = () => {
    if (temporaryAddress) {
      setSelectedAddress(temporaryAddress);
      localStorage.setItem("selectedAddress", JSON.stringify(temporaryAddress));
    }
    toggleAddressPopup();
  };

  return (
    <>
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
          onClick={toggleCart}
        ></div>
      )}

      <nav
        className={`w-full bg-white shadow-md fixed top-0 z-50 transition-all duration-300 ease-in-out ${
          isCartOpen ? "blur-sm" : ""
        }`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center px-4 py-3 md:px-8">
          <div className="flex items-center justify-between w-full md:w-auto">
            <img
              src={bglogo}
              className="h-[40px] w-[80px] md:h-[55px] md:w-[100px]"
              alt="Logo"
            />
            <div className="md:hidden flex items-center space-x-4">
              <AiOutlineDown
                className="text-gray-600 hover:text-orange-500 text-2xl"
                onClick={toggleAddressPopup}
                data-address-toggle
              />
              <AiOutlineShoppingCart
                size={25}
                className="cursor-pointer text-gray-600 hover:text-orange-500 transition-transform transform hover:scale-110"
                onClick={toggleCart}
              />

              <Link
                className="text-gray-600 hover:text-orange-500 text-2xl"
                to="/order/account/orders"
              >
                <AiOutlineUser />
              </Link>
              
              {!nav ? (
                <AiOutlineMenu
                  size={25}
                  className="cursor-pointer transition-transform transform hover:scale-110"
                  onClick={handleNav}
                />
              ) : (
                <AiOutlineClose
                  size={25}
                  className="cursor-pointer transition-transform transform hover:scale-110"
                  onClick={handleNav}
                />
              )}
            </div>
            <Link
              to="/"
              className="relative block px-3 py-2 text-gray-600 group ml-8 text-lg md:text-xl"
            >
              <span className="relative z-10 transition-colors group-hover:text-gray-950">
                Home
              </span>
              <div className="absolute inset-0 bg-[#f87709] bg-opacity-70 h-1.5 rounded-lg top-3/4 transform origin-left scale-x-0 transition-transform duration-500 ease-in-out group-hover:scale-x-100"></div>
            </Link>
            <Link
              to="/order"
              className="relative block px-3 py-2 text-gray-600 group ml-8 text-lg md:text-xl"
            >
              <span className="relative z-10 transition-colors flex group-hover:text-gray-950">
              <IoMdArrowBack />
              </span>
              <div className="absolute inset-0 bg-[#f87709] bg-opacity-70 h-1.5 rounded-lg top-3/4 transform origin-left scale-x-0 transition-transform duration-500 ease-in-out group-hover:scale-x-100"></div>
            </Link>
          </div>

          <div className="absolute lg:right-[200px] md:right-[170px]">
            <div
              className="hidden md:flex items-center space-x-2 cursor-pointer"
              onClick={userData ? toggleAddressPopup : null}
              style={{
                pointerEvents: userData ? "auto" : "none",
                opacity: userData ? 1 : 0.5,
              }}
              data-address-toggle
            >
              <span className="text-lg hover:text-orange-500 text-gray-800 truncate md:text-base lg:text-lg">
                {selectedAddress?.fullAddress
                  ? `${selectedAddress.fullAddress.flatNo || ""}, ${
                      selectedAddress.fullAddress.area || ""
                    }, ${selectedAddress.fullAddress.city || ""}`
                  : "Select Address"}
              </span>
              <AiOutlineDown className="text-gray-800" />
            </div>
            {showAddressPopup && (
              <div 
                ref={addressPopupRef}
                className="md:absolute mt-[70px] md:mt-9 w-[300px] md:w-[370px] md:right-[150px] bg-white p-6 rounded-lg shadow-lg z-20"
              >
                <h2 className="text-lg md:text-xl font-bold mb-4">
                  Select an Address
                </h2>
                <ul className="space-y-3 max-h-96 overflow-y-auto">
                  {userData?.addresses?.map((address, index) => (
                    <li
                      key={index}
                      onClick={() => handleAddressSelect(address)}
                      className={`cursor-pointer p-2 rounded-md transition-all duration-300 md:text-lg text-sm transform ${
                        temporaryAddress?.fullAddress === address.fullAddress
                          ? "border-2 border-orange-500 text-gray-800 scale-105"
                          : "bg-gray-200 text-gray-800 hover:border-orange-400 hover:border-2"
                      }`}
                      style={{
                        backgroundColor:
                          temporaryAddress?.fullAddress === address.fullAddress
                            ? "white"
                            : "",
                      }}
                    >
                      {`${address.fullAddress?.flatNo || ""}, ${
                        address.fullAddress?.area || ""
                      }, ${address.fullAddress?.city || ""}, ${
                        address.fullAddress?.state || ""
                      }, ${address.fullAddress?.country || ""}-${
                        address.fullAddress?.zipCode || ""
                      }`}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-between">
                  <button
                    className="bg-green-500 md:text-lg text-sm text-white px-4 py-2 rounded-md hover:bg-green-600 transition-transform duration-300 flex items-center transform hover:scale-105"
                    onClick={toggleAddAddressPopup}
                  >
                    <AiOutlinePlus className="mr-2" /> Add New Address
                  </button>
                  <button
                    className="bg-orange-500 md:text-lg text-sm text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-transform transform hover:scale-105 duration-300"
                    onClick={saveSelectedAddress}
                  >
                    Save
                  </button>
                </div>
                <button
                  className="mt-4 w-full md:text-lg text-sm bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-transform transform hover:scale-105 duration-300"
                  onClick={toggleAddressPopup}
                >
                  Close
                </button>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center md:space-x-3 lg:space-x-6 mx-3">
            <div className="relative" onClick={toggleCart}>

              <AiOutlineShoppingCart
                size={25}
                className="cursor-pointer text-gray-800 hover:text-orange-500 transition-transform transform hover:scale-110"
                onClick={toggleCart}
              />
              {cartItems.length > 0 && (
                <span onClick={toggleCart} className="absolute -top-2 -right-2 hover:scale-105 cursor-pointer bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}

            </div>
            <Link
              className="text-gray-800 hover:text-orange-500 text-2xl"
              to="/order/account/orders"
            >
              <AiOutlineUser className="cursor-pointer text-gray-800 hover:text-orange-500 transition-transform transform hover:scale-110" />
            </Link>
          </div>
        </div>
      </nav>

      {isCartOpen && (
        <Cart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          toggleCart={toggleCart}
          addToCart={addToCart}
          selectedAddress={selectedAddress}
        />
      )}

      {showAddAddress && <AddAddress onClose={toggleAddAddressPopup} />}
    </>
  );
};

export default Header;