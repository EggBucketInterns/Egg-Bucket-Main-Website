import React from "react";
import supplyChainImage from "../assets/Images/supply-chain.jpg";
import qualityImage from "../assets/Images/quality.jpg";
import pricingImage from "../assets/Images/pricing.jpg";
import supportImage from "../assets/Images/support.jpg";
import "aos/dist/aos.css"; // Ensure AOS library is installed

const Services = () => {
  const services = [
    {
      title: "Streamlined Egg Supply Chain for Every Need",
      description: `At Egg Bucket, we simplify the egg supply chain by connecting selected farms directly with businesses and consumers. Our robust system ensures timely deliveries, whether for large-scale B2B needs or personalized B2C orders. By partnering with trusted farms, we guarantee the freshest eggs delivered to you seamlessly and efficiently.`,
      image: supplyChainImage,
    },
    {
      title: "Uncompromised Quality & Ethical Sourcing",
      description: `Our commitment to quality is unwavering. Egg Bucket works exclusively with farms that adhere to the highest standards of ethical practices. Every batch of eggs is thoroughly inspected to ensure they meet our stringent quality criteria. We’re dedicated to providing you with fresh, high-quality eggs that are responsibly sourced to support both your business and the environment.`,
      image: qualityImage,
    },
    {
      title: "Competitive Pricing with Custom Solutions",
      description: `Egg Bucket offers competitive pricing tailored to meet the diverse needs of our clients. Whether you’re a business requiring bulk orders or a consumer seeking smaller quantities, our flexible pricing and customized solutions are designed to fit your requirements. We collaborate closely with you to provide the best value without compromising on quality.`,
      image: pricingImage,
    },
    {
      title: "Dedicated Support & Easy Ordering Experience",
      description: `Our customer support team is always available to assist you, ensuring a smooth and hassle-free experience. Egg Bucket’s intuitive ordering platform makes it easy to manage your egg supply, track deliveries, and address any concerns promptly. Whether you’re a business or an individual customer, we are committed to providing exceptional service and support.`,
      image: supportImage,
    },
  ];

  return (
    <section className="bg-[#fff5e6] py-20">
      <div className="container mx-auto px-6 md:px-12 space-y-16">
        <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-800 mb-16">
          Why Choose Us?
        </h2>
        {services.map((service, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row ${
              index % 2 === 0 ? "" : "md:flex-row-reverse"
            } items-center space-y-8 md:space-y-0 md:space-x-6 `}
            data-aos="fade-up"
            data-aos-delay={`${index * 100}`}
          >
            <div className="md:w-1/2 flex-shrink-0 flex justify-center items-center hover:scale-105 transition-transform duration-300 ease-in-out">
              <img
                src={service.image}
                alt={service.title}
                className="w-4/5 h-72 object-cover rounded-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-3xl font-semibold text-gray-800 mb-6">
                {service.title}
              </h3>
              <p className="text-lg text-gray-600">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
