import React, { useState, useEffect } from "react";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import pc30 from "../assets/Images/30pc.svg";
import pc12 from "../assets/Images/12pc.svg";
import pc6 from "../assets/Images/6pc.svg";
import ellipse7 from "../assets/Images/Ellipse 7 carousel_bg.svg";
import ellipse8 from "../assets/Images/Ellipse 8 carousel_bg.svg";
import bg from "../assets/Images/hero-section-carousel-bg.svg";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, decrementItem } from "../redux/localStorageSlice";
import { fetchProducts } from "../redux/productsSlice";
import toast from "react-hot-toast";

const imageMapping = {
  "6pc_tray": pc6,
  "12pc_tray": pc12,
  "30pc_tray": pc30,
};

const LandingPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.localStorage.items);
  const { products: reduxProducts, loading, error } = useSelector((state) => state.products);
  const [popupVisible, setPopupVisible] = useState(false);
  const [products, setProducts] = useState([]); // Start with empty array for better initial render

  useEffect(() => {
    // Check localStorage for cached products to display immediately
    const cachedProducts = localStorage.getItem('cachedProducts');
    if (cachedProducts) {
      setProducts(JSON.parse(cachedProducts));
      console.log('Loaded cached products');
    }

    // Fetch fresh products
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (reduxProducts && reduxProducts.length > 0) {
      const mappedProducts = reduxProducts.map((product) => ({
        ...product,
        price: parseFloat(product.price) || 0,
        originalPrice: parseFloat(product.currentPrice) || 0,
        image: imageMapping[product.name] || pc6,
        countInStock: product.countInStock || 0,
      }));
      setProducts(mappedProducts);
      // Cache the products in localStorage
      localStorage.setItem('cachedProducts', JSON.stringify(mappedProducts));
      console.log('Products updated and cached:', mappedProducts.length);
    }
  }, [reduxProducts]);

  const handleIncrement = (product) => {
    dispatch(addItem(product));
  };

  const handleDecrement = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    if (item?.quantity > 1) {
      dispatch(decrementItem(productId));
    } else {
      dispatch(removeItem(productId));
    }
  };

  const handleAddToCart = (product) => {
    if (product.countInStock === 0) {
      alert("This item is currently out of stock.");
      return;
    }

    const existingProduct = cartItems.find((item) => item.id === product.id);
    if (existingProduct) {
      dispatch(addItem({ ...existingProduct, quantity: existingProduct.quantity + 1 }));
    } else {
      dispatch(addItem({ ...product, quantity: 1 }));
    }
    setPopupVisible(true);
    toast.success('Product added to cart!');
    setTimeout(() => setPopupVisible(false), 1000);
  };

  const getProductQuantity = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    return item?.quantity || 0;
  };

  
  
 
  return (
    <div className="bg-white min-h-screen font-poppins relative">
    {popupVisible}
  
    <main className="container mx-auto px-4 py-4 sm:py-8">
      {/* Hero Section */}
      <div
        className="mb-8 sm:mb-12 relative bg-cover bg-no-repeat bg-center rounded-lg overflow-hidden"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="flex flex-col-reverse md:flex-row justify-between items-center p-4 sm:p-6">
          <div className="w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0">
            <p className="text-base sm:text-lg font-semibold text-orange-600">
              Egg Bucket Collection
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              Farm Fresh Eggs
              <br /> Directly To Your <br />
              Table
            </h2>
            <p className="mt-3 sm:mt-4 text-black font-semibold text-sm sm:text-base">
              Subscribe Now For Daily And Weekly Delivery
            </p>
          </div>
          <div className="w-full sm:w-1/2 flex justify-center items-center relative h-48 sm:h-72 md:h-96">
            <img
              src={ellipse7}
              alt="Ellipse 7"
              className="w-full sm:w-3/4 absolute z-10 mt-8 sm:mt-14 animate-spin-slow"
            />
            <img
              src={ellipse8}
              alt="Ellipse 8"
              className="w-4/5 sm:w-3/5 absolute z-20 mt-8 sm:mt-14 animate-spin-slow"
            />
            <img
              src={pc30}
              alt="30 pc tray"
              className="w-3/4 sm:w-2/4 absolute z-30 mt-8 sm:mt-14"
            />
          </div>
        </div>
      </div>
  
      {/* Products Section */}
      <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center md:text-left">
        Our Products
      </h3>
  
      {loading && products.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
          <span className="ml-4 text-lg">Loading products...</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">
          Error: {error}. Please refresh the page.
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-8">No products available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden border border-black transition-transform duration-300 hover:scale-105 flex flex-col"
            >
              <div className="flex-grow p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full sm:w-1/2 h-28 sm:h-36 object-contain mb-4 sm:mb-0"
                  />
                  <div className="w-full sm:w-1/2 sm:pl-4 text-center sm:text-left">
                    <span className="text-xl sm:text-2xl font-bold text-blue-900 block">
                      ₹ {product.price.toFixed(2)}
                    </span>
                    <span className="text-sm sm:text-md text-gray-500 line-through block mt-1 sm:mt-2">
                      ₹ {product.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-xs sm:text-sm text-green-600 mt-1">
                      {product.discount}% OFF
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-yellow-300 to-orange-300 p-3 sm:p-4 mt-auto rounded-b-2xl">
                <h4 className="text-base sm:text-lg font-bold text-center">
                  {product.name}
                </h4>
                {product.countInStock === 0 ? (
                  <button
                    className="bg-gray-400 text-white px-3 sm:px-4 py-2 rounded-md mt-3 sm:mt-4 w-full cursor-not-allowed text-sm sm:text-base"
                    disabled
                  >
                    Out of Stock
                  </button>
                ) : getProductQuantity(product.id) > 0 ? (
                  <div className="flex items-center justify-between mt-3 sm:mt-4">
                    <button
                      className="bg-gray-200 p-1.5 sm:p-2 rounded-md"
                      onClick={() => handleDecrement(product.id)}
                    >
                      <Minus size={14} className="sm:w-4 sm:h-4" />
                    </button>
                    <span className="text-base sm:text-lg font-semibold">
                      {getProductQuantity(product.id)}
                    </span>
                    <button
                      className="bg-gray-200 p-1.5 sm:p-2 rounded-md"
                      onClick={() => handleIncrement(product)}
                    >
                      <Plus size={14} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    className="bg-orange-500 text-white px-3 sm:px-4 py-2 rounded-md mt-3 sm:mt-4 w-full text-sm sm:text-base"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  </div>
  );
};

export default LandingPage;