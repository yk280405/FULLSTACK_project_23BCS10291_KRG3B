import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx'; // 1. Import the Footer
import { Container, Box } from '@mui/material'; 

function App() {
  return (
    // Use Box with flex settings to make the footer stick to the bottom
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      
      {/* We must remove the <Container> from here so the 
        full-width red hero page works correctly.
        We will add <Container> to each page individually (like CartPage)
        but NOT to HomePage.
      */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet /> {/* Renders the current page */}
      </Box>

      <Footer /> {/* 2. Add the Footer here */}
    </Box>
  );
}
export default App;