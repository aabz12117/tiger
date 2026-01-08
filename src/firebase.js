import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBw-ZeaTa-cB2DXBXIE9a_fWSE0kX8vyKo",
    authDomain: "bot-koker.firebaseapp.com",
    projectId: "bot-koker",
    storageBucket: "bot-koker.firebasestorage.app",
    messagingSenderId: "473580744",
    appId: "1:473580744:web:fd4b5741ac64d5978711fd",
    measurementId: "G-BB4XH3Z7VE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
