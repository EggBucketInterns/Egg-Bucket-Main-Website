import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import egg6 from "../assets/Images/six.jpg";
import egg12 from "../assets/Images/twleve.jpg";
import egg30 from "../assets/Images/thirty.jpg";
import { fetchOrdersForCustomer } from "../redux/orderSlice";
import { toast } from "react-hot-toast";

const Orders = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const [ordersData, setOrdersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const totalTime = 10 * 60; // 10 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(totalTime);

  const canCancelOrder = (orderTimestamp) => {
    if (!orderTimestamp?._seconds) return false;
    const orderTime = new Date(orderTimestamp._seconds * 1000);
    const currentTime = new Date();
    const diffInMinutes = (currentTime - orderTime) / 1000 / 60;
    return diffInMinutes <= 8;
  };

  const [cancelButtonVisible, setCancelButtonVisible] = useState({});
  const timersRef = useRef({}); // Use a ref to store timers // Track visibility per order


  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const handleCancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://b2c-backend-1.onrender.com/api/v1/order/order/${orderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel order");
      }

      // Update the order status in local state instead of removing it
      setOrdersData((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "canceled" } : order
        )
      );

      // Store the cancelled status in localStorage
      const cancelledOrders = JSON.parse(
        localStorage.getItem("cancelledOrders") || "{}"
      );
      cancelledOrders[orderId] = true;
      localStorage.setItem("cancelledOrders", JSON.stringify(cancelledOrders));

      toast.success("Order cancelled successfully");
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to cancel order");
    }
  };

  const ordersError = useSelector((state) => state.orders.error);
  const ordersLoading = useSelector((state) => state.orders.loading);

  if (ordersLoading) return <p>Loading...</p>;
  if (ordersError) return <p> {ordersError}</p>;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userData?.phoneNumber) {
        console.error("Phone number is missing in userData.");
        return;
      }

      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        
        // Fix 1: Ensure token exists
        if (!token) {
          throw new Error("Authentication token not found");
        }

        // Fix 2: Properly encode the phone number for URL
        const encodedPhone = encodeURIComponent(userData.phoneNumber);
        console.log("userData.phoneNumber",userData.phoneNumber);
        
        // Fix 3: Use the correct endpoint with proper phone number parameter
        const response = await fetch(
          `https://b2c-backend-1.onrender.com/api/v1/order/order/customer/${userData?.phoneNumber}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        if (data && Array.isArray(data.orders)) {
          // Load cancelled status from localStorage
          const cancelledOrders = JSON.parse(
            localStorage.getItem("cancelledOrders") || "{}"
          );
          
          // Fix 4: Add additional validation to ensure orders belong to current user
          const filteredOrders = data.orders.filter(
            order => order.customerId === userData.phoneNumber
          );
          
          const ordersWithCancelStatus = filteredOrders.map((order) => ({
            ...order,
            status: cancelledOrders[order.id] ? "canceled" : order.status,
          }));
          
          setOrdersData(ordersWithCancelStatus);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching orders:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userData?.phoneNumber) {
      fetchOrders();
    }
  }, [userData]);
  // adding new useffect
  useEffect(() => {
    // Clear any existing timers
    Object.values(timersRef.current).forEach(clearTimeout);
    timersRef.current = {}; // Reset the timers object

    const newCancelButtonVisible = {}; // Create a new object

    ordersData.forEach((order) => {
      if (canCancelOrder(order.createdAt)) {
        newCancelButtonVisible[order.id] = true;

        timersRef.current[order.id] = setTimeout(() => {
          setCancelButtonVisible((prev) => ({ ...prev, [order.id]: false }));
        }, 480000);
      }
    });

    setCancelButtonVisible(newCancelButtonVisible); // Update state in one go

    return () => {
      Object.values(timersRef.current).forEach(clearTimeout); // Clear timers on unmount
    };
  }, [ordersData]);


  const getImageByName = (name) => {
    if (name === undefined || name === null) {
      // Check for undefined or null
      console.warn("Product name is undefined or null. Using default image.");
      return egg6; // Or another appropriate default image
    }

    switch (name.toLowerCase()) {
      case "6pc_tray":
      case "e6":
        return egg6;
      case "12pc_tray":
      case "e12":
        return egg12;
      case "30pc_tray":
      case "e30":
        return egg30;
      default:
        console.warn(`Image not found for product: ${name}`);
        return egg6;
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp?._seconds) return "Invalid date";

    const date = new Date(timestamp._seconds * 1000);
    return date
      .toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(" at", ",");
  };

  const mapOrderItems = (products) => {
    return Object.values(products).map((product) => ({
      name: product?.name || 'Unknown Product', // Add default value here
      quantity: product?.quantity || 0,
      productId: product?.productId
    }));
  };

  const extractOrderId = (docId) => {
    if (docId && docId.includes("-")) {
      return docId.split("-")[1];
    }
    return docId;
  };

  const handleOrderClick = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>No orders found for you !</p>;

  const sortedOrders = [...ordersData].sort(
    (a, b) => (b.createdAt._seconds || 0) - (a.createdAt._seconds || 0)
  );

  return (
    <div className="h-3/4 lg:h-2/3 overflow-y-auto bg-gray-100 rounded-lg">
      {sortedOrders.length === 0 ? (
        <p className="text-black text-center text-lg">No orders done</p>
      ) : (
        <div className="space-y-4 m-4">
          {sortedOrders.map((order) => (
            <div key={order.id}>
              <div
                className="bg-white p-4 shadow-lg flex justify-between items-center cursor-pointer"
                onClick={() => handleOrderClick(order.id)}
              >
                <div className="flex flex-col items-start">
                  <div className="flex space-x-2">
                    {mapOrderItems(order.products).map((item, i) => (
                      <div key={i} className="relative">
                        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                          {item.quantity || 1}
                        </span>
                        <img
                          src={getImageByName(item.name)}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded-md"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Placed at {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <p className="text-lg font-semibold">₹{order.amount}</p>
                  <p className="text-sm text-gray-500">
                    Order ID: {extractOrderId(order.id)}
                  </p>
                  
                  
                  {order.status === "canceled" ? (
                    <div className="mt-2 px-3 py-1 bg-orange-500 text-white rounded-md">
                      Order Cancelled
                    </div>
                  ) : cancelButtonVisible[order.id] &&
                    canCancelOrder(order.createdAt) ? ( // Check visibility and order status
                      <div className="flex items-center justify-center max-w-md mx-auto mt-10">
                      {/* Clickable Progress Bar */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelOrder(order.id);
                        }}
                        className="relative w-full h-10 bg-gray-300 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:opacity-80"
                      >
                        <div
                          className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                        <span className="relative z-10 flex flex-col items-center justify-center w-full h-full text-sm font-semibold text-black p-2">
  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")} min left
  <span className="text-sm font-semibold text-red-600 mt-1">Cancel</span>
</span>

                      </button>
                    </div>
                    
                  ) : (
                    <div>
                      {order.status === "delivered" ? (<div className="mt-2 px-3 py-1 bg-green-500 text-white rounded-md">Delivered</div>) :(<div className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded-md">Pending</div>) }
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                  expandedOrderId === order.id ? "max-h-96" : "max-h-0"
                }`}
              >
                {expandedOrderId === order.id && (
                  <div className="bg-gray-50 p-4 mt-2 rounded-md shadow-md">
                    <h3 className="font-semibold text-lg">Order Details</h3>
                    <p>
                      <strong>Shipping Address:</strong>{" "}
                      {order.address?.fullAddress
                        ? `${order.address.fullAddress.flatNo}, ${order.address.fullAddress.area}, ${order.address.fullAddress.city}, ${order.address.fullAddress.state}, ${order.address.fullAddress.zipCode}, ${order.address.fullAddress.country}`
                        : "No address available"}
                    </p>
                    <p>
                      <strong>Status:</strong> {order.status}
                    </p>
                    <h4 className="mt-2 font-semibold">Products:</h4>
                    {mapOrderItems(order.products).map((item, i) => (
        <div key={i} className="flex items-center mt-1">
          <img
            src={getImageByName(item.name)}
            alt={item.name}
            className="w-10 h-10 object-cover rounded-md"
          />
          <p className="ml-2">
            {/* Add null check and default value here */}
            {(item.name ? item.name.toUpperCase() : 'UNKNOWN')} - Quantity: {item.quantity || 0}
          </p>
        </div>
      ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;