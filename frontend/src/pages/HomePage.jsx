import React from 'react';
import { 
  Typography, 
  Container, 
  Box, 
  Button, 
  Stack,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StoreIcon from '@mui/icons-material/Store';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

const img1 = "https://picsum.photos/seed/design1/140"; 
const img2 = "https://picsum.photos/seed/design2/220"; 
const img3 = "https://picsum.photos/seed/design3/140";

function HomePage() {
  const features = [
    {
      icon: <StoreIcon sx={{ fontSize: 40, color: '#2563eb' }} />,
      title: 'Easy Setup',
      description: 'Launch your store in minutes with our intuitive platform'
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: '#10b981' }} />,
      title: 'Grow Sales',
      description: 'Powerful tools to boost your revenue and reach more customers'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: '#f59e0b' }} />,
      title: 'Secure & Safe',
      description: 'Bank-level security to protect your business and customers'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: '#8b5cf6' }} />,
      title: 'Lightning Fast',
      description: 'Optimized performance for the best shopping experience'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <Box 
        sx={{ 
          width: '100%',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          paddingTop: { xs: '80px', md: '0' },
          paddingBottom: { xs: '60px', md: '0' },
        }}
      >
        {/* Animated background circles */}
        <Box 
          sx={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            top: '-200px',
            left: '-100px',
            animation: 'float 20s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(50px)' }
            }
          }}
        />
        <Box 
          sx={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            bottom: '-150px',
            right: '-100px',
            animation: 'float 15s ease-in-out infinite',
            animationDelay: '2s'
          }}
        />

        <Container maxWidth="lg"> 
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography 
                  component="h1" 
                  sx={{
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                    fontWeight: 800,
                    mb: 2,
                    lineHeight: 1.2,
                    background: 'linear-gradient(to right, #fff, #e0e7ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Start Your E-Commerce Business In India
                </Typography>

                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 4, 
                    fontWeight: 300,
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                    opacity: 0.95,
                    lineHeight: 1.6
                  }}
                >
                  Effortless, Profitable, Fast. Transform your business idea into reality with MyStore's powerful platform.
                </Typography>
                
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2} 
                  sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
                >
                  <Button 
                    variant="contained" 
                    size="large"
                    component={RouterLink}
                    to="/signup"
                    sx={{ 
                      backgroundColor: 'white',
                      color: '#667eea',
                      fontWeight: 600,
                      py: 1.5,
                      px: 4,
                      borderRadius: '50px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                      transition: 'all 0.3s ease', 
                      '&:hover': { 
                        backgroundColor: '#f8f9fa',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
                      },
                    }}
                    endIcon={<ArrowForwardIcon />}
                  >
                    Get Started Free
                  </Button>
                  
                  <Button 
                    variant="outlined" 
                    size="large"
                    component={RouterLink}
                    to="/how-it-works"
                    sx={{ 
                      color: 'white', 
                      borderColor: 'rgba(255,255,255,0.5)',
                      fontWeight: 600,
                      py: 1.5,
                      px: 4,
                      borderRadius: '50px',
                      borderWidth: '2px',
                      transition: 'all 0.3s ease', 
                      '&:hover': { 
                        borderColor: 'white', 
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-3px)',
                        borderWidth: '2px',
                      },
                    }}
                    startIcon={<PlayArrowIcon />}
                  >
                    Watch Demo
                  </Button>
                </Stack>

                {/* Trust indicators */}
                <Box sx={{ mt: 4, display: 'flex', gap: 3, justifyContent: { xs: 'center', md: 'flex-start' }, flexWrap: 'wrap' }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight="bold">10K+</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>Active Stores</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight="bold">₹50Cr+</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>Sales Generated</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight="bold">4.9★</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>User Rating</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' }, position: 'relative' }}>
              <Box sx={{ position: 'relative', height: '600px' }}>
                
                <Box 
                  component="img" 
                  src={img2} 
                  sx={{ 
                    width: 260, 
                    borderRadius: '20px', 
                    position: 'absolute', 
                    top: '44%', 
                    right: '5%',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'scale(1.05) rotate(3deg)' }
                  }}
                />
                <Box 
                  component="img" 
                  src={img3} 
                  sx={{ 
                    width: 180, 
                    borderRadius: '20px', 
                    position: 'absolute', 
                    bottom: '10%', 
                    right: '25%',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'scale(1.05) translateY(-10px)' }
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#f8f9fa' }}>
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
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#6b7280',
                fontWeight: 400,
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              Everything you need to build, grow, and scale your online business
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
              Ready to Start Selling?
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
              Join thousands of successful sellers already using MyStore. No credit card required.
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              component={RouterLink}
              to="/signup"
              sx={{ 
                backgroundColor: 'white',
                color: '#1e3a8a',
                fontWeight: 600,
                py: 1.5,
                px: 5,
                fontSize: '1.1rem',
                borderRadius: '50px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease', 
                '&:hover': { 
                  backgroundColor: '#f8f9fa',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
                },
              }}
              endIcon={<ArrowForwardIcon />}
            >
              Start Your Free Trial
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default HomePage;