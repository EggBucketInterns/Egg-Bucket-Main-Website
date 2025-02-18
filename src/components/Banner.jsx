import React, { useEffect } from "react";
import { motion, useScroll, useTime, useTransform } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import eggTrayImage from "../assets/Images/pngwing.com (2).png";
import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";

const Banner = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [100, -150]);


  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  

  

  return (
    <div
      className="relative flex flex-col md:flex-row justify-between items-center h-auto md:h-screen w-full px-4 sm:px-8 md:px-16 py-20 md:py-10"
      style={{
        background: "linear-gradient(135deg, #fef9e7 0%, #f7f2e4 100%)",
      }}
    >
      {/* Text Section */}
      <div
        className="w-full md:w-1/2 flex flex-col mt-12 md:mt-0 justify-center space-y-6 text-center md:text-left"
        data-aos="fade-right"
      >
        <h1
          className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight tracking-tight"
          data-aos="fade-up"
        >
          Welcome to Egg Bucket
        </h1>
        <h5
          className="text-lg sm:text-lg md:text-2xl lg:text-3xl font-semibold text-[#f87709]"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          "Think of an egg, Think of EggBucket!"
        </h5>
        <p
          className="text-base sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-full sm:max-w-md mx-auto md:mx-0 leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          Where freshness meets quality. Delivering eggs straight from the farm
          to your doorstep.
        </p>
        <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4 mt-4">
          <Link to="/ourfounders">
            <button
              className="bg-[#f87709] text-white text-base px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-transform transform hover:scale-105"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              About Us
            </button>
          </Link>
          <Link to="/contact-us">
            <button
              className="bg-none text-[#000000] text-base px-4 sm:px-6 py-2 sm:py-3 border border-[#f87709] rounded-full transition-all duration-300 hover:bg-[#f87709] hover:text-white"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              Join as Retailer
            </button>
          </Link>
          <Link to="/order">
            <div className="md:hidden flex justify-center items-center">
              <button
                className="bg-[#f87709] text-white flex text-base px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-transform transform hover:scale-105"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                Order Now
            <MdShoppingCart className="w-6 h-6" />
              </button>
            </div>
          </Link>
        </div>
      </div>

      {/* Image Section */}
      <div
        className="w-full md:w-1/2 relative flex justify-center items-center mt-8 md:mt-0"
        data-aos="fade-left"
      >
        <svg
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 md:w-full h-auto z-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 800"
        >
          <circle cx="400" cy="400" r="170" fill="#f87709" opacity="1" />
        </svg>

        <motion.img
          src={eggTrayImage}
          alt="Egg Tray"
          className="w-60 sm:w-60 md:w-4/5 relative z-10 drop-shadow-lg"
          style={{ y }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
      </div>
    </div>
  );
};

export default Banner;
