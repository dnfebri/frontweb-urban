import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/authSlice";
import authUserSlice from '../features/authUserSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    authUser: authUserSlice
  },
})