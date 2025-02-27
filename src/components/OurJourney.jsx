import React, { useEffect, useRef } from "react";
import eggImage from "../assets/Images/pngwing.com.png"; // Adjust the path according to your project structure
import omlet from "../assets/Images/omlet.png";
import omelet from "../assets/Images/eggs-omelet.png";
import "../styling/Timeline.css";
import hen from "../assets/Images/hen.png";

const Timeline = () => {
  const items = useRef([]);
  const eggScroller = useRef(null);
  const timelineContainer = useRef(null);

  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  };

  const callbackFunc = () => {
    items.current.forEach((item, index) => {
      if (isElementInViewport(item)) {
        item.classList.add("in-view");
        item.classList.remove(
          index % 2 === 0 ? "out-view-right" : "out-view-left"
        );
      } else {
        item.classList.remove("in-view");
        item.classList.add(
          index % 2 === 0 ? "out-view-left" : "out-view-right"
        );
      }
    });
  };

  const handleScroll = () => {
    callbackFunc();

    // For egg scroller animation
    const scrollPosition = window.scrollY;
    const containerHeight = timelineContainer.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const maxScrollTop = containerHeight - windowHeight;
    const slowFactor = 0.25;
    const eggScrollHeight = containerHeight - 200; // Adjust to control where the egg should stop

    if (eggScroller.current) {
      const scrollFactor =
        Math.min(scrollPosition / maxScrollTop, 1) * slowFactor;
      eggScroller.current.style.transform = `translateY(${
        scrollFactor * eggScrollHeight
      }px)`;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    callbackFunc(); // Initialize on load
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="relative min-h-screen w-full py-10"
      style={{
        background: "linear-gradient(135deg, #fef9e7 0%, #f7f2e4 100%)",
      }}
    >
      <div
        className="absolute inset-y-0 left-0 lg:left-20 top-2/4 w-80 h-64 bg-cover bg-opacity-90 bg-left bg-no-repeat"
        style={{ backgroundImage: `url(${omlet})` }}
      ></div>
      <div
        className="absolute inset-y-0 right-0 top-32 w-96 h-64 bg-cover bg-opacity-90 bg-left bg-no-repeat"
        style={{ backgroundImage: `url(${omelet})` }}
      ></div>
      {/* <div
        className="absolute inset-y-0 right-0 lg:right-28 top-3/4 w-80 h-72 bg-cover bg-right bg-no-repeat"
        style={{ backgroundImage: `url(${hen})` }}
      ></div> */}

      <div className="absolute top-10 left-1/2 w-1 h-full bg-white-600 transform -translate-x-1/2 z-0"></div>
      <div
        ref={eggScroller}
        className="egg-scroller hidden md:block fixed top-20 left-1/2 w-20 h-20 bg-cover bg-center z-0 transform -translate-x-1/2"
        style={{ backgroundImage: `url(${eggImage})` }}
      ></div>
      <div
        ref={timelineContainer}
        className="timeline-container flex flex-col items-center relative pt-12 lg:mx-80 mx-4 pt-20 pb-3 space-y-10"
      >
        {[
          {
            year: "November 2021",
            goal: "Trademark Application",
            contents:
              "Application submitted for trademark registration for Egg Bucket.",
          },
          {
            year: "April 2022",
            goal: "Business Launch",
            contents:
              "Kacklewalls Nutrition begins operations as a proprietorship in Bangalore, Karnataka.",
          },
          {
            year: "April 2022",
            goal: "First Sale",
            contents: "Egg Bucket makes its first sale of fresh eggs.",
          },
          {
            year: "June 2022",
            goal: "Market Research Completion",
            contents:
              "Egg Bucket completes initial market research and finalizes its business plan.",
          },
          {
            year: "October 2022",
            goal: "Company Incorporation",
            contents:
              "Kacklewalls Nutrition transitions to Kacklewalls Nutrition Private Limited (KNPL).",
          },
          {
            year: "January 2023",
            goal: "Sales Milestone",
            contents:
              "Egg Bucket reaches a sales volume of 2.5 lakh eggs per month.",
          },
          {
            year: "March 2023",
            goal: "Key Recruitment",
            contents:
              "Recruitment for key positions, including Operations Manager, Purchase Executive, and Delivery Executives, is completed.",
          },
          {
            year: "June 2023",
            goal: "Sales Expansion",
            contents: "Egg Bucket expands to selling 10 lakh eggs per month.",
          },
          {
            year: "July 2023",
            goal: "Delivery Network Expansion",
            contents:
              "Expands delivery network to additional areas within Bangalore.",
          },
          {
            year: "July 2023",
            goal: "Trademark Registration",
            contents:
              "Egg Bucket trademark officially registered with the Trademarks Registry, Government of India.",
          },
          {
            year: "November 2023",
            goal: "Quality Control",
            contents:
              "Implements quality control measures to ensure the highest product standards.",
          },
          {
            year: "March 2024",
            goal: "Annual Returns Filing",
            contents:
              "Kacklewalls Nutrition Private Limited files its provisional Annual Returns and Financial Statements.",
          },
          {
            year: "March 2024",
            goal: "Continued Expansion",
            contents:
              "Egg Bucket is committed to capturing more cities and delivering top-quality products to its customers across the region.",
          },
          {
            "year": "15th March 2024",
            "goal": "Customer Feedback Program",
            "contents": "Launches a customer feedback program to improve service and product quality."
          },
          {
            "year": "April 2024",
            "goal": "Retail Expansion",
            "contents": "EggBucket launches its retail chain model by opening the first retail outlet."
          },
          {
            "year": "June 2024",
            "goal": "Operational Efficiency",
            "contents": "Deploys a 2-wheeler fleet for operational efficiency."
          },
          {
            "year": "September 2024",
            "goal": "Market Expansion",
            "contents": "Second retail outlet opens & expands operations to Chennai, fulfilling the first order from the city."
          },
          {
            "year": "December 2024",
            "goal": "Sustainability Initiatives",
            "contents": "Begins adopting green technology and initiates electric vehicle operations."
          },
          {
            "year": "February 2025",
            "goal": "Risk Management",
            "contents": "Establishes a Damage Control Associate to enhance risk management and operational stability."
          },
          {
            "year": "2025",
            "goal": "Market Growth",
            "contents": "Aim to capture 20% of the egg market in Bangalore, achieving sales of 10 lakh eggs per day."
          },
          {
            "year": "2030",
            "goal": "Industry Leadership",
            "contents": "Become a leading brand in the Indian egg market with significant market share and diversified egg products."
          }
        


        ].map((item, index) => (
          <div
            key={index}
            ref={(el) => (items.current[index] = el)}
            className={`timeline-event relative bg-white px-10 py-4 border rounded-full w-80 shadow-md transition-opacity transform transition-transform duration-500 ease-out ${
              index % 2 === 0
                ? "self-end out-view-left"
                : "self-start out-view-right"
            }`}
          >
            <time className="block absolute px-2  left-16 -top-3 text-base text-white bg-orange-500 border rounded-md">
              {item.year}
            </time>
            <p className="text-md">{item.goal}</p>
            <span className="text-sm text-gray-600">{item.contents}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
