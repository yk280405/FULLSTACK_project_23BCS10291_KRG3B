import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Grid,
  InputAdornment,
  Alert,
  Snackbar,
  Card,
  CardMedia,
  IconButton,
  Chip
} from '@mui/material';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DescriptionIcon from '@mui/icons-material/Description';
import TitleIcon from '@mui/icons-material/Title';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import ImageIcon from '@mui/icons-material/Image';

function AddProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });
  
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Route Protection
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  if (user.role !== 'SELLER') {
    return <Navigate to="/" />;
  }

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price';
    }
    
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    
    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: 'Please fix the errors in the form',
        severity: 'error'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    let priceToSend = parseFloat(formData.price);
    if (isNaN(priceToSend) || priceToSend < 0) {
      priceToSend = 0.0; 
    }

    const newProductData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      imageUrl: formData.imageUrl.trim(),
      price: priceToSend, 
      sellerId: user.id 
    };

    try {
      await axios.post('http://localhost:8080/api/products/add', newProductData);
      
      setSnackbar({
        open: true,
        message: 'Product added successfully!',
        severity: 'success'
      });
      
      setTimeout(() => {
        navigate('/seller/dashboard');
      }, 1500);
      
    } catch (error) {
      console.error("Failed to add product:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to add product. Please try again.',
        severity: 'error'
      });
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      {/* Hero Header Section */}
      <Box 
        sx={{ 
          width: '100%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 4, md: 6 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated background circles */}
        <Box 
          sx={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            top: '-100px',
            right: '-50px',
            animation: 'float 20s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(30px)' }
            }
          }}
        />

        <Container maxWidth="lg">
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/seller/dashboard')}
              sx={{
                mb: 3,
                color: 'white',
                textTransform: 'none',
                fontWeight: 500,
                opacity: 0.9,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  opacity: 1,
                }
              }}
            >
              Back to Dashboard
            </Button>

            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              mb: 1
            }}>
              <Box 
                sx={{ 
                  width: 60,
                  height: 60,
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                }}
              >
                <AddPhotoAlternateIcon sx={{ color: 'white', fontSize: 32 }} />
              </Box>
              <Box>
                <Typography 
                  variant="h3" 
                  fontWeight="bold" 
                  sx={{ 
                    fontSize: { xs: '1.75rem', md: '2.5rem' },
                    mb: 0.5
                  }}
                >
                  Add New Product
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    opacity: 0.95,
                    fontSize: { xs: '0.95rem', md: '1.1rem' }
                  }}
                >
                  Fill in the details to list your product on the store
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Form Content Section */}
      <Box sx={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8f9fa',
        py: 6
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Form Section */}
            <Grid item xs={12} md={8}>
              <Paper 
                elevation={0} 
                sx={{ 
                  padding: { xs: 3, sm: 4 },
                  borderRadius: '20px',
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                }}
              >
                <Typography 
                  variant="h5" 
                  fontWeight="bold" 
                  sx={{ mb: 3, color: '#1f2937' }}
                >
                  Product Information
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, color: '#374151' }}>
                        Product Name *
                      </Typography>
                      <TextField
                        name="name"
                        required
                        fullWidth
                        id="name"
                        placeholder="Enter product name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        autoFocus
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <TitleIcon sx={{ color: '#9ca3af' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            backgroundColor: '#ffffff',
                            '&:hover fieldset': {
                              borderColor: '#667eea',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#667eea',
                              borderWidth: '2px',
                            }
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, color: '#374151' }}>
                        Description *
                      </Typography>
                      <TextField
                        name="description"
                        required
                        fullWidth
                        id="description"
                        placeholder="Describe your product in detail"
                        multiline
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        error={!!errors.description}
                        helperText={errors.description}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                              <DescriptionIcon sx={{ color: '#9ca3af' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            backgroundColor: '#ffffff',
                            '&:hover fieldset': {
                              borderColor: '#667eea',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#667eea',
                              borderWidth: '2px',
                            }
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, color: '#374151' }}>
                        Price (₹) *
                      </Typography>
                      <TextField
                        name="price"
                        fullWidth
                        id="price"
                        placeholder="0.00"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        error={!!errors.price}
                        helperText={errors.price}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CurrencyRupeeIcon sx={{ color: '#9ca3af' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            backgroundColor: '#ffffff',
                            '&:hover fieldset': {
                              borderColor: '#667eea',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#667eea',
                              borderWidth: '2px',
                            }
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, color: '#374151' }}>
                        Stock Status
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, pt: 1.5 }}>
                        <Chip 
                          label="In Stock" 
                          sx={{ 
                            backgroundColor: '#d1fae5',
                            color: '#065f46',
                            fontWeight: 600,
                            px: 1,
                            height: '36px'
                          }} 
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, color: '#374151' }}>
                        Image URL *
                      </Typography>
                      <TextField
                        name="imageUrl"
                        required
                        fullWidth
                        id="imageUrl"
                        placeholder="https://example.com/image.jpg or paste image URL"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        error={!!errors.imageUrl}
                        helperText={errors.imageUrl || 'Paste a direct link to your product image'}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <ImageIcon sx={{ color: '#9ca3af' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            backgroundColor: '#ffffff',
                            '&:hover fieldset': {
                              borderColor: '#667eea',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#667eea',
                              borderWidth: '2px',
                            }
                          },
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 4 }}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={isSubmitting}
                      startIcon={<SaveIcon />}
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        fontWeight: 600,
                        py: 1.8,
                        borderRadius: '50px',
                        textTransform: 'none',
                        fontSize: '1.05rem',
                        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 32px rgba(102, 126, 234, 0.4)',
                          background: 'linear-gradient(135deg, #5568d3 0%, #6941a0 100%)',
                        },
                        '&:disabled': {
                          background: '#e5e7eb',
                          color: '#9ca3af',
                          boxShadow: 'none',
                        }
                      }}
                    >
                      {isSubmitting ? 'Adding Product...' : 'Add Product'}
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Preview Section */}
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={0} 
                sx={{ 
                  padding: 3,
                  borderRadius: '20px',
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  position: 'sticky',
                  top: 100,
                  backgroundColor: 'white'
                }}
              >
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, color: '#1f2937' }}>
                  Live Preview
                </Typography>
                
                <Card 
                  sx={{ 
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #e5e7eb',
                  }}
                >
                  {formData.imageUrl ? (
                    <CardMedia
                      component="img"
                      height="220"
                      image={formData.imageUrl}
                      alt="Product preview"
                      sx={{ objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                      }}
                    />
                  ) : (
                    <Box 
                      sx={{ 
                        height: 220,
                        background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: 1
                      }}
                    >
                      <ImageIcon sx={{ fontSize: 56, color: '#d1d5db' }} />
                      <Typography variant="body2" sx={{ color: '#9ca3af', fontWeight: 500 }}>
                        No image yet
                      </Typography>
                    </Box>
                  )}
                  
                  <Box sx={{ p: 2.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1f2937', mb: 1 }}>
                      {formData.name || 'Product Name'}
                    </Typography>
                    
                    <Typography variant="h5" sx={{ color: '#667eea', fontWeight: 800, mb: 1.5 }}>
                      ₹{formData.price || '0.00'}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#6b7280',
                        lineHeight: 1.6,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {formData.description || 'Product description will appear here...'}
                    </Typography>
                  </Box>
                </Card>

                <Alert 
                  severity="info" 
                  sx={{ 
                    mt: 3,
                    borderRadius: '12px',
                    border: '1px solid #dbeafe',
                    backgroundColor: '#eff6ff',
                    '& .MuiAlert-icon': {
                      color: '#2563eb'
                    },
                    '& .MuiAlert-message': {
                      color: '#1e40af'
                    }
                  }}
                >
                  This is how your product will appear to customers
                </Alert>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ 
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default AddProductPage;