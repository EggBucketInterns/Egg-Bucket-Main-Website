// src/getFcmToken.js
import { messaging } from "./firebase.config";
import { getToken } from "firebase/messaging";

// export const getFcmToken = async () => {
//   try {
//     const token = await getToken(messaging, { vapidKey: "BAuqfOzekb4U98Rfw_tQf-Jj3A81f82S2O5RRlq7E-e1scQUJoWiztybfX_4N48HX--1akzV_GZ4Evwg5qTfF_4" });
//     if (token) {
//       console.log("FCM Token:", token);
//       return token;
//     } else {
//       console.warn("No registration token available.");
//       return null;
//     }
//   } catch (error) {
//     console.error("An error occurred while retrieving token:", error);
//     return null;
//   }
// };
// In getFcmToken.js
export const getFcmToken = async () => {
  try {
    if (!messaging) {
      console.error("Firebase messaging not initialized");
      return null;
    }

    // Check if notification permission is granted
    if (Notification.permission !== "granted") {
      console.log("Requesting notification permission...");

      const permission = await Notification.requestPermission();

      console.log("Permission result:", permission);

      if (permission !== "granted") {
        console.warn("Notification permission denied");
        return null;
      }
    }

    console.log("Getting FCM token...");
    const token = await getToken(messaging, { vapidKey: "BAuqfOzekb4U98Rfw_tQf-Jj3A81f82S2O5RRlq7E-e1scQUJoWiztybfX_4N48HX--1akzV_GZ4Evwg5qTfF_4" });

    if (token) {
      console.log("FCM token obtained successfully");
      return token;
    } else {
      console.warn("No FCM token available");
      return null;
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
};
