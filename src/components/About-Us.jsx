import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import aboutImage from "../assets/Images/pngwing.com.png";

const AboutUs = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const { scrollY } = useScroll();
  const[toggle,settoggle] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["100%", "-100%"]);
  const blur = useTransform(scrollYProgress, [0, 1], ["10px", "0px"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const scale = useTransform(scrollY, [0, 750], [0.35, 1.2]);

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 1.2,
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <section className="bg-white py-12 mt-8 relative overflow-hidden">
      <div
        className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12"
        ref={ref}
      >
        <div className="text-center mb-12 relative z-10">
          <motion.h2
            className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#f87709] relative z-20"
            style={{ filter: blur, opacity }}
            initial={{ opacity: 10 }}
            animate={controls}
            variants={textVariants}
          >
            Egg Bucket
          </motion.h2>

          <motion.span
            className="absolute -top-6 md:left-1/3 left-0 transform -translate-x-1/2 -translate-y-1/2 text-7xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-[#000000] opacity-20 pointer-events-none z-10"
            style={{ x }}
          >
            Why
          </motion.span>
        </div>

        {/* Adjust the layout for medium screens */}
        <div className="flex flex-col md:flex-col lg:flex-row mt-16 md:mt-24 lg:mt-36 items-center justify-center space-y-8 md:space-y-8 lg:space-y-0 md:space-x-0 lg:space-x-10">
          <motion.div
            className="w-full md:w-full lg:w-1/2 flex justify-center relative z-20"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          >
            <motion.svg
              className="absolute inset-0 w-[150%] h-[150%] z-0 opacity-80 md:hidden lg:block" // Hide the SVG for medium screens
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 800 600"
            >
              <path
                d="M300,100C400,150,450,250,400,350C350,450,250,450,150,400C50,350,50,250,100,150C150,50,200,50,300,100Z"
                fill="#f87709"
              />
            </motion.svg>

            <motion.img
              src={aboutImage}
              alt="About Egg Bucket"
              className="h-48 sm:h-56 md:h-[250px] lg:h-[400px] object-cover relative z-10"
              style={{ scale }}
            />
          </motion.div>

          {/* Adjust Text for Medium Screens */}
          <motion.div
            className="w-full md:w-full lg:w-full md:text-left space-y-6 sm:space-y-8 md:pl-8 z-20 relative bg-[#f87709] shadow-xl rounded-lg md:rounded-lg lg:rounded-lg p-6 sm:p-8 md:p-10 lg:p-16 lg:pl-24 transition-transform transform hover:scale-105 hover:shadow-2xl overflow-hidden"
            initial="hidden"
            animate={controls}
            exit="exit"
            variants={textVariants}
            whileHover={{ scale: 1.05 }}
          >
            {/* Background Decoration */}
            <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full opacity-30"></div>
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full opacity-30"></div>

            {/* Expanded Text Content */}
            <motion.p
              className="text-base sm:text-base md:text-lg lg:text-xl text-white leading-relaxed z-10 relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              At Egg Bucket, we take pride in offering the freshest,
              high-quality eggs sourced from farms that prioritize both
              sustainability and animal welfare. Our eggs are more than a
              product; they’re a symbol of our commitment to nurturing the
              planet and providing your family with nutrient-rich food.
            </motion.p>
            <motion.p
              className="text-base sm:text-base md:text-lg lg:text-xl text-white leading-relaxed z-10 relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              We understand that today’s consumers are more mindful than ever
              about where their food comes from. That’s why our hens are raised
              in open spaces, fed a natural diet, and treated with care. We
              believe in going beyond the ordinary—each step of our process is
              crafted to ensure that the eggs we deliver are fresh, delicious,
              and ethical.
            </motion.p>
            <motion.p
              className="text-base sm:text-base md:text-lg lg:text-xl text-white leading-relaxed z-10 relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Our approach to farming combines traditional methods with modern
              technology, allowing us to be efficient without compromising on
              our values. We are not just egg producers, but pioneers of
              sustainable agriculture, and we are proud to help you make
              informed choices for your kitchen and your world.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
