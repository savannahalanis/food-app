import * as React from 'react';
import {db} from '../Firebase.js'
import {collection, getDocs, updateDoc, doc, getDoc, where, query, deleteDoc} from 'firebase/firestore'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Navbar from "../components/Navbar";
import { useState, useEffect, useRef } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import "../components/Home.css";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from 'react-router-dom';
import Post from '../components/Post.js'
import EggIcon from '@mui/icons-material/Egg';
import EggAltIcon from '@mui/icons-material/EggAlt';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {FieldValue} from "firebase/firestore";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Check } from '@mui/icons-material';




//code adapted from https://javascript.works-hub.com/learn/building-a-modular-infinite-scroll-252dd
let page = 1;
export const fetchData = async (setPosts, posts) => {
   /*axios
      .get(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`) //fake API. basically, there are user objects with an albumId, id, title, url, thumbnailurl.
      .then((res) => {
         setItems([...items, ...res.data]); //adding what fetched to array
         page = page + 1;
      });*/
      const postCollectionRef = collection(db, "Food_Post")
      const data = await getDocs(postCollectionRef);
      const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setPosts(filteredData);
      return posts;
};


function Posts() {
   const [posts, setPosts] = useState([]);

   const deletePost = async(id) => {
      const postDoc = doc(db, "Food_Post", id)
      await deleteDoc(postDoc);
      setPosts((oldPostList) => oldPostList.filter((post) => post.id !== id));
   }

   React.useEffect(() => {
      fetchData(setPosts, posts)
   }, [])
   return (
      <InfiniteScroll
         dataLength={posts.length}
         next={() => {
            fetchData(setPosts, posts);
         }}
         hasMore={true}
         loader={<h4>Loading More...</h4>}
         endMessage={
            <p style={{ textAlign: "center" }}>
               <b>end</b>
            </p>
         }
      >
         <div style={{ minHeight: "100vh" }}>
            {posts.map((user) => (
               <>
               <Button onClick={() => deletePost(user.id)}>Delete Post</Button>
                  <Post post={user}></Post>
                  
               </>
            ))}
         </div>
      </InfiniteScroll>
   );
}

const addFollowing = async (user_id, following) => {
   const followingId = following.id;
 
   console.log('Following:' + following.uid);
   console.log('User:' + user_id);

   const userQuery = query(collection(db, "Users"), where("uid", "==", user_id));
   const userQuerySnapshot = await getDocs(userQuery);

   if (!userQuerySnapshot.empty) {
     const userDoc = doc(db, "Users", userQuerySnapshot.docs[0].id);
     const userSnapshot = await getDoc(userDoc);
     const userData = userSnapshot.data();

     if (!userData.following || !userData.following.includes(followingId)) {
       const updatedFollowingArray = [...(userData.following || []), followingId];
       await updateDoc(userDoc, { following: updatedFollowingArray });

       const followingQuerySnapshot = await getDocs(query(collection(db, "Users"), where("uid", "==", following.uid)));
       const followingDoc = doc(db, "Users", followingQuerySnapshot.docs[0].id);
       const followingSnapshot = await getDoc(followingDoc);
       const followingData = followingSnapshot.data();
       const updatedFollowersArray = [...(followingData.followers || []), user_id];
       await updateDoc(followingDoc, { followers: updatedFollowersArray });

     } else {
       console.log("FollowingId already exists in following array");
     }
   } else {
     console.log("User document not found");
   }
 };

function SearchBar(props) {
   const [searchQuery, setSearchQuery] = useState('');
   const [searchInput, setSearchInput] = useState('');
   const [userList, setUserList] = useState([]);
   const [condition, setCondition] = useState(false);
   const [findFollowing, setFindFollowing] = useState(false);
   const userCollectionRef = collection(db, "Users")
   const { user } = props;
   console.log("User: ");
   console.log(user);
   const handleChange = (event) => {
      setFindFollowing(event.target.checked);
    };

   const getUserList = async () => {
      const data = await getDocs(userCollectionRef);
      const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setUserList(filteredData)
  };


   //getUserList();
   const filteredUsers = userList.filter(user =>
      user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
   );

 
   return (
     <Box
       component="form"
       sx={{
         '& > :not(style)': { m: 1, width: '25ch' },
       }}
       noValidate
       autoComplete="off"
     >
      
     
       <TextField
         id="outlined-basic"
         label="Search friends!"
         variant="outlined"
         inputProps={{ style: { fontSize: 25 } }}
         value={searchInput}
         onChange={(e) => setSearchInput(e.target.value)}
       />
       
       <FormControlLabel
         control={
            <Checkbox
               checked={findFollowing}
               onChange={handleChange}
               color="primary"
            />
         }
         label="Filter friends only"
         labelPlacement="end"
         />
       <Button onClick={() => getUserList(searchQuery)} variant="contained" sx={{color:"white"}}>Search</Button>

      {condition && searchQuery && (
        <div>
          {filteredUsers.map((curr_user, index) => (
                <div key={index}>
                    {curr_user.uid !== user.uid && (                        
                         <Button onClick={() => addFollowing(user.uid, curr_user)}>{curr_user.displayName}</Button>                  
                    )}
                </div>
            ))}
        </div>
                    )}
     </Box>
   );
 }
 
 

function Toggle() { {/*TODO: reshow posts onclick*/}
   const [buttonText, setButtonText] = useState('Posts From Friends');
   const [bgColour, setBgColour] = useState("#FFFFFF");


   const handleClick = () => {
      setButtonText(buttonText === 'Posts From Friends' ? ' Posts From Everyone' : 'Posts From Friends');
   };

   return (
      <div>
         <button onClick={handleClick} style={{
            color: "#2D68C4", backgroundColor: `${bgColour}`,
            width: "250px", height: "60px", fontSize: "20px", border: "3px solid #2D68C4", borderRadius: "10px"
         }}
            onMouseEnter={() => setBgColour("#ADD8E6")}
            onMouseLeave={() => setBgColour("#FFFFFF")}
         >
            {buttonText}
         </button>
      </div>
   );
}

const StyledRating = styled(Rating)({
   '& .MuiRating-iconFilled': {
     color: '#808080',
   },
   '& .MuiRating-iconHover': {
     color: '#FFCC5F',
   },
 });

//use update to update
function Reviews() {
   const [reviews, setReviews] = useState([]);

   const[average, setAverage] = useState(0)
   //item.avg.toString()

   useEffect(() => {

      const fetchData = async () => {
         try {
            const postCollectionRef = collection(db, "Ratings");
            const data = await getDocs(postCollectionRef);
            return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
         } catch (err) {
         }
      };

      fetchData().then((filteredData) => {
         setReviews(filteredData);

      });
   }, []);

   const updateRating = async (newRating, name) => {
      if (newRating != null) {
         const v = name
         const oldArr = reviews[v].arr
         const newArr = oldArr
         newArr.push(newRating)
         reviews[v].arr = newArr
         console.log(reviews[v].arr)
         reviews[v].avg = (reviews[v].arr.reduce((a, b) => a + b, 0)) / reviews[v].arr.length
         setAverage(reviews[v].avg)
      }
   }

   return (
      <>
         <ImageList sx={{ width: 250, height: 750 }} cols="1" >
            {reviews.map((item) => (
               <ImageListItem key={item.img}>
                  <img 
                     srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                     src={`${item.img}?w=248&fit=crop&auto=format`}
                     loading="lazy"
                  />
                  <ImageListItemBar
                     title={item.title}
                     subtitle={"eggs: " + Math.trunc(item.avg * 10) / 10}
                     position="top"
                  />
                  <div class = "right">
                  <StyledRating
                     name="customized-color"
                     defaultValue={5}
                     max = {5}
                     min = {0}
                     getLabelText={(value) => `${value} Egg${value !== 1 ? 's' : ''}`}
                     precision={1}
                     icon={<EggAltIcon fontSize="inherit" />}
                     emptyIcon={<EggIcon fontSize="inherit" />}
                     size = "large"
                     onChange={(event, newValue) => updateRating(newValue, item.name)}
                  /></div>
               </ImageListItem>
            ))}
         </ImageList></>
   );
}

function PostButton() {
   const [bgColour, setBgColour] = useState("#FFFFFF");

   return (
      <div>
         <Link to="/homeadd">

            <button style={{
               color: "#2D68C4", backgroundColor: `${bgColour}`, marginTop:"10px",
               width: "250px", height: "60px", fontSize: "20px", border: "3px solid #2D68C4", borderRadius: "10px"
            }}
               onMouseEnter={() => setBgColour("#ADD8E6")}
               onMouseLeave={() => setBgColour("#FFFFFF")}

            >
               +  New Post
            </button>
         </Link>
      </div>
   );
}

export default function HomePage(props) {  
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();


  onAuthStateChanged(auth, async(user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
      navigate('/');
    }
  });
  useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, (user) => {
     if (user) {
       setUser(user);
     } else {
       setUser(null);
       navigate('/');
     }
   });
   return () => unsubscribe();
 }, [auth, navigate]);
 

   return (
      <div>
         {user ? (
         <>
          
            <Navbar></Navbar>

            <div class="row" style ={{backgroundColor:"#FAF9F6"}}>
               <div class="column left">
                  <SearchBar user={user}></SearchBar>
                  <div class='leftmargin'>
                     <PostButton></PostButton>
                  </div>
               </div>
               <div class="column middle">
                  <div className='center'>
                     <div class='bottommargin topmargin'>
                        <Toggle></Toggle>
                     </div>
                  </div>
                  <div className='center'>
                     <Posts></Posts>
                  </div>
               </div>
               <div class="right">
                  <Reviews></Reviews>
               </div>
            </div>
         </>
         ) : (
            <></>
          )}
      </div>
   )
}