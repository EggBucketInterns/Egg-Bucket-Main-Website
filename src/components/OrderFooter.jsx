import React from "react";
import {Link} from "react-router-dom"

import GooglePlayImage from "../assets/Images/googleplay.png"
import MobileImage from "../assets/Images/mockupo.png"
import companyLogo from "../assets/Images/logo.png"
import Linkedin from "../assets/Images/linkedin.png"
import Instagram from "../assets/Images/insta.png"

const Footer = () => {
  return (
    <footer>
      {/* White Background Section */}
      <div className="bg-white text-black py-8 h-auto">
        <div className="container mx-auto px-4">
          {/* Download Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 ml-0 lg::ml-[120px]">
            <div className="mb-4 md:mb-0 w-full flex flex-col items-center justify-center text-center">
              <div className="mb-9">
                <h3 className="text-2xl md:text-4xl font-semibold">
                  Download The App
                </h3>
              </div>
              <div className="flex flex-row items-center space-x-4 justify-center">
                <img
                  src={companyLogo}
                  alt="Egg Bucket"
                  className="h-[60px] w-[120px] md:h-[80px] md:w-[150px] inline-block mt-2"
                />
                <a
                  target="_blank"
                  href="https://play.google.com/store/apps/details?id=com.eggbucket.dukaan"
                >
                  <img
                    src={GooglePlayImage}
                    alt="Google Play"
                    className="h-[40px] w-[120px] md:h-[50px] md:w-[150px] inline-block mt-2 cursor-pointer"
                  />
                </a>
              </div>
            </div>

            <div className=" hidden lg:block  lg:absolute lg:right-1  lg:mt-[300px] mr-9  flex justify-center">
              <img
                src={MobileImage}
                alt="Mobile Mockup"
                className="w-[300px] h-[320px] md:w-[480px] md:h-[520px] cursor-pointer contain"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8  text-left ml-[20px] md:ml-[120px]">
            <div>
              <p className="mb-0 md:mb-2 font-semibold">
                Any Concern/Feedback while placing the Order or Delivery You can
              </p>
              <p className="mb-2 font-semibold">connect with us at</p>
              <div className="flex flex-col text-left md:flex-row  md:justify-start  space-y-3 md:space-y-0 md:space-x-4">
                {/* <p className="flex md:items-center font-semibold">
                  <img
                    src="/src/assets/Images/support.png"
                    className="h-6 w-6 mr-3"
                    alt="Support Icon"
                  />{" "}
                  +91 9999999999
                </p> */}
                <p className="flex items-center font-semibold">
                  <img
                    src="/src/assets/Images/emailsupport.png"
                    className="h-6 w-6 mr-3"
                    alt="Email Icon"
                  />{" "}
                  support@eggbucket.in
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dark Blue Background Section */}
      <div className="bg-[#0d0d29] text-white py-8">
        <div className="container mx-auto px-4">
          {/* Social Links */}
          <div className="text-center md:text-left md:ml-[120px] mb-6">
            <h1 className="text-lg md:text-xl">
              For Our Latest Update Follow Us On
            </h1>
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              <a href="https://www.instagram.com/egg.bucket/" target="_blank">
                <img
                  src={Instagram}
                  alt="Instagram"
                  className="h-10 w-10 cursor-pointer"
                />
              </a>
              <a
                href="https://www.linkedin.com/company/eggbucket/?originalSubdomain=in"
                target="_blank"
              >
                <img
                  src={Linkedin}
                  alt="LinkedIn"
                  className="h-10 w-10 cursor-pointer"
                />
              </a>
            </div>
          </div>

          <div className="mb-8">
            <hr className="border-gray-600" />
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left ml-0 md:ml-9">
            {/* Legal Pages & Important Links */}
            <div className="flex flex-col md:flex-row md:space-x-32">
              {/* Legal Pages */}
              <div>
                <h4 className="font-semibold mb-4">Legal Pages</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="/terms" className="hover:text-gray-400">
                      Terms and conditions
                    </a>
                  </li>
                  <li>
                    <a href="/privacy" className="hover:text-gray-400">
                      Privacy
                    </a>
                  </li>
                </ul>
              </div>

              {/* Important Links */}
              <div className="mt-6 md:mt-0">
                <h4 className="font-semibold mb-4">Important Links</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/" className="hover:text-gray-400">
                      Home
                    </Link>
                  </li>
                  <li>
                    <a href="/contact-us" className="hover:text-gray-400">
                      Get help
                    </a>
                  </li>
                  <li>
                    <a href="/timeline" className="hover:text-gray-400">
                      Know more
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Office Address */}
            <div className="mt-6 md:mt-0 md:absolute md:right-32">
              <h4 className="font-semibold mb-4">Office Address</h4>
              <p>1179, A Block,</p>
              <p>AECS Layout,Singasandra,</p>
              <p>Bengaluru, Karnataka,</p>
              <p>560068</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
