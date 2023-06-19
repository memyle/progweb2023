import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB7kZuuygCL8CGte7aR3CVV0lDnk5V9yBE",
  // databaseURL: "https://progweb-1cb51.us-east1.firebaseio.com",
  authDomain: "trabprogweb-583f9.firebaseapp.com",
  projectId: "trabprogweb-583f9",
  storageBucket: "trabprogweb-583f9.appspot.com",
  messagingSenderId: "937650485955",
  appId: "1:937650485955:web:8a4aeba681c17e0e0d0076",
  measurementId: "G-XR6GPB97JK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app
