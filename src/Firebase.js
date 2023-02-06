// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAT_wFTeZcgt1sBw7W2_AVbk4vhqyJygfs",
  authDomain: "react-chat-app-dcf29.firebaseapp.com",
  projectId: "react-chat-app-dcf29",
  storageBucket: "react-chat-app-dcf29.appspot.com",
  messagingSenderId: "79638019318",
  appId: "1:79638019318:web:a95ab01d107d7c7a4cc0d7",
  measurementId: "G-DKJCCSFSSE"
};


export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);