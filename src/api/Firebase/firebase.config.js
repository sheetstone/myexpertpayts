import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOO40LIrww15hzVI5kHe2enhf7XwY3wFU",
  authDomain: "myexpertpay.firebaseapp.com",
  databaseURL: "https://myexpertpay.firebaseio.com",
  projectId: "myexpertpay",
  storageBucket: "myexpertpay.appspot.com",
  messagingSenderId: "904068187929",
  appId: "1:904068187929:web:a24de6b3aaac161be8a788",
  measurementId: "G-3E2M5V7TR8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app; 
