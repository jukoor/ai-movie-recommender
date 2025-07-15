// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJYsJGsk0RJnfQFVts-lWxoC9gWG6NxXs",
  authDomain: "ai-movie-recommender-268b2.firebaseapp.com",
  projectId: "ai-movie-recommender-268b2",
  storageBucket: "ai-movie-recommender-268b2.firebasestorage.app",
  messagingSenderId: "755089663314",
  appId: "1:755089663314:web:338d188b51291b862f068b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
