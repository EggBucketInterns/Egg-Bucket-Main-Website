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
          `https://b2c-backend-1.onrender.com/api/v1/order/order`,
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

  // Rest of your component code remains the same...
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
        `https://b2c-backend-1.onrender.com/api/v1/order/order/${orderId}`,
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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading orders. Please try again.</p>;

  const sortedOrders = [...ordersData].sort(
    (a, b) => (b.createdAt._seconds || 0) - (a.createdAt._seconds || 0)
  );

  return (
    <div className="h-3/4 lg:h-2/3 overflow-y-auto bg-gray-100 rounded-lg">
      {!userData?.phoneNumber ? (
        <p className="text-black text-center text-lg">Please log in to view orders</p>
      ) : sortedOrders.length === 0 ? (
        <p className="text-black text-center text-lg">No orders found</p>
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
                          {item.quantity}
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
                    canCancelOrder(order.createdAt) ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCancelOrder(order.id);
                      }}
                      className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                      Cancel Order
                    </button>
                  ) : (
                    <div>
                      {order.status === "delivered" ? (
                        <div className="mt-2 px-3 py-1 bg-green-500 text-white rounded-md">
                          Delivered
                        </div>
                      ) : (
                        <div className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded-md">
                          Pending
                        </div>
                      )}
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
                          {item.name.toUpperCase()} - Quantity: {item.quantity}
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
