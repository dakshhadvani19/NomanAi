import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAABi3l26Qxq02OD3k2v_c-rMMEye2-X88",
  authDomain: "outpero-b5cdf.firebaseapp.com",
  projectId: "outpero-b5cdf",
  storageBucket: "outpero-b5cdf.firebasestorage.app",
  messagingSenderId: "72861051460",
  appId: "1:72861051460:web:ec3c3e9dd678fa8f09ea11",
  measurementId: "G-D3BY0MYHJB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addClient() {
  try {
    // The Agent ID from the screenshot URL: omnidim.io/agent/199215
    const agentIdStr = "199215";
    
    await setDoc(doc(db, "agents", agentIdStr), {
      agentId: 199215, // Stored as integer per our API setup
      agentName: "Property Inquiry Handler Hyd (01)",
      clientName: "Ajay Indukuri",
      allowedEmails: [
        "tharunnaikmudevath@gmail.com",
        "dakshpatel09765gy@gmail.com"
      ]
    });
    
    console.log("✅ Client added successfully!");
  } catch (error) {
    console.error("❌ Error adding client:", error);
  }
}

addClient();