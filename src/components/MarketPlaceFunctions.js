import { useLocation } from 'react-router-dom';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { db } from '../Firebase.js'
import {getDocs, getDoc, collection, addDoc, deleteDoc, updateDoc, doc, serverTimestamp, Timestamp, orderBy, query, limit, where, direction, getFirestore} from 'firebase/firestore'

export function currentDate() {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); 
    const currentDateTimestamp = Timestamp.fromDate(currentDate);
    return currentDateTimestamp;        
};

export const getNameFromID = async(userID) => {

    try {
        const userDocRef = doc(collection(db, 'Users'), userID);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists) {
            return "User not found";
        }

        const username = userDoc.data().displayName;

        return username;
    } catch (err) {
        console.error(err);
    }
};

export function twentyFourHourToTwelve(dateString) {

    var [hour, minute] = dateString.split(':'); 
    hour = parseInt(hour)
    var ending = ""
    if (parseInt(hour) < 12 ) {
        var ending = "AM";
    } else if (parseInt(hour) == 12 ) {
        var ending = "PM";
    } else {
        hour = hour-12;
        ending = "PM";
    }
    var newDateString = String(hour) + ":" + minute + " " + ending;
    return newDateString;
  
  }

export function removeTrailingZeros(numberString) {
    var periodPos = -1;
    if (numberString.indexOf(".") !== -1) {
        var decimalPlaces = numberString.length - numberString.indexOf(".") -1;
    } else {
        return numberString + ".00";
    }

    var zeroString = "";

    if (decimalPlaces == 1) {
        zeroString = "0";
    } else if (decimalPlaces == 0 || decimalPlaces == 0)  {
        zeroString = "00";
    }

    return numberString + zeroString;
}

export function dateToTimestamp(dateString) {
    const currentDate = new Date(dateString);
    currentDate.setHours(0, 0, 0, 0); 
    const currentDateTimestamp = Timestamp.fromDate(currentDate);
    return currentDateTimestamp; 
}

export function useDetermineUser() {
    const location = useLocation();
    const { state } = location;
    const [user, setUser] = useState(null);
    const auth = getAuth();
    const [userData, setUserData] = useState(null);
    const [userDocID, setUserDocID] = useState(null);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUser(user);
          const userQuery = query(collection(db, "Users"), where("uid", "==", user.uid));
          const userQuerySnapshot = await getDocs(userQuery);
  
          const userDoc = doc(db, "Users", userQuerySnapshot.docs[0].id);
          const userSnapshot = await getDoc(userDoc);
          setUserData(userSnapshot.data());
          setUserDocID(userSnapshot.id);
        } else {
          setUser(null);
        }
      });
  
      return () => unsubscribe();
    }, [auth]);
  
    return { user, userDocID };
  }