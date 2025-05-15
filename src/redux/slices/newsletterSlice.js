import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for the API (adjust this to your FastAPI server URL)
const API_URL = 'http://localhost:8000/newsletter';

// Async thunk for subscribing to the newsletter
export const subscribeToNewsletter = createAsyncThunk(
  'newsletter/subscribe',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/subscribe`, { email });
      return response.data;
    } catch (error) {
      if (error.response) {
        // Return the error message from the server
        return rejectWithValue(error.response.data.detail || 'Subscription failed');
      }
      return rejectWithValue('Network error. Please try again.');
    }
  }
);

const newsletterSlice = createSlice({
  name: 'newsletter',
  initialState: {
    email: '',
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    message: null,
    error: null,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    resetNewsletterState: (state) => {
      state.email = '';
      state.status = 'idle';
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(subscribeToNewsletter.pending, (state) => {
        state.status = 'loading';
        state.message = null;
        state.error = null;
      })
      .addCase(subscribeToNewsletter.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload.message;
        state.email = ''; // Clear email input on success
      })
      .addCase(subscribeToNewsletter.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export actions
export const { setEmail, resetNewsletterState } = newsletterSlice.actions;

// Export selectors
export const selectNewsletterState = (state) => state.newsletter;

// Export reducer
export default newsletterSlice.reducer;