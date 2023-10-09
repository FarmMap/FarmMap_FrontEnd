import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDphq_ilvf9ygRqqZQc6HwJFoagM1P-1_Q",
  authDomain: "traceability-86506.firebaseapp.com",
  projectId: "traceability-86506",
  storageBucket: "traceability-86506.appspot.com",
  messagingSenderId: "963234060237",
  appId: "1:963234060237:web:0e14bd24434841d5a25684",
  measurementId: "G-09JF9N5RVV",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
