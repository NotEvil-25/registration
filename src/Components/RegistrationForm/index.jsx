/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
import React from 'react';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as LinkTo } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  regNewUser, registrationValues, selectUsers, selectRegistrationVals,
} from '../../store/slices/sessionSlice';

const theme = createTheme();

function RegistrationForm() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const value = useSelector(selectRegistrationVals);
  const savedValue = {
    email: value.email,
    password: value.password,
    confirmedPassword: value.confirmedPassword,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const input = new FormData(event.currentTarget);
    const data = {
      id: users.length + 1,
      email: input.get('email'),
      password: input.get('password'),
    };
    dispatch(regNewUser(data));
  };

  const saveValueInput = () => {
    const registrationForm = document.forms.registration;
    const input = new FormData(registrationForm);
    const data = {
      email: input.get('email'),
      password: input.get('password'),
      confirmedPassword: input.get('confirmedPassword'),
    };
    dispatch(registrationValues(data));
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
          <Box component="form" name="registration" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={saveValueInput}
                  value={savedValue.email}
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
                  onChange={saveValueInput}
                  value={savedValue.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmedPassword"
                  label="Confirm password"
                  type="password"
                  id="confirmedPassword"
                  autoComplete="new-password"
                  onChange={saveValueInput}
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
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default RegistrationForm;
