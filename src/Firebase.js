import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {getDatabase, ref, set} from "firebase/database";
import { getFirestore } from "firebase/firestore";
import {FIREBASE_API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, SENDER_ID, APP_ID, MEASUREMENT_ID} from './info.js';


// temporarily using because can't set up .env
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};

/*
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};
*/

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app); 
// const db = app.firestore();

const provider = new GoogleAuthProvider();
  
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log('User signed in:', user.displayName);
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
  };
  
  export { signInWithGoogle };
  
  
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
