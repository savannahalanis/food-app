import Navbar from "../components/Navbar";
import { Card, CardContent, Grid, TextField, Typography, InputLabel, Button } from "@mui/material";
import "../components/Card.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import React, { useEffect, useState } from 'react';
import { db } from '../Firebase.js'
import {getDocs, getDoc, collection, addDoc, deleteDoc, updateDoc, doc, serverTimestamp, Timestamp, orderBy, query, limit, where, direction, getFirestore} from 'firebase/firestore'

import {removeTrailingZeros, dateToTimestamp, useDetermineUser} from '../components/MarketPlaceFunctions.js'

import {HomePage} from "./Home.js"


export default function MarketplaceAdd() {

  const marketplaceCollectionRef = collection(db, "Selling_Post")

  const  {user, userDocID} = useDetermineUser();
  console.log("ADDING UserDocID - " + userDocID)

  const onSubmitMarketplacePost = async (event) => {

    event.preventDefault();

    console.log("hit submit!!")

    const data = new FormData(event.currentTarget);
    console.log("Form Data:", data);

    console.log("form date - " + data.get("date"))


    var dataContactInfo = data.get("contactInfo")
    var dataContactType = (data.get("contactType"))
    var dataStartHour = data.get("startHour")
    var dataEndHour = data.get("endHour")
    var dataPrice = data.get("price")
    var fromFormDate = data.get("date")

    var tempDate = new Date(fromFormDate);
    var dataDate = tempDate.setDate(tempDate.getDate() + 1);

    /*
    console.log("dataDate - " + dataDate)
    console.log("dataDate - " + dataDate) 
    console.log("type - " + typeof dataDate)
    console.log("dataContactType - " + dataContactType)
    */


    try{

      // alerts if inputted is insufficient or 
        const requiredFields = ['price', 'date', 'contactInfo', 'contactType', 'startHour', 'endHour'];
        const missingFields = requiredFields.filter(field => !data.get(field));
        if (missingFields.length > 0) {
          alert("Must fill in all fields before submitting a post!");
          return;
        }

        if (dataEndHour < dataStartHour) {
            alert("Start time must be before end time");
            return;
        }
        
        if ( (dataPrice * 100) % 1 || dataPrice < 0) {
            alert("Price must have 2 decimals and nonnegative ")
            return;
        }

        console.log("price calculations")
  
        await addDoc(marketplaceCollectionRef, {
            contactInfo: dataContactInfo,
            contactType: dataContactType,
            startHour: dataStartHour,
            endHour: dataEndHour,
            price: removeTrailingZeros(dataPrice),
            uid: userDocID,
            date: dateToTimestamp(dataDate)
        });

        alert("Sucessfully submitted!!")
  
        // reload page to (temporarily??) fix issue that "where" and first "orderBy" must be same type
    }catch(err){
        console.error(err)
    }
  }

  return (
    <>
      <Navbar />
      <div style={{ position: 'relative', width: '100%' }}>
        <Link to="/marketplace">
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            sx={{ position: 'absolute', top: "1.5em", left: "1.5em", color: "white" }}
          >
            Back
          </Button>
        </Link>
      </div>

      <form noValidate onSubmit={onSubmitMarketplacePost} sx={{ mt: 3 }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Card className="card" sx={{ maxWidth: 600, margin: 'auto', mt: 2 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h3">Add New Posting</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel >Price per Swipe</InputLabel>
                <TextField
                  fullWidth
                  id="price"
                  name ="price"
                  variant="standard"
                  type = "number"
                  InputProps={{
                    startAdornment: <Typography>$</Typography>
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
              <InputLabel >Date</InputLabel>
                <input type="date" 
                  id = "date"
                  name = "date"
                  required min={(new Date(Date.now() - 86400000)).toISOString().split("T")[0]}   
                  placeholder="Day Available"
                  min={(new Date(Date.now() - 86400000)).toLocaleDateString('en-CA')}   
                  placeholder="Day Available"
                  min={(new Date()).toLocaleDateString('en-CA')}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel >Contact Information</InputLabel>
                <TextField
                  fullWidth
                  id="contactInfo"
                  name="contactInfo"
                  variant="standard"
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel>Contact Type</InputLabel>
                <TextField
                  fullWidth
                  id="contactType"
                  name="contactType"
                  variant="standard"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel>Start Time</InputLabel>
                <TextField
                  fullWidth
                  id="startHour"
                  name="startHour"
                  type = "time"
                  variant="standard"
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel >End Time</InputLabel>
                <TextField
                  fullWidth
                  id="endHour"
                  name="endHour"
                  type = "time"
                  variant="standard"
                  required
                />
              </Grid>

              <Grid item xs={6}>
                <Button type="submit" variant="contained" sx={{ color: "white" }}>Submit</Button>
              </Grid>

            </Grid>
          </CardContent>
        </Card>
      </div>
      </form>

    </>
  );
}
