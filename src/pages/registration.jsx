/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link as LinkTo } from 'react-router-dom';
import Link from '@mui/material/Link';
import {
  saveValues, selectValues,
  emailNotice, selectEmailNotice,
  passwordNotice, selectPasswordNotice,
} from '../store/slices/registrationSlice';
import { validataeEmail, validatePassword } from '../helpers/validation';

const theme = createTheme();

function Registration() {
  const value = useSelector(selectValues);
  const emailStatus = useSelector(selectEmailNotice);
  const passwordStatus = useSelector(selectPasswordNotice);
  const dispatch = useDispatch();

  const handleInputs = () => {
    const { registration } = document.forms;
    const data = new FormData(registration);
    const currentValues = {
      email: data.get('email'),
      password: data.get('password'),
    };
    dispatch(saveValues(currentValues));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { registration } = document.forms;
    const data = new FormData(registration);
    const email = data.get('email');
    const password = data.get('password');
    const validatedPassword = validatePassword(password);
    const validatedEmail = validataeEmail(email);

    if (!validatedPassword) {
      if (!validatedEmail) {
        dispatch(emailNotice({ isError: true, text: 'Incorrect email' }));
        dispatch(passwordNotice({ isError: true, text: 'Incorrect password' }));
      } else {
        dispatch(emailNotice({ isError: false, text: '' }));
        dispatch(passwordNotice({ isError: true, text: 'Incorrect password' }));
      }
    }
    if (!validatedEmail) {
      if (!validatedPassword) {
        dispatch(passwordNotice({ isError: true, text: 'Incorrect password' }));
        dispatch(emailNotice({ isError: true, text: 'Incorrect email' }));
      } else {
        dispatch(passwordNotice({ isError: false, text: '' }));
        dispatch(emailNotice({ isError: true, text: 'Incorrect email' }));
      }
    }
    // добавить условие для третьего инпута (потвердить пароль)
  };

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
          <Box component="form" name="registration" onSubmit={handleSubmit} onChange={handleInputs} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={value.email}
                  error={emailStatus.isError}
                  helperText={emailStatus.text}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={value.password}
                  error={passwordStatus.isError}
                  helperText={passwordStatus.text}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmedPassword"
                  label="Confirm password"
                  type="password"
                  id="confirmedPassword"
                  autoComplete="new-password"
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        <Link href="#" variant="body2" component={LinkTo} to="/">
          Go to home
        </Link>
      </Container>
    </ThemeProvider>
  );
}

export default Registration;
