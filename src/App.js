import './App.css';
import './Firebase.js';
import FoodPost from './FoodPosts.js';
import MarketplacePost from './MarketplacePosts.js'


import React, { useEffect, useState } from 'react';
import { getAuth, getAdditionalUserInfo, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDocs, addDoc, collection, serverTimestamp, query, where } from 'firebase/firestore';
import { db } from './Firebase.js'

const App = () => {
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState(null);
  const [userDocID, setUserDocID] =  useState(null);
  const usersCollectionRef = collection(db, 'Users');

  const getUserList = async () => {
    const data = await getDocs(usersCollectionRef);
    const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
    setUserList(filteredData)
  };

  useEffect(() => {
    getUserList();
  }, [])
  const addUser = async (user) => {
    getUserList();
    const currentUsers = userList.filter(u => u.email === user.email);
    console.log(currentUsers);
    if (currentUsers.length == 0){
      console.log("Here")
      const userDocument = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: serverTimestamp(),
          friends:[],
      };

      try {
          await addDoc(usersCollectionRef, userDocument);
          getUserList();
          console.log('User added to Firestore');
      } catch (error) {
          console.error('Error adding user to Firestore', error);
      }
    }
  };

  const getUserDocID= async (uid) => {
    const querySnapshot = await getDocs(query(collection(db, "Users"), where("uid", "==", uid)));
    if(!querySnapshot) {
      console.log("nothing in getUserDocID() snapshot")
      return;
    }
    const id = querySnapshot.docs[0].id;
    setUserDocID(id);
    return;
  };

  const handleSignIn = async () => {
    console.log("Here");
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = result.user;
      const { isNewUser } = getAdditionalUserInfo(result)    
      console.log("New: ")
      console.log(isNewUser);
      setUser(user);
      if(isNewUser){
        addUser(user);
      }
      getUserDocID(user.uid)
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const auth = getAuth();
  const handleSignOut = () => {  
    auth.signOut().then(() => {
      setUser(null);
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });
   

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <p>Email: {user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
          <FoodPost/>
          <MarketplacePost userID = {userDocID}/>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign in with Google</button>
      )}
    </div>
  );
};

export default App;
