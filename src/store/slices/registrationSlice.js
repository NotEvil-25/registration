/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { createSlice } from '@reduxjs/toolkit';
// import fakeApi from '../../fakeApi';

const initialState = {
  values: {
    email: '',
    password: '',
  },
  notices: {
    email: {
      isError: false,
      text: '',
    },
    password: {
      isError: false,
      text: '',
    },
  },
};
const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    saveValues: (state, action) => {
      state.values = action.payload;
    },
    emailNotice: (state, action) => {
      state.notices.email = action.payload;
    },
    passwordNotice: (state, action) => {
      state.notices.password = action.payload;
    },
  },
  extraReducers: {},
});

// actions
export const {
  saveValues,
  emailNotice,
  passwordNotice,
} = registrationSlice.actions;

// selectors
export const selectValues = (state) => state.registration.values;
export const selectEmailNotice = (state) => state.registration.notices.email;
export const selectPasswordNotice = (state) => state.registration.notices.password;

// main reducer
export default registrationSlice.reducer;
