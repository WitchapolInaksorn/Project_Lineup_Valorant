import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCObkJd1pPOHXIJa-XSmzYM2Wg3JFAYHBs",
  authDomain: "lineup-website-53296.firebaseapp.com",
  projectId: "lineup-website-53296",
  storageBucket: "lineup-website-53296.firebasestorage.app",
  messagingSenderId: "211673192316",
  appId: "1:211673192316:web:311fa181303c01fe9136f9",
  measurementId: "G-S70HMR4G9Q",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
