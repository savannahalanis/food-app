import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {initializeApp} from 'firebase/app';
import {getFirestore, collection, getDocs, addDoc} from 'firebase/firestore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'User')

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    let users = []
    snapshot.docs.forEach((doc) => {
      users.push({...doc.data(), id: doc.id})
    })
    console.log(users)
  })
  .catch(err => {
    console.log(err.message)
})


// adding users
const addUserForm = document.querySelector('.add')
addUserForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    username: addUserForm.username.value,
    name: addUserForm.name.value,
  })
  .then(() =>
    addUserForm.reset()
  )

})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
