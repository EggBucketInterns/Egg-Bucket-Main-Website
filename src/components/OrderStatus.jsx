import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import egg6 from "../assets/Images/six.jpg";
import egg12 from "../assets/Images/twleve.jpg";
import egg30 from "../assets/Images/thirty.jpg";
import { fetchOrdersForCustomer } from "../redux/orderSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const [ordersData, setOrdersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  


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
        // Get the authentication token from localStorage or wherever you store it
        const token = localStorage.getItem('token');
        
        const response = await fetch(
          `https://b2c-backend-1.onrender.com/api/v1/order/order?phoneNumber=${userData.phoneNumber}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Add the token if required
            }
          }
        );

        if (!response.ok) {
          throw new Error(`${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched orders:", data); // Debug log
        
        if (data && Array.isArray(data.orders)) {
          setOrdersData(data.orders);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching orders:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userData?.phoneNumber) {
      fetchOrders();
    }
  }, [userData]);

  

  const getImageByName = (name) => {
  if (name === undefined || name === null) {  // Check for undefined or null
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
    return date.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).replace(" at", ",");
  };

  const mapOrderItems = (products) => {
    return Object.values(products).map(product => ({
      name: product.name,
      quantity: product.quantity,
      productId: product.productId
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

  const sortedOrders = [...ordersData].sort((a, b) => 
    (b.createdAt._seconds || 0) - (a.createdAt._seconds || 0)
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

                <div>
                  <p className="text-lg font-semibold">₹{order.amount}</p>
                  <p className="text-sm text-gray-500">
                    Order ID: {extractOrderId(order.id)}
                  </p>
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
                      {order.address?.fullAddress ? 
                        `${order.address.fullAddress.flatNo}, ${order.address.fullAddress.area}, ${order.address.fullAddress.city}, ${order.address.fullAddress.state}, ${order.address.fullAddress.zipCode}, ${order.address.fullAddress.country}` 
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