import * as React from 'react';
import {db} from '../Firebase.js'
import { updateDoc, doc, getDoc } from 'firebase/firestore'
import {useState, useEffect} from 'react'
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
import {getNameFromID, useDetermineUser} from './MarketPlaceFunctions.js';

export const LikeButton = ({id, user, setNumLikes, numLikes}) => {
   const [liked, setLiked] = useState(false);

   const handleLike = async () => {
      try {
         const postDoc = doc(db, 'Food_Post', id);
         const postDocSnapshot = await getDoc(postDoc); // Assuming you want to get the current state of the document

         const currentLikes = postDocSnapshot.data().likes;
         

         if(!currentLikes.includes(user))
         {
            const updatedLikes = [...postDocSnapshot.data().likes, user];
            await updateDoc(postDoc, { likes: updatedLikes });
            
            setLiked(!liked);
            setNumLikes(numLikes + 1);
         }
         else{
            alert("You already liked this post.")
         }

       
         
      } catch (error) {
         console.error('Error updating document:', error);
      }
   };

   return (
      <div style={{ width: "2rem" }}> 
         <Heart isActive={liked} onClick={() => handleLike()} animationScale={1} style={{ marginTop: '1rem' }} />
      </div>
   );
}


function CommentList({ comments }) {
   if (!Array.isArray(comments)) {
      return <div>No comments to display</div>;
  }
   return (
      <>
       {Array.isArray(comments) && comments.map((comment, index) => (
         <ListItem disableGutters key={index} >
            <ListItemText primary={comment} />
         </ListItem>
         ))}
      </>
        
   );
}

export const Post = ({post}) => {
   const [comment, setComment] = useState('');
   const [commentList, setCommentList] = useState({});
   const [numLikes, setNumLikes] = useState(post.likes.length);
   const [username, setUserName] = useState('');
   const  {user, userDocID} = useDetermineUser();

   useEffect(() => {
      const fetchComments = async () => {
        try {
          const postDocSnapshot = await getDoc(doc(db, 'Food_Post', post.id));
          console.log("postDocSnapshot: ", postDocSnapshot.data().comments);
          setCommentList(postDocSnapshot.data().comments || []);
          console.log("post id (for posts): ", post.uid);
          post.userName = (await getNameFromID(post.uid) || "anonymous");
          setUserName(post.userName);
          console.log("username (for posts): ", post.userName);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };
  
      fetchComments();
    }, []);

   const handleComment = async (event, id, userid) => {
      if (event.key === 'Enter') {
         try {
            const postDoc = doc(db, 'Food_Post', id);
            const postDocSnapshot = await getDoc(postDoc);
            const commenterName = (await getNameFromID(userid) || "anonymous");
            const updatedComments = [...postDocSnapshot.data().comments, commenterName + ": " + comment];
            await updateDoc(postDoc, { comments: updatedComments });
            setCommentList(updatedComments);
         } catch (error) {
         console.error('Error updating document:', error);
         }

         console.log('Comment submitted:', comment);
         setComment('');
      }
   };

   return(
      <>
      <Card className = "card" style = {{background:"white", width:"520px", padding: "1em" }}>
      <Typography variant = "h4">{"@" + username || "@anonymous"}</Typography>   
         <img src={post.image} height="500px" width="500px" /> <br />
         
         <div className="rowcontainer">
        
            <LikeButton id={post.id} user={userDocID} setNumLikes={setNumLikes} numLikes={numLikes}></LikeButton>
            &nbsp;
            <h3>{numLikes} likes</h3>
            </div>
           
         <Typography variant = "h3">{post.title}</Typography>
         <Typography variant = "h5">{post.text}</Typography>
         <div className='rowcontainer'>
            <Button variant="outlined" disableRipple={true} color="primary" size="small" startIcon={<LocationOnIcon />}>
            Location: {post.location}
            </Button>
            &nbsp;
            <Button variant="outlined" disableRipple={true} color="primary" size="small" startIcon={<LocalDiningIcon />}>
            Restrictions: {post.veg ? 'Vegetarian Dish' : null} {post.allergy ? 'Contains Peanuts' : null}
            </Button>
         </div>
         <Typography variant = "h5">Comments:</Typography>
         <TextField label="Add comment:" variant="standard"  value={comment} onChange={(e) => setComment(e.target.value)} onKeyDown={(e) => handleComment(e, post.id, userDocID)}/>
         <CommentList comments={commentList}></CommentList>
         <h5>{new Date(post.date.seconds*1000).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</h5>
         <br /><br />
      </Card>
      </>
)}

export default Post;
