/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fakeApi from '../../fakeApi';

const initialState = {
  isAuth: false,
  users: [], // {id, email, password}
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
    [regNewUser.fulfilled]: () => {
      console.log('Registration is sucssess');
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
