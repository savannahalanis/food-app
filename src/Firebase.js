import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQ2EZvHsRs1xies-e6MAHQyZFejuG6Na8",
  authDomain: "temp-2-5aed7.firebaseapp.com",
  projectId: "temp-2-5aed7",
  storageBucket: "temp-2-5aed7.appspot.com",
  messagingSenderId: "667709316986",
  appId: "1:667709316986:web:de40b3ed026b042f95c0c3",
  measurementId: "G-J88RH2WHK6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();
export const storage = getStorage(app)

const localStorage = window.localStorage;