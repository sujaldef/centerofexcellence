import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/events';

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch events');
    }
  }
);

export const fetchEventById = createAsyncThunk(
  'events/fetchEventById',
  async (id, { rejectWithValue }) => {
    try {
      if (!id || typeof id !== 'string' || id.includes(':') || !/^[0-9a-fA-F]{24}$/.test(id)) {
        console.error(`Invalid event ID: ${id}`);
        throw new Error('Invalid event ID');
      }
      console.log(`Fetching event with ID: ${id}`);
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching event with ID ${id}:`, error);
      return rejectWithValue(error.response?.data?.detail || error.message || 'Failed to fetch event');
    }
  }
);

export const fetchOrganizers = createAsyncThunk(
  'events/fetchOrganizers',
  async (eventId, { rejectWithValue }) => {
    try {
      if (!eventId || typeof eventId !== 'string' || !/^[0-9a-fA-F]{24}$/.test(eventId)) {
        throw new Error('Invalid event ID');
      }
      const response = await axios.get(`${API_BASE_URL}/${eventId}/organizers`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch organizers');
    }
  }
);

export const fetchSpeakers = createAsyncThunk(
  'events/fetchSpeakers',
  async (eventId, { rejectWithValue }) => {
    try {
      if (!eventId || typeof eventId !== 'string' || !/^[0-9a-fA-F]{24}$/.test(eventId)) {
        throw new Error('Invalid event ID');
      }
      const response = await axios.get(`${API_BASE_URL}/${eventId}/speakers`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch speakers');
    }
  }
);

export const fetchNotifications = createAsyncThunk(
  'events/fetchNotifications',
  async (eventId, { rejectWithValue }) => {
    try {
      if (!eventId || typeof eventId !== 'string' || !/^[0-9a-fA-F]{24}$/.test(eventId)) {
        throw new Error('Invalid event ID');
      }
      const response = await axios.get(`${API_BASE_URL}/${eventId}/notifications`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch notifications');
    }
  }
);

export const postNotification = createAsyncThunk(
  'events/postNotification',
  async ({ eventId, notificationData }, { rejectWithValue }) => {
    try {
      if (!eventId || typeof eventId !== 'string' || !/^[0-9a-fA-F]{24}$/.test(eventId)) {
        throw new Error('Invalid event ID');
      }
      const formData = new FormData();
      formData.append('message', notificationData.message);
      formData.append('type', notificationData.type);
      if (notificationData.poster) {
        formData.append('poster', notificationData.poster);
      }
      const response = await axios.post(`${API_BASE_URL}/${eventId}/notifications`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to post notification');
    }
  }
);

export const modifyEvent = createAsyncThunk(
  'events/modifyEvent',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      if (!id || typeof id !== 'string' || id.includes(':') || !/^[0-9a-fA-F]{24}$/.test(id)) {
        console.error(`Invalid event ID: ${id}`);
        throw new Error('Invalid event ID');
      }
      console.log(`Updating event with ID: ${id}, data:`, data);
      const response = await axios.patch(`${API_BASE_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating event with ID ${id}:`, error);
      return rejectWithValue(error.response?.data?.detail || 'Failed to update event');
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async (id, { rejectWithValue }) => {
    try {
      if (!id || typeof id !== 'string' || id.includes(':') || !/^[0-9a-fA-F]{24}$/.test(id)) {
        console.error(`Invalid event ID: ${id}`);
        throw new Error('Invalid event ID');
      }
      console.log(`Deleting event with ID: ${id}`);
      await axios.delete(`${API_BASE_URL}/${id}`);
      return id;
    } catch (error) {
      console.error(`Error deleting event with ID ${id}:`, error);
      return rejectWithValue(error.response?.data?.detail || 'Failed to delete event');
    }
  }
);

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    selectedEvent: null,
    organizers: [],
    speakers: [],
    notifications: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.correctableEvent = null;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.selectedEvent = null;
        state.error = action.payload;
      })
      .addCase(fetchOrganizers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrganizers.fulfilled, (state, action) => {
        state.loading = false;
        state.organizers = action.payload;
      })
      .addCase(fetchOrganizers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSpeakers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpeakers.fulfilled, (state, action) => {
        state.loading = false;
        state.speakers = action.payload;
      })
      .addCase(fetchSpeakers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(postNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = [...state.notifications, action.payload];
      })
      .addCase(postNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(modifyEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(modifyEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.map((event) =>
          event._id === action.payload._id ? action.payload : event
        );
        if (state.selectedEvent?._id === action.payload._id) {
          state.selectedEvent = action.payload;
        }
      })
      .addCase(modifyEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.filter((event) => event._id !== action.payload);
        if (state.selectedEvent?._id === action.payload) {
          state.selectedEvent = null;
        }
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = eventSlice.actions;
export default eventSlice.reducer;