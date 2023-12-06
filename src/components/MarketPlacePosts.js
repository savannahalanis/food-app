import {Card, Typography, Grid, Avatar, CardContent, Box, FormControl, InputLabel, Select, MenuItem} from  "@mui/material";
import "./Card.css";
import Image from '../static/background3.png'

import React, { useEffect, useState } from 'react';
import { db } from '../Firebase.js'
import {getDocs, getDoc, collection, addDoc, deleteDoc, updateDoc, doc, serverTimestamp, Timestamp, orderBy, query, limit, where, direction, getFirestore} from 'firebase/firestore'

import {useDetermineUser, currentDate, getNameFromID, twentyFourHourToTwelve, convertUTCToLocal } from './MarketPlaceFunctions.js'
  

export default function MarketPlacePosts() {

  const  {user, userDocID} = useDetermineUser();


  const [marketplaceList, setMarketplaceList] = useState([]);
  const [filterBy, setFilterBy] = useState("date")

  const getMarketplaceList = async () => {

      try {
          const data = await getDocs(query(collection(db, "Selling_Post"), where("date", ">=", currentDate()), orderBy(filterBy)));
          const posts = data.docs.map(async (doc) => {
              const postData = { ...doc.data(), id: doc.id };
              postData.userName = await getNameFromID(postData.uid);
              return postData;
          });
  
          const resolvedPosts = await Promise.all(posts);
          console.log(resolvedPosts)
          setMarketplaceList(resolvedPosts);
      } catch (error) {
          console.error('Error fetching marketplace data:', error);
      }
  };

  const handleFilter = () => {
    if (filterBy === 'date') {
        console.log("hit date filter")
        getMarketplaceList();
    } else if (filterBy === 'price') {
      console.log("hit price filter")
        const sortedByPrice = [...marketplaceList].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        setMarketplaceList(sortedByPrice);
    }
};


  useEffect(() => {
      getMarketplaceList();
  }, []);


  useEffect(() => {
    setFilterBy("price");
    handleFilter();
    console.log("used Effect")
}, []);
  
  console.log("before return - " + filterBy)

    return(
      <div>
      <Card sx={{ minWidth: 275, m: "2em" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Filter by date or price!
        </Typography>

        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel id="filter-label">Filter</InputLabel>
          <Select
            labelId="price-select-label"
            id="price-select"
            label="filter"
            value = {filterBy}
            onChange={(e) => {
              setFilterBy(e.target.value)
              handleFilter()
              console.log("e.target.valeu - " + e.target.value)
            }}
          >
            <MenuItem value="price">Date</MenuItem>
            <MenuItem value="date">Price</MenuItem>
          </Select>
        </FormControl>
      
      </CardContent>
    </Card>
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
 