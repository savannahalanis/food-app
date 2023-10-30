import React from 'react';
import {Box, Grid, Typography, Button} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';

function App() {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <img src="" alt="Logo" style={{ maxWidth: '100%' }} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h1" style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
            ChewCLA
          </Typography>
          <Typography variant="body1" align="center">
            <Button variant="contained" style={{color: "white"}}>Join Us</Button>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
