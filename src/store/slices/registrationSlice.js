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

export const newUser = createAsyncThunk(
  'registration/newUser',
  async (data, { rejectWithValue, dispatch, getState }) => {
    const response = await fakeApi.registration(data);

    // если валидация на сервере не прошла
    if (!response.serverValidation) {
      return rejectWithValue(response.message);
    }

    return response.message;
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
  },
  extraReducers: {
    [newUser.pending]: () => {
      console.log('newUser pending');
    },
    [newUser.fulfilled]: (_, action) => {
      console.log('newUser fulfilled', action.payload);
    },
    [newUser.rejected]: (_, action) => {
      console.log('newUser rejected', action.payload);
    },
  },
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
