import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Logo from "../static/logo2.png"
import "../App.css";
import {
  getAuth,
  getAdditionalUserInfo,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { getDocs, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../Firebase.js';

function NavBar() {
  const [click, setClick] = useState(false);
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState(null);
  const usersCollectionRef = collection(db, 'Users');
  const auth = getAuth();

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

  const handleSignOut = () => {
    auth.signOut().then(() => {
      setUser(null);
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };


  onAuthStateChanged(auth, async(user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });
  useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, (user) => {
     if (user) {
       setUser(user);
     } else {
       setUser(null);
     }
   });
   return () => unsubscribe();
 }, [auth]);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <span className="icon">
              <img src = {Logo} className="icon"/>
            </span>
            { <Typography variant="h3" >ChewCLA</Typography> }
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/home"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
                style={{ fontFamily: 'InstagramSans' }}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/marketplace"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
                style={{ fontFamily: 'InstagramSans' }}
              >
                Marketplace
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/userpage"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
                style={{ fontFamily: 'InstagramSans' }}
              >
                Profile
              </NavLink>
            </li>
          
           {
            user ?  ( <Button 
            onClick={handleSignOut}
            variant="contained" 
            sx={{color: "white", marginRight: '1rem',  border: '1px solid #2D68C4',
              '&:hover': {
                backgroundColor: '#5B97F4', 
                border: '1px solid #5B97F4'
              }
            }}
             
            >
              Logout
            </Button> 
            ):(
              <></>
              )
           }
          
            
           
          </ul>
          
        </div>
      </nav>
    </>
  );
}

export default NavBar;