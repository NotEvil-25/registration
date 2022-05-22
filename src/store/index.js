import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './slices/sessionSlice';

const store = configureStore({
  reducer: {
    registration: registrationReducer
  }
});

export default store;
