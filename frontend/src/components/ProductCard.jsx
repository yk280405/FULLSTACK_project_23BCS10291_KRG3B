import React, { useState } from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  CardActions, 
  Button,
  Box,
  Chip,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StoreIcon from '@mui/icons-material/Store';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Check if the logged-in user is the owner
  const isOwner = user && 
                  user.role === 'SELLER' && 
                  product.seller && 
                  user.id === product.seller.id;

  const handleAddToCart = () => {
    addToCart(product);
    setSnackbar({
      open: true,
      message: `${product.name} added to cart!`,
      severity: 'success'
    });
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      return;
    }
    try {
      const deleteRequest = {
        productId: product.id,
        sellerId: user.id
      };
      
      await axios.delete('http://localhost:8080/api/products/delete', {
        data: deleteRequest
      });
      
      setSnackbar({
        open: true,
        message: 'Product deleted successfully!',
        severity: 'success'
      });
      
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error("Failed to delete product:", error);
      setSnackbar({
        open: true,
        message: 'Failed to delete product',
        severity: 'error'
      });
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid #e5e7eb',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)', 
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
          }
        }}
      >
        {/* Image Container with Overlay */}
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="240"
            image={product.imageUrl}
            alt={product.name}
            sx={{
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.08)',
              }
            }}
          />
          
          {/* Favorite Button */}
          <IconButton
            onClick={toggleFavorite}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(4px)',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'white',
                transform: 'scale(1.1)',
              }
            }}
          >
            {isFavorite ? (
              <FavoriteIcon sx={{ color: '#ef4444' }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: '#6b7280' }} />
            )}
          </IconButton>

          {/* Owner Badge */}
          {isOwner && (
            <Chip
              label="Your Product"
              size="small"
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                backgroundColor: '#667eea',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.75rem',
              }}
            />
          )}
        </Box>

        {/* Content */}
        <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
          {/* Product Name */}
          <Typography 
            variant="h6" 
            component="div"
            sx={{
              fontWeight: 700,
              fontSize: '1.1rem',
              mb: 1,
              color: '#1f2937',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.3,
            }}
          >
            {product.name}
          </Typography>

          {/* Price */}
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 2 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 800,
                color: '#667eea',
                fontSize: '1.5rem'
              }}
            >
              ₹{product.price ? product.price.toFixed(2) : '0.00'}
            </Typography>
            {product.originalPrice && (
              <Typography 
                variant="body2" 
                sx={{ 
                  textDecoration: 'line-through',
                  color: '#9ca3af',
                  fontSize: '0.9rem'
                }}
              >
                ₹{product.originalPrice.toFixed(2)}
              </Typography>
            )}
          </Box>

          {/* Shop Name */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 0.5, 
              mb: 1.5,
              p: 1,
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
            }}
          >
            <StoreIcon sx={{ fontSize: 16, color: '#667eea' }} />
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#6b7280',
                fontWeight: 500,
              }}
            >
              {product.seller?.shopName || 'N/A'}
            </Typography>
          </Box>

          {/* Description */}
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#6b7280',
              lineHeight: 1.6,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.description}
          </Typography>
        </CardContent>

        {/* Actions */}
        <CardActions 
          sx={{ 
            p: 2, 
            pt: 0,
            gap: 1,
            flexWrap: 'wrap'
          }}
        >
          {isOwner ? (
            <Button 
              fullWidth
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              sx={{
                borderRadius: '10px',
                py: 1,
                fontWeight: 600,
                textTransform: 'none',
                borderWidth: '2px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderWidth: '2px',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)',
                }
              }}
            >
              Delete Product
            </Button>
          ) : (
            <>
              <Button 
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                sx={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontWeight: 600,
                  py: 1,
                  borderRadius: '10px',
                  textTransform: 'none',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
                  }
                }}
              >
                Add to Cart
              </Button>
              
              <Button 
                variant="outlined"
                startIcon={<VisibilityIcon />}
                sx={{
                  flex: 1,
                  color: '#667eea',
                  borderColor: '#667eea',
                  fontWeight: 600,
                  py: 1,
                  borderRadius: '10px',
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
                Details
              </Button>
            </>
          )}
        </CardActions>
      </Card>

      {/* Snackbar for notifications */}
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
    </>
  );
}

export default ProductCard;