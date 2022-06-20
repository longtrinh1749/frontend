// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyCdk4MLlIDq7rBwMB_7TguZR8Xup9oIFeE",
    authDomain: "homewerk-cloud.firebaseapp.com",
    databaseURL: "https://homewerk-cloud-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "homewerk-cloud",
    storageBucket: "homewerk-cloud.appspot.com",
    messagingSenderId: "1035988075574",
    appId: "1:1035988075574:web:bb6d412a29757a87b98497",
    measurementId: "G-TRDJJ6S5JF"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});
