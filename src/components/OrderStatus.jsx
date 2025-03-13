import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import egg6 from "../assets/Images/six.jpg";
import egg12 from "../assets/Images/twleve.jpg";
import egg30 from "../assets/Images/thirty.jpg";
import { toast } from "react-hot-toast";

const Orders = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const [ordersData, setOrdersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [cancelButtonVisible, setCancelButtonVisible] = useState({});
  const timersRef = useRef({});
  const [userToken, setUserToken] = useState(localStorage.getItem("token"));

  // Helper function to verify if current token matches stored token
  const verifyUserToken = () => {
    const currentToken = localStorage.getItem("token");
    if (currentToken !== userToken) {
      setOrdersData([]);
      setUserToken(currentToken);
      return false;
    }
    return true;
  };

  // Helper function to filter orders by phone number
  const filterOrdersByPhoneNumber = (orders, phoneNumber) => {
    if (!phoneNumber) return [];
    console.log("Filtering orders for phone number:", phoneNumber);
    console.log("Total orders before filtering:", orders.length);
    
    const filteredOrders = orders.filter(order => {
      const orderId = order.id || '';
      const phoneMatch = orderId.split('-')[0] === phoneNumber;
      return phoneMatch;
    });
    
    console.log("Filtered orders:", filteredOrders.length);
    return filteredOrders;
  };

  // Fetch orders when component mounts or user changes
  useEffect(() => {
    const fetchOrders = async () => {
      if (!userData?.phoneNumber || !verifyUserToken()) {
        setOrdersData([]);
        return;
      }

      console.log("Fetching orders for user:", userData.phoneNumber);
      setIsLoading(true);
      
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `https://b2c-backend13.onrender.com/api/v1/order/order`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`${response.status}`);
        }

        if (!verifyUserToken()) {
          return;
        }

        const data = await response.json();
        console.log("Raw API response:", data);

        if (data && Array.isArray(data.orders)) {
          const cancelledOrders = JSON.parse(
            localStorage.getItem("cancelledOrders") || "{}"
          );

          // Filter orders by phone number before setting state
          const filteredOrders = filterOrdersByPhoneNumber(data.orders, userData.phoneNumber);
          console.log("Filtered orders:", filteredOrders);

          const ordersWithCancelStatus = filteredOrders.map((order) => ({
            ...order,
            status: cancelledOrders[order.id] ? "canceled" : order.status,
          }));
          
          setOrdersData(ordersWithCancelStatus);
        } else {
          console.log("No orders array in response");
          setOrdersData([]);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching orders:", err);
        setOrdersData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [userData, userToken]);

  const canCancelOrder = (orderTimestamp) => {
    if (!orderTimestamp?._seconds) return false;
    const orderTime = new Date(orderTimestamp._seconds * 1000);
    const currentTime = new Date();
    const diffInMinutes = (currentTime - orderTime) / 1000 / 60;
    return diffInMinutes <= 8;
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !verifyUserToken()) {
        toast.error("Please log in again");
        return;
      }

      const response = await fetch(
        `https://b2c-backend13.onrender.com/api/v1/order/order/${orderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel order");
      }

      setOrdersData((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "canceled" } : order
        )
      );

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

  useEffect(() => {
    Object.values(timersRef.current).forEach(clearTimeout);
    timersRef.current = {};

    const newCancelButtonVisible = {};

    ordersData.forEach((order) => {
      if (canCancelOrder(order.createdAt)) {
        newCancelButtonVisible[order.id] = true;

        timersRef.current[order.id] = setTimeout(() => {
          setCancelButtonVisible((prev) => ({ ...prev, [order.id]: false }));
        }, 480000);
      }
    });

    setCancelButtonVisible(newCancelButtonVisible);

    return () => {
      Object.values(timersRef.current).forEach(clearTimeout);
    };
  }, [ordersData]);

  const getImageByName = (name) => {
    if (!name) {
      return egg6;
    }

    // Clean up the name by removing any trailing numbers and converting to lowercase
    const cleanName = name.replace(/\d+$/, '').toLowerCase();

    switch (cleanName) {
      case "6pc_tray":
      case "e6":
      case "0xkt5npngubazmmpzgs": // product ID in lowercase
        return egg6;
      case "12pc_tray":
      case "e12":
      case "nvpdbcfymcyd7kph6j5j": // product ID in lowercase
        return egg12;
      case "30pc_tray":
      case "e30":
      case "a2meuuacwegqnbic4l51": // product ID in lowercase
        return egg30;
      default:
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

  // Format price to show a rounded figure
  const formatPrice = (price) => {
    if (!price && price !== 0) return "₹0";
    
    // Convert to number if it's a string
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    
    // Round to 0 decimal places and format with the ₹ symbol
    return `₹${Math.round(numPrice)}`;
  };

  const mapOrderItems = (products) => {
    if (!products) return [];
  
    return Object.entries(products).map(([productId, value]) => {
      // Case 1: Mobile format where value is just a number (quantity)
      if (typeof value === 'number') {
        let name = '';
        // Map product IDs to names
        if (productId === '0Xkt5nPNGubaZ9mMpzGs') name = '6pc_tray';
        else if (productId === 'NVPDbCfymcyD7KpH6J5J') name = '12pc_tray';
        else if (productId === 'a2MeuuaCweGQNBIc4l51') name = '30pc_tray';
        
        return {
          name: name,
          quantity: value,
          productId: productId
        };
      }
      
      // Case 2: Web format where value is an object with properties
      if (typeof value === 'object' && value !== null) {
        return {
          name: value.name || '',
          quantity: value.quantity || 1,
          productId: value.productId || productId
        };
      }
  
      // Default case
      return {
        name: '6pc_tray',
        quantity: 1,
        productId: productId
      };
    });
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

  // Function to render status badge with improved styling
  const renderStatusBadge = (status) => {
    let badgeClass = "";
    let statusText = "";

    const statusLower = status.toLowerCase();

    switch (status) {
      case "canceled":
        badgeClass = "bg-red-100 text-red-800 border border-red-200";
        statusText = "Cancelled";
        break;
      case "delivered":
        badgeClass = "bg-green-100 text-green-800 border border-green-200";
        statusText = "Delivered";
        break;
      default:
        badgeClass = "bg-yellow-100 text-yellow-800 border border-yellow-200";
        statusText = "Pending";
    }

    return (
      <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${badgeClass} shadow-sm inline-flex items-center justify-center`}>
      <span className="relative flex w-2 h-2 mr-1.5">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${statusLower === "canceled" ? "bg-red-400" : statusLower === "delivered" ? "bg-green-400" : "bg-yellow-400"} opacity-75`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${statusLower === "canceled" ? "bg-red-500" : statusLower === "delivered" ? "bg-green-500" : "bg-yellow-500"}`}></span>
      </span>
      {statusText}
    </div>
    );
  };

  // Render cancel button with improved styling
  const renderCancelButton = (orderId) => {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleCancelOrder(orderId);
        }}
        className="mt-2 px-4 py-1.5 bg-white border border-red-500 text-red-600 rounded-full text-xs font-medium shadow-sm hover:bg-red-50 transition-colors flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
         Cancel Order
      </button>
    );
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-50 p-4 rounded-lg">
      <p className="text-red-600 text-center">Error loading orders. Please try again.</p>
    </div>
  );

  const sortedOrders = [...ordersData].sort(
    (a, b) => (b.createdAt._seconds || 0) - (a.createdAt._seconds || 0)
  );

  return (
    <div className="h-full bg-gray-50 rounded-lg overflow-hidden">
    {!userData?.phoneNumber ? (
      <div className="flex flex-col items-center justify-center h-64">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <p className="text-gray-600 text-center text-lg mt-4">Please log in to view orders</p>
      </div>
    ) : sortedOrders.length === 0 ? (
      <div className="flex flex-col items-center justify-center h-64">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <p className="text-gray-600 text-center text-lg mt-4">No orders found</p>
      </div>
    ) : (
      <div className="space-y-4 p-1 md:p-4">
        {sortedOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="p-4">
              {/* Top section with product images */}
              <div className="flex mb-4">
                {mapOrderItems(order.products).map((item, i) => (
                  <div key={i} className="relative mr-3">
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                      {item.quantity}
                    </span>
                    <img
                      src={getImageByName(item.name)}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md shadow-sm"
                    />
                  </div>
                ))}
                
                {/* Cancel button positioned to the right */}
                {order.status.toLowerCase() === "canceled" ? (
  <div className="ml-auto">
    <div className="px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium shadow-sm inline-flex items-center justify-center">
      <span className="mr-1">•</span>
      Cancelled
    </div>
  </div>
) : order.status.toLowerCase() === "delivered" ? (
  <div className="ml-auto">
    <div className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium shadow-sm inline-flex items-center justify-center">
      <span className="mr-1">•</span>
      Delivered
    </div>
  </div>
) : cancelButtonVisible[order.id] && canCancelOrder(order.createdAt) ? (
  <div className="ml-auto">
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleCancelOrder(order.id);
      }}
      className="px-4 py-2 bg-white border border-red-500 text-red-600 rounded-full text-sm font-medium shadow-sm hover:bg-red-50 transition-colors"
    >
      <span className="mr-1 text-red-500">•</span>
      Cancel Order
    </button>
  </div>
) : (
  <div className="ml-auto">
    <div className="px-4 py-2 bg-yellow-100 text-yellow-800 border border-yellow-200 rounded-full text-sm font-medium shadow-sm inline-flex items-center justify-center">
      <span className="mr-1 text-yellow-500">•</span>
      Pending
    </div>
  </div>
)}
              </div>
              
              {/* Price and order info section */}
              <div className="flex flex-col">
                <div className="flex items-baseline">
                  <span className="text-xl font-bold text-gray-900">{formatPrice(order.amount)}</span>
                  <span className="ml-2 text-sm text-gray-500">(Order: {extractOrderId(order.id)})</span>
                </div>
                
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-gray-500">
                    Placed at {formatDate(order.createdAt)}
                  </p>
                  
                  {/* Expandable indicator */}
                  <button 
                    onClick={() => handleOrderClick(order.id)}
                    className="p-1 "
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 hover:scale-110 hover:text-orange-400 text-gray-400 transition-transform ${expandedOrderId === order.id ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded content */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedOrderId === order.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {expandedOrderId === order.id && (
                <div className="bg-gray-50 p-4 border-t border-gray-100">
                  <h3 className="font-medium text-sm text-gray-700 mb-2">Order Details</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium text-gray-700">Shipping Address:</span>{" "}
                      {order.address?.fullAddress
                        ? `${order.address.fullAddress.flatNo}, ${order.address.fullAddress.area}, ${order.address.fullAddress.city}, ${order.address.fullAddress.state}, ${order.address.fullAddress.zipCode}, ${order.address.fullAddress.country}`
                        : "No address available"}
                    </p>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">Products:</h4>
                      {mapOrderItems(order.products).map((item, i) => (
                        <div key={i} className="flex items-center py-1">
                          <img
                            src={getImageByName(item.name)}
                            alt={item.name}
                            className="w-8 h-8 object-cover rounded-md mr-2"
                          />
                          <p className="text-gray-600">
                            {item.name.replace(/_/g, ' ').toUpperCase()} - Qty: {item.quantity}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <h1 className="font-semibold space-x-2">Status</h1>
                      <span className="ml-1">: </span>
                      <span className="font-light ml-1">{order.status}</span>
                    </div>
                  </div>
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