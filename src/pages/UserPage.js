import * as React from 'react';
import "../components/Home.css";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Grid, Paper, Typography } from '@mui/material';
import Navbar from "../components/Navbar"

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

function NumPosts({numPosts})
{
  return(
    <div align="center">
     <Typography variant="h5">{numPosts}</Typography>
    <Typography variant="h5">Posts</Typography>
    </div>
  )
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
   return (
      <>
      <Navbar></Navbar>
      <div style={{ padding: 20 }}>

      <Grid container spacing={2} class = "center rowcontainer" >
         <Grid item xs={2}>
            <Typography variant="h6" align="left">
               <Name name="April Sun" />
            </Typography>
         </Grid>
         <Grid item xs={1} sx={{marginTop:"20px"}}>
         <NumPosts numPosts="2" />
        </Grid>
        <Grid item xs={1} sx={{marginTop:"20px"}}>
         <Followers followercount="0" />
        </Grid>
        <Grid item xs={1} sx={{marginTop:"20px"}}>
         <Following followingcount="0" />
        </Grid>
      </Grid>

      
      
      <Grid container spacing={2} class = "center rowcontainer">
         <Posts />
      </Grid>
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