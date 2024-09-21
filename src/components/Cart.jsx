import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const Cart = ({ isCartOpen, toggleCart }) => {
  const initialProducts = [
    { id: 1, name: '6 Pcs Egg Tray', price: 100, quantity: 1, img: 'https://via.placeholder.com/50' },
    { id: 2, name: '12 Pcs Egg Tray', price: 200, quantity: 1, img: 'https://via.placeholder.com/50' },
    { id: 3, name: '30 Pcs Egg Tray', price: 300, quantity: 1, img: 'https://via.placeholder.com/50' },
    { id: 4, name: '6 Pcs Egg Tray', price: 100, quantity: 1, img: 'https://via.placeholder.com/50' },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const addresses = [
    "123 Main St, Springfield, IL",
    "456 Elm St, Springfield, IL",
  ];

  const incrementQuantity = (id) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, quantity: product.quantity + 1 } : product
    ));
  };

  const decrementQuantity = (id) => {
    setProducts(products.map(product =>
      product.id === id && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product
    ));
  };

  const totalPrice = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-lg transition-transform transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} duration-500 ease-in-out z-50`} // Increased width to max-w-md (medium width)
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

        <div className="max-h-64 overflow-y-auto mb-4 border-t border-b border-gray-200 py-4">
          {products.map(product => (
            <div key={product.id} className="flex items-center justify-between mb-4">
              <img src={product.img} alt={product.name} className="w-16 h-16 mr-4" />
              <div className="flex-grow">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-500">₹{product.price}</p>
              </div>

              <div className="flex items-center">
                <button className="bg-orange-400 px-2 py-1 rounded hover:bg-orange-600"
                  onClick={() => decrementQuantity(product.id)}>
                  -
                </button>
                <span className="mx-2">{product.quantity}</span>
                <button className="bg-orange-400 px-2 py-1 rounded hover:bg-orange-600 mr-4"
                  onClick={() => incrementQuantity(product.id)}>
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Address Dropdown */}
        <div className="relative mb-4">
          <label className="block mb-2 font-semibold">Select Address</label>
          <div
            className="border border-gray-300 rounded p-2 cursor-pointer flex justify-between items-center"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{selectedAddress || "-- Select Address --"}</span>
            <FiChevronDown className="text-gray-500" />
          </div>
          {isDropdownOpen && (
            <div className="absolute w-full border border-gray-300 rounded bg-white mt-1 z-10">
              {addresses.map((address, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-orange-500 hover:text-white cursor-pointer"
                  onClick={() => {
                    setSelectedAddress(address);
                    setIsDropdownOpen(false);
                  }}
                >
                  {address}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Details */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-2">Order Details</h3>
          <div className="flex justify-between">
            <p className="text-gray-600">Subtotal:</p>
            <p className="text-gray-600">₹{totalPrice}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping:</p>
            <p className="text-gray-600">₹0</p>
          </div>
          <div className="flex justify-between font-bold">
            <p className="text-gray-600">Total:</p>
            <p className="text-gray-600">₹{totalPrice}</p>
          </div>
        </div>

        <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">
          Place Order
        </button>

        {/* Close Cart Button */}
        <button
          className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={toggleCart}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Cart;
