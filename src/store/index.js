import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './slices/sessionSlice';

const store = configureStore({
  reducer: sessionReducer,
});

export default store;
