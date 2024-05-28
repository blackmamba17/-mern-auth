// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "gtorrisisite.firebaseapp.com",
  projectId: "gtorrisisite",
  storageBucket: "gtorrisisite.appspot.com",
  messagingSenderId: "1055225961885",
  appId: "1:1055225961885:web:a784ecfe8b2864aa14a374",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
