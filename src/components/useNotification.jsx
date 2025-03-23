import { useState, useEffect } from "react";
import { getFcmToken } from "../getFcmToken";
import { messaging, onMessage } from "../firebase.config";
import toast from "react-hot-toast"; // Make sure you have this import

const useNotification = () => {
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFcmToken();
  }, []);

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Foreground Notification Received:", payload);

      // Custom Notification for Foreground (without actions)
      if (Notification.permission === "granted") {
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
          body: payload.notification.body,
          icon: "/firebase-logo.png",
          badge: "/badge-icon.png",
          requireInteraction: true,
          vibrate: [200, 100, 200],
          tag: "push-notification",
        };

        new Notification(notificationTitle, notificationOptions);
      }

      // Also show toast notification
    //   toast.success(`${payload.notification.title}: ${payload.notification.body}`);

      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
    });

    return () => unsubscribe();
  }, []);

  // Modified to include toast type
  const sendNotification = async (title, body, toastType = "success") => {
    setLoading(true);
    try {
      // Get FCM token
      const deviceToken = await getFcmToken();
      
      // Detect if user is on mobile
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      
      // For iOS devices, use toast notifications as fallback
      if (isMobile && /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        toast.custom(
          <div className="bg-white px-6 py-4 shadow-md rounded-full">
            <strong>{title}:</strong> {body}
          </div>
        );
        console.log("iOS device detected, using toast fallback");
      }
      
      // Always attempt to send via FCM for other devices
      const response = await fetch("https://b2c-backend-eik4.onrender.com/api/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
          deviceToken,
          deviceType: isMobile ? "mobile" : "desktop"
        }),
      });
      // Parse JSON only once
      const responseData = await response.json();
      console.log("Backend response:", responseData);
  
      if (!response.ok) throw new Error("Failed to send notification");
  
      // Show toast notification
      switch(toastType) {
        case "success":
          toast.success(`${title}: ${body}`);
          break;
        case "custom":
          toast.custom(
            <div className="bg-white px-6 py-4 shadow-md rounded-full">
              <strong>{title}:</strong> {body}
            </div>
          );
          break;
        default:
          toast(`${title}: ${body}`);
      }
  
      console.log("Notification sent successfully:", responseData);
    } catch (error) {
      console.error("Error sending notification:", error);
      toast.error("Failed to send notification");
    } finally {
      setLoading(false);
    }
  };
  
  return { notification, loading, sendNotification };
};

export default useNotification;