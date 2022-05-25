import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './slices/registrationSlice';
import loginSliceReducer from './slices/loginSlice';

const store = configureStore({
  reducer: {
    registration: registrationReducer,
    login: loginSliceReducer,
  },
});

export default store;
