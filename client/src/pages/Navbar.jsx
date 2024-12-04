import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery, Menu, MenuItem, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token'); // Check login status
  const isMobileOrTablet = useMediaQuery((theme) => theme.breakpoints.down('sm')); // Detect screen size

  const [anchorEl, setAnchorEl] = useState(null); // State for mobile menu anchor

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); // Open menu on click
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close menu when a menu item is clicked
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2', mb: 2 }}>
      <Toolbar>
       

        {isMobileOrTablet ? (
          <>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
             
              <MenuItem onClick={handleMenuClose}>
                <Link to="/todos" style={{ color: 'black', textDecoration: 'none' }}>
                  Todos
                </Link>
              </MenuItem>
              {!isLoggedIn ? (
                <>
                  <MenuItem onClick={handleMenuClose}>
                    <Link to="/login" style={{ color: 'black', textDecoration: 'none' }}>
                      Login
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <Link to="/register" style={{ color: 'black', textDecoration: 'none' }}>
                      Register
                    </Link>
                  </MenuItem>
                </>
              ) : (
                <MenuItem onClick={() => { handleMenuClose(); handleLogout(); }}>
                  Logout
                </MenuItem>
              )}
            </Menu>
          </>
        ) : (
          // Desktop view (non-mobile/tablet)
          <Box>
        
            <Button color="inherit">
              <Link to="/todos" style={{ color: 'white', textDecoration: 'none' }}>
                Todos
              </Link>
            </Button>
            {!isLoggedIn ? (
              <>
                <Button color="inherit">
                  <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
                    Login
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>
                    Register
                  </Link>
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
