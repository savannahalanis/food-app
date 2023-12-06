import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBVHJGnWw1lABpcAtlxLBhofhVpq4x8_W4",
  authDomain: "chew-cla.firebaseapp.com",
  databaseURL: "https://chew-cla-default-rtdb.firebaseio.com",
  projectId: "chew-cla",
  storageBucket: "chew-cla.appspot.com",
  messagingSenderId: "655644247150",
  appId: "1:655644247150:web:daa23e1f4c7530f6c1527f",
  measurementId: "G-DNWPKD3L58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();
export const storage = getStorage(app)

const localStorage = window.localStorage;