import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import EggomeletteImage from "../assets/Images/egg-575756_1920.png";

const ContactUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);

  return (
    <section className="relative bg-white">
      <div className="contact-us-container bg-white py-20 md:py-20 px-4 md:px-8 lg:px-24 relative overflow-hidden">
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-[#fff5e6] opacity-10 z-0"
          data-aos="fade"
          data-aos-delay="0"
        ></div>

        {/* Hero Section */}
        <section
          className="hero-section text-center py-6 md:py-10 relative z-10"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
            Get in Touch
          </h1>
          <p className="text-md md:text-xl mt-4 text-gray-600 max-w-2xl mx-auto">
            We’re here to answer any questions you may have. Reach out to us,
            and we’ll respond as soon as we can.
          </p>
        </section>

        {/* Contact Information */}
        <section className="contact-info my-8 md:my-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
          <div
            className="contact-card p-6 md:p-8 bg-white shadow-lg border border-[#f87709] rounded-lg text-center transition-transform transform hover:-translate-y-2 hover:shadow-lg"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <FaMapMarkerAlt className="text-[#f87709] text-3xl md:text-4xl mx-auto mb-4" />
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              Our Office
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-4">
              ITI Layout, HSR, Bengaluru-560068
            </p>
          </div>

          <div
            className="contact-card p-6 md:p-8 bg-white shadow-lg border border-[#f87709] rounded-lg text-center transition-transform transform hover:-translate-y-2 hover:shadow-lg"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <FaWhatsapp className="text-5xl md:text-6xl text-[#f87709] mx-auto mb-4" />

            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              Contact Us
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-4">
              <span className="font-medium">Contact Person:</span> Rohit Wani
            </p>
          </div>

          <div
            className="contact-card p-6 md:p-8 bg-white shadow-lg border border-[#f87709] rounded-lg text-center transition-transform transform hover:-translate-y-2 hover:shadow-lg"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <FaEnvelope className="text-[#f87709] text-3xl md:text-4xl mx-auto mb-4" />
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              Email Us
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-4 break-words">
              <a
                href="mailto:kacklewallsnutrition@gmail.com"
                className="text-[#f87709] hover:text-yellow-800 transition-colors"
              >
                support@eggbucket.in
              </a>
            </p>
          </div>
        </section>

        {/* Contact Form */}
        <section
          className="contact-form-section border border-[#f87709] bg-white p-6 md:p-8 lg:p-10 rounded-lg shadow-md max-w-xl lg:max-w-4xl mx-auto relative z-10"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 text-center">
            Send Us a Message
          </h2>
          <p className="text-gray-600 text-sm md:text-base text-center mt-4 mb-6 md:mb-10">
            Fill out the form below, and we’ll get back to you shortly.
          </p>
          <form
            action="https://formspree.io/f/xkgwljng"
            method="POST"
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          >
            <div className="form-group col-span-2">
              <label className="block text-gray-700" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full mt-1 p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="form-group col-span-2 md:col-span-1">
              <label className="block text-gray-700" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full mt-1 p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="form-group col-span-2 md:col-span-1">
              <label className="block text-gray-700" htmlFor="subject">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full mt-1 p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Subject"
                required
              />
            </div>
            <div className="form-group col-span-2">
              <label className="block text-gray-700" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                className="w-full mt-1 p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#f87709] text-white font-semibold p-3 rounded-lg hover:bg-yellow-600 transition-colors col-span-2"
            >
              Send Message
            </button>
          </form>
        </section>

        {/* Egg Omelette Image with Parallax */}
        <img
          src={EggomeletteImage}
          alt="Egg Omelette"
          className="hidden md:block fixed top-36 right-10 w-1/3 lg:w-1/4 object-cover opacity-100 pointer-events-none z-1"
          data-aos="fade-up"
          data-aos-delay="600"
        />
      </div>
    </section>
  );
};

export default ContactUs;
