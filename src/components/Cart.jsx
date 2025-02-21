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

    // Map the cart items to the correct product IDs and their quantities
    const products = cartItems.reduce((acc, item) => {
      // Map your frontend IDs to backend product IDs
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
      
      // Add to accumulator with just the quantity
      acc[backendId] = item.quantity;
      
      return acc;
    }, {});

    
    const orderPayload = {
      address: selectedAddress,
      amount: totalPrice,
      products, // This will be an object like { E6: 2, E12: 1, E30: 3 }
      customerId: userData.phoneNumber
    };

    console.log('Order Payload:', orderPayload); // For debugging

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

  // useEffect(() => {
  //   // Update localQuantities when cartItems change
  //   const newLocalQuantities = cartItems.reduce((acc, item) => {
  //     acc[item.id] = item.quantity;
  //     return acc;
  //   }, {});
  //   setLocalQuantities(newLocalQuantities);
  // }, [cartItems]);

  // const subtotal = cartItems.reduce(
  //   (acc, item) => acc + item.price * item.quantity,
  //   0
  // );


  // const shipping = 50; // Flat shipping rate
  // const totalPrice = subtotal + shipping;

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
            {cartItems.map((item, index) => (
              <li
                key={item.id || index}
                className="flex justify-between items-center"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 mr-4"
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

          {/* Address Selection */}
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

          <div className="mt-4">
            {userToken ? (
              <button
                onClick={handlePlaceOrder}
                className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
              >
                Place Order
              </button>
            ) : (
              <button
                onClick={() => {
                  toggleCart();
                  navigate("/order/login");
                }} // Adjust the path based on your routing setup
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
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
