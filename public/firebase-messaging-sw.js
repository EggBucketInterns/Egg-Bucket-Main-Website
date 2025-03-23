// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.11.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.11.1/firebase-messaging-compat.js");

const firebaseConfig = {
    apiKey: "AIzaSyCA3LHBnhpgI9UstaaewiqSZeVKx4AsSPI",
    authDomain: "b2c-main.firebaseapp.com",
    projectId: "b2c-main",
    storageBucket: "b2c-main.appspot.com",
    messagingSenderId: "644465249792",
    appId: "1:644465249792:web:4d64b23d65d401fbd292e5",
    measurementId: "G-SBL116DGDY"
  };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
    console.log("Received background message:", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/firebase-logo.png",
        badge: "/badge-icon.png",
        actions: [
            { action: "open", title: "Open App" }
        ],
        requireInteraction: true, // Keeps the notification visible until user interacts
        vibrate: [200, 100, 200], // Vibration pattern
        tag: "push-notification"
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});



self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    if (event.action === "open") {
        clients.openWindow("https://www.eggbucket.in/");
    }
});


