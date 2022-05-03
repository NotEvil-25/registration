/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fakeApi from '../../fakeApi';

const initialState = {
  auth: {
    isAuth: false,
    yourUserId: null,
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
};

export const regNewUser = createAsyncThunk(
  'session/newNewUser',
  async (data, { dispatch }) => {
    const response = await fakeApi.registration(data);
    dispatch(registration(response));
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
  },
  extraReducers: {
    [regNewUser.fulfilled]: (state) => {
      console.log('Registration is sucssess');
      state.inputsValues.registration.email = '';
      state.inputsValues.registration.password = '';
      state.inputsValues.registration.confirmedPassword = '';
    },
    [loginUser.fulfilled]: (state, action) => {
      console.log('login is sucssess\nuser id is', action.payload);
      state.auth.isAuth = true;
      state.auth.yourUserId = action.payload;
    },
    [loginUser.rejected]: () => {
      console.log('user not found');
    },
  },
});

// actions
export const {
  registration,
  registrationValues,
} = sessionSlice.actions;

// selectors
export const selectUsers = (state) => state.users;
export const selectRegistrationVals = (state) => state.inputsValues.registration;

// main reducer
export default sessionSlice.reducer;
