import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import logo from "../assets/Images/logo-egg-png.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative w-full bg-gray-900 text-white z-10">
      <div className="container mx-auto px-4 md:px-8">
        {/* Flex Container */}
        <div className="flex flex-col md:flex-row py-10 justify-between items-start md:items-start text-sm space-y-6 md:space-y-0 md:space-x-8">
          {/* Company Info */}
          <div className="flex-1 -mt-4">
            <img src={logo} alt="Egg Bucket Logo" className="w-36 mb-2" />
            <p className="mb-2">
              At Egg Bucket, we are dedicated to providing fresh and
              high-quality eggs straight from our farm to your doorstep.
            </p>
            <div className="flex items-center mb-1">
              <FaMapMarkerAlt className="text-[#f87709] mr-2" />
              <p>
                Kacklewalls Nutrition Pvt. Ltd. ITI Layout, HSR,
                Bengaluru-560068
              </p>
            </div>

            <div className="flex items-center">
              <FaEnvelope className="text-[#f87709] mr-2" />
              <p>support@eggbucket.in</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex-1 md:text-center">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/">
                <button className="hover:text-[#f87709] transition-colors">
                  Home
                </button>
              </Link>
              <Link to="/careers">
                <button className="hover:text-[#f87709] transition-colors">
                  Career
                </button>
              </Link>
              <Link to="/ourfounders">
                <button className="hover:text-[#f87709] transition-colors">
                  Our Founders
                </button>
              </Link>
              <Link to="/contact-us">
                <button className="hover:text-[#f87709] transition-colors">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/egg.bucket/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-[#f87709] transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/company/eggbucket?originalSubdomain=in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-[#f87709] transition-colors"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-gray-800 text-gray-400 py-2 text-center text-xs">
        <p>
          &copy; {new Date().getFullYear()} Egg Bucket. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
