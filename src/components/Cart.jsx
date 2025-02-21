import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItem, decrementItem, removeItem } from "../redux/localStorageSlice";
import { FiChevronDown } from "react-icons/fi";
import axios from "axios";

const Cart = ({ toggleCart }) => {
  const cartItems = useSelector((state) => state.localStorage.items);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSelectAlert, setShowSelectAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserToken(token);
  }, []);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch(
          "https://b2c-backend-1.onrender.com/api/v1/order/order"
        );
        const data = await response.json();

        if (data.orders && Array.isArray(data.orders)) {
          const orderAddresses = data.orders
            .map((order) => order?.address)
            .filter(Boolean);
          setAddresses(orderAddresses);

          if (orderAddresses.length > 0) {
            setSelectedAddress(orderAddresses[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      }
    };

    if (userToken) {
      fetchAddresses();
    }
  }, [userToken]);

  const handleIncrement = (item) => {
    dispatch(addItem(item));
  };

  const handleDecrement = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item?.quantity > 1) {
      dispatch(decrementItem(itemId));
    } else {
      dispatch(removeItem(itemId));
    }
  };

  const clearCart = () => {
    cartItems.forEach((item) => {
      dispatch(removeItem(item.id));
    });
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 50;
  const totalPrice = subtotal + shipping;

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      setShowSelectAlert(true);
      return;
    }

    if (!userData?.phoneNumber) {
      console.error("No customer data found");
      return;
    }

    try {
      setIsLoading(true);

      const products = cartItems.reduce((acc, item) => {
        let backendId;
        switch (item.id) {
          case 1:
            backendId = 'E30';
            break;
          case 2:
            backendId = 'E6';
            break;
          case 3:
            backendId = 'E12';
            break;
          default:
            backendId = item.id.toString();
        }
        
        acc[backendId] = item.quantity;
        return acc;
      }, {});

      const orderPayload = {
        address: selectedAddress,
        amount: totalPrice,
        products,
        customerId: userData.phoneNumber
      };

      const response = await axios.post(
        "https://b2c-backend-1.onrender.com/api/v1/order/order",
        orderPayload,
        { validateStatus: () => true }
      );

      if (response.data.status === "success") {
        setSuccessMessage("Order placed successfully!");
        clearCart();
      } else if (
        response.data.status === "fail" &&
        response.data.message === "No nearby outlets, we will soon expand here!!"
      ) {
        setSuccessMessage(response.data.message);
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setSuccessMessage("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setSuccessMessage("Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed right-0 top-0 w-96 h-full bg-white shadow-lg p-4 z-50">
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
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p>
                      ₹{item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="bg-gray-200 px-2 py-1"
                    onClick={() => handleDecrement(item.id)}
                  >
                    -
                  </button>
                  <span className="px-2 py-1 font-bold">{item.quantity}</span>
                  <button
                    className="bg-gray-200 px-2 py-1"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <div className="flex justify-between">
              <p className="font-semibold">Subtotal:</p>
              <p className="font-semibold">₹{subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Shipping:</p>
              <p className="font-semibold">₹{shipping.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="font-bold">Total:</p>
              <p className="font-bold">₹{totalPrice.toFixed(2)}</p>
            </div>
          </div>

          {userToken ? (
            <div className="relative mt-4">
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex justify-between items-center cursor-pointer border p-2 rounded-md"
              >
                <span>
                  {selectedAddress?.fullAddress
                    ? `${selectedAddress.fullAddress.flatNo}, ${selectedAddress.fullAddress.area}, ${selectedAddress.fullAddress.city}, ${selectedAddress.fullAddress.state}`
                    : "Select Address"}
                </span>
                <FiChevronDown />
              </div>
              {isDropdownOpen && (
                <ul className="absolute bg-white border rounded-md shadow-lg mt-1 w-full z-30 max-h-80 overflow-y-auto">
                  {userData?.addresses?.map((address, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectAddress(address)}
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

          <div className="mt-4">
            {userToken ? (
              <button
                onClick={handlePlaceOrder}
                className={`w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Placing Order..." : "Place Order"}
              </button>
            ) : (
              <button
                onClick={() => {
                  toggleCart();
                  navigate("/order/login");
                }}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Login
              </button>
            )}
          </div>
        </>
      )}

      {successMessage && (
        <div className="mt-4 p-2 bg-green-500 text-white rounded-md">
          {successMessage}
        </div>
      )}

      {showSelectAlert && (
        <div className="mt-4 p-2 bg-red-500 text-white rounded-md">
          Please select a delivery address
        </div>
      )}
    </div>
  );
};

export default Cart;
