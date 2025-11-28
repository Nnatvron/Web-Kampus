// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

// Config Firebase (ambil dari console Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyA0y_oluRBmxIB5vnxn12wFNjKKOF4AkvM",
  authDomain: "ubsioneplus.firebaseapp.com",
  projectId: "ubsioneplus",
};

// Initialize app
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app); // buat push notif nanti
