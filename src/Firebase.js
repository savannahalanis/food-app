import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {getDatabase, ref, set} from "firebase/database";
import { getFirestore } from "firebase/firestore";
//import {FIREBASE_API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, SENDER_ID, APP_ID, MEASUREMENT_ID} from './info.js';


// temporarily using because can't set up .env

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
