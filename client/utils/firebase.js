// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "kodex-mini.firebaseapp.com",
  projectId: "kodex-mini",
  storageBucket: "kodex-mini.firebasestorage.app",
  messagingSenderId: "925579403929",
  appId: "1:925579403929:web:3a71c4757d139dff650e08",
  measurementId: "G-8601LMPQ22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export let auth = getAuth(app);

export let googleProvider = new GoogleAuthProvider();

