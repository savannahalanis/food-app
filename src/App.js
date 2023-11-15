import './App.css';
import './Firebase.js';
import './FoodPosts.js';

import React, { useEffect, useState } from 'react';
import { signInWithGoogle } from './Firebase.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from './Firebase.js'
import {getDocs, collection, addDoc} from 'firebase/firestore'

const App = () => {
  const [user, setUser] = useState(null);
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "Food_Post")

  //NEW POST STATES
  const [newTitle, setTitle] = useState(null);
  const [newImage, setImage] = useState('');
  const [newText, setText] = useState('');

  const getPostList = async () => {
    try{
      const data = await getDocs(postCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(), 
        id: doc.id,
      }));
      setPostList(filteredData)
      console.log(filteredData);
    } catch (err) {
      console.error(err);
    };
  }
  useEffect(() => {
    getPostList();
  }, [])

  const onSubmitPost = async () => {
    try{
      await addDoc(postCollectionRef, {
        title: newTitle, 
        text: newText, 
        image: newImage,
      });
      getPostList();
    }catch(err){
      console.error(err);
    }
  }

  const handleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      setUser(user);
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

  // Listen for changes in authentication state
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

          <div>
            <input type="text" placeholder="Title....." onChange={(e) => {console.log(e.target.value);}}/>
            <input type="text" placeholder="Text...."/>
            <input type="text" placeholder="Image"/>
            <input type="checkbox"/>
            <label>Veg</label>
            <button onClick={onSubmitPost}>Submit Post</button>
          </div>
          <div>
            {postList.map((post, index) => (
              <div key={index}>
                <h1>{post.title}</h1>
                <img src={post.image} width="100" height="100"></img>
                <p>{post.text}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign in with Google</button>
      )}
    </div>
  );
};

export default App;

/*<input placeholder = "Image...." value={newImage} onChange={(e) => setImage(e.target.value)}/>
            <input placeholder = "Title..." value={newTitle} onChange={(e) => setTitle(e.target.value)}/>
            <input placeholder = "Text....." value={newText} onChange={(e) => setText(e.target.value)}/> */