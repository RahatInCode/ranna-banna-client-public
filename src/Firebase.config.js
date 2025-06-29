
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASO1ED5Vvv81OMnNE-k6-sqodJVwyAEQo",
  authDomain: "ranna-banna-93ff1.firebaseapp.com",
  projectId: "ranna-banna-93ff1",
  storageBucket: "ranna-banna-93ff1.firebasestorage.app",
  messagingSenderId: "463285209174",
  appId: "1:463285209174:web:a23dbb49fcd7b542e413f7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
