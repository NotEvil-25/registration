import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './slices/registrationSlice';

const store = configureStore({
  reducer: {
    registration: registrationReducer,
  },
});

export default store;
