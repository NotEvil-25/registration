/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fakeApi from '../../fakeApi';

const initialState = {
  delayedAuth: false,
  user: {
    isAuth: false,
    id: null,
    email: '',
  },
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

export const user = createAsyncThunk(
  'login/user',
  async (data, { rejectWithValue }) => {
    const response = await fakeApi.login(data);

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
      userData: response.userData,
    };
    return status;
  },
);

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
    hideAlertSuccess: (state) => {
      state.alert.success = false;
      state.alert.message = '';
    },
    hideAlertError: (state) => {
      state.alert.error = false;
      state.alert.message = '';
    },
    auth: (state) => {
      state.delayedAuth = false;
      state.user.isAuth = true;
    },
  },
  extraReducers: {
    [user.pending]: (state) => {
      state.notices.sending = true;

      state.alert.error = false;
      state.alert.success = false;
      state.alert.message = '';
    },
    [user.fulfilled]: (state, action) => {
      state.notices.sending = false;

      state.alert.error = action.payload.error;
      state.alert.success = action.payload.success;
      state.alert.message = action.payload.message;

      state.values.email = '';
      state.values.password = '';

      const { userData } = action.payload;
      // state.user.isAuth = true;
      state.delayedAuth = true;
      state.user.id = userData.id;
      state.user.email = userData.email;

      console.log(action.payload);
    },
    [user.rejected]: (state, action) => {
      state.notices.sending = false;

      state.alert.error = action.payload.error;
      state.alert.success = action.payload.success;
      state.alert.message = action.payload.message;

      state.notices.email.isError = true;
      state.notices.password.isError = true;
    },
  },
});

// actions
export const {
  saveValues,
  emailNotice,
  passwordNotice,
  hideAlertSuccess,
  hideAlertError,
  auth,
} = loginSlice.actions;

// selectors
export const selectValues = (state) => state.login.values;
export const selectEmailNotice = (state) => state.login.notices.email;
export const selectPasswordNotice = (state) => state.login.notices.password;
export const selectSending = (state) => state.login.notices.sending;
export const selectAlert = (state) => state.login.alert;
export const selectUserStatus = (state) => state.login.user;
export const selectDelayedAuth = (state) => state.login.delayedAuth;

// main reducer
export default loginSlice.reducer;
