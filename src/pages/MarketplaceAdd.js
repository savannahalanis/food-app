import Navbar from "../components/Navbar";
import { Card, CardContent, Grid, TextField, Typography, InputLabel, Button } from "@mui/material";
import "../components/Card.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import React, { useEffect, useState } from 'react';
import { db } from '../Firebase.js'
import {getDocs, getDoc, collection, addDoc, deleteDoc, updateDoc, doc, serverTimestamp, Timestamp, orderBy, query, limit, where, direction, getFirestore} from 'firebase/firestore'

import {removeTrailingZeros, dateToTimestamp, DetermineUser} from '../components/MarketPlaceFunctions.js'

import {HomePage} from "./Home.js"


export default function MarketplaceAdd() {
  const [newContactInfo, setContactInfo] = useState('');
  const [newContactType, setContactType] = useState('');
  const [newStartHour, setStartHour] = useState('');
  const [newEndHour, setEndHour] = useState('');
  const [newPrice, setPrice] = useState('');
  const [newDate, setDate] = useState('');
  const marketplaceCollectionRef = collection(db, "Selling_Post")

  const onSubmitMarketplacePost = async () => {
    var userID = "zIovCBJ7mt1tvNjeQ2rR" // TODO: FIXME

    try{
        if (newEndHour < newStartHour) {
            alert("Start time must be before end time");
            return;
        }
  
        if ( (newPrice * 100) % 1 || newPrice < 0) {
            alert("Price must have 2 decimals and nonnegative ")
            return;
        }
  
        await addDoc(marketplaceCollectionRef, {
            contactInfo: newContactInfo,
            contactType: newContactType,
            startHour: newStartHour,
            endHour: newEndHour,
            price: removeTrailingZeros(newPrice),
            uid: userID,
            date: dateToTimestamp(newDate)
        });
  
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
                  variant="standard"
                  type = "number"
                  InputProps={{
                    startAdornment: <Typography>$</Typography>
                  }}
                  onChange={(e) => {
                    setPrice(e.target.value)
                    console.log("Price changed!!!", e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth sx={{ my: 2 }}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker 
                    label="Choose a date" 
                    onChange={
                      console.log("Date changed!!")
                    }
                    required
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel >Contact Information</InputLabel>
                <TextField
                  fullWidth
                  id="title"
                  variant="standard"
                  required
                  onChange={(e) => {
                    setContactInfo(e.target.value)
                    console.log("Contact info changed!!!", e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel>Contact Type</InputLabel>
                <TextField
                  fullWidth
                  id="additional-text"
                  variant="standard"
                  onChange={(e) => {
                    console.log("Contact type changed!!!", e.target.value);
                    setContactType(e.target.value)
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel>Start Hour</InputLabel>
                <TextField
                  fullWidth
                  id="time"
                  type = "time"
                  variant="standard"
                  onChange={(e) => {
                    setStartHour(e.target.value)
                    console.log("Start hour changed!!!", e.target.value);
                  }}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel >End Hour</InputLabel>
                <TextField
                  fullWidth
                  id="contact"
                  type = "time"
                  variant="standard"
                  onChange={(e) => {
                    console.log("End hour changed!!!", e.target.value);
                    setEndHour(e.target.value)
                  }}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <Button onClick={onSubmitMarketplacePost} variant="contained" sx={{ color: "white" }}>Submit</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
