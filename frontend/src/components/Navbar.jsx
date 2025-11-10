import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    setMobileOpen(false);
    navigate('/login');
  };

  const handleNavigate = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const navButtonSx = {
    color: '#1f2937',
    fontWeight: 500,
    fontSize: '0.95rem',
    px: 2,
    py: 1,
    borderRadius: '8px',
    textTransform: 'none',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#f3f4f6',
      transform: 'translateY(-2px)',
    }
  };

  const mobileMenuItems = (
    <Box sx={{ width: 280, pt: 2 }}>
      <Box sx={{ px: 3, pb: 2, borderBottom: '1px solid #e5e7eb' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <StorefrontIcon sx={{ fontSize: 32, color: '#667eea' }} />
          <Typography variant="h6" fontWeight="bold" sx={{ color: '#1f2937' }}>
            MyStore
          </Typography>
        </Box>
      </Box>

      <List sx={{ px: 2, py: 2 }}>
        <ListItem disablePadding>
          <ListItemButton 
            component={RouterLink} 
            to="/products"
            onClick={() => setMobileOpen(false)}
            sx={{ borderRadius: '8px', mb: 1 }}
          >
            <ListItemText 
              primary="Products" 
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItemButton>
        </ListItem>

        {isLoggedIn ? (
          <>
            <Box sx={{ px: 2, py: 2, my: 2, backgroundColor: '#f9fafb', borderRadius: '8px' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Signed in as
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                {user.username}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user.role}
              </Typography>
            </Box>

            {user.role === 'SELLER' && (
              <ListItem disablePadding>
                <ListItemButton 
                  component={RouterLink} 
                  to="/seller/dashboard"
                  onClick={() => setMobileOpen(false)}
                  sx={{ borderRadius: '8px', mb: 1 }}
                >
                  <DashboardIcon sx={{ mr: 2, color: '#667eea' }} />
                  <ListItemText 
                    primary="Seller Dashboard" 
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItemButton>
              </ListItem>
            )}

            <ListItem disablePadding>
              <ListItemButton 
                onClick={handleLogout}
                sx={{ borderRadius: '8px', color: '#ef4444' }}
              >
                <LogoutIcon sx={{ mr: 2 }} />
                <ListItemText 
                  primary="Logout" 
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton 
                component={RouterLink} 
                to="/login"
                onClick={() => setMobileOpen(false)}
                sx={{ borderRadius: '8px', mb: 1 }}
              >
                <LoginIcon sx={{ mr: 2, color: '#667eea' }} />
                <ListItemText 
                  primary="Login" 
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton 
                component={RouterLink} 
                to="/signup"
                onClick={() => setMobileOpen(false)}
                sx={{ borderRadius: '8px' }}
              >
                <PersonAddIcon sx={{ mr: 2, color: '#10b981' }} />
                <ListItemText 
                  primary="Sign Up" 
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky"
        elevation={0}
        sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.98)', 
          backdropFilter: 'blur(10px)', 
          borderBottom: '1px solid #e5e7eb',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          {/* Logo */}
          <Box 
            component={RouterLink} 
            to="/" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              textDecoration: 'none', 
              color: 'inherit',
              gap: 1,
              mr: 4,
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              }
            }}
          >
            <Box 
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 4px 10px rgba(102, 126, 234, 0.3)',
              }}
            >
              <StorefrontIcon sx={{ color: 'white', fontSize: 24 }} />
            </Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                color: '#1f2937',
                fontSize: '1.25rem',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              MyStore
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Navigation */}
          {!isMobile ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/products"
                sx={navButtonSx}
              >
                Products
              </Button>

              {isLoggedIn ? (
                <>
                  {user.role === 'SELLER' && (
                    <Button 
                      color="inherit" 
                      component={RouterLink} 
                      to="/seller/dashboard"
                      startIcon={<DashboardIcon />}
                      sx={navButtonSx}
                    >
                      Dashboard
                    </Button>
                  )}

                  <IconButton
                    onClick={handleMenu}
                    sx={{ 
                      ml: 1,
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      }
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        width: 36, 
                        height: 36,
                        bgcolor: '#667eea',
                        fontSize: '1rem',
                        fontWeight: 600
                      }}
                    >
                      {user.username.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                      sx: {
                        mt: 1.5,
                        minWidth: 200,
                        borderRadius: '12px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      }
                    }}
                  >
                    <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #e5e7eb' }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Signed in as
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {user.username}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user.role}
                      </Typography>
                    </Box>
                    <MenuItem 
                      onClick={handleLogout}
                      sx={{ 
                        py: 1.5,
                        color: '#ef4444',
                        '&:hover': { backgroundColor: '#fef2f2' }
                      }}
                    >
                      <LogoutIcon sx={{ mr: 1.5, fontSize: 20 }} />
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button 
                    color="inherit" 
                    component={RouterLink} 
                    to="/login"
                    startIcon={<LoginIcon />}
                    sx={navButtonSx}
                  >
                    Login
                  </Button>
                  <Button 
                    component={RouterLink} 
                    to="/signup"
                    variant="contained"
                    startIcon={<PersonAddIcon />}
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      fontWeight: 600,
                      px: 3,
                      py: 1,
                      borderRadius: '8px',
                      textTransform: 'none',
                      boxShadow: '0 4px 10px rgba(102, 126, 234, 0.3)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 15px rgba(102, 126, 234, 0.4)',
                      }
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}

              {/* Cart Icon */}
              <IconButton 
                color="inherit" 
                component={RouterLink} 
                to="/cart"
                sx={{ 
                  ml: 1,
                  color: '#1f2937',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    backgroundColor: '#f3f4f6',
                  }
                }}
              >
                <Badge 
                  badgeContent={itemCount} 
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#ef4444',
                      color: 'white',
                      fontWeight: 600
                    }
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Box>
          ) : (
            // Mobile Navigation
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton 
                color="inherit" 
                component={RouterLink} 
                to="/cart"
                sx={{ color: '#1f2937' }}
              >
                <Badge 
                  badgeContent={itemCount} 
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#ef4444',
                      color: 'white',
                      fontWeight: 600
                    }
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              <IconButton
                color="inherit"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ color: '#1f2937' }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            borderTopLeftRadius: '20px',
            borderBottomLeftRadius: '20px',
          }
        }}
      >
        {mobileMenuItems}
      </Drawer>
    </>
  );
}

export default Navbar;