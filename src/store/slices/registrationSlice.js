/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fakeApi from '../../fakeApi';

const registrationSlice = createSlice({
  name: 'registration',
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export default registrationSlice.reducer;