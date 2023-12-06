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

export const LikeButton = ({id}) => {
   const [liked, setLiked] = useState(false);

   const handleLike = async () => {
      try {
         const postDoc = doc(db, 'Food_Post', id);
         const postDocSnapshot = await getDoc(postDoc); // Assuming you want to get the current state of the document

         const currentLikes = postDocSnapshot.data().likes;

         if(!currentLikes.includes('F45'))
         {
            const updatedLikes = [...postDocSnapshot.data().likes, 'F45'];
            await updateDoc(postDoc, { likes: updatedLikes });
            alert("User Liked Post!");
            setLiked(!liked);
         }else{
            alert("User Already Liked Post");
         }
         
      } catch (error) {
         console.error('Error updating document:', error);
      }
   };

   return (
      <div style={{ width: "2rem" }}> {/*TODO: update like count ONCE onclick}*/}
         <Heart isActive={liked} onClick={() => handleLike()} animationScale={1} style={{ marginTop: '1rem' }} />
      </div>
   );
}


function CommentList({comments}) {
   return (
         <ListItem disableGutters>
            {Array.isArray(comments) && comments.map((comment, index) => (
               <ListItemText primary={comment}/>
            ))}
         </ListItem>
   );
}

export const Post = ({post}) => {
   const [comment, setComment] = useState('');
   const [commentList, setCommentList] = useState([]);

   useEffect(() => {
      const fetchComments = async () => {
        try {
          const postDocSnapshot = await getDoc(doc(db, 'Food_Post', post.id));
          setCommentList(postDocSnapshot.data().comments || []);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };
  
      fetchComments();
    }, [post.id]);

   const handleComment = async (event, id) => {
      if (event.key === 'Enter') {
         try {
         const postDoc = doc(db, 'Food_Post', id);
         const postDocSnapshot = await getDoc(postDoc);
         const updatedComments = [...postDocSnapshot.data().comments, comment];
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
         <h1>username: {post.uid}</h1><br /> {/*TODO: pass in value*/}
         <Typography variant = "h3"><Link style={{color: "inherit"}}>username</Link></Typography> <br /> {/*TODO: pass in value*/}
         <img src={post.image} height="500px" width="500px" /> <br />
         <div className="rowcontainer">
            <LikeButton id={post.id}></LikeButton>
            &nbsp;
            <h3>{post.likes.length} likes</h3>
            </div>
         <Typography variant = "h3">{post.title}</Typography>
         <Typography variant = "h5">{post.text}</Typography>
         <div className='rowcontainer'>
            <Button variant="outlined" disableRipple={true} color="primary" size="small" startIcon={<LocationOnIcon />}>
            Location: {post.location}
            </Button>
            &nbsp;
            <Button variant="outlined" disableRipple={true} color="primary" size="small" startIcon={<LocalDiningIcon />}>
            Restrictions: {/*TODO: pass in value*/}
            </Button>
         </div>
         <Typography variant = "h5">Comments:</Typography>
         <TextField label="Add comment:" variant="standard"  value={comment} onChange={(e) => setComment(e.target.value)} onKeyDown={(e) => handleComment(e, post.id)}/>
         <CommentList comments={commentList}></CommentList>
         <h5>{new Date(post.date.seconds*1000).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</h5>
         <br /><br />
      </Card>
      </>
)}

export default Post;
