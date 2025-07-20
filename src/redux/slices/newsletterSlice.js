import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosRetry from 'axios-retry';

// Base URL for the API (adjusted to match your FastAPI server URL)
const API_URL = 'http://localhost:8000/newsletter';

// Configure Axios with timeout and retries
const axiosInstance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || (error.response && error.response.status >= 500);
  },
});

// Async thunk for subscribing to the newsletter
export const subscribeToNewsletter = createAsyncThunk(
  'newsletter/subscribe',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/subscribe`, { email });
      return response.data;
    } catch (error) {
      if (error.response) {
        // Handle different error statuses
        if (error.response.status === 422) {
          // Extract a user-friendly message from the validation error
          const validationErrors = error.response.data;
          const errorMessage = validationErrors[0]?.msg || 'Please provide a valid email address';
          return rejectWithValue(errorMessage);
        } else if (error.response.status === 400) {
          return rejectWithValue(error.response.data.detail || 'Failed to subscribe to newsletter');
        }
        return rejectWithValue(error.response.data?.detail || 'Subscription failed');
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
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
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
export const { setEmail, resetNewsletterState, clearMessage, clearError } = newsletterSlice.actions;

// Export selectors
export const selectNewsletterState = (state) => state.newsletter;

// Export reducer
export default newsletterSlice.reducer;