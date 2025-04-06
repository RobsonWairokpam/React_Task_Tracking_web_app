import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  Divider,
  ListItem,
  ListItemText,
  List,
  Toolbar,
  AppBar,
  Drawer,
  useMediaQuery,
  Tooltip,
  ListItemButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


export interface NavProps {
  uploadbutton: boolean;
  window?: () => Window;
}

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar component="nav" sx={{ boxShadow: 'none' }}>
        <Toolbar
         
          style={{
            paddingLeft: 20,
            paddingRight: 0
          }}
        >
          <Box
            component={'div'}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexGrow: 1,
              alignItems: 'center'
            }}
          >
            <IconButton color="inherit" onClick={() => navigate('/')}>
                <Typography variant="h5">Task Tracking</Typography>
            </IconButton>
            
          </Box>

          <Box component={'span'} sx={{ minWidth: '4%' }} />
         
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;
