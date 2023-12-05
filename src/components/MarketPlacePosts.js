import {Card, Typography, Grid, Avatar, CardContent, Box} from  "@mui/material";
import "./Card.css";
import Image from '../static/background3.png'

import React, { useEffect, useState } from 'react';
import { db } from '../Firebase.js'
import {getDocs, getDoc, collection, addDoc, deleteDoc, updateDoc, doc, serverTimestamp, Timestamp, orderBy, query, limit, where, direction, getFirestore} from 'firebase/firestore'
  

export default function MarketPlacePosts() {

  const [marketplaceList, setMarketplaceList] = useState([]);
  const [filterBy, setFilterBy] = useState("date")
  const marketplaceCollectionRef = collection(db, "Selling_Post")

  // NEW POST STATES
  const [newContactInfo, setContactInfo] = useState('');
  const [newContactType, setContactType] = useState('');
  const [newStartHour, setStartHour] = useState('');
  const [newEndHour, setEndHour] = useState('');
  const [newPrice, setPrice] = useState('');
  const [newDate, setDate] = useState('');

  const getMarketplaceList = async () => {
      try {
          const data = await getDocs(query(collection(db, "Selling_Post"), where("date", ">=", currentDate()), orderBy(filterBy)));
          const posts = data.docs.map(async (doc) => {
              const postData = { ...doc.data(), id: doc.id };
              postData.userName = await getNameFromID(postData.uid);
              return postData;
          });
  
          const resolvedPosts = await Promise.all(posts);
          setMarketplaceList(resolvedPosts);
      } catch (error) {
          console.error('Error fetching marketplace data:', error);
      }
  };


  useEffect(() => {
      getMarketplaceList();
  }, []);

  function currentDate() {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); 
      const currentDateTimestamp = Timestamp.fromDate(currentDate);
      return currentDateTimestamp;        
  };

  const getNameFromID = async(userID) => {

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

    return(
      <div>
        {marketplaceList.map((post, index) =>
          <div key={index}>
              <ul>
                  <Post listing = {post}/>
              </ul>
          </div>
        )
      }
      </div>
    )
}

function twentyFourHourToTwelve(dateString) {

  var [hour, minute] = dateString.split(':'); 
  hour = parseInt(hour)
  console.log(hour)
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

function Post ({listing}) {
    return (
        <>
    <Card className = "card">
    <CardContent>
        <Grid container spacing={2} alignItems="center">
         
          <Grid item xs={8}>
            <Typography variant="h5" noWrap>
              {listing.userName}
            </Typography>
            <Typography variant="subtitle2" noWrap>
              TODO: extra info
            </Typography>
            
          </Grid>
          <Grid item xs = {2}>
          <Box
            sx={{
              width: 80,
              height: 40,
              backgroundColor: listing.type === 'buying' ? 'green' : '#2D68C4',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '4px'
            }}
          >
            <Typography variant="button" display="block" noWrap>
              <strong>${listing.price}</strong>
            </Typography>
          </Box>
          </Grid>

          {/*
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="text.secondary">
              placeholder
            </Typography>
          </Grid>
          */}

          <Grid item xs={12}>
            <Typography variant="body1">Time: {twentyFourHourToTwelve(listing.startHour)} - {twentyFourHourToTwelve(listing.endHour)} </Typography>
            <Typography variant="body1">Date: {listing.date.toDate().toLocaleDateString()} </Typography>
            <Typography variant="body1">{listing.contactType}: {listing.contactInfo}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
        </>
    )
}