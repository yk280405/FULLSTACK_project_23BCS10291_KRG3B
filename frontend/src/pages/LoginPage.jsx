import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  Divider,
  Link,
  CircularProgress
} from '@mui/material';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import StorefrontIcon from '@mui/icons-material/Storefront';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    const loginRequest = { email, password };

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', loginRequest);
      
      login(response.data);
      
      // Redirect based on user role
      if (response.data.role === 'SELLER') {
        navigate('/seller/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError(
        error.response?.data?.message || 
        'Login failed. Please check your credentials and try again.'
      );
      setIsLoading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 6
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          elevation={0}
          sx={{ 
            padding: { xs: 3, sm: 5 },
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}
        >
          {/* Logo and Header */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Box 
              sx={{ 
                width: 70,
                height: 70,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                mb: 2
              }}
            >
              <StorefrontIcon sx={{ color: 'white', fontSize: 40 }} />
            </Box>
            
            <Typography 
              component="h1" 
              variant="h4" 
              fontWeight="bold"
              sx={{ color: '#1f2937', mb: 1 }}
            >
              Welcome Back
            </Typography>
            
            <Typography variant="body1" sx={{ color: '#6b7280', textAlign: 'center' }}>
              Sign in to your MyStore account
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 3, borderRadius: '12px' }}
              onClose={() => setError('')}
            >
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <Typography 
                variant="subtitle2" 
                sx={{ mb: 1, fontWeight: 600, color: '#374151' }}
              >
                Email Address
              </Typography>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: '#9ca3af' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: '#f9fafb',
                    '&:hover fieldset': {
                      borderColor: '#667eea',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                    }
                  },
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="subtitle2" 
                sx={{ mb: 1, fontWeight: 600, color: '#374151' }}
              >
                Password
              </Typography>
              <TextField
                required
                fullWidth
                name="password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: '#9ca3af' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: '#f9fafb',
                    '&:hover fieldset': {
                      borderColor: '#667eea',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                    }
                  },
                }}
              />
            </Box>

            {/* Forgot Password Link */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
              <Link
                component={RouterLink}
                to="/forgot-password"
                sx={{
                  color: '#667eea',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                Forgot password?
              </Link>
            </Box>

            {/* Sign In Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 600,
                py: 1.5,
                borderRadius: '12px',
                textTransform: 'none',
                fontSize: '1rem',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
                },
                '&:disabled': {
                  background: '#e5e7eb',
                  color: '#9ca3af',
                }
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            {/* Divider */}
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                OR
              </Typography>
            </Divider>

            {/* Sign Up Link */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#6b7280', mb: 2 }}>
                Don't have an account?
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                component={RouterLink}
                to="/signup"
                startIcon={<PersonAddIcon />}
                sx={{
                  color: '#667eea',
                  borderColor: '#667eea',
                  fontWeight: 600,
                  py: 1.2,
                  borderRadius: '12px',
                  textTransform: 'none',
                  borderWidth: '2px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.05)',
                    borderWidth: '2px',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Create Account
              </Button>
            </Box>
          </Box>

          {/* Trust Badge */}
          <Box 
            sx={{ 
              mt: 4, 
              p: 2, 
              backgroundColor: '#f9fafb', 
              borderRadius: '12px',
              textAlign: 'center'
            }}
          >
            <Typography variant="caption" sx={{ color: '#6b7280' }}>
              🔒 Your information is secure and encrypted
            </Typography>
          </Box>
        </Paper>

        {/* Footer Links */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'white', opacity: 0.9 }}>
            By signing in, you agree to our{' '}
            <Link 
              component={RouterLink} 
              to="/terms" 
              sx={{ 
                color: 'white', 
                fontWeight: 600,
                textDecoration: 'underline'
              }}
            >
              Terms
            </Link>
            {' '}and{' '}
            <Link 
              component={RouterLink} 
              to="/privacy" 
              sx={{ 
                color: 'white', 
                fontWeight: 600,
                textDecoration: 'underline'
              }}
            >
              Privacy Policy
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default LoginPage;