// src/getFcmToken.js
import { messaging } from "./firebase.config";
import { getToken } from "firebase/messaging";

export const getFcmToken = async () => {
  try {
    const token = await getToken(messaging, { vapidKey: "BAuqfOzekb4U98Rfw_tQf-Jj3A81f82S2O5RRlq7E-e1scQUJoWiztybfX_4N48HX--1akzV_GZ4Evwg5qTfF_4" });
    if (token) {
      console.log("FCM Token:", token);
      return token;
    } else {
      console.warn("No registration token available.");
      return null;
    }
  } catch (error) {
    console.error("An error occurred while retrieving token:", error);
    return null;
  }
};
