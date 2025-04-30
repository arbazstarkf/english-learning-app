// First, update firebase.js to include authentication

// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVwpP8LC8lRezE5Y0ptzCycBHbXmh_kE8",
  authDomain: "english-learning-app-ab4e7.firebaseapp.com",
  projectId: "english-learning-app-ab4e7",
  storageBucket: "english-learning-app-ab4e7.firebasestorage.app",
  messagingSenderId: "532986915064",
  appId: "1:532986915064:web:d4756af5c1df648a1fb30d",
  measurementId: "G-6EJLK1HMW9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
export default app;