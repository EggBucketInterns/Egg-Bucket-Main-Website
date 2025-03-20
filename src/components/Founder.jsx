import React, { useState, useEffect } from "react";
import omlet from "../assets/Images/eggs-omelet.png";

const ListItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(!item.collapsed);
  const hasChildren = item.children && item.children.length > 0;

  useEffect(() => {
    setIsOpen(!item.collapsed);
  }, [item.collapsed]);

  return (
    <div
      className={`ml-4 border ${
        isOpen ? "border-orange-500 bg-white" : "border-gray-300 bg-orange-500"
      } shadow-md p-4 rounded-md transition-colors duration-300 mb-5 flex flex-col items-center`}
    >
      <div
        className="cursor-pointer flex items-center space-x-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {hasChildren && (
          <span className="text-lg font-bold">{isOpen ? "-" : "+"}</span>
        )}
        <span className="text-gray-700 text-center font-semibold">
          {item.name}
        </span>
      </div>
      {hasChildren && isOpen && (
        <div className="ml-4 mt-2">
          {item.children.map((child, index) => (
            <ListItem key={index} item={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const Founder = () => {
  const initialTreeData = [
    {
      name: "Board Of Directors/CEO",
      children: [
        {
          name: "Operation Department",
          collapsed: true,
          children: [
            {
              name: "Invoicing and Dispatch",
              children: [
                { name: "Drivers" },
                { name: "Associates" },
                { name: "Delivery Executive" },
              ],
            },
            { name: "Inventory Management" },
            { name: "Reconciliation" },
          ],
        },
        {
          name: "Finance Department",
          collapsed: true,
          children: [
            { name: "Company Expenses" },
            { name: "Accounts", children: [{ name: "CA and Bank Functions" }] },
          ],
        },
        {
          name: "HR Department",
          collapsed: true,
          children: [
            { name: "HR Operations" },
            { name: "HR Manager" },
            { name: "HR Associates" },
          ],
        },
        {
          name: "Purchase Department",
          collapsed: true,
          children: [
            { name: "Purchase Operations" },
            { name: "Purchase Manager" },
            { name: "Purchase Associates" },
          ],
        },
        {
          name: "Outlet Department",
          collapsed: true,
          children: [
            { name: "Store Operations" },
            { name: "Store Manager" },
            { name: "Store Executive" },
            { name: "Delivery Executive" },
          ],
        },
      ],
    },
  ];

  return (
    <div>
      <div
        className="relative w-full flex flex-col px-12 items-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #fef9e7 0%, #f7f2e4 100%)",
        }}
      >
        <div
          className="absolute inset-y-0 right-0 top-32 w-96 h-64 bg-cover bg-opacity-90 bg-left bg-no-repeat"
          style={{ backgroundImage: `url(${omlet})` }}
        ></div>

        <h1 className="text-3xl font-bold mb-8 mt-60 text-center relative">
          KACKLEWALLS NUTRITION PVT LIMITED
          <div className="absolute left-1/2 transform -translate-x-1/2 top-full h-8 border-l-4 border-orange-500"></div>
        </h1>

        <div className="text-center mb-12 relative">
          <div className="font-bold text-xl cursor-default relative">
            Board Of Directors/CEO
            <div className="absolute left-1/2 transform -translate-x-1/2 top-full h-6 border-l-4 border-orange-500"></div>
          </div>
        </div>

        <div className="relative overflow-x-auto md:overflow-visible w-full max-w-full px-4">
          <div className="flex flex-col xl:flex-row xl:justify-around xl:space-x-0 space-y-4 xl:space-y-0 relative">
            {initialTreeData[0].children.map((department, index) => (
              <div
                key={index}
                className="text-center relative mb-8 xl:mb-0"
              >
                <div className="absolute transform -translate-x-1/2 xl:left-1/2 xl:-top-5 xl:h-8 xl:w-0.5 xl:border-l-4 border-orange-500"></div>
                <ListItem item={department} />
              </div>
            ))}
            <div className="absolute left-0 top-0 bottom-0 xl:-top-5 xl:left-16 xl:right-0 xl:bottom-auto xl:h-0.5 w-0.5 xl:w-11/12 bg-orange-500 transform xl:-translate-y-1/2"></div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div
  className="testimonial-container flex flex-wrap justify-center gap-8 p-8"
  style={{ background: "linear-gradient(135deg, #fef9e7 0%, #f7f2e4 100%)" }}
>
        {[
          {
            author: "Rahul Bhatia",
            role: "Restaurant Owner",
            text: "EggBucket has completely changed the way I source eggs for my restaurant. The quality is consistently top-notch, and my customers love the taste!",
          },
          {
            author: "Sneha Kapoor",
            role: "Nutritionist",
            text: "Eggs are a staple in a healthy diet, and EggBucket ensures they’re fresh and packed with nutrients. I recommend them to all my clients!",
          },
          {
            author: " Vikram Rao",
            role: "Supermarket Chain Manager",
            text: "Reliable supply, no middlemen, and unbeatable freshness – that’s why we trust EggBucket for all our stores!",
          },
          {
            author: " Megha Sharma",
            role: "Baker & Pastry Chef",
            text: "My cakes and pastries have never tasted better. Fresh eggs make all the difference, and EggBucket delivers every time!",
          },
          {
            author: " Ajay Kumar",
            role: "Gym Enthusiast",
            text: "As someone who eats eggs daily for protein, I can vouch for EggBucket’s freshness and quality. No more cracked or stale eggs!",
          },
        ].map((testimonial, index) => (
          <div key={index} className="testimonial-card max-w-sm bg-white shadow-lg rounded-lg p-6">
            <blockquote className="text-gray-700 italic">{testimonial.text}</blockquote>
            <div className="mt-4 font-bold text-lg">{testimonial.author}</div>
            <div className="text-sm text-gray-500">{testimonial.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Founder;
