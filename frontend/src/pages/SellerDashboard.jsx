import React from 'react';
import { 
  Typography, 
  Container, 
  Box, 
  Button,
  Grid,
  Card,
  CardContent,
  Stack
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function SellerDashboard() {
  const stats = [
    {
      icon: <InventoryIcon sx={{ fontSize: 40, color: '#2563eb' }} />,
      title: 'Total Products',
      value: '24',
      change: '+3 this week'
    },
    {
      icon: <ShoppingCartIcon sx={{ fontSize: 40, color: '#10b981' }} />,
      title: 'Orders',
      value: '156',
      change: '+12 today'
    },
    {
      icon: <AttachMoneyIcon sx={{ fontSize: 40, color: '#f59e0b' }} />,
      title: 'Revenue',
      value: '₹45,280',
      change: '+8% this month'
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: '#8b5cf6' }} />,
      title: 'Conversion',
      value: '3.2%',
      change: '+0.5% improvement'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <Box 
        sx={{ 
          width: '100%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 6, md: 8 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated background circles */}
        <Box 
          sx={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            top: '-150px',
            right: '-100px',
            animation: 'float 20s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(30px)' }
            }
          }}
        />

        <Container maxWidth="lg">
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography 
              variant="h3" 
              fontWeight="bold" 
              sx={{ 
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              Seller Dashboard
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 4,
                fontWeight: 300,
                opacity: 0.95,
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}
            >
              Welcome back! Here you can manage your products and track your store performance.
            </Typography>
            
            <Button 
              variant="contained" 
              size="large"
              component={RouterLink}
              to="/seller/add-product"
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
              startIcon={<AddIcon />}
            >
              Add New Product
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 6 }}>
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              sx={{ 
                mb: 2,
                color: '#1f2937',
                fontSize: { xs: '1.75rem', md: '2rem' }
              }}
            >
              Store Analytics
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#6b7280',
                fontSize: { xs: '0.95rem', md: '1.1rem' }
              }}
            >
              Track your store's performance at a glance
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {stats.map((stat, index) => (
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
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ mb: 2 }}>
                      {stat.icon}
                    </Box>
                    <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5, color: '#1f2937' }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 500 }}>
                      {stat.change}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Quick Actions Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: 'white' }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 6 }}>
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              sx={{ 
                mb: 2,
                color: '#1f2937',
                fontSize: { xs: '1.75rem', md: '2rem' }
              }}
            >
              Quick Actions
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#6b7280',
                fontSize: { xs: '0.95rem', md: '1.1rem' }
              }}
            >
              Manage your store efficiently
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  borderRadius: '16px',
                  border: '2px solid #e5e7eb',
                  boxShadow: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: '#667eea',
                    boxShadow: '0 8px 30px rgba(102, 126, 234, 0.2)',
                  }
                }}
              >
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ color: '#1f2937' }}>
                    Manage Products
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', mt: 1 }}>
                    View and edit your inventory
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  borderRadius: '16px',
                  border: '2px solid #e5e7eb',
                  boxShadow: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: '#667eea',
                    boxShadow: '0 8px 30px rgba(102, 126, 234, 0.2)',
                  }
                }}
              >
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ color: '#1f2937' }}>
                    View Orders
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', mt: 1 }}>
                    Track and fulfill orders
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  borderRadius: '16px',
                  border: '2px solid #e5e7eb',
                  boxShadow: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: '#667eea',
                    boxShadow: '0 8px 30px rgba(102, 126, 234, 0.2)',
                  }
                }}
              >
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ color: '#1f2937' }}>
                    Store Settings
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', mt: 1 }}>
                    Configure your store
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default SellerDashboard;