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
      const deviceToken = await getFcmToken();

      const response = await fetch("https://b2c-backend-eik4.onrender.com/api/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body, deviceToken }),
      });

      if (!response.ok) throw new Error("Failed to send notification");

      // Show toast based on the type
      switch(toastType) {
        case "success":
          toast.success(`${title}: ${body}`);
          break;
        case "error":
          toast.error(`${title}: ${body}`);
          break;
        case "loading":
          toast.loading(`${title}: ${body}`);
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

      const result = await response.json();
      console.log("Notification sent successfully:", result);
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