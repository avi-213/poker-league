import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPO7plTDrg2IQ4uvYgRjrYu8elhxM_ptU",
  authDomain: "poker-league-619a0.firebaseapp.com",
  projectId: "poker-league-619a0",
  storageBucket: "poker-league-619a0.firebasestorage.app",
  messagingSenderId: "290380286362",
  appId: "1:290380286362:web:8cb0c7446e26bb7c1e5223",
  measurementId: "G-6WXQQSED05"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);