// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyB4UPIM-FLjb8Xg5_7kQ3MERpO-WU6Gja4",
    authDomain: "homewerk-349712.firebaseapp.com",
    projectId: "homewerk-349712",
    storageBucket: "homewerk-349712.appspot.com",
    messagingSenderId: "1034758990075",
    appId: "1:1034758990075:web:b3f871cf81fb96e582685e",
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
