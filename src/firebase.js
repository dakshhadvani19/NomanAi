import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase client config — these are public, client-side keys (safe to hardcode).
// The API key is hardcoded directly to prevent incorrect Vercel env overrides.
const firebaseConfig = {
  apiKey: "AIzaSyAABi3126QxqO2OD3k2v_c-rMMEye2-X88",
  authDomain: "outpero-b5cdf.firebaseapp.com",
  projectId: "outpero-b5cdf",
  storageBucket: "outpero-b5cdf.firebasestorage.app",
  messagingSenderId: "72861051460",
  appId: "1:72861051460:web:ec3c3e9dd678fa8f09ea11",
  measurementId: "G-D3BY0MYHJB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
