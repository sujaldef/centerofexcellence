// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './slices/blogSlice';
import eventReducer from './slices/eventSlice';
import newsletterReducer from './slices/newsletterSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
    events: eventReducer,
    newsletter: newsletterReducer,
    user: userReducer,
  },
});