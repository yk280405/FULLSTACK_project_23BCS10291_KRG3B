import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard.jsx';
import { 
  Grid, 
  Typography, 
  Container, 
  TextField, 
  Box,
  InputAdornment,
  Chip,
  CircularProgress,
  Paper,
  Button,
  Fade
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StoreIcon from '@mui/icons-material/Store';
import FilterListIcon from '@mui/icons-material/FilterList';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ClearIcon from '@mui/icons-material/Clear';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [shopFilter, setShopFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError('');
      
      try {
        const response = await axios.get('http://localhost:8080/api/products', {
          params: {
            search: search,
            shopName: shopFilter
          }
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search, shopFilter]);

  const handleClearFilters = () => {
    setSearch('');
    setShopFilter('');
  };

  const hasActiveFilters = search || shopFilter;

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb',
      py: 6
    }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
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
              <ShoppingBagIcon sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="bold" sx={{ color: '#1f2937' }}>
                All Products
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Discover amazing products from our sellers
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Search and Filter Section */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 3,
            mb: 4,
            borderRadius: '16px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <FilterListIcon sx={{ color: '#667eea', fontSize: 24 }} />
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#1f2937' }}>
              Filter Products
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <TextField
                placeholder="Search by product name..."
                variant="outlined"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#9ca3af' }} />
                    </InputAdornment>
                  ),
                  endAdornment: search && (
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        onClick={() => setSearch('')}
                        sx={{ minWidth: 'auto', p: 0.5 }}
                      >
                        <ClearIcon sx={{ fontSize: 18, color: '#9ca3af' }} />
                      </Button>
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
            </Grid>

            <Grid item xs={12} md={5}>
              <TextField
                placeholder="Filter by shop name..."
                variant="outlined"
                fullWidth
                value={shopFilter}
                onChange={(e) => setShopFilter(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <StoreIcon sx={{ color: '#9ca3af' }} />
                    </InputAdornment>
                  ),
                  endAdornment: shopFilter && (
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        onClick={() => setShopFilter('')}
                        sx={{ minWidth: 'auto', p: 0.5 }}
                      >
                        <ClearIcon sx={{ fontSize: 18, color: '#9ca3af' }} />
                      </Button>
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
            </Grid>

            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleClearFilters}
                disabled={!hasActiveFilters}
                sx={{
                  height: '56px',
                  borderRadius: '12px',
                  color: '#667eea',
                  borderColor: '#667eea',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderWidth: '2px',
                  '&:hover': {
                    borderWidth: '2px',
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.05)',
                  },
                  '&:disabled': {
                    borderColor: '#e5e7eb',
                    color: '#9ca3af',
                  }
                }}
              >
                Clear All
              </Button>
            </Grid>
          </Grid>

          {/* Active Filters */}
          {hasActiveFilters && (
            <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="caption" sx={{ color: '#6b7280', alignSelf: 'center' }}>
                Active filters:
              </Typography>
              {search && (
                <Chip
                  label={`Product: "${search}"`}
                  onDelete={() => setSearch('')}
                  size="small"
                  sx={{
                    backgroundColor: '#ede9fe',
                    color: '#5b21b6',
                    fontWeight: 600,
                    '& .MuiChip-deleteIcon': {
                      color: '#5b21b6',
                    }
                  }}
                />
              )}
              {shopFilter && (
                <Chip
                  label={`Shop: "${shopFilter}"`}
                  onDelete={() => setShopFilter('')}
                  size="small"
                  sx={{
                    backgroundColor: '#dbeafe',
                    color: '#1e40af',
                    fontWeight: 600,
                    '& .MuiChip-deleteIcon': {
                      color: '#1e40af',
                    }
                  }}
                />
              )}
            </Box>
          )}
        </Paper>

        {/* Products Count */}
        {!isLoading && (
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ color: '#6b7280', fontWeight: 500 }}>
              {products.length} {products.length === 1 ? 'product' : 'products'} found
            </Typography>
          </Box>
        )}

        {/* Loading State */}
        {isLoading && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '400px' 
          }}>
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress 
                size={60}
                sx={{ 
                  color: '#667eea',
                  mb: 2
                }}
              />
              <Typography variant="h6" sx={{ color: '#6b7280' }}>
                Loading products...
              </Typography>
            </Box>
          </Box>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              textAlign: 'center',
              borderRadius: '16px',
              border: '2px dashed #fca5a5',
              backgroundColor: '#fef2f2'
            }}
          >
            <Typography variant="h6" sx={{ color: '#dc2626', mb: 1 }}>
              Oops! Something went wrong
            </Typography>
            <Typography variant="body2" sx={{ color: '#991b1b' }}>
              {error}
            </Typography>
          </Paper>
        )}

        {/* Empty State */}
        {!isLoading && !error && products.length === 0 && (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: 'center',
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
              <SearchIcon sx={{ fontSize: 60, color: '#9ca3af' }} />
            </Box>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 1, color: '#1f2937' }}>
              No products found
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: '#6b7280' }}>
              Try adjusting your filters or search terms
            </Typography>
            {hasActiveFilters && (
              <Button
                variant="outlined"
                onClick={handleClearFilters}
                sx={{
                  color: '#667eea',
                  borderColor: '#667eea',
                  fontWeight: 600,
                  borderRadius: '10px',
                  textTransform: 'none',
                  borderWidth: '2px',
                  '&:hover': {
                    borderWidth: '2px',
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.05)',
                  }
                }}
              >
                Clear Filters
              </Button>
            )}
          </Paper>
        )}

        {/* Products Grid */}
        {!isLoading && !error && products.length > 0 && (
          <Fade in={true} timeout={500}>
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Fade>
        )}
      </Container>
    </Box>
  );
}

export default ProductsPage;