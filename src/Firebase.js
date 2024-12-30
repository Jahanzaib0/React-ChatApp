// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
 
};


export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);