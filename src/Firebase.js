import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {getDatabase, ref, set} from "firebase/database";

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
const db = app.firestore();
const auth = app.auth();

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      localStorage.setItem("name", name);
      refreshPage();
      console.log(name);
    })
    .catch((error) => {
      console.log(error);
    })
};



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
