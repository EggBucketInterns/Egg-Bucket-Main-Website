import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://b2c-backend-1.onrender.com/api/v1/admin/getallproducts');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data); // Debug log to see the actual response

      // Check if data exists and has products property
      if (!data) {
        return rejectWithValue('No data received from API');
      }

      // Return the data regardless of structure
      // This will help us see what we're actually getting
      return data;
    } catch (error) {
      console.error('API Error:', error);
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        // Handle the API response structure
        if (action.payload && action.payload.data) {
          state.products = action.payload.data;
        } else if (action.payload && Array.isArray(action.payload)) {
          state.products = action.payload;
        } else if (action.payload && action.payload.products) {
          state.products = action.payload.products;
        } else {
          state.error = 'Unexpected data structure';
          state.products = [];
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch products';
        state.products = [];
      });
  },
});

export default productsSlice.reducer;