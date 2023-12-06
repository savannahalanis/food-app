import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import Image from './static/background3.png';

import './App.css';
import { useTheme } from '@emotion/react';

import {
  getAuth,
  getAdditionalUserInfo,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { getDocs, addDoc, collection, serverTimestamp, query, where } from 'firebase/firestore';
import { db } from './Firebase.js';

function App() {
  const theme = useTheme();

  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState(null);
  const usersCollectionRef = collection(db, 'Users');

  const getUserList = async () => {
    const data = await getDocs(usersCollectionRef);
    const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setUserList(filteredData);
  };

  useEffect(() => {
    getUserList();
  }, []);

  const addUser = async (user) => {
    getUserList();
    const currentUsers = userList.filter((u) => u.email === user.email);
    console.log(currentUsers);
    if (currentUsers.length === 0) {
      console.log('Here');
      const userDocument = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
        following: [],
        followers: [],
        numPosts: 0,
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

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = result.user;
      const { isNewUser } = getAdditionalUserInfo(result);

      if (user.email.endsWith('.edu')) {
        setUser(user);
        if (isNewUser) {
          addUser(user);
        }
      } else {
        console.log("Invalid email domain. Sign in with a valid 'ucla.edu' email address.");
        auth.signOut();
      }
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
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        sx={{ backgroundImage: `url(${Image})`, backgroundSize: 'cover' }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4.5}></Grid>
          <Grid item xs={6}>
            <Typography variant="h1" style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
              ChewCLA
            </Typography>
            <Typography variant="body1" align="center">
              {user ? (
                <>
                  <Button onClick={handleSignOut} variant="contained" sx={{ color: 'white' }}>
                    Log Out
                  </Button>
                  <br></br>
                  <br></br>
                  <div>
                    <Link to="/home">
                      <Button variant="contained" sx={{ color: 'white' }}>
                        Go to Site
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <Button onClick={handleSignIn} variant="contained" sx={{ color: 'white' }}>
                  Login
              </Button>
              )}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
