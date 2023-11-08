import Navbar from "../components/Navbar";
import { Card, CardContent, Grid, TextField, Typography, InputLabel, Button } from "@mui/material";
import "../components/Card.css"; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
export default function MarketplaceAdd() {
  return (
    <>
      <Navbar />
      <div style={{ position: 'relative', width: '100%' }}>
        <Button 
          variant="contained" 
          startIcon={<ArrowBackIcon />} 
          sx={{ position: 'absolute', top: "1.5em", left: "1.5em", color: "white" }}
        >
          Back
        </Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Card className="card" sx={{ maxWidth: 600, margin: 'auto', mt: 2 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant = "h3">Add New Posting</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel >Restaurant</InputLabel>
                <TextField
                  fullWidth
                  id="restaurant"
                  variant="standard"
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel >Price per Swipe</InputLabel>
                <TextField
                  fullWidth
                  id="price"
                  variant="standard"
                  required
                  InputProps={{
                    startAdornment: <Typography>$</Typography>
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel >Title</InputLabel>
                <TextField
                  fullWidth
                  id="title"
                  variant="standard"
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel >Additional Text</InputLabel>
                <TextField
                  fullWidth
                  id="additional-text"
                  variant="standard"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel >Time</InputLabel>
                <TextField
                  fullWidth
                  id="time"
                  variant="standard"
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel >Contact Information</InputLabel>
                <TextField
                  fullWidth
                  id="contact"
                  variant="standard"
                  required
                />
              </Grid>
              <Grid item xs ={6}>
                <Button variant = "contained" sx={{color:"white"}}>Submit</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
