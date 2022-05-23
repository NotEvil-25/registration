/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
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
  alert: {
    error: false,
    success: false,
    message: '',
  },
};

export const newUser = createAsyncThunk(
  'registration/newUser',
  async (data, { rejectWithValue, dispatch, getState }) => {
    const response = await fakeApi.registration(data);

    // если валидация на сервере не прошла
    if (response.error) {
      const error = {
        error: response.error,
        success: response.success,
        message: response.message,
      };
      return rejectWithValue(error);
    }

    const status = {
      error: response.error,
      success: response.success,
      message: response.message,
    };
    return status;
  },
);

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
    alertSuccess: (state) => {
      state.alert.success = false;
      state.alert.message = '';
    },
    alertError: (state) => {
      state.alert.error = false;
      state.alert.message = '';
    },
  },
  extraReducers: {
    [newUser.pending]: (state) => {
      state.notices.sending = true;

      state.alert.error = false;
      state.alert.success = false;
      state.alert.message = '';
    },
    [newUser.fulfilled]: (state, action) => {
      state.notices.sending = false;

      state.alert.error = false;
      state.alert.success = true;
      state.alert.message = action.payload.message;

      state.values.email = '';
      state.values.password = '';
    },
    [newUser.rejected]: (state, action) => {
      state.notices.sending = false;

      state.alert.error = true;
      state.alert.success = false;
      state.alert.message = action.payload.message;
    },
  },
});

// actions
export const {
  saveValues,
  emailNotice,
  passwordNotice,
  alertSuccess,
  alertError,
} = registrationSlice.actions;

// selectors
export const selectValues = (state) => state.registration.values;
export const selectEmailNotice = (state) => state.registration.notices.email;
export const selectPasswordNotice = (state) => state.registration.notices.password;
export const selectSending = (state) => state.registration.notices.sending;
export const selectAlert = (state) => state.registration.alert;

// main reducer
export default registrationSlice.reducer;
