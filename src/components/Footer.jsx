import {
  FaEnvelope,
  FaFacebookF,
  FaGithub,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaTwitter
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/Images/logo-egg-png.png";

const Footer = () => {
  return (
    <footer className="bg-[#0b0d1a] text-white text-sm">
      {/* Social Bar */}
      <div className="bg-[#f2d3a7] py-4 text-center">
        <p className="text-black font-medium mb-2">
          Get connected with us on social networks:
        </p>
        <div className="flex justify-center gap-5 text-black text-lg">
          <FaFacebookF />
          <FaTwitter />
          <FaGoogle />
          <FaInstagram />
          <FaLinkedin />
          <FaGithub />
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-left">
        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <img src={logo} alt="Egg Bucket Logo" className="w-20 mb-4" />
          {/* <p className="mb-3">
            At Egg Bucket, we provide fresh and high-quality eggs straight from our farm to your doorstep.
          </p> */}
          <div className="flex items-start gap-2 mb-2">
            <FaMapMarkerAlt className="text-orange-400 mt-1.5" />
            <div className="leading-snug">
              Kacklewalls   Nutrition Pvt.  Ltd.<br />
              1179,AECS Layout,Singasandra<br />
              Bengaluru, Karnataka 560068
            </div>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <FaEnvelope className="text-orange-400" />
            support@eggbucket.in
          </div>
          <div className="flex items-center gap-3">
            <FaPhone className="text-orange-400" />
            +91 7204704048
          </div>
        </div>

        {/* Products */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Products</h4>
          <ul className="space-y-2">
            <li className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">EggBucket Fresh</li>
            <li className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">Protein Plus Eggs</li>
            <li className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">Organic Farm Eggs</li>
            <li className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">Free-range Eggs</li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
          <ul className="space-y-2">
            <li><Link to="/your-account" className="hover:text-orange-400 transition-colors duration-200">Your Account</Link></li>
            <li><Link to="/careers" className="hover:text-orange-400 transition-colors duration-200">Become an Affiliate</Link></li>
            <li><Link to="/shipping-policy" className="hover:text-orange-400 transition-colors duration-200">Shipping Rates</Link></li>
            <li><Link to="/faq" className="hover:text-orange-400 transition-colors duration-200">Help</Link></li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Let Us Help You</h4>
          <ul className="space-y-2">
            <li><Link to="/refund" className="hover:text-orange-400 transition-colors duration-200">Refund Policy</Link></li>
            <li><Link to="/return" className="hover:text-orange-400 transition-colors duration-200">Return Policy</Link></li>
            <li><Link to="/shipping" className="hover:text-orange-400 transition-colors duration-200">Shipping Policy</Link></li>
            <li><Link to="/privacy" className="hover:text-orange-400 transition-colors duration-200">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-black text-center text-xs text-gray-400 py-4">
        &copy; {new Date().getFullYear()} Egg Bucket. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
