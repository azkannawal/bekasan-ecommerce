import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "testing-2924a.firebaseapp.com",
  projectId: "testing-2924a",
  storageBucket: "testing-2924a.appspot.com",
  messagingSenderId: "920640427178",
  appId: "1:920640427178:web:46470a5ca2bedfb23e6cd3",
};

const app = initializeApp(firebaseConfig);

export default app;
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
