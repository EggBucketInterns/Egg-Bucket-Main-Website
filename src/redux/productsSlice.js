import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://b2c-backend-1.onrender.com/api/v1/admin/getallproducts');

      if (!response.ok) {
        const errorData = await response.json(); // Attempt to parse error details
        throw new Error(`HTTP error! status: ${response.status}, Details: ${JSON.stringify(errorData)}`); // Include details
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (!Array.isArray(data)) { // Ensure it's an array for robustness
        console.error('Unexpected API Response (Not an array):', data);
        return rejectWithValue('Invalid data structure received from API (Not an array)');
      }

      return data; // Return the array directly

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
    error: null, // Initialize error to null
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
        state.products = action.payload; // Directly assign the product data
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch products'; // More informative error
        state.products = []; // Clear products on error
      });
  },
});

export default productsSlice.reducer;