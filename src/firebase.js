import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAABi3126QxqO2OD3k2v_c-rMMEye2-X88",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "outpero-b5cdf.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "outpero-b5cdf",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "outpero-b5cdf.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "72861051460",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:72861051460:web:ec3c3e9dd678fa8f09ea11",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-D3BY0MYHJB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
