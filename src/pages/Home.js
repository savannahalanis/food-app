import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Navbar from "../components/Navbar";
import { useState, useEffect, useRef } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "axios";
import "../components/Home.css";
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

//code from https://javascript.works-hub.com/learn/building-a-modular-infinite-scroll-252dd
let page = 1;
const fetchData = (setItems, items) => {
   axios
      .get(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`) //fake API
      .then((res) => {
         setItems([...items, ...res.data]); //adding what fetched to array
         page = page + 1;
      });
};

function Posts() {
   const [items, setItems] = useState([]);

   React.useEffect(() => {
      fetchData(setItems, items)
   }, [])
   return (
      <InfiniteScroll
         dataLength={items.length}
         next={() => {
            fetchData(setItems, items);
         }}
         hasMore={true}
         loader={<h4>Loading...</h4>}
         endMessage={
            <p style={{ textAlign: "center" }}>
               <b>Yay! You have seen it all</b>
            </p>
         }
      >
         <div style={{ minHeight: "100vh" }}>
            {items.map((user) => (
               <>
                  <img src={user.url} height="650px" width="650px" /> {/*where the images are displayed*/}
                  <h1>omg i love food so much</h1>
               </>
            ))}
         </div>
      </InfiniteScroll>
   );
}

function SearchBar() {
   return (
      <Box
         component="form"
         sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
         }}
         noValidate
         autoComplete="off"
      >
         <TextField id="outlined-basic" label="Search friends and food!" variant="outlined" inputProps={{ style: { fontSize: 25 } }} />
      </Box>
   );
}

function Toggle() {
   const [buttonText, setButtonText] = useState('Posts From Friends');
   const [bgColour, setBgColour] = useState("#FFFFFF");


   const handleClick = () => {
      setButtonText(buttonText === 'Posts From Friends' ? ' Posts From Everyone' : 'Posts From Friends');
   };

   return (
      <div>
         <button onClick={handleClick} style={{
            color: "#2D68C4", backgroundColor: `${bgColour}`,
            width: "250px", height: "60px", fontSize: "20px", borderRadius: "5px", border: "solid gray"
         }}
            onMouseEnter={() => setBgColour("#ADD8E6")}
            onMouseLeave={() => setBgColour("#FFFFFF")}
         >
            {buttonText}
         </button>
      </div>
   );
}

function Reviews() {
   return (
      <>
         <ImageList sx={{ width: 300, height: 750 }} cols="1" >
            {itemData.map((item) => (
               <ImageListItem key={item.img}>
                  <img
                     srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                     src={`${item.img}?w=248&fit=crop&auto=format`}
                     alt={item.title}
                     loading="lazy"
                  />
                  <ImageListItemBar
                     title={item.title}
                     subtitle={item.author}
                     position="below"
                  />
               </ImageListItem>
            ))}
         </ImageList></>
   );
}

const itemData = [ //temporary data for reviews
   {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'De Neve',
      author: '5 Eggs',
   },
   {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Bplate',
      author: '5 Eggs',
   },
   {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Truck 1',
      author: '5 Eggs',
   },
   {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Truck 2',
      author: '5 Eggs',
   },
   {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Cafe 1919',
      author: '5 Eggs',
   }
]

function PostButton() {
   const [bgColour, setBgColour] = useState("#FFFFFF");

   return (
      <div>
         <button style={{
            color: "#2D68C4", backgroundColor: `${bgColour}`,
            width: "250px", height: "60px", fontSize: "20px", borderRadius: "5px", border: "solid gray"
         }}
            onMouseEnter={() => setBgColour("#ADD8E6")}
            onMouseLeave={() => setBgColour("#FFFFFF")}
         >
            New Post
         </button>
      </div>
   );
}

export default function HomePage() {
   return (
      <>
         <Navbar></Navbar>

         <div class="row">
            <div class="column left">
               <SearchBar></SearchBar>
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
            <div class="column right">
               <Reviews></Reviews>
            </div>
         </div>
      </>
   )
}