/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as LinkTo } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginUser, selectLoginHelpers, loginValues, selectLoginVals,
} from '../../store/slices/sessionSlice';

const theme = createTheme();

function LoginForm() {
  const dispatch = useDispatch();
  const status = useSelector(selectLoginHelpers);
  const value = useSelector(selectLoginVals);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data = {
      email: form.get('loginEmail'),
      password: form.get('loginPassword'),
    };
    dispatch(loginUser(data));
  };

  const handleInputsValue = () => {
    const loginForm = document.forms.login;
    const form = new FormData(loginForm);
    const data = {
      email: form.get('loginEmail'),
      password: form.get('loginPassword'),
    };
    dispatch(loginValues(data));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box component="form" name="login" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                onChange={handleInputsValue}
                error={status.isError}
                value={value.email}
                margin="normal"
                required
                fullWidth
                id="loginEmail"
                label="Email Address"
                name="loginEmail"
                autoComplete="email"
              />
              <TextField
                onChange={handleInputsValue}
                error={status.isError}
                value={value.password}
                margin="normal"
                required
                fullWidth
                name="loginPassword"
                label="Password"
                type="password"
                id="loginPassword"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" component={LinkTo} to="/">
                    Go to home
                  </Link>
                </Grid>
              </Grid>
              {status.isError
                && <Alert severity="error">{status.message}</Alert>}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default LoginForm;
