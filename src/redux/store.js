import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './slices/blogSlice';
import eventReducer from './slices/eventSlice';
import newsletterReducer from './slices/newsletterSlice'
export const store = configureStore({
  reducer: {
    blogs: blogReducer,
    events: eventReducer,
    newsletter: newsletterReducer
  },
});