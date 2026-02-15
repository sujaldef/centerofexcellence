import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = 'https://centerofexcellence-1.onrender.com/users';

// Thunk to login and get JWT token and user_id
export const login = createAsyncThunk(
  'user/login',
  async ({ identifier, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        identifier,
        password,
      });
      const { access_token, user_id } = response.data;
      console.log('Login response:', response.data);
      localStorage.setItem('token', access_token);
localStorage.setItem('userId', user_id);

      return { access_token, user_id };
    } catch (error) {
      console.error('Login error:', error);
      return rejectWithValue(error.response?.data?.detail || 'Login failed');
    }
  }
);

// Utility function to check if the token is expired
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    if (!decoded || !decoded.exp) return true;
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

// Thunk to fetch user by ID
export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      if (isTokenExpired(token)) {
        dispatch(logout());
        throw new Error('Token expired. Please log in again.');
      }
      const response = await axios.get(`${API_BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('fetchUserById response:', response.data);
      return response.data;
    } catch (error) {
      console.error('fetchUserById error:', error);
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch user');
    }
  }
);

// Thunk to update user
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userId, userData }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      if (isTokenExpired(token)) {
        dispatch(logout());
        throw new Error('Token expired. Please log in again.');
      }
      const response = await axios.patch(`${API_BASE_URL}/${userId}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('updateUser response:', response.data);
      // Reset profile prompt flag to allow prompt if profile becomes incomplete
      localStorage.removeItem(`profilePromptShown_${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error updating user with ID ${userId}:`, error);
      return rejectWithValue(error.response?.data?.detail || error.message || 'Failed to update user');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    userId: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUserFromToken: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem(`profilePromptShown_${state.userId}`);
      state.user = null;
      state.token = null;
      state.userId = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token;
        state.userId = action.payload.user_id;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch User By ID
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update user state after registration
      .addCase('events/registerForEvent/fulfilled', (state, action) => {
        if (state.user) {
          state.user.eventsRegistered = [
            ...(state.user.eventsRegistered || []),
            {
              eventId: action.payload.eventId,
              registeredAt: new Date().toISOString(),
            },
          ];
        }
      });
  },
});

export const { setUserFromToken, logout } = userSlice.actions;
export default userSlice.reducer;