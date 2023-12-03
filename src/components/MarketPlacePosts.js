import {Card, Typography, Grid, Avatar, CardContent, Box} from  "@mui/material";
import "./Card.css";
import Image from '../static/background3.png'

const listing = 
    {
        id: 1,
        numSwipes: '',
        time: 'now',
        date: 'today',
        contact: 'plshelp@gmail.com',
        price: '2',
        userID: '',
        profileImage: '',
        username: 'testuser123',
        title: 'NEED SWIPES',
        subtitle: 'PLEASEE',
        type: 'selling'
    }
  

export default function MarketPlacePosts() {
    return(
        <div>
            <ul>
          {/*use map function here to map information onto posts */}
                <Post listing = {listing}/>
                <Post listing = {listing}/>
                <Post listing = {listing}/>
                <Post listing = {listing}/>
            </ul>
        </div>
    )
}

function Post ({listing}) {
    return (
        <>
    <Card className = "card">
    <CardContent>
        <Grid container spacing={2} alignItems="center">
         
          <Grid item xs={8}>
            <Typography variant="subtitle1" noWrap>
              {listing.username}
            </Typography>
            <Typography variant="subtitle2" noWrap>
              {listing.restaurant}
            </Typography>
          </Grid>
          <Grid item xs = {2}>
          <Box
            sx={{
              width: 80,
              height: 40,
              backgroundColor: listing.type === 'buying' ? 'green' : '#2D68C4',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '4px'
            }}
          >
            <Typography variant="button" display="block" noWrap>
              {listing.type === 'buying' ? 'Buying' : 'Selling'}
            </Typography>
          </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">{listing.title}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
                {listing.subtitle}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Time: {listing.time}</Typography>
            <Typography variant="body1">Date: {listing.date}</Typography>
            <Typography variant="body1">Price per Swipe: ${listing.price}</Typography>
            <Typography variant="body1">Contact: {listing.contact}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
        </>
    )
}