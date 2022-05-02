/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fakeApi from '../../fakeApi';

const initialState = {
  isAuth: false,
  users: [], // {id, email, password}
  messages: {},
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
  },
  extraReducers: {
    [regNewUser.fulfilled]: (state) => {
      state.isAuth = true;
    },
  },
});

// actions
export const { registration } = sessionSlice.actions;

// selectors

// main reducer
export default sessionSlice.reducer;
