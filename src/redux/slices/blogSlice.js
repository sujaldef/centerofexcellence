


// src/redux/slices/blogSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/blogs';

export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch blogs');
    }
  }
);

export const fetchBlogById = createAsyncThunk(
  'blogs/fetchBlogById',
  async (id, { rejectWithValue }) => {
    try {
      // Validate id to prevent malformed URLs
      if (!id || id.includes(':')) {
        throw new Error('Invalid blog ID');
      }
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || error.message || 'Failed to fetch blog');
    }
  }
);

export const createBlog = createAsyncThunk(
  'blogs/createBlog',
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_BASE_URL, blogData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Error creating blog');
    }
  }
);

export const updateBlog = createAsyncThunk(
  'blogs/updateBlog',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to update blog');
    }
  }
);

export const publishBlog = createAsyncThunk(
  'blogs/publishBlog',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/${id}`, {
        published: true,
        status: 'accepted',
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to publish blog');
    }
  }
);

export const rejectBlog = createAsyncThunk(
  'blogs/rejectBlog',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/${id}`, {
        status: 'rejected',
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to reject blog');
    }
  }
);

export const unpublishBlog = createAsyncThunk(
  'blogs/unpublishBlog',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/${id}`, {
        published: false,
        status: 'pending',
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to unpublish blog');
    }
  }
);

export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to delete blog');
    }
  }
);

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    selectedBlog: null,
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
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBlog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.push(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog
        );
        if (state.selectedBlog?._id === action.payload._id) {
          state.selectedBlog = action.payload;
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(publishBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog
        );
      })
      .addCase(publishBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(rejectBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog
        );
      })
      .addCase(rejectBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(unpublishBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unpublishBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog
        );
      })
      .addCase(unpublishBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = blogSlice.actions;
export default blogSlice.reducer;