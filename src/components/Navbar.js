import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ChewCLA
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Drawer open={isDrawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem>
            <ListItemText primary="Option 1" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Option 2" />
          </ListItem>
          {/* Add more options as needed */}
        </List>
      </Drawer>
    </div>
  );
}

export default Navbar;
