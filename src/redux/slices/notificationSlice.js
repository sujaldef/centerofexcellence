import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/notifications';

// Async thunk to fetch notifications
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${eventId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch notifications');
    }
  }
);

// Async thunk to post a notification
export const postNotification = createAsyncThunk(
  'notifications/postNotification',
  async (notificationData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/`, notificationData);
      return { ...notificationData, id: response.data.id, created_at: new Date().toISOString() };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to post notification');
    }
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Post notification
      .addCase(postNotification.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postNotification.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notifications = [action.payload, ...state.notifications];
      })
      .addCase(postNotification.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearError } = notificationSlice.actions;
export default notificationSlice.reducer;