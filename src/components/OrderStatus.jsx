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

  // Helper function to check if order can be cancelled
  const canCancelOrder = (orderTimestamp) => {
    if (!orderTimestamp?._seconds) return false;
    const orderTime = new Date(orderTimestamp._seconds * 1000);
    const currentTime = new Date();
    const diffInMinutes = (currentTime - orderTime) / 1000 / 60;
    return diffInMinutes <= 8;
  };

  // Handler for order cancellation
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
            Authorization: `Bearer ${token}`,
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

  // Fetch orders when component mounts or user changes
  useEffect(() => {
    const fetchOrders = async () => {
      if (!userData?.phoneNumber || !verifyUserToken()) {
        setOrdersData([]);
        return;
      }

      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `https://b2c-backend-1.onrender.com/api/v1/order/order?phoneNumber=${userData.phoneNumber}`,
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

        if (data && Array.isArray(data.orders)) {
          const cancelledOrders = JSON.parse(
            localStorage.getItem("cancelledOrders") || "{}"
          );
          const ordersWithCancelStatus = data.orders.map((order) => ({
            ...order,
            status: cancelledOrders[order.id] ? "canceled" : order.status,
          }));
          setOrdersData(ordersWithCancelStatus);
        } else {
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

  // Manage cancel button visibility
  useEffect(() => {
    Object.values(timersRef.current).forEach(clearTimeout);
    timersRef.current = {};

    const newCancelButtonVisible = {};

    ordersData.forEach((order) => {
      if (canCancelOrder(order.createdAt)) {
        newCancelButtonVisible[order.id] = true;

        timersRef.current[order.id] = setTimeout(() => {
          setCancelButtonVisible((prev) => ({ ...prev, [order.id]: false }));
        }, 480000); // 8 minutes
      }
    });

    setCancelButtonVisible(newCancelButtonVisible);

    return () => {
      Object.values(timersRef.current).forEach(clearTimeout);
    };
  }, [ordersData]);

  // Helper function to get correct image based on product name
  const getImageByName = (name) => {
    if (!name) {
      return egg6;
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
        return egg6;
    }
  };

  // Helper function to format date
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

  // Helper function to map order items
  const mapOrderItems = (products) => {
    return Object.values(products).map((product) => ({
      name: product.name,
      quantity: product.quantity,
      productId: product.productId,
    }));
  };

  // Helper function to extract order ID
  const extractOrderId = (docId) => {
    if (docId && docId.includes("-")) {
      return docId.split("-")[1];
    }
    return docId;
  };

  // Handler for expanding/collapsing order details
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
