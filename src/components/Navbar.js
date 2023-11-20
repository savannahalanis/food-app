import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import "./Navbar.css";
import Logo from "../static/logo2.png"



function NavBar() {
  const [click, setClick] = useState(false);
  const [auth, setAuth] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <span className="icon">
              <img src = {Logo} className="icon"/>
            </span>
            { <Typography variant="h3" >ChewCLA</Typography> }
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/home"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/marketplace"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Marketplace
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/settings"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Settings
              </NavLink>
            </li>
           {
            auth ?  ( <Button 
            variant="contained" 
            sx={{color: "white", marginRight: '1rem',  border: '1px solid #2D68C4',
              '&:hover': {
                backgroundColor: '#5B97F4', 
                border: '1px solid #5B97F4'
              }
            }}
            onClick={() => setAuth(!auth)} 
            >
              Logout
            </Button> 
            ):(
              <Button 
              variant="contained" 
              sx={{color: "white", marginRight: '1rem',  border: '1px solid #2D68C4',
                '&:hover': {
                  backgroundColor: '#5B97F4', 
                  border: '1px solid #5B97F4'
                }
              }}
              onClick={() => setAuth(!auth)} 
              >
                Login
              </Button>
           )
           }
          
            
           
          </ul>
          
        </div>
      </nav>
    </>
  );
}

export default NavBar;