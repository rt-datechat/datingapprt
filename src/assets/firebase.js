import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBb-ayndK0UF3S3QjbBOO3xcwI50fP6SJk",
  authDomain: "dateapps-d44f6.firebaseapp.com",
  projectId: "dateapps-d44f6",
  storageBucket: "dateapps-d44f6.appspot.com",
  messagingSenderId: "1023944571274",
  appId: "1:1023944571274:web:352fa28c2b8c5eef487073",
  measurementId: "G-E7S3PFZPL4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
