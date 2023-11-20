import React from 'react';
import {Box, Grid, Typography, Button} from '@mui/material';
import { Link } from 'react-router-dom';
import {useTheme} from '@mui/material/styles';
import Image from './static/background3.png';



function App() {
  const theme = useTheme();
  return (
    <>    
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        sx = {{backgroundImage: `url(${Image})`, backgroundSize: 'cover', }}
        //sx = {{ background: 'linear-gradient(90deg, rgba(236,205,218,1) 0%, rgba(238,174,200,1) 20%, rgba(168,184,226,1) 49%, rgba(148,187,233,1) 82%);'}}
      >

        <Grid container spacing={2}>
          <Grid item xs={4.5}>
            {/* <img src="" alt="Logo" style={{ maxWidth: '100%' }} /> */}
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h1" style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
              ChewCLA
            </Typography>
            <Typography variant="body1" align="center">
              <Link to="./test">
                <Button variant="contained" sx={{color: "white"}} >Login</Button>
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>

  );
}

export default App;
