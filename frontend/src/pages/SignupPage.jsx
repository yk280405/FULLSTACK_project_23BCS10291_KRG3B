import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl, 
  FormLabel 
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'CUSTOMER', 
    shopName: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    
    try {
      await axios.post('http://localhost:8080/api/auth/signup', formData);
      navigate('/login'); 
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        position: 'relative',
        overflow: 'hidden'
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

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}> 
        <Paper 
          elevation={0} 
          sx={{ 
            padding: { xs: 3, sm: 5 },
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Icon */}
            <Box 
              sx={{ 
                width: 70,
                height: 70,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)'
              }}
            >
              <PersonAddIcon sx={{ fontSize: 35, color: 'white' }} />
            </Box>

            <Typography 
              component="h1" 
              variant="h4"
              fontWeight="bold"
              sx={{ 
                color: '#1f2937',
                mb: 1
              }}
            >
              Create Account
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#6b7280',
                mb: 4,
                textAlign: 'center'
              }}
            >
              Join thousands of sellers on MyStore
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': {
                      borderColor: '#667eea',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                    }
                  }
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': {
                      borderColor: '#667eea',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                    }
                  }
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': {
                      borderColor: '#667eea',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                    }
                  }
                }}
              />
              
              <FormControl 
                component="fieldset" 
                sx={{ 
                  mt: 3,
                  width: '100%',
                  p: 2.5,
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  backgroundColor: '#f9fafb'
                }} 
                required
              >
                <FormLabel 
                  component="legend"
                  sx={{
                    fontWeight: 600,
                    color: '#1f2937',
                    '&.Mui-focused': {
                      color: '#667eea'
                    }
                  }}
                >
                  I am a:
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  sx={{ mt: 1 }}
                >
                  <FormControlLabel 
                    value="CUSTOMER" 
                    control={
                      <Radio 
                        sx={{
                          color: '#667eea',
                          '&.Mui-checked': {
                            color: '#667eea',
                          }
                        }}
                      />
                    } 
                    label="Customer" 
                  />
                  <FormControlLabel 
                    value="SELLER" 
                    control={
                      <Radio 
                        sx={{
                          color: '#667eea',
                          '&.Mui-checked': {
                            color: '#667eea',
                          }
                        }}
                      />
                    } 
                    label="Seller" 
                  />
                </RadioGroup>
              </FormControl>
              
              {formData.role === 'SELLER' && (
                <Box
                  sx={{
                    mt: 2,
                    animation: 'slideIn 0.3s ease-out',
                    '@keyframes slideIn': {
                      from: { opacity: 0, transform: 'translateY(-10px)' },
                      to: { opacity: 1, transform: 'translateY(0)' }
                    }
                  }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="shopName"
                    label="Shop Name"
                    name="shopName"
                    autoComplete="organization"
                    value={formData.shopName}
                    onChange={handleChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        '&:hover fieldset': {
                          borderColor: '#667eea',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#667eea',
                        }
                      }
                    }}
                  />
                </Box>
              )}
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  mt: 4, 
                  mb: 2,
                  py: 1.5,
                  borderRadius: '50px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  textTransform: 'none',
                  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 15px 40px rgba(102, 126, 234, 0.5)',
                    background: 'linear-gradient(135deg, #5568d3 0%, #6941a0 100%)',
                  }
                }}
              >
                Create Account
              </Button>
              
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Already have an account?{' '}
                  <RouterLink 
                    to="/login" 
                    style={{ 
                      textDecoration: 'none',
                      color: '#667eea',
                      fontWeight: 600
                    }}
                  >
                    Login
                  </RouterLink>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Trust Badge */}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'white',
              opacity: 0.9,
              fontWeight: 500
            }}
          >
            🔒 Your data is secure and encrypted
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default SignupPage;