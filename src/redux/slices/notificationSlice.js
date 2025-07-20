import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/notifications';

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (eventId, { rejectWithValue }) => {
    try {
      console.log('fetchNotifications request:', { url: `${API_URL}/${eventId}` });
      const response = await axios.get(`${API_URL}/${eventId}`);
      console.log('fetchNotifications response:', response.data);
      return response.data;
    } catch (error) {
      console.error('fetchNotifications error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch notifications');
    }
  }
);

export const postNotification = createAsyncThunk(
  'notifications/postNotification',
  async ({ eventId, notificationData, type }, { rejectWithValue }) => {
    try {
      if (!eventId || !type) {
        throw new Error('eventId and type are required');
      }
      console.log('postNotification input:', { eventId, type, notificationData });

      const formData = new FormData();
      formData.append('event_id', eventId);
      formData.append('type', type);
      formData.append('message', notificationData.message || '');
      formData.append('reason', notificationData.reason || '');
      formData.append('extended_days', notificationData.extended_days || 0);
      formData.append('extended_months', notificationData.extended_months || 0);
      if (type === 'poster' && notificationData.poster) {
        formData.append('poster', notificationData.poster);
      }

      const formDataEntries = [...formData.entries()];
      console.log('postNotification FormData:', formDataEntries);

      const response = await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('postNotification response:', response.data);
      return { ...notificationData, _id: response.data.id, created_at: new Date().toISOString(), type };
    } catch (error) {
      console.error('postNotification error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      return rejectWithValue(error.response?.data?.detail || error.message || 'Failed to post notification');
    }
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
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