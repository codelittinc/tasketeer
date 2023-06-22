import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import feedbackSlice from './features/feedbackSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    feedback: feedbackSlice,
  },
});
export default store;
