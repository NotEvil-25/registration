/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fakeApi from '../../fakeApi';

const initialState = {
  fineshedRegistration: false,
  auth: {
    isAuth: false,
    yourUserId: null,
    yourEmail: null,
  },
  users: [
    {
      id: 1,
      email: 'email@test.com',
      password: 'Password1',
    },
  ], // {id, email, password}
  inputsValues: {
    registration: {
      email: '',
      password: '',
      confirmedPassword: '',
    },
    login: {
      email: '',
      password: '',
    },
    resetPass: {
      old: '',
      new: '',
      repeated: '',
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
    login: {
      isError: null,
      message: null,
    },
    resetPass: {
      isError: null,
      message: null,
      typeErr: null,
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
  async (data, { rejectWithValue, getState }) => {
    const state = getState();
    const { users } = state;
    const response = await fakeApi.login(data, users);
    if (response.incorrectInput) {
      return rejectWithValue('Email or your password is wrong, try to input again');
    }
    return response;
  },
);

export const resetPassword = createAsyncThunk(
  'session/resetPassword',
  async (newPassword, { rejectWithValue, dispatch, getState }) => {
    const state = getState();
    const { users } = state;
    const oldPassword = state.inputsValues.resetPass.old;
    const currentUserId = state.auth.yourUserId;
    const passwords = {
      old: oldPassword,
      new: newPassword,
    };
    const response = await fakeApi.resetPassword(passwords, currentUserId, users);
    if (response.message && response.typeErr) {
      return rejectWithValue(response);
    }
    dispatch(saveNewPassword(response));
    return 'password was reseted';
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
    loginValues: (state, action) => {
      state.inputsValues.login = action.payload;
    },
    resetPassValues: (state, action) => {
      state.inputsValues.resetPass = action.payload;
    },
    removeRegEmailErrors: (state) => {
      state.inputsStatus.registration.emailInput.isError = false;
      state.inputsStatus.registration.emailInput.helperText = null;
    },
    registrationPasswordsStatus: (state, action) => {
      const status = action.payload;
      // говно какое то получается, нужно было мне несколько слайсов создать
      state.inputsStatus.registration.passwordInput.isError = status.password.isError;
      state.inputsStatus.registration.passwordInput.helperText = status.password.helperText;
      state.inputsStatus.registration.confirmedInput.isError = status.confirmedPassword.isError;
      state.inputsStatus.registration.confirmedInput.helperText = status.confirmedPassword.helperText;
    },
    removeRegNotice: (state) => {
      state.fineshedRegistration = false;
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
    [regNewUser.fulfilled]: (state) => {
      state.inputsValues.registration.email = '';
      state.inputsValues.registration.password = '';
      state.inputsValues.registration.confirmedPassword = '';
      state.fineshedRegistration = true;
    },
    [regNewUser.rejected]: (state, action) => {
      state.inputsStatus.registration.emailInput.isError = true;
      state.inputsStatus.registration.emailInput.helperText = action.payload;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.auth.isAuth = true;
      state.auth.yourUserId = action.payload.userId;
      state.auth.yourEmail = action.payload.userEmail;
      state.inputsStatus.login.message = null;
      state.inputsStatus.login.isError = null;
      state.inputsValues.login.email = '';
      state.inputsValues.login.password = '';
    },
    [loginUser.rejected]: (state, action) => {
      state.inputsStatus.login.message = action.payload;
      state.inputsStatus.login.isError = true;
    },
    [resetPassword.fulfilled]: (state) => {
      state.inputsStatus.resetPass.message = null;
      state.inputsStatus.resetPass.isError = null;
      state.inputsStatus.resetPass.typeErr = null;
      state.inputsValues.resetPass.old = '';
      state.inputsValues.resetPass.new = '';
      state.inputsValues.resetPass.repeated = '';
    },
    [resetPassword.rejected]: (state, action) => {
      state.inputsStatus.resetPass.message = action.payload.message;
      state.inputsStatus.resetPass.typeErr = action.payload.typeErr;
      state.inputsStatus.resetPass.isError = true;
    },
  },
});

// actions
export const {
  registration,
  registrationValues,
  logOut,
  saveNewPassword,
  removeRegEmailErrors,
  registrationPasswordsStatus,
  removeRegNotice,
  loginValues,
  resetPassValues,
} = sessionSlice.actions;

// selectors
export const selectUsers = (state) => state.users;
export const selectRegistrationVals = (state) => state.inputsValues.registration;
export const selectLoginVals = (state) => state.inputsValues.login;
export const selectResetPassVals = (state) => state.inputsValues.resetPass;
export const selectAuth = (state) => state.auth;
export const selectRegistrationHelpers = (state) => state.inputsStatus.registration;
export const selectLoginHelpers = (state) => state.inputsStatus.login;
export const selectResetPassHelpers = (state) => state.inputsStatus.resetPass;
export const selectFineshedRegistration = (state) => state.fineshedRegistration;
// main reducer
export default sessionSlice.reducer;
