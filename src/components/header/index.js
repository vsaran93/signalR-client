import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const token = localStorage.getItem('signalrAppKey');

  const getUserDetails = (token) => {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    axios.get('https://localhost:7193/api/user', headers).then(res => {
      setUserName(res.data.user.userName);
      const userObjString = JSON.stringify(res.data.user);
      localStorage.setItem('userDetails', userObjString);
    }).catch(e => {
      if (e && e.response && e.response.status === 401) {
        console.log('not coming...');
        localStorage.clear();
        navigate("/");
      }
      console.log('there is an error fetching user details', e.response)
    });
  }


  useEffect(() => {
    if (token) {
        getUserDetails(token);
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ChatApp
          </Typography>
          {userName ? <Button color="inherit">{userName}</Button> : <Button color="inherit">Login</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
