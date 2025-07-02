// Import necessary Firebase packages
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBnp5U6B-S7SxF0GfKZgXcc4L3gs14epjQ",
    authDomain: "e-commerce-2d69f.firebaseapp.com",
    projectId: "e-commerce-2d69f",
    storageBucket: "e-commerce-2d69f.appspot.com",
    messagingSenderId: "1046175354076",
    appId: "1:1046175354076:web:f8961626cb403c6c2b3819",
    measurementId: "G-QF11MF2EEC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the auth object
const auth = getAuth(app);
export { auth, app }