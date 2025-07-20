import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/events';

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_BASE_URL);
      const transformedEvents = response.data.map(event => ({
        ...event,
        title: event.eventName,
        event_id: event._id,
        type: event.category,
        attendees: event.totalRegistrations,
        status: event.status === 'upcoming' ? 'Active' : event.status,
      }));
      console.log('Fetched events:', transformedEvents);
      return transformedEvents;
    } catch (error) {
      console.error('Fetch events error:', error.message);
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch events');
    }
  }
);

export const fetchEventById = createAsyncThunk(
  'events/fetchEventById',
  async (id, { rejectWithValue }) => {
    try {
      if (!id || typeof id !== 'string' || !/^[0-9a-fA-F]{24}$/.test(id)) {
        throw new Error('Invalid event ID');
      }
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      const event = response.data;
      const transformedEvent = {
        ...event,
        title: event.eventName,
        event_id: event._id,
        type: event.category,
        attendees: event.totalRegistrations,
        status: event.status === 'upcoming' ? 'Active' : event.status,
      };
      console.log('Fetched event by ID:', transformedEvent);
      return transformedEvent;
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

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      const fields = [
        'eventName', 'tagline', 'category', 'tags', 'date', 'month', 'year',
        'location', 'capacity', 'eventMode', 'description', 'highlights',
        'faqs', 'sponsors', 'organizer', 'eventContact', 'whoAreWe', 'status',
        'totalRegistrations', 'registeredUsers', 'requireResume', 'allowedFileTypes',
        'requireBasicInfo', 'requiredBasicInfo', 'requireWebLink', 'requiredWebLinks',
        'requireCoverLetter', 'requirePortfolio', 'customQuestions', 'instructions'
      ];

      fields.forEach((field) => {
        if (eventData[field] !== undefined && eventData[field] !== null) {
          if (Array.isArray(eventData[field]) || typeof eventData[field] === 'object') {
            formData.append(field, JSON.stringify(eventData[field]));
          } else {
            formData.append(field, eventData[field]);
          }
        }
      });

      if (eventData.bannerImage instanceof File) {
        formData.append('bannerImage', eventData.bannerImage);
      }
      if (eventData.thumbnailImage instanceof File) {
        formData.append('thumbnailImage', eventData.thumbnailImage);
      }

      if (eventData.sponsors) {
        eventData.sponsors.forEach((sponsor, index) => {
          if (sponsor.logo instanceof File) {
            formData.append(`sponsor_logo_${index}`, sponsor.logo);
          }
        });
        const sponsorsWithoutLogos = eventData.sponsors.map(sponsor => ({
          name: sponsor.name,
          website: sponsor.website,
        }));
        formData.set('sponsors', JSON.stringify(sponsorsWithoutLogos));
      }

      if (eventData.highlights) {
        eventData.highlights.forEach((highlight, index) => {
          if (highlight.image instanceof File) {
            formData.append(`highlight_image_${index}`, highlight.image);
          }
        });
        const highlightsWithoutImages = eventData.highlights.map(highlight => ({
          type: highlight.type,
          title: highlight.title,
          description: highlight.description,
          name: highlight.name,
          role: highlight.role,
          contact: highlight.contact,
          email: highlight.email,
        }));
        formData.set('highlights', JSON.stringify(highlightsWithoutImages));
      }

      const response = await axios.post(`${API_BASE_URL}/multipart/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const event = response.data;
      return {
        ...event,
        title: event.eventName,
        event_id: event._id,
        type: event.category,
        attendees: event.totalRegistrations,
        status: event.status === 'upcoming' ? 'Active' : event.status,
      };
    } catch (error) {
      console.error('Error creating event:', error);
      return rejectWithValue(error.response?.data?.detail || 'Failed to create event');
    }
  }
);

export const modifyEvent = createAsyncThunk(
  'events/modifyEvent',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      if (!id || typeof id !== 'string' || !/^[0-9a-fA-F]{24}$/.test(id)) {
        throw new Error('Invalid event ID');
      }
      const formData = new FormData();
      const fields = [
        'eventName', 'tagline', 'category', 'tags', 'date', 'month', 'year',
        'location', 'capacity', 'eventMode', 'description', 'highlights',
        'faqs', 'sponsors', 'organizer', 'eventContact', 'whoAreWe', 'status',
        'totalRegistrations', 'registeredUsers', 'requireResume', 'allowedFileTypes',
        'requireBasicInfo', 'requiredBasicInfo', 'requireWebLink', 'requiredWebLinks',
        'requireCoverLetter', 'requirePortfolio', 'customQuestions', 'instructions'
      ];

      fields.forEach((field) => {
        if (data[field] !== undefined && data[field] !== null) {
          if (Array.isArray(data[field]) || typeof data[field] === 'object') {
            formData.append(field, JSON.stringify(data[field]));
          } else {
            formData.append(field, data[field]);
          }
        }
      });

      if (data.bannerImage instanceof File) {
        formData.append('bannerImage', data.bannerImage);
      }
      if (data.thumbnailImage instanceof File) {
        formData.append('thumbnailImage', data.thumbnailImage);
      }

      if (data.sponsors) {
        data.sponsors.forEach((sponsor, index) => {
          if (sponsor.logo instanceof File) {
            formData.append(`sponsor_logo_${index}`, sponsor.logo);
          }
        });
      }

      if (data.highlights) {
        data.highlights.forEach((highlight, index) => {
          if (highlight.image instanceof File) {
            formData.append(`highlight_image_${index}`, highlight.image);
          }
        });
      }

      const response = await axios.patch(`${API_BASE_URL}/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const event = response.data;
      return {
        ...event,
        title: event.eventName,
        event_id: event._id,
        type: event.category,
        attendees: event.totalRegistrations,
        status: event.status === 'upcoming' ? 'Active' : event.status,
      };
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
      if (!id || typeof id !== 'string' || !/^[0-9a-fA-F]{24}$/.test(id)) {
        throw new Error('Invalid event ID');
      }
      await axios.delete(`${API_BASE_URL}/${id}`);
      return id;
    } catch (error) {
      console.error(`Error deleting event with ID ${id}:`, error);
      return rejectWithValue(error.response?.data?.detail || 'Failed to delete event');
    }
  }
);

export const extendEventDeadline = createAsyncThunk(
  'events/extendEventDeadline',
  async ({ eventId, extensionData }, { rejectWithValue }) => {
    try {
      if (!eventId || typeof eventId !== 'string' || !/^[0-9a-fA-F]{24}$/.test(eventId)) {
        throw new Error('Invalid event ID');
      }
      const response = await axios.patch(`${API_BASE_URL}/${eventId}/extend_deadline/`, extensionData);
      const event = response.data;
      return {
        ...event,
        title: event.eventName,
        event_id: event._id,
        type: event.category,
        attendees: event.totalRegistrations,
        status: event.status === 'upcoming' ? 'Active' : event.status,
      };
    } catch (error) {
      console.error(`Error extending deadline for event ${eventId}:`, error);
      return rejectWithValue(error.response?.data?.detail || 'Failed to extend deadline');
    }
  }
);

export const registerForEvent = createAsyncThunk(
  'events/registerForEvent',
  async ({ eventId, userId, registrationData }, { rejectWithValue }) => {
    try {
      if (!eventId || typeof eventId !== 'string' || !/^[0-9a-fA-F]{24}$/.test(eventId)) {
        throw new Error('Invalid event ID');
      }
      if (!userId || typeof userId !== 'string' || !/^[0-9a-fA-F]{24}$/.test(userId)) {
        throw new Error('Invalid user ID');
      }

      const formData = new FormData();
      formData.append('user_id', userId);

      const jsonData = {
        basic_info: registrationData.basicInfo || {},
        web_links: registrationData.webLinks || {},
        portfolio: registrationData.portfolio || '',
        custom_answers: registrationData.customAnswers || {},
      };

      if (registrationData.resume) {
        formData.append('resume', registrationData.resume);
        // Send multipart/form-data with both file and JSON
        formData.append('data', JSON.stringify(jsonData));
        const response = await axios.post(`${API_BASE_URL}/${eventId}/register`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return { ...response.data, userId, eventId };
      } else {
        // Send JSON data without file
        const response = await axios.post(`${API_BASE_URL}/${eventId}/register`, {
          user_id: userId,
          ...jsonData,
        }, {
          headers: { 'Content-Type': 'application/json' },
        });
        return { ...response.data, userId, eventId };
      }
    } catch (error) {
      console.error(`Error registering for event ${eventId}:`, error);
      return rejectWithValue(error.response?.data?.detail || 'Failed to register for event');
    }
  }
);

export const fetchParticipants = createAsyncThunk(
  'events/fetchParticipants',
  async (eventId, { rejectWithValue }) => {
    try {
      if (!eventId || typeof eventId !== 'string' || !/^[0-9a-fA-F]{24}$/.test(eventId)) {
        throw new Error('Invalid event ID');
      }
      const response = await axios.get(`${API_BASE_URL}/${eventId}/participants`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching participants for event ${eventId}:`, error);
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch participants');
    }
  }
);

export const fetchEventDetailsForManagement = createAsyncThunk(
  'events/fetchEventDetailsForManagement',
  async (id, { rejectWithValue }) => {
    try {
      if (!id || typeof id !== 'string' || !/^[0-9a-fA-F]{24}$/.test(id)) {
        throw new Error('Invalid event ID');
      }
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      const event = response.data;
      const transformedEvent = {
        ...event,
        title: event.eventName,
        event_id: event._id,
        type: event.category,
        attendees: event.totalRegistrations,
        status: event.status === 'upcoming' ? 'Active' : event.status,
        eventContact: event.eventContact || { name: '', email: '', phone: '' },
        tags: event.tags || [],
        allowedFileTypes: event.allowedFileTypes || [],
        requiredBasicInfo: event.requiredBasicInfo || [],
        requiredWebLinks: event.requiredWebLinks || [],
      };
      console.log('Fetched event details for management:', transformedEvent);
      return transformedEvent;
    } catch (error) {
      console.error(`Error fetching event details for management with ID ${id}:`, error);
      return rejectWithValue(error.response?.data?.detail || error.message || 'Failed to fetch event details');
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
    participants: [],
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
        state.selectedEvent = null;
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
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = [...state.events, action.payload];
        state.selectedEvent = action.payload;
      })
      .addCase(createEvent.rejected, (state, action) => {
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
      })
      .addCase(extendEventDeadline.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(extendEventDeadline.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.map((event) =>
          event._id === action.payload._id ? action.payload : event
        );
        if (state.selectedEvent?._id === action.payload._id) {
          state.selectedEvent = action.payload;
        }
      })
      .addCase(extendEventDeadline.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerForEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerForEvent.fulfilled, (state, action) => {
        state.loading = false;
        if (state.selectedEvent && state.selectedEvent._id === action.payload.eventId) {
          state.selectedEvent = {
            ...state.selectedEvent,
            registeredUsers: [...(state.selectedEvent.registeredUsers || []), action.payload.userId],
            totalRegistrations: (state.selectedEvent.totalRegistrations || 0) + 1,
          };
        }
      })
      .addCase(registerForEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchParticipants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParticipants.fulfilled, (state, action) => {
        state.loading = false;
        state.participants = action.payload;
      })
      .addCase(fetchParticipants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchEventDetailsForManagement.pending, (state) => {
        state.loading = true;
        state.selectedEvent = null;
        state.error = null;
      })
      .addCase(fetchEventDetailsForManagement.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEvent = action.payload;
      })
      .addCase(fetchEventDetailsForManagement.rejected, (state, action) => {
        state.loading = false;
        state.selectedEvent = null;
        state.error = action.payload;
      });
  },
});

export const { clearError } = eventSlice.actions;
export default eventSlice.reducer;