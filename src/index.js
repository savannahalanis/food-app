import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NavTest from './pages/NavTest';
import Marketplace from './pages/Marketplace';
import MarketplaceAdd from './pages/MarketplaceAdd';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from './pages/Home'
import UserPage from './pages/UserPage';
import OtherUserPage from './pages/OtherUserPage';
import HomeAdd from './pages/HomePageAdd';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      light: '#3999f8',
      main: '#2D68C4',
      dark: '#2648a4',
      contrastText: '#000',
    },
    secondary: {
      light: '#f6cd4c',
      main: '#f44336',
      dark: '#f06800',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: [
      'InstagramSans',
      'serif',
    ].join(','),
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme = {theme} >
      <BrowserRouter>
        <Routes>
          <Route path = "/" element={<App />}/> 
          <Route path = "/signup" element={<Signup />}/>
          <Route path = "/login" element={<Login />}/>
          <Route path = "/test" element={<NavTest />}/>
          <Route path = "/marketplace" element={<Marketplace />}/>
          <Route path = "/marketplaceadd" element={<MarketplaceAdd />}/>
          <Route path = "/home" element={<Home  />}/>
          <Route path = "/homeadd" element={<HomeAdd />}/>
          <Route path = "/userpage" element={<UserPage />}/>
          <Route path = "/otheruserpage" element={<OtherUserPage />}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


