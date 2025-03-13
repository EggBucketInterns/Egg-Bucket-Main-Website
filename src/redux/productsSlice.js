import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      console.time('fetchProducts'); // Start timing
      const response = await fetch('https://b2c-backend-eik4.onrender.com/api/v1/admin/getallproducts', {
        headers: {
          'Cache-Control': 'no-cache', // Prevent stale data
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! Status: ${response.status}, Details: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      console.timeEnd('fetchProducts'); // Log time taken
      console.log('API Response:', data);

      if (!Array.isArray(data)) {
        console.error('Unexpected API Response (Not an array):', data);
        return rejectWithValue('Invalid data structure received from API');
      }

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
        console.log('Fetching products...');
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        console.log('Products loaded:', action.payload.length);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch products';
        state.products = [];
        console.error('Fetch error:', action.payload);
      });
  },
});

export default productsSlice.reducer;