/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fakeApi from '../../fakeApi';

const initialState = {
  auth: {
    isAuth: false,
    yourUserId: null,
    yourEmail: null,
  },
  users: [
    {
      id: 1,
      email: 'e1',
      password: 'p1',
    },
    {
      id: 2,
      email: 'email2',
      password: 'password2',
    },
  ], // {id, email, password}
  inputsValues: {
    registration: {
      email: '',
      password: '',
      confirmedPassword: '',
    },
  },
  inputsStatus: {
    registration: {
      emailInput: {
        isError: false,
        helperText: null,
      },
      passwordInput: {
        isError: false,
        helperText: null,
      },
      confirmedInput: {
        isError: false,
        helperText: null,
      },
    },
  },
};

export const regNewUser = createAsyncThunk(
  'session/regNewUser',
  async (data, { rejectWithValue, dispatch, getState }) => {
    const state = getState();
    const { users } = state;
    const response = await fakeApi.registration(data, users);
    if (response.isSameEmail) {
      return rejectWithValue('Email is already in use');
    }
    dispatch(registration(response));
    return 'Registration is sucssess';
  },
);

export const loginUser = createAsyncThunk(
  'session/loginUser',
  async (data, { getState }) => {
    const state = getState();
    const { users } = state;
    const response = await fakeApi.login(data, users);
    return response;
  },
);

export const resetPassword = createAsyncThunk(
  'session/resetPassword',
  async (newPassword, { dispatch, getState }) => {
    const state = getState();
    const { users } = state;
    const currentUserId = state.auth.yourUserId;
    const response = await fakeApi.resetPassword(newPassword, currentUserId, users);
    dispatch(saveNewPassword(response));
  },
);

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    registration: (state, action) => {
      state.users.push(action.payload);
    },
    registrationValues: (state, action) => {
      state.inputsValues.registration = action.payload;
    },
    logOut: (state) => {
      state.auth.isAuth = false;
      state.auth.yourUserId = null;
      state.auth.yourEmail = null;
    },
    saveNewPassword: (state, action) => {
      const updatedUser = action.payload;
      state.users = state.users.filter((user) => user.id !== updatedUser.id);
      state.users.push(updatedUser);
    },
  },
  extraReducers: {
    [regNewUser.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.inputsValues.registration.email = '';
      state.inputsValues.registration.password = '';
      state.inputsValues.registration.confirmedPassword = '';
    },
    [regNewUser.rejected]: (state, action) => {
      state.inputsStatus.registration.emailInput.isError = true;
      state.inputsStatus.registration.emailInput.helperText = action.payload;
    },
    [loginUser.fulfilled]: (state, action) => {
      console.log('login is sucssess\nuser id is', action.payload);
      state.auth.isAuth = true;
      state.auth.yourUserId = action.payload.userId;
      state.auth.yourEmail = action.payload.userEmail;
    },
    [loginUser.rejected]: () => {
      console.log('user not found');
    },
    [resetPassword.fulfilled]: () => {
      console.log('password is reseted');
    },
  },
});

// actions
export const {
  registration,
  registrationValues,
  logOut,
  saveNewPassword,
} = sessionSlice.actions;

// selectors
export const selectUsers = (state) => state.users;
export const selectRegistrationVals = (state) => state.inputsValues.registration;
export const selectAuth = (state) => state.auth;
export const selectRegistrationHelpers = (state) => state.inputsStatus.registration;

// main reducer
export default sessionSlice.reducer;
