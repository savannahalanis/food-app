import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {getDatabase, ref, set} from "firebase/database";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getApp(app);
const firestore = getFirestore(app); 
// const db = app.firestore();

const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const name = result.user.displayName;
        localStorage.setItem("name", name);
        location.reload(); // Refresh the page
        console.log(name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  // Define localStorage earlier in your code
  const localStorage = window.localStorage;

/*function getUserInfo(user_name ,name, contact_info, userId)
{
  const d = getDatabase();
  const reference = ref(d, 'user info/' + );

  set(reference, {
    name: name,
    user_name: user_name,
    contact_info: contact_info,
    userId: userId
  });
}

userInfo()*/
