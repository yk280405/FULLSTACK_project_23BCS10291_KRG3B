import React from 'react';
import { Container, Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import StoreIcon from '@mui/icons-material/Store';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import GroupsIcon from '@mui/icons-material/Groups';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function AboutUsPage() {
  const features = [
    {
      icon: <ShoppingBagIcon sx={{ fontSize: 48, color: '#667eea' }} />,
      title: 'Wide Selection',
      description: 'Thousands of products from verified sellers across India'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 48, color: '#10b981' }} />,
      title: 'Secure Shopping',
      description: 'Bank-level encryption and secure payment processing'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 48, color: '#f59e0b' }} />,
      title: 'Fast Delivery',
      description: 'Quick dispatch and reliable shipping partners'
    },
    {
      icon: <PaymentIcon sx={{ fontSize: 48, color: '#8b5cf6' }} />,
      title: 'Easy Payments',
      description: 'Multiple payment options for your convenience'
    },
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Browse Products',
      description: 'Explore our extensive catalog and find products you love from various shops',
      icon: <ShoppingBagIcon sx={{ fontSize: 40, color: '#667eea' }} />
    },
    {
      step: '02',
      title: 'Add to Cart',
      description: 'Select your favorite items and add them to your shopping cart',
      icon: <LocalShippingIcon sx={{ fontSize: 40, color: '#10b981' }} />
    },
    {
      step: '03',
      title: 'Secure Checkout',
      description: 'Complete your purchase with our safe and easy checkout process',
      icon: <PaymentIcon sx={{ fontSize: 40, color: '#f59e0b' }} />
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Box 
        sx={{ 
          width: '100%',
          minHeight: '70vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          paddingTop: { xs: '100px', md: '120px' },
          paddingBottom: { xs: '60px', md: '80px' },
        }}
      >
        {/* Animated background elements */}
        <Box 
          sx={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            top: '-200px',
            right: '-150px',
            animation: 'float 20s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
              '50%': { transform: 'translateY(50px) rotate(180deg)' }
            }
          }}
        />

        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <Typography 
              component="h1" 
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                fontWeight: 800,
                mb: 3,
                lineHeight: 1.2,
                background: 'linear-gradient(to right, #fff, #e0e7ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              How MyStore Works
            </Typography>
            
            <Typography 
              variant="h5" 
              sx={{ 
                maxWidth: '800px',
                mx: 'auto',
                mb: 4,
                fontWeight: 300,
                opacity: 0.95,
                lineHeight: 1.6,
                fontSize: { xs: '1.1rem', md: '1.4rem' }
              }}
            >
              Your trusted marketplace connecting quality sellers with smart shoppers across India
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mt: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" fontWeight="bold">50K+</Typography>
                <Typography variant="body1" sx={{ opacity: 0.8 }}>Happy Customers</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" fontWeight="bold">5K+</Typography>
                <Typography variant="body1" sx={{ opacity: 0.8 }}>Verified Sellers</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" fontWeight="bold">100K+</Typography>
                <Typography variant="body1" sx={{ opacity: 0.8 }}>Products Listed</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#f9fafb' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h3" 
              fontWeight="bold" 
              sx={{ 
                mb: 2,
                color: '#1f2937',
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              Simple Steps to Shop
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#6b7280',
                fontWeight: 400,
              }}
            >
              Shopping made easy in just three steps
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {howItWorks.map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    borderRadius: '20px',
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    position: 'relative',
                    overflow: 'visible',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                    }
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -20,
                      left: 30,
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '1.5rem',
                      color: 'white',
                      boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                    }}
                  >
                    {item.step}
                  </Box>
                  <CardContent sx={{ pt: 6, pb: 4, px: 3 }}>
                    <Box sx={{ mb: 2 }}>
                      {item.icon}
                    </Box>
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: '#1f2937' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#6b7280', lineHeight: 1.7 }}>
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* For Customers & Sellers Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'white' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* For Customers */}
            <Grid item xs={12} md={6}>
              <Card 
                sx={{ 
                  height: '100%',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  p: 4,
                  boxShadow: '0 20px 60px rgba(102, 126, 234, 0.3)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  }
                }}
              >
                <Box sx={{ mb: 3 }}>
                  <ShoppingBagIcon sx={{ fontSize: 60, opacity: 0.9 }} />
                </Box>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
                  For Customers
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, opacity: 0.95 }}>
                  Browse our extensive catalog of products from various shops. Filter by product name or shop name to find exactly what you're looking for. Add products to your cart and check out securely with multiple payment options.
                </Typography>
                <Button
                  component={RouterLink}
                  to="/products"
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    backgroundColor: 'white',
                    color: '#667eea',
                    fontWeight: 600,
                    py: 1.5,
                    px: 3,
                    borderRadius: '50px',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#f9fafb',
                      transform: 'translateX(5px)',
                    }
                  }}
                >
                  Start Shopping
                </Button>
              </Card>
            </Grid>

            {/* For Sellers */}
            <Grid item xs={12} md={6}>
              <Card 
                sx={{ 
                  height: '100%',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  p: 4,
                  boxShadow: '0 20px 60px rgba(16, 185, 129, 0.3)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  }
                }}
              >
                <Box sx={{ mb: 3 }}>
                  <StoreIcon sx={{ fontSize: 60, opacity: 0.9 }} />
                </Box>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
                  For Sellers
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, opacity: 0.95 }}>
                  Sign up as a seller and create your own shop. List your products in minutes, set your own prices, and manage your inventory easily. We provide the platform so you can focus on what you do best: creating and selling.
                </Typography>
                <Button
                  component={RouterLink}
                  to="/signup"
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    backgroundColor: 'white',
                    color: '#10b981',
                    fontWeight: 600,
                    py: 1.5,
                    px: 3,
                    borderRadius: '50px',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#f9fafb',
                      transform: 'translateX(5px)',
                    }
                  }}
                >
                  Become a Seller
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#f9fafb' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h3" 
              fontWeight="bold" 
              sx={{ 
                mb: 2,
                color: '#1f2937',
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              Why Choose MyStore?
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, color: '#1f2937' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6b7280', lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box 
        sx={{ 
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
          color: 'white'
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h3" 
              fontWeight="bold" 
              sx={{ 
                mb: 3,
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              Ready to Get Started?
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 4,
                fontWeight: 300,
                opacity: 0.9,
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}
            >
              Join thousands of happy customers and successful sellers on MyStore today
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button 
                component={RouterLink}
                to="/products"
                variant="contained" 
                size="large"
                sx={{ 
                  backgroundColor: 'white',
                  color: '#1e3a8a',
                  fontWeight: 600,
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  borderRadius: '50px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s ease',
                  textTransform: 'none',
                  '&:hover': { 
                    backgroundColor: '#f8f9fa',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
                  },
                }}
                endIcon={<ArrowForwardIcon />}
              >
                Browse Products
              </Button>
              <Button 
                component={RouterLink}
                to="/signup"
                variant="outlined"
                size="large"
                sx={{ 
                  color: 'white',
                  borderColor: 'white',
                  fontWeight: 600,
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  borderRadius: '50px',
                  borderWidth: '2px',
                  transition: 'all 0.3s ease',
                  textTransform: 'none',
                  '&:hover': { 
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderWidth: '2px',
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                Create Account
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default AboutUsPage;