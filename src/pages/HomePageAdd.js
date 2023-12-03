import {useEffect, useState} from 'react'
import {db, storage} from '../Firebase.js'
import {ref, uploadBytesResumable, listAll, getDownloadURL} from 'firebase/storage';
import {getDocs, collection, addDoc, deleteDoc, updateDoc, doc, serverTimestamp} from 'firebase/firestore'
import Navbar from "../components/Navbar";
import { Card, CardContent, Grid, TextField, Typography, InputLabel, Button } from "@mui/material";
import "../components/Card.css"; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import { Link } from "react-router-dom";
import { ListAltOutlined, SetMealOutlined } from '@mui/icons-material';
import {v4} from 'uuid';

export default function HomeAdd() {
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "Food_Post")

  //NEW POST STATES
  const [newTitle, setTitle] = useState('');
  const [newImage, setImage] = useState('');
  const [newText, setText] = useState('');
  const [newDate, setDate] = useState(null);
  const [newVeg, setVeg] = useState(false);
  const [newLikes, setLikes] = useState(0);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [findVeg, setFindVeg] = useState(false);

  const imageListRef = ref(storage, "/food_post_images/")

  const getPostList = async () => {
    const data = await getDocs(postCollectionRef);
    const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
    setPostList(filteredData)
  };

  useEffect(() => {
    getPostList();
  }, []);

  const deletePost = async(id) => {
    const postDoc = doc(db, "Food_Post", id)
    await deleteDoc(postDoc);
    setPostList((oldPostList) => oldPostList.filter((post) => post.id !== id));
  }

  const likePost = async(id) => {
    const postDoc = doc(db, "Food_Post", id)
    const posts = postList.map((post) =>
    post.id === id ? { ...post, likes: post.likes + 1 } : post);
    await updateDoc(postDoc, {likes: postList.find(post => post.id === id).likes + 1});
    setPostList(posts);
  }

  const onSubmitPost = async () => {
      try{
        const imageRef = ref(storage, `/food_post_images/${imageUpload.name + v4()}`);
        await uploadBytesResumable(imageRef, imageUpload);
        const imageURL = await getDownloadURL(imageRef)
        await addDoc(postCollectionRef, {
            title: newTitle, 
            text: newText, 
            image: imageURL,
            date: serverTimestamp(),
            veg: newVeg,
            likes: newLikes,
            comments: {}
         });
         getPostList();
      }catch(err){
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
      <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Card className="card" sx={{ maxWidth: 600, margin: 'auto', mt: 2 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant = "h3">Create New Post</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel >Title</InputLabel>
                <TextField fullWidth id="title" variant="standard" required placeholder="Title....." onChange={(e) => {setTitle(e.target.value)}}/>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel>Text</InputLabel>
                <TextField fullWidth id="subtitle" variant="standard" required placeholder="Text...." onChange={(e) => {setText(e.target.value)}}/>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel >Location</InputLabel>
                <TextField fullWidth id="subtitle" variant="standard" required/>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel >Dietary Restrictions</InputLabel>
                <TextField fullWidth id="restrictions" variant="standard" required/>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel>Choose Image</InputLabel>
                <input accept="image/*" style={{ display: 'none' }} id="raised-button-file" multiple type="file" onChange={(event) => {setImageUpload(event.target.files[0])}}></input>
                <label htmlFor="raised-button-file">
                  <Button variant="contained" component="span" sx={{color:"white"}}>Upload</Button>
                </label>
              </Grid>

              <Grid item xs ={6}>
                <Button variant = "contained" sx={{color:"white", marginTop:"2em"}} onClick={onSubmitPost}>Submit</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
      <div>
                {filteredPosts.map((post, index) => (
                    <div key={index}>
                        <h1>{post.title}</h1>
                        <img src={post.image} width="200" height="200"></img>
                        <p>{post.text}</p>
                        <button onClick={() => deletePost(post.id)}>Delete Post</button>
                        <button onClick={() => likePost(post.id)}>Like</button>
                        <p>{post.likes}</p>
                    </div>
                ))}
            </div>
      </div>
    </>
    
  );
}
