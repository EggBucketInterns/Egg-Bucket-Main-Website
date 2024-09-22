import React, { useState } from 'react';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import pc30 from '../assets/Images/30pc.svg';
import pc12 from '../assets/Images/12pc.svg';
import pc6 from '../assets/Images/6pc.svg';
import ellipse7 from '../assets/Images/Ellipse 7 carousel_bg.svg';
import ellipse8 from '../assets/Images/Ellipse 8 carousel_bg.svg';
import bg from '../assets/Images/hero-section-carousel-bg.svg';
import review from '../assets/Images/Review carousel.svg';

// Review data
const reviews = [
  { id: 1, name: 'Emily Johnson', text: 'I never knew eggs could be this exciting! EggBucket has made my breakfasts so much more enjoyable. The eggs are always fresh and the delivery is super fast. Highly recommended!' },
  { id: 2, name: 'Michael Smith', text: 'EggBucket is the best thing that happened to my kitchen! The eggs are of top-notch quality and the variety is amazing. The website is so fun and interactive, it’s like a virtual egg wonderland!' },
  { id: 3, name: 'Sophia Davis', text: 'EggBucket has cracked the code to eggcellent service! The website is so user-friendly and the animations are eggs-traordinary. I love how they deliver eggs right to my doorstep, it’s so convenient!' },
  { id: 4, name: 'Daniel Wilson', text: 'EggBucket is eggceptional! The eggs are always fresh and the packaging is eggs-tra secure. The website is so eggciting with its vibrant orange and white theme. I can’t imagine my mornings without EggBucket!' },
  { id: 5, name: 'Olivia Brown', text: 'EggBucket is eggsactly what I needed! The eggs are always delivered on time and the quality is unbeatable. The cartoons on the website are so adorable, they make me smile every time I visit!' },
];

// Products data
const productsData = [
  { id: 1, name: '30 Pcs Egg Tray', price: 209.00, originalPrice: 239.00, image: pc30 },
  { id: 2, name: '6 Pcs Egg Tray', price: 42.00, originalPrice: 48.00, image: pc6 },
  { id: 3, name: '12 Pcs Egg Tray', price: 84.00, originalPrice: 92.00, image: pc12 },
];

const LandingPage = () => {
  const [quantities, setQuantities] = useState(productsData.map(() => 1));

  const handleIncrement = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  };

  const handleDecrement = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 1) {
      newQuantities[index] -= 1;
    }
    setQuantities(newQuantities);
  };

  return (
    <div className="bg-white min-h-screen font-poppins">
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 relative bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${bg})` }}>
          <div className="flex flex-col-reverse md:flex-row justify-between items-center">
            {/* Text Section */}
            <div className="md:w-1/2 text-center md:text-left">
              <p className="text-lg font-semibold text-orange-600">Egg Bucket Collection</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Farm Fresh Eggs<br /> Directly To Your <br />Table</h2>
              <button className="bg-orange-500 text-white px-6 py-3 rounded-full flex items-center justify-center relative overflow-hidden transform transition-transform duration-700 hover:scale-110 mx-auto md:mx-0">
                <span className="mr-8">Subscribe</span>
                <span className="bg-white text-black rounded-full p-3.5 absolute right-0 transform flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </button>
              <p className="mt-4 text-black font-semibold">Subscribe Now For Daily And Weekly Delivery</p>
            </div>

            {/* Images Section */}
            <div className="w-1/2 md:w-1/2 flex justify-center items-center relative h-72 md:h-96 mb-8 md:mb-0">
              <img src={ellipse7} alt="Ellipse 7" className="w-full md:w-3/4 absolute z-10 mt-14 animate-spin-slow" />
              <img src={ellipse8} alt="Ellipse 8" className="w-4/5 md:w-3/5 absolute z-20 mt-14 animate-spin-slow" />
              <img src={pc30} alt="30 pc tray" className="w-3/4 md:w-2/4 absolute z-30 mt-14 transform transition-transform duration-700 hover:scale-110" />
              <img src={review} alt="Reviews" className="w-1/2 absolute z-30 animate-fade-in transform transition-transform duration-700 hover:scale-110" style={{ bottom: '-10%', left: '-15%' }} />
            </div>
          </div>
        </div>

        {/* Products Section */}
        <h3 className="text-3xl font-bold mb-8 text-center md:text-left">Our Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {productsData.map((product, index) => (
            <div key={product.id} className="bg-white rounded-3xl shadow-lg overflow-hidden border border-black transform transition-transform duration-300 hover:scale-105">
              <div className="flex flex-col md:flex-row p-6">
                <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-36 object-contain mb-4" />
                <div className="w-full md:w-1/2 pl-0 md:pl-4">
                  <div className="flex flex-col mb-2">
                    <div className="block">
                      <span className="text-2xl font-bold text-blue-900 mt-4 block">Rs {product.price.toFixed(2)}</span>
                    </div>
                    <div className="block">
                      <span className="text-md text-gray-500 line-through mt-2 block">Rs {product.originalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col bg-gradient-to-r from-yellow-300 to-orange-300 p-4 rounded-2xl">
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-center">{product.name}</h4>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center bg-white rounded-xl flex-grow mr-4">
                    <button className="flex p-2 justify-center items-center text-orange-500 hover:bg-orange-100 rounded-xl transition-colors text-center" onClick={() => handleDecrement(index)}>
                      <Minus size={20} />
                    </button>
                    <span className="flex-1 px-4 font-bold text-xl text-orange-500 text-center">
                      {quantities[index]}
                    </span>
                    <button className="flex p-2 justify-center items-center text-orange-500 hover:bg-orange-100 rounded-xl transition-colors text-center" onClick={() => handleIncrement(index)}>
                      <Plus size={20} className=''/>
                    </button>
                  </div>

                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl flex items-center transition-colors">
                    <ShoppingCart size={20} className="mr-2" />
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews Section */}
        <section className="py-16 bg-white mt-16">
          <div className="container mx-auto px-4">
            {/* Left-aligned heading and subheading */}
            <div className="mb-12 text-left">
              <h2 className="text-5xl font-extrabold text-orange-500 mb-4">What our customers are saying</h2>
              <p className="text-lg text-gray-700">Don't just take our word for it. See what our customers have to say about EggBucket!</p>
            </div>

            {/* Review cards */}
            <div className="flex flex-wrap -mx-4">
              {reviews.map((review, index) => (
                <div 
                  key={review.id} 
                  className={`w-full md:w-1/3 px-4 mb-8 ${
                    index >= 3 ? 'md:translate-x-48' : '' 
                  }`}
                >
                  <div className="bg-gray-100 p-6 rounded-3xl h-full">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                        {review.name[0]}
                      </div>
                      <h4 className="text-orange-500 font-bold">{review.name}</h4>
                    </div>
                    <p className="text-gray-800 text-sm">{review.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
