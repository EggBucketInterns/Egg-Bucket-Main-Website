import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const Careers = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleApplyNowClick = () => {
    window.location.href = "https://app.dover.com/jobs/eggbucket";
  };

  return (
    <section className="relative bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] flex items-center justify-center bg-gradient-to-r from-yellow-300 to-[#f87709] overflow-hidden">
        {/* Egg SVGs */}
        <svg
          className="absolute top-4 left-4 md:top-10 md:left-10 w-12 h-12 md:w-16 md:h-16 opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 2a7 7 0 00-7 7v6a7 7 0 0014 0V9a7 7 0 00-7-7z"
          />
        </svg>
        <svg
          className="absolute top-1/4 right-12 md:right-20 w-16 h-16 md:w-24 md:h-24 opacity-40"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 2a7 7 0 00-7 7v6a7 7 0 0014 0V9a7 7 0 00-7-7z"
          />
        </svg>

        <div className="relative z-10 text-center px-4">
          <h1
            className="text-white text-3xl md:text-4xl lg:text-6xl font-bold"
            data-aos="fade-up"
          >
            Join the Egg Bucket Family
          </h1>
          <p
            className="text-gray-200 text-base md:text-lg lg:text-xl mt-4 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            We're always on the lookout for passionate individuals. Grow with
            us!
          </p>
        </div>
      </div>

      {/* Introduction Text Section */}
      <section className="py-12 px-6 md:px-12 lg:px-24 bg-white text-center">
        <h2
          className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800"
          data-aos="fade-up"
        >
          Why Work with Us?
        </h2>
        <p
          className="text-sm md:text-base lg:text-lg text-gray-600 mt-4 md:mt-6 max-w-3xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          At Egg Bucket, we foster innovation, encourage growth, and offer a
          collaborative environment where everyone can thrive.
        </p>
        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Features */}
          {/* Feature 1 */}
          <div
            className="flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <svg
              className="w-12 h-12 md:w-16 md:h-16 text-[#f87709] mb-2 md:mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">
              Growth Opportunities
            </h3>
            <p className="text-sm md:text-base text-center text-gray-600 mt-1 md:mt-2">
              We believe in promoting from within and providing ample
              opportunities for career advancement.
            </p>
          </div>
          {/* Feature 2 */}
          <div
            className="flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <svg
              className="w-12 h-12 md:w-16 md:h-16 text-[#f87709] mb-2 md:mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">
              Collaborative Culture
            </h3>
            <p className="text-sm md:text-base text-center text-gray-600 mt-1 md:mt-2">
              Our team is like a family, always helping each other grow and
              succeed together.
            </p>
          </div>
          {/* Feature 3 */}
          <div
            className="flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <svg
              className="w-12 h-12 md:w-16 md:h-16 text-[#f87709] mb-2 md:mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">
              Passionate Team
            </h3>
            <p className="text-sm md:text-base text-center text-gray-600 mt-1 md:mt-2">
              Work alongside individuals who are as passionate and driven as you
              are.
            </p>
          </div>
        </div>
      </section>

      {/* Apply for Job Section */}
      <section className="py-12 md:py-16 bg-[#f87709] text-center text-white">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold"
          data-aos="fade-up"
        >
          Apply for Your Dream Job
        </h2>
        <p
          className="text-sm md:text-base lg:text-lg mt-4 max-w-3xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Ready to make an impact? Join our team of passionate individuals who
          are redefining the future of food services.
        </p>
        <button
          onClick={handleApplyNowClick}
          className="mt-6 md:mt-8 px-4 md:px-6 py-2 md:py-3 bg-white text-[#f87709] font-semibold rounded-md hover:bg-gray-200 transition-all"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          Apply Now
        </button>
      </section>

      {/* Contact Us Section */}
      <section className="py-12 md:py-16 bg-white text-center">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800"
          data-aos="fade-up"
        >
          Contact Us
        </h2>
        <p
          className="text-sm md:text-base lg:text-lg text-gray-600 mt-4 max-w-3xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Have any questions or need more information? We're here to help. Reach
          out to us, and we'll get back to you as soon as possible.
        </p>
        <Link to="/contact-us">
          <button
            className="mt-6 md:mt-8 px-4 md:px-6 py-2 md:py-3 bg-[#f87709] text-white font-semibold rounded-md hover:bg-[#d66f07] transition-all"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Contact Us
          </button>
        </Link>
      </section>
    </section>
  );
};

export default Careers;
