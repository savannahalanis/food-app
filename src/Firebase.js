import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCDFNpkTqGeImKfhztJFdv7ObG_LEtg-JU",
  authDomain: "post-database-a9f99.firebaseapp.com",
  projectId: "post-database-a9f99",
  storageBucket: "post-database-a9f99.appspot.com",
  messagingSenderId: "657626490668",
  appId: "1:657626490668:web:63e555048bd48c04c66e89",
  measurementId: "G-X0QN04Y00L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();
export const storage = getStorage(app)

const localStorage = window.localStorage;