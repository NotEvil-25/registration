/* eslint-disable no-unused-vars */
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
import LinearProgress from '@mui/material/LinearProgress';
import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as LinkTo, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { validataeEmail, validatePassword } from '../helpers/validation';
import {
  saveValues, selectValues,
  emailNotice, passwordNotice,
  selectEmailNotice, selectPasswordNotice,
  user, hideAlertSuccess, hideAlertError,
  selectSending, selectAlert,
  selectUserStatus,
  selectDelayedAuth,
  auth,
} from '../store/slices/loginSlice';

const theme = createTheme();

function Login() {
  const value = useSelector(selectValues);
  const emailStatus = useSelector(selectEmailNotice);
  const passwordStatus = useSelector(selectPasswordNotice);
  const isSending = useSelector(selectSending);
  const alert = useSelector(selectAlert);
  // const userStatus = useSelector(selectUserStatus);
  const delayedAuth = useSelector(selectDelayedAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { login } = document.forms;
    const data = new FormData(login);
    const email = data.get('email');
    const password = data.get('password');
    const validatedPassword = validatePassword(password);
    const validatedEmail = validataeEmail(email);

    dispatch(emailNotice({ isError: false, text: '' }));
    dispatch(passwordNotice({ isError: false, text: '' }));

    if (!validatedPassword) {
      if (!validatedEmail) {
        dispatch(emailNotice({ isError: true, text: 'Incorrect email' }));
        dispatch(passwordNotice({ isError: true, text: 'Incorrect password' }));
        return;
      }
      dispatch(emailNotice({ isError: false, text: '' }));
      dispatch(passwordNotice({ isError: true, text: 'Incorrect password' }));
      return;
    }
    if (!validatedEmail) {
      if (!validatedPassword) {
        dispatch(passwordNotice({ isError: true, text: 'Incorrect password' }));
        dispatch(emailNotice({ isError: true, text: 'Incorrect email' }));
        return;
      }
      dispatch(passwordNotice({ isError: false, text: '' }));
      dispatch(emailNotice({ isError: true, text: 'Incorrect email' }));
      return;
    }

    if (alert.error) { dispatch(hideAlertError()); }
    if (alert.success) { dispatch(hideAlertSuccess()); }

    dispatch(user({ email, password }));
  };

  const handleInputs = () => {
    const { login } = document.forms;
    const data = new FormData(login);
    const currentValues = {
      email: data.get('email'),
      password: data.get('password'),
    };
    dispatch(saveValues(currentValues));
  };

  const handleNotice = (e) => {
    const { name } = e.target;

    if (name === 'password') {
      dispatch(passwordNotice({ isError: false, text: '' }));
    }
    if (name === 'email') {
      dispatch(emailNotice({ isError: false, text: '' }));
    }
  };

  if (delayedAuth && alert.success) {
    setTimeout(() => {
      dispatch(auth());
      dispatch(hideAlertSuccess());
      navigate('/');
    }, 2000);
  }
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
            <Box component="form" name="login" noValidate onSubmit={handleSubmit} onChange={handleInputs} sx={{ mt: 1 }}>
              <p>mail@mail.com</p>
              <p>blbYF[eq1488</p>
              <TextField
                disabled={isSending}
                value={value.email}
                error={emailStatus.isError}
                helperText={emailStatus.text}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
                onChange={handleNotice}
              />
              <TextField
                disabled={isSending}
                value={value.password}
                error={passwordStatus.isError}
                helperText={passwordStatus.text}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleNotice}
              />
              <Button
                disabled={isSending}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              { !isSending && (
                <Grid container>
                  <Grid item xs>
                    <Fade in={!isSending}>
                      <Link variant="body2" component={LinkTo} to="/">
                        Go to home
                      </Link>
                    </Fade>
                  </Grid>
                </Grid>
              )}
              { isSending && (
                <Fade in={isSending}>
                  <LinearProgress sx={{ mt: 2 }} />
                </Fade>
              )}
              { alert.error && (
                <Zoom in={alert.error}>
                  <Alert severity="error" sx={{ mt: 2 }}>{ alert.message }</Alert>
                </Zoom>
              )}
              { alert.success && (
                <Zoom in={alert.success}>
                  <Alert severity="success" sx={{ mt: 2 }}>{ alert.message }</Alert>
                </Zoom>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
