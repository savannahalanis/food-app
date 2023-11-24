import Navbar from "../components/Navbar";
import { Card, CardContent, Grid, TextField, Typography, InputLabel, Button } from "@mui/material";
import "../components/Card.css"; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import { Link } from "react-router-dom";

export default function HomeAdd() {

    const handleFileChange = (event) => {
        // Access the selected file with `event.target.files[0]`
        const file = event.target.files[0];
        console.log(file); // You can handle the file upload process here
    };
  return (
    <>
      <Navbar />
      <div style={{ position: 'relative', width: '100%' }}>
      <Link to ="/home">
        <Button 
          variant="contained" 
          startIcon={<ArrowBackIcon />} 
          sx={{ position: 'absolute', top: "1.5em", left: "1.5em", color: "white" }}
        >
         Back
        </Button>
        </Link>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Card className="card" sx={{ maxWidth: 600, margin: 'auto', mt: 2 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant = "h3">Create New Post</Typography>
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
                <InputLabel >Subtitle</InputLabel>
                <TextField
                  fullWidth
                  id="subtitle"
                  variant="standard"
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel >Choose Image</InputLabel>
                <input
                accept="image/*" 
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleFileChange}
             />
                <label htmlFor="raised-button-file">
                    <Button variant="contained" component="span" sx={{color:"white"}}>
                        Upload
                    </Button>
                </label>
              </Grid>

              <Grid item xs ={6}>
                <Button variant = "contained" sx={{color:"white", marginTop:"2em"}}>Submit</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
