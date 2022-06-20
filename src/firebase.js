// https://blog.logrocket.com/push-notifications-react-firebase/
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

var firebaseConfig = {
    apiKey: "AIzaSyCdk4MLlIDq7rBwMB_7TguZR8Xup9oIFeE",
    authDomain: "homewerk-cloud.firebaseapp.com",
    databaseURL: "https://homewerk-cloud-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "homewerk-cloud",
    storageBucket: "homewerk-cloud.appspot.com",
    messagingSenderId: "1035988075574",
    appId: "1:1035988075574:web:bb6d412a29757a87b98497",
    measurementId: "G-TRDJJ6S5JF"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getFCMToken = (setTokenFound) => {
    return getToken(messaging, { vapidKey: 'BK6Sj9Loe8GxCYPaoJR5-Ki4PBtLb0AW4Pe78_gm9pwCE9Ej5ZuOyrX4wtshviMCIIyg8XvY0Ac7iCVl6N5fGM4' }).then((currentToken) => {
        if (currentToken) {
            console.log('current token for client: ', currentToken);
            setTokenFound(true);
            // Track the token -> client mapping, by sending to backend server
            // show on the UI that permission is secured
        } else {
            console.log('No registration token available. Request permission to generate one.');
            setTokenFound(false);
            // shows on the UI that permission is required 
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
    });
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });

export const db = getFirestore(firebaseApp)

// // TODO: Add SDKs for Firebase products that you want to use
//     // https://firebase.google.com/docs/web/setup#available-libraries

//     // Your web app's Firebase configuration
//     // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//     const firebaseConfig = {
//         apiKey: "AIzaSyB4UPIM-FLjb8Xg5_7kQ3MERpO-WU6Gja4",
//         authDomain: "homewerk-349712.firebaseapp.com",
//         projectId: "homewerk-349712",
//         storageBucket: "homewerk-349712.appspot.com",
//         messagingSenderId: "1034758990075",
//         appId: "1:1034758990075:web:b3f871cf81fb96e582685e",
//         measurementId: "G-0WSPV4PTD9"
//     };

//     // Initialize Firebase
//     const app = initializeApp(firebaseConfig);
//     const analytics = getAnalytics(app);

//     // Get registration token. Initially this makes a network call, once retrieved
//     // subsequent calls to getToken will return from cache.
//     const messaging = getMessaging();
//     getToken(messaging, { vapidKey: 'BJZWQLbTInOAXE97ZYvAdJs_3CO6S2bCFbYLe3OmAW-DU0f8Z4dOszzCHep9LocKje9lo0yy6p5H0M7aX2UnEJ8' }).then((currentToken) => {
//         if (currentToken) {
//             // Send the token to your server and update the UI if necessary
//             // ...
//             console.log(currentToken)
//         } else {
//             // Show permission request UI
//             console.log('No registration token available. Request permission to generate one.');
//             // ...
//         }
//     }).catch((err) => {
//         console.log('An error occurred while retrieving token. ', err);
//         // ...
//     });
