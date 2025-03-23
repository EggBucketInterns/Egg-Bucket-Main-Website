import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItem, decrementItem, removeItem } from "../redux/localStorageSlice";
import { FiChevronDown } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import useNotification from "./useNotification";



const Cart = ({ toggleCart }) => {
  const cartItems = useSelector((state) => state.localStorage.items);
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { sendNotification } = useNotification();

  const [addresses, setAddresses] = useState([]); // Stores address data from API
  const [selectedAddress, setSelectedAddress] = useState(); // Initialize with null
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSelectAlert, setShowSelectAlert] = useState(false);
  const [localQuantities, setLocalQuantities] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [userToken, setUserToken] = useState(null);
  const [shipping, setShipping] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserToken(token);
  }, []);

  
  useEffect(() => {
    // Fetch address data from API
    const fetchAddresses = async () => {
      try {
        const response = await fetch(
          "https://b2c-backend-eik4.onrender.com/api/v1/order/order"
        );
        const data = await response.json();

        console.log("Fetched addresses:", data); // Check the response format

        // Check if orders exist and extract the address information
        if (data.orders && Array.isArray(data.orders)) {

          const orderAddresses = data.orders
            .map((order) => order?.address?.fullAddress) // Safely access fullAddress
            .filter(Boolean); // Remove undefined or null items
          setAddresses(orderAddresses); // Store only valid addresses

        } else {
          console.error("No valid order data found");
        }

        // Pre-select the first address if available
        if (data.orders && data.orders.length > 0) {
          setSelectedAddress(data.orders[0].address.fullAddress);
        }
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const handleIncrement = (item) => {
    dispatch(addItem(item));
  };

  const handleDecrement = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item.quantity > 1) {
      dispatch(decrementItem(itemId));
    } else {
      dispatch(removeItem(itemId));
    }
  };

  const clearCart = () => {
    cartItems.forEach((item) => {
      dispatch(removeItem(item.id)); // Dispatch remove action for each item
    });
    setLocalQuantities({}); // Reset local quantities
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress || typeof selectedAddress !== 'object') {
      setShowSelectAlert(true);
      setTimeout(() => {
        setShowSelectAlert(false);
      }, 3000);
      return;
    }

    const customer = userData;
    if (!customer) {
      console.error("No customer data found in Redux");
      return;
    }

    const products = cartItems.reduce((acc, item) => {
      let mappedId;
      if (item.id === 1) {
        mappedId = "E30";
      } else if (item.id === 2) {
        mappedId = "E6";
      } else if (item.id === 3) {
        mappedId = "E12";
      } else {
        mappedId = item.id; // Use item.id if no mapping exists
      }
      acc[mappedId] = {
        productId: mappedId,
        name: item.name,
        quantity: localQuantities[item.id],
      };
      return acc;
    }, {});

    const orderPayload = {
      address: selectedAddress,
      amount: totalPrice,
      products,
      customerId: customer.phoneNumber,
    };

    try {
      setIsLoading(true);
      setSuccessMessage("");
      setShowSelectAlert(false);
      
      const response = await axios.post(
        "https://b2c-backend-eik4.onrender.com/api/v1/order/order",
        orderPayload,
        { validateStatus: () => true }
      );
  
      if (response.data.status === "success") {
        const audio = new Audio("/order-placed audio.mp3");
        audio.play();
        const orderDetails = cartItems.map(item => 
          `${item.name} x${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}`
        ).join(", ");
        
        sendNotification(
          "Order Placed Successfully", 
          `Your order (₹${totalPrice.toFixed(2)}) has been placed. Details: ${orderDetails}`,
          "success"
        );
       
  
        clearCart();
      } else if (
        response.data.status === "fail" &&
        response.data.message === "No nearby outlets, we will soon expand here!!"
      ) {
        // Use sendNotification instead of successMessage
        sendNotification("Egg-Bucket", response.data.message, "error");
        // Don't set successMessage
      } else {
        // Use either toast.error OR sendNotification, not both
        // sendNotification("Egg-Bucket", "Please select Address", "error");
        toast.error("Please select Address"); 
        // Don't set successMessage
      }
    } catch (error) {
      console.error("Error placing order:", error);
      sendNotification("Egg-Bucket", "Failed to place order", "error");
      // Don't set successMessage
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Update localQuantities when cartItems change
    const newLocalQuantities = cartItems.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {});
    setLocalQuantities(newLocalQuantities);
  }, [cartItems]);

  const subtotal = Math.round(
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  // Flat shipping rate

  const fetchShippingCharge = async () => {
    try {
      const response = await axios.get("https://b2c-backend-eik4.onrender.com/api/v1/order/shipping");
      setShipping(response.data.charge);
    } catch (error) {
      console.error("Error fetching shipping charge:", error);
    }
  };

  useEffect(() => {
    fetchShippingCharge();
  }, []);

  const totalPrice = subtotal + shipping;

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
    </div>
  );

  // Overlay for when loading
  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-800 font-medium">Processing your order...</p>
      </div>
    </div>
  );

  return (
    <div className="fixed right-0 top-0 w-96 h-full bg-white shadow-lg p-4 z-50 overflow-y-auto">
      {isLoading && <LoadingOverlay />}
      
      <button
        className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        onClick={toggleCart}
      >
        Close
      </button>
      <h2 className="text-lg font-bold mb-4">Your Cart</h2>
      <div className="border-b-2 border-orange-500 mb-4" />

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item, index) => (
              <li
                key={item.id || index}
                className="flex justify-between items-center"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 mr-4 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p>
                      ₹{item.price ? item.price.toFixed(2) : "0.00"} x{" "}
                      {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="bg-gray-200 px-2 py-1 rounded"
                    onClick={() => handleDecrement(item.id)}
                  >
                    -
                  </button>
                  <span className="px-2 py-1 font-bold">{item.quantity}</span>
                  <button
                    className="bg-gray-200 px-2 py-1 rounded"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 bg-gray-100 p-4 rounded-md">
            <div className="flex justify-between">
              <p className="font-semibold">Subtotal:</p>
              <p className="font-semibold">₹{subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Shipping:</p>
              <p className="font-semibold">₹{shipping.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mt-2 border-t pt-2">
              <p className="font-bold">Total:</p>
              <p className="font-bold text-orange-600">₹{totalPrice.toFixed(2)}</p>
            </div>
          </div>

          {/* Address Selection */}
          {userToken ? (
            <div className="relative mt-4">
              <p className="text-sm font-medium mb-1 text-gray-700">Delivery Address</p>
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex justify-between items-center cursor-pointer border p-2 rounded-md hover:border-orange-500 transition-colors"
              >
                <span className="truncate">
                  {selectedAddress?.fullAddress
                    ? `${selectedAddress.fullAddress.flatNo}, ${selectedAddress.fullAddress.area}, ${selectedAddress.fullAddress.city}, ${selectedAddress.fullAddress.state}`
                    : "Select Address"}
                </span>

                <FiChevronDown className={`transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
              </div>
              {isDropdownOpen && (
                <ul className="absolute bg-white border rounded-md shadow-lg mt-1 w-full z-30 max-h-80 overflow-y-auto">
                  {userData?.addresses?.map((address, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setSelectedAddress(address);
                        setIsDropdownOpen(false);
                      }}
                      className="p-2 cursor-pointer hover:bg-orange-200"
                    >
                      {`${address.fullAddress.flatNo}, ${address.fullAddress.area}, ${address.fullAddress.city}, ${address.fullAddress.state}, ${address.fullAddress.country}-${address.fullAddress.zipCode}`}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <p className="mt-4 text-gray-500">
              Please log in to select a delivery address.
            </p>
          )}

          <div className="mt-6 flex flex-col gap-2">
            {userToken ? (
              <button
                onClick={handlePlaceOrder}
                disabled={isLoading}
                className={`w-full bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-orange-600 transition-colors flex justify-center items-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? <LoadingSpinner /> : 'Place Order'}
              </button>
            ) : (
              <button
                onClick={() => {
                  toggleCart();
                  navigate("/order/login");
                }}
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors"
              >
                Login to Continue
              </button>
            )}
            
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors mt-2"
              >
                Clear Cart
              </button>
            )}
          </div>
        </>
      )}

      {successMessage && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {successMessage}
        </div>
      )}

      {showSelectAlert && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Please select a delivery address
        </div>
      )}
    </div>
  );
};

export default Cart;