import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/AuthSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
