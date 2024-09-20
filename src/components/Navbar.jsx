import React, { useState, useEffect } from "react";
import { FaTimes, FaBars, FaChevronDown } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md"; // Importing a shopping cart icon
import logo from "../assets/Images/logo-egg-png.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false); // State for About Us submenu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleAboutMenu = () => {
    setAboutOpen(!aboutOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="px-6 md:px-16 flex justify-between items-center h-20">
        <div
          className={`flex items-center transition-transform duration-300 transform ${
            isScrolled ? "scale-90" : "scale-100"
          }`}
        >
          <img
            src={logo}
            alt="Egg Bucket Logo"
            className={`transition-all duration-500 ease-in-out ${
              isScrolled ? "w-32 md:w-48" : "w-36 md:w-52"
            }`}
            style={{ maxWidth: "100%", height: "auto" }} // Ensures the logo scales properly
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12">
          <ul className="flex space-x-6 text-lg md:text-xl">
            <li>
              <Link
                to="/"
                className="relative block px-3 py-2 text-gray-600 group"
              >
                <span className="relative z-10 transition-colors text-lg group-hover:text-gray-950">
                  Home
                </span>
                <div className="absolute inset-0 bg-[#f87709] bg-opacity-70 h-1.5 rounded-lg top-3/4 transform origin-left scale-x-0 transition-transform duration-500 ease-in-out group-hover:scale-x-100"></div>
              </Link>
            </li>

            {/* About Us with Submenu for Desktop */}
            <li className="relative">
              <button
                onClick={toggleAboutMenu}
                className="relative block px-3 py-2 text-gray-600 group flex items-center"
              >
                <span className="relative z-10 transition-colors text-lg group-hover:text-gray-950">
                  About us
                </span>
                <FaChevronDown
                  className={`ml-2 transition-transform ${
                    aboutOpen ? "rotate-180" : ""
                  }`}
                />
                <div className="absolute inset-0 bg-[#f87709] bg-opacity-70 h-1.5 rounded-lg top-3/4 transform origin-left scale-x-0 transition-transform duration-500 ease-in-out group-hover:scale-x-100"></div>
              </button>

              {/* Submenu */}
              {aboutOpen && (
                <ul className="absolute bg-white rounded-xl w-72 text-gray-800 shadow-lg mt-2 py-4 px-6">
                  <li>
                    <Link
                      to="/ourfounders"
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-base transition-transform transform hover:scale-105 py-3 rounded-lg hover:bg-gray-50"
                    >
                      Meet the Visionaries
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/timeline"
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-base transition-transform transform hover:scale-105 py-3 rounded-lg hover:bg-gray-50"
                    >
                      Our Journey So Far
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link
                to="/careers"
                className="relative block px-3 py-2 text-gray-600 group"
              >
                <span className="relative z-10 transition-colors text-lg group-hover:text-gray-950">
                  Career
                </span>
                <div className="absolute inset-0 bg-[#f87709] bg-opacity-70 h-1.5 rounded-lg top-3/4 transform origin-left scale-x-0 transition-transform duration-500 ease-in-out group-hover:scale-x-100"></div>
              </Link>
            </li>

            <li>
              <Link
                to="/faq"
                className="relative block px-3 py-2 text-gray-600 group"
              >
                <span className="relative z-10 transition-colors text-lg group-hover:text-gray-950">
                  FAQ's
                </span>
                <div className="absolute inset-0 bg-[#f87709] bg-opacity-70 h-1.5 rounded-lg top-3/4 transform origin-left scale-x-0 transition-transform duration-500 ease-in-out group-hover:scale-x-100"></div>
              </Link>
            </li>

            <li>
              <Link
                to="/contact-us"
                className="relative block px-3 py-2 text-gray-600 group"
              >
                <span className="relative z-10 transition-colors text-lg group-hover:text-gray-950">
                  Contact Us
                </span>
                <div className="absolute inset-0 bg-[#f87709] bg-opacity-70 h-1.5 rounded-lg top-3/4 transform origin-left scale-x-0 transition-transform duration-500 ease-in-out group-hover:scale-x-100"></div>
              </Link>
            </li>
          </ul>
          
          <Link to="/order" className="hidden md:inline-block">
            <button className="bg-gradient-to-r from-[#f87709] to-[#f88a12] text-white px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 flex items-center space-x-2">
              <span>Order Now</span>
              <MdShoppingCart className="w-6 h-6" />
            </button>
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 focus:outline-none"
          >
            {isOpen ? (
              <FaTimes className="w-8 h-8" />
            ) : (
              <FaBars className="w-8 h-8" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white py-4 px-6">
          <ul className="flex flex-col space-y-4">
            <li>
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-800 transition-transform transform hover:scale-105"
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>

            {/* About Us Mobile with Dropdown */}
            <li>
              <button
                onClick={toggleAboutMenu}
                className="text-gray-600 hover:text-gray-800 transition-transform transform hover:scale-105 flex justify-between items-center w-full"
              >
                About Us
                <FaChevronDown
                  className={`ml-2 transition-transform ${
                    aboutOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* About Us submenu for mobile */}
              {aboutOpen && (
                <ul className="mt-2 pl-4 space-y-2">
                  <li>
                    <Link
                      to="/ourfounders"
                      className="text-gray-600 hover:text-gray-800 transition-transform transform hover:scale-105"
                      onClick={toggleMenu}
                    >
                      Meet the Visionaries
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/timeline"
                      className="text-gray-600 hover:text-gray-800 transition-transform transform hover:scale-105"
                      onClick={toggleMenu}
                    >
                      Our Journey So Far
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link
                to="/careers"
                className="text-gray-600 hover:text-gray-800 transition-transform transform hover:scale-105"
                onClick={toggleMenu}
              >
                Careers
              </Link>
            </li>

            <li>
              <Link
                to="/faq"
                className="text-gray-600 hover:text-gray-800 transition-transform transform hover:scale-105"
                onClick={toggleMenu}
              >
                FAQ's
              </Link>
            </li>

            <li>
              <Link
                to="/contact-us"
                className="text-gray-600 hover:text-gray-800 transition-transform transform hover:scale-105"
                onClick={toggleMenu}
              >
                Contact Us
              </Link>
            </li>

            <li>
              <Link to="/order">
                <button className="bg-gradient-to-r from-[#f87709] to-[#f88a12] text-white px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 w-full flex justify-center items-center space-x-2">
                  <span>Order Now</span>
                  <MdShoppingCart className="w-6 h-6" />
                </button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
