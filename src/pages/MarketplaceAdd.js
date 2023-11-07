import Navbar from "../components/Navbar"
import MarketPlacePosts from "../components/MarketPlacePosts"
import MarketplaceFilter from "../components/MarketplaceFilter"
import "../components/Card.css"
import {Grid, Button, Typography, Card, Box, Avatar, CardContent, TextField} from "@mui/material"

export default function MarketplaceAdd() {
    return (
    <>
        <Navbar />
        <Card className = "card">
        <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={1.5}>
            <Avatar
              src=""
              sx={{ width: 56, height: 56 }}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="subtitle1" noWrap>
             
            </Typography>
            <Typography variant="subtitle2" noWrap>
             
            </Typography>
          </Grid>
          <Grid item xs = {2}>
          <Box
            sx={{
              width: 70,
              height: 30,
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '4px'
            }}
          >
            <Typography variant="button" display="block" noWrap>
             
            </Typography>
          </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5"></Typography>
            <Typography variant="subtitle1" color="text.secondary">
                
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
                Time: 
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            </Typography>
            <Typography variant="body1">Price per Swipe: $</Typography>
            <Typography variant="body1">Contact: </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    </>
    )
}