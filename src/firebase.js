// src/firebase.js or src/firebase.ts (if using TypeScript)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbH-JchHgIGGAHSpP3NyraifvDfmLWGeo",
  authDomain: "transcripto-c6f10.firebaseapp.com",
  projectId: "transcripto-c6f10",
  storageBucket: "transcripto-c6f10.appspot.com",
  messagingSenderId: "145987070482",
  appId: "1:145987070482:web:7f843c935b37ac1100c6cb",
  measurementId: "G-W5YQ3T7W6J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
