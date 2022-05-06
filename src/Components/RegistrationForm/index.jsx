/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as LinkTo } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { validataeEmail, validatePassword } from '../../helpers/validation';
import {
  regNewUser,
  registrationValues,
  selectUsers,
  selectRegistrationVals,
  selectRegistrationHelpers,
  removeRegEmailErrors,
  registrationPasswordsStatus,
  selectFineshedRegistration,
  removeRegNotice,
} from '../../store/slices/sessionSlice';

const theme = createTheme();

function RegistrationForm() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const value = useSelector(selectRegistrationVals);
  const registrationHelper = useSelector(selectRegistrationHelpers);
  const success = useSelector(selectFineshedRegistration);
  const [isError, setError] = useState(false);
  const [helperText, setHelperText] = useState(null);
  const [isPasswordErr, setPasswordErr] = useState(false);

  const email = {
    error: registrationHelper.emailInput.isError,
    helperText: registrationHelper.emailInput.helperText,
  };

  const password = {
    error: registrationHelper.passwordInput.isError,
    helperText: registrationHelper.passwordInput.helperText,
  };

  const confirmed = {
    error: registrationHelper.confirmedInput.isError,
    helperText: registrationHelper.confirmedInput.helperText,
  };

  const savedValue = {
    email: value.email,
    password: value.password,
    confirmedPassword: value.confirmedPassword,
  };

  const handleSubmit = (event) => {
    // я знаю что тут говнокод
    event.preventDefault();
    const input = new FormData(event.currentTarget);
    const confirmedPassword = input.get('confirmedPassword');
    const data = {
      id: users.length + 1,
      email: input.get('email'),
      password: input.get('password'),
    };
    const isCorrectEmail = validataeEmail(data.email);
    const isCorrectPassword = validatePassword(data.password);
    const isCorrectRepeated = validatePassword(confirmedPassword);

    const status = {
      password: {
        isError: false,
        helperText: null,
      },
      confirmedPassword: {
        isError: false,
        helperText: null,
      },
    };

    status.password.isError = false;
    status.password.helperText = null;
    status.confirmedPassword.isError = false;
    status.confirmedPassword.helperText = null;
    setError(false);
    setHelperText(null);
    setPasswordErr(false);

    if (!isCorrectEmail) {
      setError(true);
      setHelperText('Incorrect email');
      return;
    }

    if (!isCorrectPassword || isCorrectRepeated) {
      setPasswordErr(true);
      return;
    }

    if (data.password !== confirmedPassword) {
      status.password.isError = true;
      status.password.helperText = 'Passwords should be the same';
      status.confirmedPassword.isError = true;
      status.confirmedPassword.helperText = 'Passwords should be the same';
      dispatch(registrationPasswordsStatus(status));
      return;
    }
    dispatch(registrationPasswordsStatus(status));
    dispatch(regNewUser(data));
  };

  const handleValueInput = () => {
    const registrationForm = document.forms.registration;
    const input = new FormData(registrationForm);
    const data = {
      email: input.get('email'),
      password: input.get('password'),
      confirmedPassword: input.get('confirmedPassword'),
    };
    if (data.email !== savedValue.email) {
      dispatch(removeRegEmailErrors());
    }
    dispatch(registrationValues(data));
  };

  if (success) {
    setTimeout(() => {
      dispatch(removeRegNotice());
    }, 5000);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registration
          </Typography>
          <Box component="form" name="registration" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={isError || email.error}
                  helperText={helperText || email.helperText}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleValueInput}
                  value={savedValue.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={isPasswordErr || password.error}
                  helperText={password.helperText}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleValueInput}
                  value={savedValue.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={isPasswordErr || confirmed.error}
                  helperText={confirmed.helperText}
                  required
                  fullWidth
                  name="confirmedPassword"
                  label="Confirm password"
                  type="password"
                  id="confirmedPassword"
                  autoComplete="new-password"
                  onChange={handleValueInput}
                  value={savedValue.confirmedPassword}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {!success
              && (
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" component={LinkTo} to="/">
                    Go to home
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" component={LinkTo} to="/login">
                    Already have an account? Log in
                  </Link>
                </Grid>
              </Grid>
              )}
            {success
              && (
              <Alert severity="success">
                Registration is successed, now you can
                {' '}
                <Link component={LinkTo} to="/login">log in</Link>
                !
              </Alert>
              )}
            {isPasswordErr && (
            <Alert severity="error">
              Password must have at least capital letter, a number and length from 4 to 10!
            </Alert>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default RegistrationForm;
