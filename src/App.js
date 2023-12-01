import './App.css';
import './Firebase.js';
import FoodPost from './FoodPosts.js';
import MarketplacePost from './MarketplacePosts.js'

import React, { useEffect, useState } from 'react';
import { signInWithGoogle } from './Firebase.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const App = () => {
  const [user, setUser] = useState(null);
  
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
          <FoodPost/>
          <MarketplacePost/>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign in with Google</button>
      )}
    </div>
  );
};

export default App;
