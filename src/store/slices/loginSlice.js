/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fakeApi from '../../fakeApi';

const initialState = {
  values: {
    email: '',
    password: '',
  },
  notices: {
    sending: false,
    email: {
      isError: false,
      text: '',
    },
    password: {
      isError: false,
      text: '',
    },
  },
  // alert: {
  //   error: false,
  //   success: false,
  //   message: '',
  // },
};

const loginSlice = createSlice({
  name: 'login',
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
    // alertSuccess: (state) => {
    //   state.alert.success = false;
    //   state.alert.message = '';
    // },
    // alertError: (state) => {
    //   state.alert.error = false;
    //   state.alert.message = '';
    // },
  },
  extraReducers: {},
});

// actions
export const {
  saveValues,
  emailNotice,
  passwordNotice,
  // alertSuccess,
  // alertError,
} = loginSlice.actions;

// selectors
export const selectValues = (state) => state.login.values;
export const selectEmailNotice = (state) => state.login.notices.email;
export const selectPasswordNotice = (state) => state.login.notices.password;
// export const selectSending = (state) => state.registration.notices.sending;
// export const selectAlert = (state) => state.registration.alert;
// ------------------------------------------------------------------------------------

// main reducer
export default loginSlice.reducer;
