import * as React from 'react';
import {db} from '../Firebase.js'
import { updateDoc, doc } from 'firebase/firestore'
import {useState} from 'react'
import TextField from '@mui/material/TextField';
import Heart from "react-heart"
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import "./Card.css";
import { Card } from '@mui/material';

export const LikeButton = ({id}) => {
   const [postList, setPosts] = useState([])
   const [liked, setLiked] = useState(false)
   
   const handleLikeClick = async () => {
      const postDoc = doc(db, "Food_Post", id);
      const updatedPosts = postList.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      );
      try {
        await updateDoc(postDoc, { likes: postList.find((post) => post.id === id).likes + 1 });
        setPosts(updatedPosts);
      } catch (error) {
        console.error('Error updating document:', error);
      }
      setLiked(!liked);
   };

   return (
      <div style={{ width: "2rem" }}> {/*TODO: update like count ONCE onclick}*/}
         <Heart isActive={liked} onClick={() => handleLikeClick()} animationScale={1} style={{ marginTop: '1rem' }} />
      </div>
   );
}

function CommentList() {
   return (
      <List>
         <ListItem disableGutters>
             <ListItemText primary="Joe: omg i agree" /> {/*TODO: pass in value*/}
         </ListItem>
         <ListItem disableGutters>
            <ListItemText primary="Bob: a;idhf;aid askudhfaksjdhfasek hkfks" />
         </ListItem>
         <ListItem disableGutters>
            <ListItemText primary="Mary: YASSSSSSS" />
         </ListItem>
      </List>
   );
}

export const Post = ({user}) => {

   return(
      <>
      <Card className = "card" style = {{background:"white", width:"520px", padding: "1em" }}>
         <h1>username: {user.uid}</h1><br /> {/*TODO: pass in value*/}
         <Typography variant = "h3"><Link style={{color: "inherit"}}>username</Link></Typography> <br /> {/*TODO: pass in value*/}
         <img src={user.image} height="500px" width="500px" /> <br />
         <div className="rowcontainer">
            <LikeButton id={user.id}></LikeButton>
            &nbsp;
            <h3>{user.likes.length} likes</h3>
            </div>
         <Typography variant = "h3">{user.title}</Typography>
         <Typography variant = "h5">{user.text}</Typography>
         <div className='rowcontainer'>
            <Button variant="outlined" disableRipple={true} color="primary" size="small" startIcon={<LocationOnIcon />}>
            Location: {user.location}
            </Button>
            &nbsp;
            <Button variant="outlined" disableRipple={true} color="primary" size="small" startIcon={<LocalDiningIcon />}>
            Restrictions: {/*TODO: pass in value*/}
            </Button>
         </div>
         <Typography variant = "h5">Comments:</Typography>
         <TextField label="Add comment:" variant="standard" /> {/*TODO: render comment when press enter*/}
         <CommentList></CommentList>
         <h5>{new Date(user.date.seconds*1000).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</h5>
         <br /><br />
      </Card>
      </>
)}

export default Post;
