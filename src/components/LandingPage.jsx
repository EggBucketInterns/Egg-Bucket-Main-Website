import React, { useState, useEffect } from 'react';
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
  { id: 1, name: 'Emily Johnson', text: 'I never knew eggs could be this exciting! EggBucket has made my breakfasts so much more enjoyable. Highly recommended!' },
  { id: 2, name: 'Michael Smith', text: 'EggBucket is the best thing that happened to my kitchen!' },
  { id: 3, name: 'Sophia Davis', text: 'EggBucket has cracked the code to eggcellent service!' },
  { id: 4, name: 'Daniel Wilson', text: 'EggBucket is eggceptional!' },
  { id: 5, name: 'Olivia Brown', text: 'EggBucket is eggsactly what I needed!' },
];

// Products data
const productsData = [
  { id: 1, name: '30 Pcs Egg Tray', price: 209.00, originalPrice: 239.00, image: pc30 },
  { id: 2, name: '6 Pcs Egg Tray', price: 42.00, originalPrice: 48.00, image: pc6 },
  { id: 3, name: '12 Pcs Egg Tray', price: 84.00, originalPrice: 92.00, image: pc12 },
];

const LandingPage = ({ addToCart }) => {
  const [quantities, setQuantities] = useState(productsData.map(() => 1));
  const [popupVisible, setPopupVisible] = useState(false);

  // Load cart items from local storage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      // Update quantities based on saved cart
      const updatedQuantities = productsData.map(product => {
        const savedItem = parsedCart.find(item => item.id === product.id);
        return savedItem ? savedItem.quantity : 1;
      });
      setQuantities(updatedQuantities);
    }
  }, []);

  const handleIncrement = (index) => {
    setQuantities(prev => {
      const newQuantities = [...prev];
      newQuantities[index] += 1;
      return newQuantities;
    });
  };

  const handleDecrement = (index) => {
    setQuantities(prev => {
      const newQuantities = [...prev];
      if (newQuantities[index] > 1) {
        newQuantities[index] -= 1;
      }
      return newQuantities;
    });
  };

  const handleAddToCart = (product, index) => {
    const quantity = quantities[index];
    const productToAdd = { ...product, quantity };

    // Update localStorage
    const currentCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItemIndex = currentCart.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].quantity += quantity;
    } else {
      currentCart.push(productToAdd);
    }

    localStorage.setItem('cartItems', JSON.stringify(currentCart));

    // Call the addToCart prop function
    addToCart(productToAdd);

    // Show popup and hide after 1 second
    setPopupVisible(true);
    setTimeout(() => {
      setPopupVisible(false);
    }, 1000);
  };

  return (
    <div className="bg-white min-h-screen font-poppins mt-12 relative">
      {/* Popup notification */}
      {popupVisible && (
        <div className="fixed top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-md shadow-md z-50 transition-opacity duration-500">
          Product added to cart!
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 relative bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${bg})` }}>
          <div className="flex flex-col-reverse md:flex-row justify-between items-center">
            <div className="md:w-1/2 text-center md:text-left">
              <p className="text-lg font-semibold text-orange-600">Egg Bucket Collection</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Farm Fresh Eggs<br /> Directly To Your <br />Table</h2>
              <button className="bg-orange-500 text-white px-6 py-3 rounded-full flex items-center justify-center transform transition-transform duration-700 hover:scale-110">
                Subscribe
              </button>
              <p className="mt-4 text-black font-semibold">Subscribe Now For Daily And Weekly Delivery</p>
            </div>

            <div className="w-1/2 flex justify-center items-center relative h-72 md:h-96">
              <img src={ellipse7} alt="Ellipse 7" className="w-full md:w-3/4 absolute z-10 mt-14 animate-spin-slow" />
              <img src={ellipse8} alt="Ellipse 8" className="w-4/5 md:w-3/5 absolute z-20 mt-14 animate-spin-slow" />
              <img src={pc30} alt="30 pc tray" className="w-3/4 md:w-2/4 absolute z-30 mt-14" />
            </div>
          </div>
        </div>

        {/* Products Section */}
        <h3 className="text-3xl font-bold mb-8 text-center md:text-left">Our Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {productsData.map((product, index) => (
            <div key={product.id} className="bg-white rounded-3xl shadow-lg overflow-hidden border border-black transition-transform duration-300 hover:scale-105">
              <div className="flex flex-col md:flex-row p-6">
                <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-36 object-contain mb-4" />
                <div className="w-full md:w-1/2 pl-4">
                  <span className="text-2xl font-bold text-blue-900 mt-4 block">₹ {product.price.toFixed(2)}</span>
                  <span className="text-md text-gray-500 line-through mt-2 block">₹ {product.originalPrice.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex flex-col bg-gradient-to-r from-yellow-300 to-orange-300 p-4 rounded-2xl">
                <h4 className="text-lg font-bold text-center">{product.name}</h4>
                <div className="flex items-center justify-between">
                  <button 
                    className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl flex justify-center items-center transition-colors" 
                    onClick={() => handleAddToCart(product, index)}
                  >
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
            <div className="mb-12 text-left">
              <h2 className="text-5xl font-extrabold text-orange-500 mb-4">What our customers are saying</h2>
              <p className="text-lg text-gray-700">Don't just take our word for it. See what our customers have to say about EggBucket!</p>
            </div>

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