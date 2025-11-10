import React, { useState } from 'react';
import { 
  Typography, 
  Container, 
  Box, 
  Button, 
  Card,
  CardContent,
  Grid, 
  Paper, 
  IconButton,
  Divider,
  Chip,
  Snackbar,
  Alert
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import StoreIcon from '@mui/icons-material/Store';

function CartPage() {
  const { cartItems, removeFromCart, itemCount, updateQuantity } = useCart();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Calculate the total price and savings
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  // Delivery fee calculation based on order value
  let deliveryFee;
  if (subtotal > 500) {
    deliveryFee = 100; // ₹100 for orders above ₹500
  } else if (subtotal >= 101 && subtotal <= 500) {
    deliveryFee = 50; // ₹50 for orders between ₹101-₹500
  } else {
    deliveryFee = 10; // ₹10 for orders under ₹100
  }
  
  const discount = subtotal * 0.05; // 5% discount
  const total = (subtotal + deliveryFee - discount).toFixed(2);

  const handleRemove = (itemId, itemName) => {
    removeFromCart(itemId);
    setSnackbar({
      open: true,
      message: `${itemName} removed from cart`,
      severity: 'info'
    });
  };

  const handleQuantityChange = (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0 && updateQuantity) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb',
      py: 6
    }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Box 
              sx={{ 
                width: 50,
                height: 50,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(102, 126, 234, 0.3)',
              }}
            >
              <ShoppingCartIcon sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="bold" sx={{ color: '#1f2937' }}>
                Shopping Cart
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
              </Typography>
            </Box>
          </Box>
        </Box>

        {itemCount === 0 ? (
          // Empty Cart State
          <Paper 
            elevation={0} 
            sx={{ 
              textAlign: 'center', 
              py: 8,
              px: 4,
              borderRadius: '20px',
              border: '2px dashed #e5e7eb',
            }}
          >
            <Box 
              sx={{ 
                width: 120,
                height: 120,
                margin: '0 auto 24px',
                borderRadius: '50%',
                backgroundColor: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShoppingBagIcon sx={{ fontSize: 60, color: '#9ca3af' }} />
            </Box>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 1, color: '#1f2937' }}>
              Your cart is empty
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: '#6b7280' }}>
              Looks like you haven't added anything to your cart yet
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/products"
              size="large"
              startIcon={<ShoppingBagIcon />}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 600,
                py: 1.5,
                px: 4,
                borderRadius: '50px',
                textTransform: 'none',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
                }
              }}
            >
              Start Shopping
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {/* Cart Items List */}
            <Grid item xs={12} lg={8}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {cartItems.map((item) => (
                  <Card 
                    key={item.id}
                    elevation={0}
                    sx={{ 
                      borderRadius: '16px',
                      border: '1px solid #e5e7eb',
                      overflow: 'hidden',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Grid container spacing={2} alignItems="center">
                        {/* Product Image */}
                        <Grid item xs={12} sm={3}>
                          <Box
                            component="img"
                            src={item.imageUrl}
                            alt={item.name}
                            sx={{
                              width: '100%',
                              height: 120,
                              objectFit: 'cover',
                              borderRadius: '12px',
                            }}
                          />
                        </Grid>

                        {/* Product Details */}
                        <Grid item xs={12} sm={5}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 700,
                              color: '#1f2937',
                              mb: 1,
                              fontSize: '1.1rem'
                            }}
                          >
                            {item.name}
                          </Typography>
                          
                          {item.seller && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                              <StoreIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
                              <Typography variant="caption" sx={{ color: '#6b7280' }}>
                                {item.seller.shopName}
                              </Typography>
                            </Box>
                          )}

                          <Typography 
                            variant="h6" 
                            sx={{ 
                              color: '#667eea',
                              fontWeight: 800,
                              fontSize: '1.3rem'
                            }}
                          >
                            ₹{item.price.toFixed(2)}
                          </Typography>

                          <Chip 
                            label="In Stock" 
                            size="small"
                            sx={{ 
                              mt: 1,
                              backgroundColor: '#d1fae5',
                              color: '#065f46',
                              fontWeight: 600,
                              height: 24
                            }} 
                          />
                        </Grid>

                        {/* Quantity & Actions */}
                        <Grid item xs={12} sm={4}>
                          <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column',
                            alignItems: { xs: 'flex-start', sm: 'flex-end' },
                            gap: 2 
                          }}>
                            {/* Quantity Controls */}
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              border: '2px solid #e5e7eb',
                              borderRadius: '10px',
                              overflow: 'hidden'
                            }}>
                              <IconButton 
                                size="small"
                                onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                                disabled={item.quantity <= 1}
                                sx={{ 
                                  borderRadius: 0,
                                  color: '#667eea',
                                  '&:hover': { backgroundColor: '#f3f4f6' }
                                }}
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>
                              
                              <Typography 
                                sx={{ 
                                  px: 2,
                                  fontWeight: 600,
                                  minWidth: 40,
                                  textAlign: 'center'
                                }}
                              >
                                {item.quantity}
                              </Typography>
                              
                              <IconButton 
                                size="small"
                                onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                                sx={{ 
                                  borderRadius: 0,
                                  color: '#667eea',
                                  '&:hover': { backgroundColor: '#f3f4f6' }
                                }}
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </Box>

                            {/* Subtotal */}
                            <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                              <Typography variant="caption" sx={{ color: '#6b7280' }}>
                                Subtotal
                              </Typography>
                              <Typography 
                                variant="h6" 
                                sx={{ 
                                  fontWeight: 700,
                                  color: '#1f2937'
                                }}
                              >
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </Typography>
                            </Box>

                            {/* Delete Button */}
                            <Button
                              size="small"
                              startIcon={<DeleteIcon />}
                              onClick={() => handleRemove(item.id, item.name)}
                              sx={{
                                color: '#ef4444',
                                textTransform: 'none',
                                fontWeight: 500,
                                '&:hover': {
                                  backgroundColor: '#fef2f2',
                                }
                              }}
                            >
                              Remove
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Grid>

            {/* Order Summary */}
            <Grid item xs={12} lg={4}>
              <Paper 
                elevation={0}
                sx={{ 
                  padding: 3,
                  borderRadius: '16px',
                  border: '1px solid #e5e7eb',
                  position: 'sticky',
                  top: 100,
                }}
              >
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, color: '#1f2937' }}>
                  Order Summary
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" sx={{ color: '#6b7280' }}>
                      Subtotal ({itemCount} items)
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      ₹{subtotal.toFixed(2)}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" sx={{ color: '#6b7280' }}>
                      Delivery Fee
                    </Typography>
                    <Typography 
                      variant="body1" 
                      fontWeight={600}
                      sx={{ color: deliveryFee === 0 ? '#10b981' : '#1f2937' }}
                    >
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" sx={{ color: '#6b7280' }}>
                      Discount (5%)
                    </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{ color: '#10b981' }}>
                      -₹{discount.toFixed(2)}
                    </Typography>
                  </Box>

                  {subtotal < 500 && (
                    <Alert 
                      severity="info" 
                      icon={<LocalShippingIcon />}
                      sx={{ 
                        borderRadius: '10px',
                        '& .MuiAlert-icon': { color: '#667eea' }
                      }}
                    >
                      Add ₹{(500 - subtotal).toFixed(2)} more for FREE delivery!
                    </Alert>
                  )}

                  <Divider sx={{ my: 1 }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      Total
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: '#667eea' }}>
                      ₹{total}
                    </Typography>
                  </Box>

                  <Button 
                    variant="contained" 
                    fullWidth
                    size="large"
                    endIcon={<ArrowForwardIcon />}
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
                      }
                    }}
                  >
                    Proceed to Checkout
                  </Button>

                  <Button 
                    variant="outlined"
                    fullWidth
                    component={RouterLink}
                    to="/products"
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
                      }
                    }}
                  >
                    Continue Shopping
                  </Button>
                </Box>

                {/* Trust Badges */}
                <Box sx={{ mt: 3, p: 2, backgroundColor: '#f9fafb', borderRadius: '12px' }}>
                  <Typography variant="caption" fontWeight={600} sx={{ color: '#6b7280', display: 'block', mb: 1 }}>
                    🔒 Secure Checkout
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#9ca3af', display: 'block' }}>
                    Your payment information is encrypted and secure
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
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
    </Box>
  );
}

export default CartPage;