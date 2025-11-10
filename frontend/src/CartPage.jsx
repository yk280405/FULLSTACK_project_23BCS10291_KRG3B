import React from 'react';
import { 
  Typography, 
  Container, 
  Box, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  Grid, 
  Paper, 
  IconButton 
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import DeleteIcon from '@mui/icons-material/Delete';

function CartPage() {
  const { cartItems, removeFromCart, itemCount } = useCart();

  // Calculate the total price
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Your Shopping Cart
      </Typography>
      
      {itemCount === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6">
            Your cart is currently empty.
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/products"
            sx={{ mt: 2 }}
          >
            Start Shopping
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4} sx={{ mt: 2 }}>
          
          {/* Column 1: The List of Items */}
          <Grid item xs={12} md={8}>
            <List>
              {cartItems.map((item) => (
                <Paper key={item.id} elevation={2} sx={{ mb: 2 }}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src={item.imageUrl} alt={item.name} variant="square" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={`Quantity: ${item.quantity}`}
                    />
                    <Typography variant="h6" sx={{ mx: 2 }}>
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </Typography>
                    <IconButton 
                      edge="end" 
                      aria-label="delete" 
                      onClick={() => removeFromCart(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                </Paper>
              ))}
            </List>
          </Grid>

          {/* Column 2: The Order Summary */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ padding: 3 }}>
              <Typography variant="h5" gutterBottom>
                Order Summary
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">
                  Total ({itemCount} items)
                </Typography>
                <Typography variant="h6">
                  ₹{total}
                </Typography>
              </Box>
              <Button variant="contained" color="primary" fullWidth>
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>

        </Grid>
      )}
    </Container>
  );
}

export default CartPage;