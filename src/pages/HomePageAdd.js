import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useEffect, useState} from 'react'
import {db, storage} from '../Firebase.js'
import {ref, uploadBytesResumable, listAll, getDownloadURL} from 'firebase/storage';
import {getDocs, collection, addDoc, deleteDoc, updateDoc, doc, serverTimestamp} from 'firebase/firestore'
import Navbar from "../components/Navbar";
import { Card, CardContent, Grid, TextField, Typography, InputLabel, Button } from "@mui/material";
import "../components/Card.css"; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import { Link } from "react-router-dom";
import {v4} from 'uuid';

export default function HomeAdd() {
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "Food_Post")

  //NEW POST STATES
  const [newTitle, setTitle] = useState('');
  const [newText, setText] = useState('');
  const [newDate, setDate] = useState(null);
  const [newLocation, setLocation] = useState('');
  const [newVeg, setVeg] = useState(false);
  const [newLikes, setLikes] = useState([]);
  const [imageUpload, setImageUpload] = useState(null);
  const [user, newUser] = useState('');
  

  const [searchQuery, setSearchQuery] = useState('');
  const [findVeg, setFindVeg] = useState(false);

  const imageListRef = ref(storage, "/food_post_images/")

  const getPostList = async () => {
    const data = await getDocs(postCollectionRef);
    const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
    setPostList(filteredData)
  };

  const handleLocation = (event) => {
    setLocation(event.target.value);
  };

  useEffect(() => {
    getPostList();
  }, []);

  const onSubmitPost = async (event) => {
    
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log(event.currentTarget);
    console.log("Above is the current target");
    console.log(data)

    console.log(data.get("title"))
    setTitle(data.get("title"));
    setText(data.get("text"));
    setLocation(data.get("location"))
    setImageUpload(data.get("raised-button-file"))
    

    try{
        const imageRef = ref(storage, `/food_post_images/${imageUpload.name + v4()}`);
        await uploadBytesResumable(imageRef, imageUpload);
        const imageURL = await getDownloadURL(imageRef);
        await addDoc(postCollectionRef, {
            uid: "IT5", /*TODO: Change this uid for each user */
            title: newTitle, 
            text: newText, 
            image: imageURL,
            date: serverTimestamp(),
            location: newLocation,
            veg: newVeg,
            likes: newLikes,
            comments: {}
        });
        alert("Successfully posted!");
        getPostList();
        setTitle('');
        setText('');
        setDate(null);
        setLocation('');
        setVeg(false);
        setLikes([]);
        setImageUpload(null);
        newUser('');
    }catch(err){
      console.log("HERE IS THE ERROR WE FOUND!!");
      console.error(err);
    }
  };  
  
  const filteredPosts = postList.filter(post =>
    (post.title.toLowerCase().includes(searchQuery.toLowerCase()) 
    || post.text.toLowerCase().includes(searchQuery.toLowerCase()))
    && (!findVeg || post.veg == findVeg)
  );

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
      
      <form id="form" noValidate onSubmit={onSubmitPost} sx={{ mt: 3 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Card className="card" sx={{ maxWidth: 600, margin: 'auto', mt: 2 }}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography variant = "h3">Create New Post</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <InputLabel >Title</InputLabel>
                  <TextField fullWidth id="title" variant="standard" required placeholder="Title....."/>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <InputLabel>Text</InputLabel>
                  <TextField fullWidth id="text" variant="standard" required placeholder="Text...."/>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ minWidth: 100 }}>
                      <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Location</InputLabel>
                      <Select labelId="demo-simple-select-label" id="demo-simple-select" value={newLocation} label="Location" onInput={handleLocation}>
                        <MenuItem value={"DeNeve"}>DeNeve</MenuItem>
                        <MenuItem value={"B-Plate"}>B-Plate</MenuItem>
                        <MenuItem value={"Epicuria"}>Epicuria</MenuItem>
                      </Select>
                      </FormControl>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <InputLabel>Choose Image</InputLabel>
                  <input accept="image/*" style={{ display: 'none' }} class="image" id="raised-button-file" multiple type="file"></input>
                  <label htmlFor="raised-button-file">
                    <Button variant="contained" component="span" sx={{color:"white"}}>Upload</Button>
                  </label>
                </Grid>

              
                <Grid item xs ={6}>
                  <Button type="submit" variant = "contained" sx={{color:"white", marginTop:"2em"}}>Submit</Button>
                </Grid>
              
      
              </Grid>
            </CardContent>
          </Card>
        </div>
      </form>
    </>
    
  );
}
