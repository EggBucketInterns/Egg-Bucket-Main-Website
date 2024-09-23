import React, { useRef, useState } from "react";
import ccdLogo from "../assets/Images/cafe-coffee-day.svg";
import goldmanSachsLogo from "../assets/Images/goldman-sachs.png";
import tipsyBullLogo from "../assets/Images/tipsy-bull.png";
import glensBakehouseLogo from "../assets/Images/glen-logo.png";
import sodexoLogo from "../assets/Images/sodexo-logo.png";
import googleLogo from "../assets/Images/google-logo.png";
import zomatoLogo from "../assets/Images/zomato-seeklogo.svg";
import EliorLogo from "../assets/Images/elior-logo.svg";
import sweetChariotLogo from "../assets/Images/sweet-chariot.png";

const Partners = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const partners = [
    { name: "Cafe Coffee Day", logo: ccdLogo },
    { name: "Goldman Sachs", logo: goldmanSachsLogo },
    { name: "Tipsy Bull", logo: tipsyBullLogo },
    { name: "Glen's Bakehouse", logo: glensBakehouseLogo },
    { name: "Sodexo", logo: sodexoLogo },
    { name: "Google", logo: googleLogo },
    { name: "Zomato", logo: zomatoLogo },
    { name: "Elior", logo: EliorLogo },
    { name: "Sweet Chariot", logo: sweetChariotLogo },
  ];

  // Handle mouse or touch start
  const handleMouseDown = (e) => {
    setIsDragging(true);
    scrollRef.current.style.animationPlayState = "paused"; // Pause scrolling on drag
    setStartX(e.pageX || e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  // Handle mouse or touch move
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX || e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle mouse or touch release
  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    scrollRef.current.style.animationPlayState = "running"; // Resume scrolling after drag
  };

  return (
    <section className="bg-white py-12 w-full">
      <div className="container mx-auto text-center overflow-hidden">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-8">
          Our Trusted Partners
        </h2>

        <div
          ref={scrollRef}
          className="relative flex whitespace-nowrap  cursor-pointer animate-scroll"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUpOrLeave}
        >
          {/* Duplicated logos for seamless scroll */}
          {partners.concat(partners).map((partner, index) => (
            <div
              key={index}
              className="flex justify-center items-center p-4"
              style={{ flex: "0 0 auto" }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-12 md:max-h-20 object-contain mr-10 md:mr-20"
                style={{ width: "auto", maxWidth: "150px" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Infinite scrolling animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 15s linear infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Partners;
