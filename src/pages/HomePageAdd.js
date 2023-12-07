import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useEffect, useState} from 'react'
import {db, storage} from '../Firebase.js'
import {ref, uploadBytesResumable, listAll, getDownloadURL} from 'firebase/storage';
import {getDocs, collection, addDoc, deleteDoc, updateDoc, doc, serverTimestamp, getDoc} from 'firebase/firestore'
import Navbar from "../components/Navbar";
import { Card, CardContent, Grid, TextField, Typography, InputLabel, Button } from "@mui/material";
import "../components/Card.css"; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import { Link } from "react-router-dom";
import {v4} from 'uuid';
import {useDetermineUser, getNameFromID} from '../components/MarketPlaceFunctions.js'
import Checkbox from '@mui/material/Checkbox';
import { useContext } from "react";
import { Context } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

export default function HomeAdd() {
  const [postList, setPostList] = useState([]);
  const {user} = useContext(Context);
  const navigate = useNavigate();

  const postCollectionRef = collection(db, "Food_Post");
  const marketplaceCollectionRef = collection(db, "Selling_Post");

  const getPostList = async () => {
    const data = await getDocs(postCollectionRef);
    const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
    setPostList(filteredData)
  };
  useEffect(() => {
    getPostList();
  }, []);

  const onSubmitPost = async (event) => {
    event.preventDefault();
    console.log("hit submit!!");

    const data = new FormData(event.currentTarget);


    var newTitle = data.get("title");
    var newText = (data.get("text"));
    var newLocation = data.get("location");
    var imageUpload = data.get("image");  
    var vegValue = false;
    var peanut = false; 
    if(data.get("veg"))
    {
      console.log("This is vegetarian");
      vegValue = true;
    }
    if(data.get("peanut"))
    {
      console.log("This contains peanuts");
      peanut = true;
    }
    
    try{
        const imageRef = ref(storage, `/food_post_images/${imageUpload.name + v4()}`);
        await uploadBytesResumable(imageRef, imageUpload);
        const imageURL = await getDownloadURL(imageRef);
        await addDoc(postCollectionRef, {
          title: newTitle,
          text: newText,
          date: serverTimestamp(),
          image: imageURL,
          location: newLocation,
          likes: [],
          comments: [],
          uid: user.uid,
          username: "temp",
          veg: vegValue,
          allergy: peanut
        });
        alert("Sucessfully submitted post!!");
        getPostList();
        navigate('/');
    }catch(err){
        console.error(err);
        alert("Oops, something went wrong. Please try again");
    }
  }

  return (
    <>

      <Navbar />
      <div style={{ position: 'relative', width: '100%' }}>
      <Link to ="/home">
        <Button 
          variant="contained" 
          startIcon={<ArrowBackIcon />} 
          sx={{ position: 'absolute', top: "1.5em", left: "1.5em", color: "white" }}
        >
         Back
        </Button>
        </Link>
      </div>

      <form noValidate onSubmit={onSubmitPost} sx={{ mt: 3 }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Card className="card" sx={{ maxWidth: 600, margin: 'auto', mt: 2 }}>
          <CardContent>
            <Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h3">Create New Post</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel >Title</InputLabel>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  variant="standard"
                  required
                  placeholder="Text...."
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel>Text</InputLabel>
                <TextField
                  fullWidth
                  id="text"
                  name="text"
                  variant="standard"
                  placeholder="Text...."
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                  <Box sx={{ minWidth: 100 }}>
                      <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Location</InputLabel>
                      <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Location" name="location">
                        <MenuItem value={"DeNeve"}>DeNeve</MenuItem>
                        <MenuItem value={"B-Plate"}>B-Plate</MenuItem>
                        <MenuItem value={"Epicuria"}>Epicuria</MenuItem>
                        <MenuItem value={"Feast"}>Feast</MenuItem>
                        <MenuItem value={"RendeEast"}>Rende East</MenuItem>
                        <MenuItem value={"RendeWest"}>Rende West</MenuItem>
                      </Select>
                      </FormControl>
                  </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel>Veg</InputLabel>
                <Checkbox color="default" id="veg" name="veg"/>
                <InputLabel>Contains Peanuts</InputLabel>
                <Checkbox color="default" id="peanut" name="peanut"/>
              </Grid>


              <Grid item xs={12} sm={6} sx={{ marginTop: -10}}>
                  <InputLabel>Choose Image</InputLabel>
                  <input accept="image/*" style={{ display: 'none' }} class="image" name="image" id="raised-button-file" multiple type="file"></input>
                  <label htmlFor="raised-button-file">
                    <Button variant="contained" component="span" sx={{color:"white"}} >Upload</Button>
                  </label>
              </Grid>

              </Grid>

              <Grid item xs={6} sx={{ marginTop: 2 }}>
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
