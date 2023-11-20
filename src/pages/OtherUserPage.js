import * as React from 'react';
import "../components/Home.css";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useState, useEffect, useRef } from 'react'

function Name({name})
{
  return(
    <h1>{name}</h1>
  )
}

function Posts() {
  return (
     <>
        <ImageList sx={{ width: 900, height: 750 }} cols="3" >
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

function Followers({followercount})
{
  return(
    <>
    <h1>Followers:</h1>
    <h1>{followercount}</h1>
    </>
  )
}

function Following({followingcount})
{
  return(
    <>
    <h1>Following:</h1>
    <h1>{followingcount}</h1>
    </>
  )
}

function Follow()
{
  const [buttonText, setButtonText] = useState('Follow');
  const [bgColour, setBgColour] = useState("#FFFFFF");


  const handleClick = () => {
     setButtonText(buttonText === 'Follow' ? 'Unfollow' : 'Follow');
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

export default function OtherUserPage() {
   return (
     <>
     <Name name="April"/>
    <div class = "center rowcontainer">
      <Followers followercount="0"></Followers>
      &nbsp; &nbsp; &nbsp;
      <Following followingcount="0"></Following>
    </div>
    <div class = "center">
    <Follow></Follow>
    </div>
    <div class = "center">
     <Posts></Posts>
     </div>
     </>
   )
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
  },
  {
     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
     title: 'Cafe 1919',
     author: '5 Eggs',
  },
  {
     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
     title: 'Cafe 1919',
     author: '5 Eggs',
  },
  {
     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
     title: 'Cafe 1919',
     author: '5 Eggs',
  },
  {
     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
     title: 'Cafe 1919',
     author: '5 Eggs',
  },
  {
     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
     title: 'Cafe 1919',
     author: '5 Eggs',
  },
  {
     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
     title: 'Cafe 1919',
     author: '5 Eggs',
  },
  {
     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
     title: 'Cafe 1919',
     author: '5 Eggs',
  },
  {
     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
     title: 'Cafe 1919',
     author: '5 Eggs',
  },
  {
     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
     title: 'Cafe 1919',
     author: '5 Eggs',
  }
]