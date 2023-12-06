import * as React from 'react';
import "../components/Home.css";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Grid, Paper, Typography } from '@mui/material';
import Navbar from "../components/Navbar"
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
 import { db } from '../Firebase.js'
import { getDocs, collection, updateDoc, doc, getDoc, where, query,deleteDoc } from 'firebase/firestore';
import { Button } from '@mui/material';



function Name({name})
{
  return(
    <h1>{name}</h1>
  )
}

function Posts({user, numPosts, setNumPosts}) {
   const [posts, setPosts] = useState([]);

   useEffect(() => {
     
      const fetchData = async () => {
         try {
            const postCollectionRef = collection(db, "Food_Post");
            const data = await getDocs(postCollectionRef);
            return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
         } catch (err) {
         }
      };

      fetchData().then((filteredData) => {
         setPosts(filteredData);
         setNumPosts(filteredData.length);
      });
   }, [setNumPosts]);

   const deletePost = async(id) => {
    const postDoc = doc(db, "Food_Post", id)
    await deleteDoc(postDoc);
    setPosts((oldPostList) => oldPostList.filter((post) => post.id !== id));
 }


   return (
      <>
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {posts.map((item) => (
         <ImageListItem key={item.image}>
         <img
            srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
         />
          <ImageListItemBar
                    title={item.title}
                    
                    position="below"
                 />
            <Button onClick={() => deletePost(user.id)} sx={{align:"left"}}>Delete Post</Button>
         </ImageListItem>
        
      
      ))
      
      }
      </ImageList>
      </>
   );
}

function NumPosts({ numPosts}) {

  return (
    <div align="center">
      <Typography variant="h5">{numPosts}</Typography>
      <Typography variant="h5">Posts</Typography>
    </div>
  );
}


function Followers({followercount})
{
  return(
   <div align="center">
   <Typography variant="h5">{followercount}</Typography>
  <Typography variant="h5">Followers</Typography>
  </div>
  )
}

function Following({followingcount})
{
  return(
   <div align="center">
   <Typography variant="h5">{followingcount}</Typography>
  <Typography variant="h5">Following</Typography>
  </div>
  )
}



export default function UserPage() {
   const location = useLocation();
  const { state } = location;
  const [numPosts, setNumPosts] = useState(0);
  // const { user } = state || {};
  // const parsedUser = user ? JSON.parse(user) : null;
  const [user, setUser] = useState(null);
  const userCollection = collection(db, "Users")
  const auth = getAuth();
  const [userData, setUserData] = useState(null);


  onAuthStateChanged(auth, async(user) => {
    if (user) {
      setUser(user);
      const userQuery = query(collection(db, "Users"), where("uid", "==", user.uid));
      const userQuerySnapshot = await getDocs(userQuery);

      const userDoc = doc(db, "Users", userQuerySnapshot.docs[0].id);
      const userSnapshot = await getDoc(userDoc);
      setUserData(userSnapshot.data());
      
    } else {
      setUser(null);
    }
  });
  //console.log(user);

  useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, (user) => {
     if (user) {
       setUser(user);
     } else {
       setUser(null);
     }
     console.log("what's up")
   });
 
   // Cleanup the subscription when the component unmounts
   return () => unsubscribe();
 }, [auth]);
 

   return (
      <>
      <Navbar></Navbar>
      <div style={{ padding: 20 }}>

      <Grid container spacing={2} className = "center rowcontainer" >
         <Grid item xs={2}>
            <Typography variant="h6" align="left">
               <Name name={user?.displayName || 'Unknown User'} />
            </Typography>
         </Grid>
         <Grid item xs={1} sx={{marginTop:"20px"}}>
         <NumPosts numPosts={numPosts}/>
        </Grid>
        <Grid item xs={1} sx={{marginTop:"20px"}}>
         <Followers followercount={userData?.followers?.length || 0} />
        </Grid>
        <Grid item xs={1} sx={{marginTop:"20px"}}>
         <Following followingcount={userData?.following?.length || 0} />
        </Grid>
      </Grid>

      
      
      <Grid container spacing={2} class = "center rowcontainer">
         <Posts user={user} numPosts={numPosts} setNumPosts={setNumPosts}/>
      </Grid>
  
    </div>
    </>
   )
}